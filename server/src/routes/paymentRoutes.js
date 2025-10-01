import { Router } from 'express';
import paymentController from '../controllers/paymentController.js';
import { rawBodyMiddleware } from '../middlewares/rawBody.js';
import { verifyStripeWebhook } from '../middlewares/verifyWebhook.js';

const router = Router();

// Rota para iniciar checkout
router.post('/checkout', paymentController.initiateCheckout);

// Rota para webhook do Stripe com verificação de assinatura
router.post(
  '/webhook',
  rawBodyMiddleware,
  verifyStripeWebhook,
  paymentController.handleWebhook
);

// Rota para consultar status do pedido
router.get('/order/:orderId', paymentController.getOrderStatus);

export default router;