import Product from '../models/Product.js';

class ProductController {
  // Listar todos os produtos
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  // Obter um produto específico
  async getProductById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        const error = new Error('Produto não encontrado');
        error.name = 'NotFoundError';
        throw error;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  // Criar um novo produto
  async createProduct(req, res, next) {
    try {
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }

  // Atualizar um produto
  async updateProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!product) {
        const error = new Error('Produto não encontrado');
        error.name = 'NotFoundError';
        throw error;
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  // Deletar um produto
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      
      if (!product) {
        const error = new Error('Produto não encontrado');
        error.name = 'NotFoundError';
        throw error;
      }
      
      res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();