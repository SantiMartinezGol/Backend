import ProductManager from "../managers/productManager.js";

const product = [];
const pm = new ProductManager();

export const list = async (req, res) => {

  const limit = parseInt(req.query.limit, 10) || 10
  const page = parseInt(req.query.page, 10) || 1


  const result = await pm.getProducts(limit, page)

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
};

export const getOne = async (req, res) => {
  const pid = req.params.pid;
  const product = await pm.getProductById(pid);

  if (!product) {
    res.send({ status: 'Error', message: 'Product Not Found' })
  } else {
    res.send({ status: 'success', product });
  }
}

export const save = async (req, res) => {
  const producto = req.body;

  try {
    const product = await pm.addProduct(producto)
    res.send({ status: 'success', product });
  }
  catch (e) {
    res.send({ status: 'Error', message: 'Product Not Added' })
  }
}

export const update = async (req, res) => {
  const producto = req.body;
  const id = req.params.id;
  const product = await pm.updateProduct(id, producto);
  console.log(product);
  res.send({ status: 'success', product });
}

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  let product = await pm.deleteProduct(id)
  res.send({ status: 'Success', message: 'Product Deleted' })
}