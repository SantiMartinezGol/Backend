import z from 'zod';

const userCreateValidation = z.object({
 
  firstName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(15),
  email: z.string().email(),
  age: z.number(),
  password: z.string()
});

export default userCreateValidation;