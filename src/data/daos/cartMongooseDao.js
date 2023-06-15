import cartSchema from '../models/cartSchema.js';

class CartMongooseDao {

  async getOne(id) {

    const cartDocument = await cartSchema.findOne({ _id: id })

    if (!cartDocument) {
      throw new Error('Cart Not Found!')
    }
    return {
      id: cartDocument._id,
      products: cartDocument.products.map((prod) => ({
        id: prod._id,
        title: prod.title,
        description: prod.description,
        code: prod.code,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        quantity: prod.pqty
      }))
    };
}

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

  if (cartDocument) {
    return {
      cid: cartDocument._id,
      products: cartDocument.products.map(document => ({
        pid: document._id,
        pqty: document.pqty
      }))
    }
  } else {
    return
  }
}

  async deleteAll(cid) {

  const cartDocument = await cartSchema.findOneAndUpdate(
    { _id: cid },
    { $set: { products: [] } },
    { new: true }
  );

  if (cartDocument) {
    return {
      cid: cartDocument._id,
    }
  } else {
    return
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

  if (cartDocument) {
    return {
      cid: cartDocument._id,
      products: cartDocument.products.map(document => ({
        pid: document._id,
        pqty: document.pqty
      }))
    }
  } else {
    return
  }
}
}

export default CartMongooseDao;