import mongoose, { Schema } from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
  producto: {
    type: [{
      _id: { type: Schema.Types.ObjectId, required: [true, "El Id del producto es obligatorio"] },
      pqty: { type: Schema.Types.Number, required: [true, "La cantidad es requerida"] }
    }],
    required: [true, "Al menos tiene que haber un producto"],
  }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
