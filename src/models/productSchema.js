import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String, require: true },
  code: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, index: true, require: true },
  stock: { type: Schema.Types.Number, require: true },
  category: { type: Schema.Types.String, require: true },
  status: { type: Schema.Types.Boolean, default: true }
})

productSchema.plugin(mongoosePaginate);

export default mongoose.model(productCollection, productSchema);
