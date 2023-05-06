import mongoose, { Schema } from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  code: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true },
  stock: { type: Schema.Types.Number, required: true },
  category: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.Boolean, default: true }
})

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;