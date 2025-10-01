import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares de segurança e configuração
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: true,
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
}));

// Configuração do CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/products', productRoutes);

// Rota de teste/saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Rota raiz com documentação básica da API
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sneaker Drop Pro API',
    version: '1.0.0',
    endpoints: {
      health: {
        path: '/health',
        method: 'GET',
        description: 'Verifica o status do servidor'
      },
      products: {
        base: '/api/products',
        endpoints: [
          { path: '/', method: 'GET', description: 'Lista todos os produtos' },
          { path: '/:id', method: 'GET', description: 'Obtém um produto específico' },
          { path: '/', method: 'POST', description: 'Cria um novo produto' },
          { path: '/:id', method: 'PUT', description: 'Atualiza um produto' },
          { path: '/:id', method: 'DELETE', description: 'Remove um produto' }
        ]
      }
    }
  });
});

// Rota 404 para endpoints não encontrados
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint não encontrado',
    availableEndpoints: ['/health', '/api/products']
  });
});

// Middleware de tratamento de erros (último middleware)
app.use(errorHandler);

export default app;