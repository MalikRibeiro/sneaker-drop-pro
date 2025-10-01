import Order from '../models/Order.js';
import Product from '../models/Product.js';

class WebhookHandlers {
  async handlePaymentIntentSucceeded(paymentIntent) {
    console.log('💰 Payment succeeded:', paymentIntent.id);
    
    try {
      // Encontrar o pedido associado ao paymentIntent
      const order = await Order.findOne({ paymentIntent: paymentIntent.id });
      
      if (!order) {
        throw new Error(`Order not found for payment: ${paymentIntent.id}`);
      }

      // Atualizar status do pedido
      order.status = 'paid';
      await order.save();

      // Atualizar estoque
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (!product) continue;

        const sizeIndex = product.sizes.findIndex(s => s.size === item.size);
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].stock -= item.quantity;
          await product.save();
        }
      }

      console.log('✅ Order updated successfully:', order._id);
    } catch (error) {
      console.error('❌ Error processing payment success:', error);
      throw error;
    }
  }

  async handlePaymentIntentFailed(paymentIntent) {
    console.log('❌ Payment failed:', paymentIntent.id);
    
    try {
      const order = await Order.findOne({ paymentIntent: paymentIntent.id });
      
      if (!order) {
        throw new Error(`Order not found for payment: ${paymentIntent.id}`);
      }

      order.status = 'failed';
      await order.save();

      console.log('✅ Order marked as failed:', order._id);
    } catch (error) {
      console.error('❌ Error processing payment failure:', error);
      throw error;
    }
  }

  async handlePaymentIntentCanceled(paymentIntent) {
    console.log('🚫 Payment canceled:', paymentIntent.id);
    
    try {
      const order = await Order.findOne({ paymentIntent: paymentIntent.id });
      
      if (!order) {
        throw new Error(`Order not found for payment: ${paymentIntent.id}`);
      }

      order.status = 'cancelled';
      await order.save();

      console.log('✅ Order marked as cancelled:', order._id);
    } catch (error) {
      console.error('❌ Error processing payment cancellation:', error);
      throw error;
    }
  }
}

export default new WebhookHandlers();