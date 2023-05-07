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
      return
    }
  }

  async create(prod) {
    const cartDocument = await cartModel.create(prod);
    return {
      cid: cartDocument._id,
      producto: []
    }
  }

  async insert(cid, pid) {
    const updateProducts = await cartModel.findOneAndUpdate(       
      { _id: cid, 'producto._id': pid },
      { $inc: { 'producto.$.pqty': 1 } },
      { new: true }
    );

    if (!updateProducts) {
      await cartModel.updateOne(
        { _id: cid },
        { $push: { producto: { _id: pid, pqty: 1 } } }
      );
    };

    const cartDocument = await cartModel.findById(cid);

    return {
      id: cartDocument._id,
      producto: cartDocument.producto.map(p => ({
          id: p._id,
          pqty: p.pqty        
      }))
    }
  } 
}

export default CartMongooseDao;