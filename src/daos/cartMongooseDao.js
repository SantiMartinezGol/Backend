import cartModel from "../models/cartSchema.js";

class CartMongooseDao {
  async getOne(id) {
    const cartDocument = await cartModel.findOne({ _id: id });
    if (cartDocument) {
      return {
        cid: cartDocument._id,
        producto: cartDocument.producto.map(document => ({
          pid: document._id,
          pqty: document.pqty
        }))
      }
    } else {
      return  ////agregar nuevo carro
    }
  }

  async create(prod) {
    const cartDocument = await cartModel.create(prod);
    return {
      cid: cartDocument._id,
      producto: []
    }
  }

  async updateOne(cid, prod) {
    const cartDocument = await cartModel.findOneAndUpdate({ _id: cid }, prod, { new: true, upsert: true });
    console.log(cartDocument);
    /*  return{
       id: cartDocument._id,
       producto: [{
         pid: cartDocument.producto.pid,
         pqty: cartDocument.producto.pqty
       }]
     } */
  }
}

export default CartMongooseDao;