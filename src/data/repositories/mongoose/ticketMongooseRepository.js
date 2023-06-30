import productSchema from '../../models/mongoose/productSchema.js'
import ticketSchema from '../../models/mongoose/ticketSchema.js';

class TicketMongooseRepository {
  
  async find(limit, page) {
    const productsDocument = await productSchema.paginate({ status: true }, { limit, page });
    return productsDocument
  }

  async getOne(id) {
    const productDocument = await productSchema.findOne({ _id: id });
    if (!productDocument) {
      throw new Error('Product Not Found!');
    }
    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }

  async create(data) {
    const {code, purchase_datetime, amount, purchaser} = data
    const ticketDocument = await ticketSchema.create(data);
    return {
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser:  ticketDocument.purchaser,
    }
  }

  async updateOne(id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    };
  }

  async deleteOne(id) {
    await productSchema.deleteOne({ _id: id })
    return
  }
}
export default TicketMongooseRepository;