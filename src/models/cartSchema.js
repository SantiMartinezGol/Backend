import mongoose, { Schema } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
      _id: { type: Schema.Types.ObjectId, index: true, ref: 'products', require: true },
      pqty: { type: Schema.Types.Number, require: true }
    }],
  }
})
cartSchema.pre('findOne', function () {
  this.populate(['products._id']);
});

export default mongoose.model(cartCollection, cartSchema);

