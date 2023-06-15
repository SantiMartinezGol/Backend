import z from 'zod';
import idValidation from "../shared/idValidation.js";
import userCreateValidation from "./userCreateValidation.js";

const userUpdateValidation = z.intersection(
  idValidation,
  userCreateValidation
);

export default userUpdateValidation;