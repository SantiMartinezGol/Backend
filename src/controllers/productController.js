import ProductManager from "../managers/productManager.js";
const product = [];
const productos = new ProductManager();

export const list = async (req, res) => 
  {
    const limit = req.query;
    const number = parseInt(limit.limit);
    const products = await productos.getProducts()

    if (isNaN(number)) {
        res.send({ status: 'success', products })
    } else {
        const filterProducts = products.slice(0, number)
        res.send({ status: 'success', filterProducts});
    }
  };

export const getOne = async (req, res) => {
  const pid = req.params.pid;
  
  const product = await productos.getProductById(pid);
  if (!product) {
      res.send({ status: 'Error', message: 'Product Not Found' })
  }else{
     res.send({ status: 'success', product });
  }
 
}

export const save =async (req, res) => {
  const producto = req.body;
  
  try {
      const product = await productos.addProduct(producto)
      res.send({ status: 'success', product });
  }
  catch (e) {
    res.send({ status: 'Error', message: 'Product Not Added' })
  }
}

export const update = async (req, res) => {
  const producto = req.body;
  const id = req.params.id;
  const product = await productos.updateProduct(id, producto)
  res.send({ status: 'success', product });
 }

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  let product = await productos.deleteProduct(id)
  res.send({ status: 'Success', message: 'Product Deleted' })
}