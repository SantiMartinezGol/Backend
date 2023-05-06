import ProductMongooseDao from "../daos/productMongooseDao.js";

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();

  }

  async getProducts() {
    return this.productDao.find();
  }

  async getProductById(id) {
    return this.productDao.getOne(id);
  }

  async addProduct(data) {
    const product = await this.productDao.create(data);


    return product;
  }

  async updateProduct(id, data) {
    //console.log(data);
    return this.productDao.updateOne(id, data);
  }

  async deleteProduct(id) {
    return this.productDao.deleteOne(id);
  }
}

export default ProductManager;