import ProductManager from "../managers/productManager.js";

const product = [];
const pm = new ProductManager();

export const list = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1
    const result = await pm.getProducts(req.query)

    res.send({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? null : false,
      nextLink: result.hasNextPage ? null : false,
    });
  }
  catch (e) {
    next(e);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const product = await pm.getProductById(req.params);
    res.send({ status: 'success', product });
  }
  catch (e) {
    next(e);
  }
}

export const save = async (req, res, next) => {
  try {
    const product = await pm.addProduct(req.body)
    res.send({ status: 'success', product });
  }
  catch (e) {
    next(e);
    //res.send({ status: 'Error', message: 'Product Not Added' })
  }
}

export const update = async (req, res, next) => {
  try {
    const pm = new ProductManager();
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params.pid
    const product = await pm.updateProduct(id, req.body);
    res.send({ status: 'success', product, message: 'Product updated.' });
  }
  catch (e) {
    next(e)
  }
}

export const deleteOne = async (req, res, next) => {
  try {
    const pm = new ProductManager();

    let product = await pm.deleteProduct(req.params)
    res.send({ status: 'Success', message: 'Product Deleted' })
  }
  catch (e) {
    next(e)
  }
}
