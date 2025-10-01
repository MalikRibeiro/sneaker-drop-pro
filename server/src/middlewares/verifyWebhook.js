import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyStripeWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    try {
      // Construir o evento usando o corpo bruto e a assinatura
      req.stripeEvent = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      next();
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('⚠️ Webhook error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};