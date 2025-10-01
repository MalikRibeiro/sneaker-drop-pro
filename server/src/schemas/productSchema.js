import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string({ required_error: "O nome é obrigatório." })
    .min(3, "O nome deve ter no mínimo 3 caracteres."),
  brand: z.string({ required_error: "A marca é obrigatória." })
    .min(2, "A marca deve ter no mínimo 2 caracteres."),
  description: z.string().optional(),
  price: z.number({ required_error: "O preço é obrigatório." })
    .positive("O preço deve ser um número positivo."),
  image: z.string().url("A imagem deve ser uma URL válida.").optional(),
  stock: z.number().int().min(0, "O estoque não pode ser negativo.").default(0),
});

// Schema para atualização (todos os campos são opcionais)
export const updateProductSchema = createProductSchema.partial();