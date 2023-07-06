import paginateValidation from '../validations/shared/paginateValidation.js';
import addProductValidation from '../../domain/validations/products/addProductValidation.js';
import idValidation from '../../domain/validations/shared/idValidation.js';
import updateProductValidation from '../../domain/validations/products/updateProductValidation.js';
import container from "../../container.js"

class ProductManager {
  constructor() {
    this.productRepository = container.resolve("ProductRepository");
  }

  async getProducts(data) {
    var { limit, page } = data;
    limit = parseInt(limit)
    page = parseInt(page)
    data = { limit, page }
    await paginateValidation.parseAsync(data);
    return this.productRepository.find(limit, page);
  }

  async getProductById(data) {
   
    const id = data.pid;
    await idValidation.parseAsync({id: id});
    const product = await this.productRepository.getOne(id);
    if (!product) {
      throw new Error('Product Not Found!');
    }
    return product
  }

  async addProduct(data) {
    await addProductValidation.parseAsync(data);
    const product = await this.productRepository.create(data);

    return product;
  }

  async updateProduct(id, data) {
    await updateProductValidation.parseAsync({...data, id});
    await this.productRepository.getOne(id);

    return this.productRepository.updateOne(id, data);   
  }

  async deleteProduct(data) {
    await idValidation.parseAsync({id: data.pid});
    const id = data.pid;
    const productToDelete = await this.productRepository.getOne(id);
    if(!productToDelete)
    {
      throw new Error('Product Not Found!')
    }

    return this.productRepository.deleteOne(id);
  }
}

export default ProductManager;