import z from 'zod';

const userEmailValidation = z.object({
  email: z.string().email(),
});

export default userEmailValidation;