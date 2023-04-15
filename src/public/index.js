//import ProductManager from "../src/ProductManager";
//const prod = new ProductManager();
const socket = io();

const addProduct = () => {
var title = document.getElementById("title").value;
var description = document.getElementById("description").value;
var code = document.getElementById("code").value;
var price = document.getElementById("price").value;
var stock = document.getElementById("stock").value;
   if (title == "" || description == "" || code == "" || price == "" || stock == "") {
    alert("Por favor, complete todos los campos del formulario.");
    return 
}   
price = parseInt(price)
stock= parseInt(stock)
let producto = {
    title,
    description,
    code,
    price,
    stock
}   
if (!producto.status) {
    producto.status = true
}
console.log(producto)
//Llamar al addProduct(producto) del ProductManager
//enviando el nuevo producto
// si se agrega 
//Llamar al getProducts 
// y renderizar
}

const deleteProduct = () => {
var id = document.getElementById("id").value;         
id = parseInt(id)
console.log(id);   
///LLamar a getProductById(id) del ProductManager 
//setear el status en false
//Llamar al getProducts
//Filtrar por status 
// y renderizar
}

            // socket.emit('chatRoom1', textoInput);

