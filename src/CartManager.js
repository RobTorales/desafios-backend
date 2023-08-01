const fs = require('fs');

const CART_FILE_PATH = './cart.json';


function readCartsFromFile(callback) {
  fs.readFile(CART_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo del carrito:', err);
      return callback(err);
    }

    const carts = JSON.parse(data);
    callback(null, carts);
  });
}


function writeCartsToFile(carts, callback) {
  fs.writeFile(CART_FILE_PATH, JSON.stringify(carts, null, 2), (err) => {
    if (err) {
      console.error('Error al leer el archivo del carrito:', err);
      return callback(err);
    }

    callback(null);
  });
}


function getCartById(cartId, callback) {
  readCartsFromFile((err, carts) => {
    if (err) {
      return callback(err);
    }

    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
      return callback(new Error('Carrito no encontrado'));
    }

    callback(null, cart);
  });
}


function addProductToCart(cartId, productId, quantity, callback) {
  readCartsFromFile((err, carts) => {
    if (err) {
      return callback(err);
    }

    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
      return callback(new Error('Carrito no encontrado'));
    }

    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    writeCartsToFile(carts, (err) => {
      if (err) {
        return callback(err);
      }

      callback(null, cart.products);
    });
  });
}

module.exports = {
  getCartById,
  addProductToCart,
};