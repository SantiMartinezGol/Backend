import z from 'zod';

import addProductValidation from './addProductValidation.js';
import idValidation from '../shared/idValidation.js';

const updateProductValidation = z.intersection(
  idValidation,
  addProductValidation
);

export default updateProductValidation;