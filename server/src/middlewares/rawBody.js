import express from 'express';

export const rawBodyMiddleware = express.raw({ 
  type: 'application/json',
  verify: (req, res, buf) => {
    if (req.url === '/api/payments/webhook') {
      req.rawBody = buf.toString();
    }
    return true;
  }
});