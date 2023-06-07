import z from 'zod';
import idValidation from './idValidation.js';
import addProductValidation from './addProductValidation.js';

const updateProductValidation = z.union([
  idValidation,
  addProductValidation
]);

export default updateProductValidation;