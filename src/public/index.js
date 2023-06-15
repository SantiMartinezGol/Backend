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
    stock = parseInt(stock)
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
}

const deleteProduct = () => {
    var id = document.getElementById("id").value;
    id = parseInt(id)
};
