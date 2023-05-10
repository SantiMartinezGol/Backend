import productSchema from '../models/productSchema.js';

class ProductMongooseDao {
  async find(limit,page) {
    const productsDocument = await productSchema.paginate({status: true },{limit, page});
    
    return productsDocument
  }

  async getOne(id) {

    const productDocument = await productSchema.findOne({ _id: id });
    if (productDocument){
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
    } else {
      return
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

  async updateOne (id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });
  
    if (!productDocument) {
      throw new Error('No se encontró el producto');
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
    };
  }
}

export default ProductMongooseDao;
