import { Router } from 'express';
import validate from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema } from '../schemas/productSchema.js';
import productController from '../controllers/productController.js';

const router = Router();

// Rotas com validação
router.post('/', validate(createProductSchema), productController.createProduct);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);

// Rotas sem validação
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

export default router;