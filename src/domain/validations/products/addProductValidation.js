import z from 'zod';

const addProductValidation = z.object({

  title: z.string().min(3).max(20),
  description: z.string().min(5).max(100),
  code: z.string(),
  price: z.number(),
  stock: z.number(),
  category:  z.string()
});

export default addProductValidation;