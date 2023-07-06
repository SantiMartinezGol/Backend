import cartSchema from '../../models/mongoose/cartSchema.js';
import Cart from '../../../domain/entities/cart.js'

class CartMongooseRepository {

  async getOne(id) { 
  
    const cartDocument = await cartSchema.findOne({ _id: id })
       
    return new Cart ({
      id: cartDocument._id.toString(),
      products: cartDocument.products.map(p => ({
        id: p._id.toString(),
        pqty: p.pqty
      }))
    })
  };

  async create() {
    const cartDocument = await cartSchema.create({ products: [] });
    
    return new Cart ({
      id: cartDocument._id, 
      products: cartDocument.products.map(p => ({
        id: p._id.toString(),
        pqty: p.pqty
      }))
    });
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

    return new Cart  ({
      id: cartDocument._id,
      products: cartDocument.products.map(p => ({
        id: p._id.toString(),
        pqty: p.pqty
      }))
    })
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
    return new Cart ({
      id: cartDocument._id.toString(),
      products: cartDocument.products.map(document => ({
        id: document._id.toString(),
        pqty: document.pqty
      }))
    })
  }

  async deleteAll(cid) {
    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid },
      { $set: { products: [] } },
      { new: true }
    );
    return {
      id: cartDocument._id.toString(),
    }
  }

  async updateAll(cid, products) {

    const transfProducts = products.map((product) => ({
      _id: product.pid,
      pqty: product.pqty,
      }));

    const cartDocument = await cartSchema.findOneAndUpdate(
      { _id: cid },
      { $set: { products: transfProducts } },
      { new: true }
    );   
    return new Cart ({
      id: cartDocument._id.toString(),
      products: cartDocument.products.map(document => ({
        id: document._id.toString(),
        pqty: document.pqty
      }))
    }) 
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
   
    return new Cart ({
      id: cartDocument._id.toString(),
      products: cartDocument.products.map(document => ({
        id: document._id.toString,
        pqty: document.pqty
      }))
    })
  }
}

export default CartMongooseRepository;