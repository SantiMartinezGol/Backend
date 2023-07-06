import Product from "../../../domain/entities/product.js";
import productSchema from '../../models/mongoose/productSchema.js'

class ProductMongooseRepository {
  
  async find(limit, page) {
    const productsDocument = await productSchema.paginate({ status: true }, { limit, page });
    const { docs, ...pagination } = productsDocument;

    const products = docs.map(document => new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      code: document.code,
      price: document.price,
      stock: document.stock,
      category: document.category,
      status: document.status
    }));
    
    return {
      products,
      pagination
    }
  }
  async getOne(id) {
    const productDocument = await productSchema.findOne({ _id: id });
    if (!productDocument) {
      throw new Error('Product Not Found!');
    }
       
    return new Product ({
      id: productDocument._id.toString(), 
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    });
    
  }

  async create(data) {
    const productDocument = await productSchema.create(data);
    
    return new Product ({
      id: productDocument._id.toString(), 
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    });
  }

  async updateOne(id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    return new Product ({
      id: productDocument._id.toString(), 
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    });
  }

  async deleteOne(id) {
  
    return productSchema.deleteOne({ _id: id })
  }
}
export default ProductMongooseRepository;