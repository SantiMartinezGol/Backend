import z from 'zod';

const paginateValidation = z.object({
    page: z.number(),
    limit: z.number()
});
    
export default paginateValidation;