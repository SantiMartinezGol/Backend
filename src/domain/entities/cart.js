class Cart
{
  constructor(props)
  {
    this.id = props.id;
    this.products = props.products.map(p=> ({
      id: p.id,
      pqty: p.pqty
    }))
  }
}

export default Cart;
