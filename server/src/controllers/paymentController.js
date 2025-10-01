import Order from '../models/Order.js';
import Product from '../models/Product.js';
import stripeService from '../services/stripeService.js';

class PaymentController {
  // Iniciar checkout
  async initiateCheckout(req, res, next) {
    try {
      console.log('Recebendo requisição de checkout:', req.body);
      const { items, user } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items inválidos no carrinho' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Usuário não identificado' });
      }

      console.log('Validando estoque para os items:', items);
      // Validar estoque
      for (const item of items) {
        console.log('Verificando produto:', item.product);
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ error: `Produto ${item.product} não encontrado` });
        }

        const sizeStock = product.sizes.find(s => s.size === item.size);
        if (!sizeStock || sizeStock.stock < item.quantity) {
          return res.status(400).json({ error: `Estoque insuficiente para o produto ${product.name}` });
        }
      }

      // Calcular valor total
      let totalAmount = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
      }, 0);

      // Criar ordem
      const order = new Order({
        user,
        items,
        totalAmount,
        paymentMethod: 'stripe'
      });
      await order.save();

      // Criar Payment Intent
      const paymentIntent = await stripeService.createPaymentIntent(totalAmount, {
        orderId: order._id.toString()
      });

      // Atualizar ordem com Payment Intent ID
      order.paymentIntent = paymentIntent.id;
      await order.save();

      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: order._id
      });
    } catch (error) {
      next(error);
    }
  }

  // Webhook do Stripe
  async handleWebhook(req, res, next) {
    try {
      // O evento já foi verificado pelo middleware
      const event = req.stripeEvent;

      console.log('🔔 Webhook event received:', event.type);

      switch (event.type) {
        case 'payment_intent.succeeded':
          await webhookHandlers.handlePaymentIntentSucceeded(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await webhookHandlers.handlePaymentIntentFailed(event.data.object);
          break;
        case 'payment_intent.canceled':
          await webhookHandlers.handlePaymentIntentCanceled(event.data.object);
          break;
        default:
          console.log(`🤔 Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('❌ Webhook error:', error.message);
      next(error);
    }
  }

  // Processar pagamento bem-sucedido
  async handleSuccessfulPayment(paymentIntent) {
    const order = await Order.findOne({ paymentIntent: paymentIntent.id });
    if (!order) return;

    order.status = 'paid';
    await order.save();

    // Atualizar estoque
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      const sizeIndex = product.sizes.findIndex(s => s.size === item.size);
      
      if (sizeIndex !== -1) {
        product.sizes[sizeIndex].stock -= item.quantity;
        await product.save();
      }
    }
  }

  // Processar pagamento falho
  async handleFailedPayment(paymentIntent) {
    const order = await Order.findOne({ paymentIntent: paymentIntent.id });
    if (!order) return;

    order.status = 'failed';
    await order.save();
  }

  // Consultar status do pedido
  async getOrderStatus(req, res, next) {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        const error = new Error('Pedido não encontrado');
        error.name = 'NotFoundError';
        throw error;
      }

      res.json({
        orderId: order._id,
        status: order.status,
        totalAmount: order.totalAmount
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();