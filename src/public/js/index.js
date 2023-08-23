const socketClient = io();


socketClient.on("envioDeProductos", (obj)=>{
    updateProductList(obj);
});

function updateProductList(products){
    let div = document.getElementById("list-products");
    let productos = " ";

    products.forEach((product) => {
        productos+= `<div class="contenedor-productos">
                        <div class="producto">
                            <img class="producto-imagen" src=${{thumbnail}} />
                            <div class="producto-detalles">
                                <h2>${{title}}</h2>
                                <div>${{description}}</div>
                                <div>${{price}}</div>
                                <div class="producto-comprar">
                                    <a class="comprar"href="#">Comprar ahora</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
        
    });
    div.innerHTML= productos;
}


let form =document.getElementById("form-Product");
form.addEventListener("submit", (evt)=>{
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    
    socketClient.emit("producto-registrar", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
    });
    
    form.reset();

});


document.getElementById("boton-eliminar").addEventListener("click", function () {
    const deleteidinput = document.getElementById("producto-id");
    const deleteid = parseInt(deleteidinput.value);
    socketClient.emit("boton-eliminar", deleteid);
    deleteidinput.value = "";
  });