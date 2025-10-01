import { ZodError } from 'zod';

const errorHandler = (error, req, res, next) => {
  console.error("Ocorreu um erro:", error);

  // Erros de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Erro de validação nos dados enviados.',
      errors: error.flatten().fieldErrors,
    });
  }

  // Erros de MongoDB/Mongoose
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação do banco de dados',
      errors: Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      })),
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido',
      error: 'O ID fornecido não está no formato correto',
    });
  }

  // Erro 404 personalizado
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      message: error.message || 'Recurso não encontrado',
    });
  }

  // Resposta padrão para erros inesperados
  return res.status(500).json({
    message: 'Ocorreu um erro interno inesperado no servidor.',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};

export default errorHandler;