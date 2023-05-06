import ProductManager from "../managers/productManager.js";
import productModel from "../models/productSchema.js";

class ProductMongooseDao {
  async find() {
    const productsDocument = await productModel.find({status: true });
    
    return productsDocument.map(document => ({
      id: document._id,
      title: document.title,
      description: document.description,
      code: document.code,
      price: document.price,
      stock: document.stock,
      category: document.category,
      status: document.status
    }));
  }

  async getOne(id) {

      const productDocument = await productModel.findOne({ _id: id });
      //console.log(productDocument);
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
    const productDocument = await productModel.create(data);
    console.log(productDocument);
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
    const productDocument = await productModel.findOneAndUpdate({ _id: id }, data, { new: true });

    console.log(data);
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

  async deleteOne(id) {
    const productDocument = await productModel.findOneAndUpdate({ _id: id }, { status: false });
    return //res.send({ status: 'Succsess', message: 'Product Deleted' })
  }
}
export default ProductMongooseDao;
