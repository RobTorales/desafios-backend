const productManager = require('./ProductManager');


productManager.getAllProducts()
  .then((products) => {
    console.log('Productos:', products);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });


const newProduct = {
  name: 'Nuevo Producto',
  price: 12.99,
};

productManager.addProduct(newProduct)
  .then((product) => {
    console.log('Producto agregado:', product);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });


const productIdToDelete = 2;

productManager.deleteProductById(productIdToDelete)
  .then((productId) => {
    console.log('Producto eliminado:', productId);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });