import productSchema from '../../models/mongoose/productSchema.js'

class ProductMongooseRepository {
  
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
    const productDocument = await productSchema.create(data);
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
export default ProductMongooseRepository;