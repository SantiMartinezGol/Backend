import cartSchema from '../../models/mongoose/cartSchema.js';

class CartMongooseRepository {

  async getOne(id) {
    // id ok
    const cartDocument = await cartSchema.findOne({ _id: id })
    
    if (!cartDocument) {
      throw new Error('Cart Not Found!')
    }

    return {
      id: cartDocument._id,
      products: cartDocument.products.map((prod) => ({
        pid: prod._id._id,
        title: prod._id.title,
        //description: prod._id.description,
        code: prod._id.code,
        price: prod._id.price,
        stock: prod._id.stock,
        //category: prod._id.category,
        //status: prod._id.status,
        pqty: prod.pqty
      }))
    };
  };

  async create() {
    const cartDocument = await cartSchema.create({ products: [] });
    return {
      cid: cartDocument._id,
     
      products: []
    };
  }

  async insert(cid, pid) {
    const updateProduct = await cartSchema.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $inc: { 'products.$.pqty': 1 } },
      { new: true }
    );
    if (!updateProduct) {
      await cartSchema.updateOne(
        { _id: cid },
        { $push: { products: { _id: pid, pqty: 1 } } }
      );
    };
    const cartDocument = await cartSchema.findById(cid);

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(p => ({
        id: p._id,
        pqty: p.pqty
      }))
    }
  }

  async deleteOne(cid, pid) {
    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $pull: { 'products': { _id: pid } } },
      { new: true }
    );

    if (!cartDocument) {
      throw new Error('Unexpected error!')
    }
    return {
      cid: cartDocument._id,
      products: cartDocument.products.map(document => ({
        pid: document._id,
        pqty: document.pqty
      }))
    }
  }

  async deleteAll(cid) {
    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid },
      { $set: { products: [] } },
      { new: true }
    );
    return {
      cid: cartDocument._id,
    }
  }

  async updateAll(cid, products) {
    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid },
      { $set: { products: products } },
      { new: true }
    );
    if (cartDocument) {
      return cartDocument
    } else {
      return
    }
  }

  async updateOne(cid, pid, pqty) {

    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $set: { 'products.$.pqty': pqty } },
      { new: true }
    );

    if (!cartDocument) {
      throw new Error('Cant Update Cart!')
    }
    return {
      cid: cartDocument._id,
      products: cartDocument.products.map(document => ({
        pid: document._id,
        pqty: document.pqty
      }))
    }
  }
}

export default CartMongooseRepository;