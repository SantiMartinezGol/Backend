import ProductManager from "../../domain/managers/productManager.js";

export const list = async (req, res, next) => {
  try 
  {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1
    const data = {limit,page}
    
    const pm = new ProductManager();
    const products = await pm.getProducts(data)

    res.send({ status: 'success', products: products.docs, ...products, docs: undefined });

  }
  catch (e) 
  {
    next(e);
  }
};

export const getOne = async (req, res, next) => {
  try
  {
    const pm = new ProductManager();
    const product = await pm.getProductById(req.params);

    res.status(200).send ({ status: 'success', product })
  }
  catch (e)
  {
    next(e);
  }
}

export const save = async (req, res, next) => {
  try 
  {
    const pm = new ProductManager();
    const product = await pm.addProduct(req.body);

    res.status(201).send ({ status: 'success', product });
  }
  catch (e) 
  {
    next(e);
  }
}

export const update = async (req, res, next) => {
  try 
  {
    const pm = new ProductManager();
    const product = await pm.updateProduct(req.params.pid, req.body);
    
    res.send({ status: 'success', product, message: 'Product updated.' });
  }
  catch (e) 
  {
    next(e)
  }
}

export const deleteOne = async (req, res, next) => {
  try 
  {
    const pm = new ProductManager();
    await pm.deleteProduct(req.params);
    
    res.send({ status: 'Success', message: 'Product Deleted' })
  }
  catch (e) 
  {
    next(e)
  }
}