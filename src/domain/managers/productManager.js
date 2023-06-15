import ProductMongooseDao from '../../data/daos/productMongooseDao.js';
import paginateValidation from '../validations/shared/paginateValidation.js';
import addProductValidation from '../../domain/validations/products/addProductValidation.js';
import idValidation from '../../domain/validations/shared/idValidation.js';
import updateProductValidation from '../../domain/validations/products/updateProductValidation.js';

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
  }

  async getProducts(data) {
    var { limit, page } = data;
    limit = parseInt(limit)
    page = parseInt(page)
    data = { limit, page }
    await paginateValidation.parseAsync(data);
    return this.productDao.find(limit, page);
  }

  async getProductById(data) {
    
    const object = {id: data.pid};
    await idValidation.parseAsync(object);
    
    const id = data.pid
    return this.productDao.getOne(id);
  }

  async addProduct(data) {
    await addProductValidation.parseAsync(data)
    const product = await this.productDao.create(data);
    return product;
  }

  async updateProduct(id, data) {
    await updateProductValidation.parseAsync({...data, id});
    await this.productDao.getOne(id)
    return this.productDao.updateOne(id, data);
    
  }

  async deleteProduct(data) {

    const object = {id: data.pid};
    await idValidation.parseAsync(object);
    
    const id = data.pid
    const productToDelete = await this.productDao.getOne(id);
   if(!productToDelete){
    throw new Error('Product Not Found!')
   }
    return this.productDao.deleteOne(id);
  }
}

export default ProductManager;