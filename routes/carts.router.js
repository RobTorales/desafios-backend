const express = require('express');
const fs = require('fs');
const cartsRouter = express.Router();

const CART_FILE_PATH = './cart.json';

cartsRouter.use(express.json());

cartsRouter.post('/', (req, res) => {
  const newCart = req.body;

  fs.readFile(CART_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo del carrito:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const carts = JSON.parse(data);


    const newId = Date.now().toString();
    newCart.id = newId;

    carts.push(newCart);

    fs.writeFile(CART_FILE_PATH, JSON.stringify(carts, null, 2), (err) => {
      if (err) {
        console.error('Error al leer el archivo del carrito:', err);
        return res.status(500).json({ error: 'Error Interno del Servidor' });
      }

      res.json(newCart);
    });
  });
});

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;

  fs.readFile(CART_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo del carrito:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const carts = JSON.parse(data);
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
  });
});

cartsRouter.post('/:cid/products/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  fs.readFile(CART_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo del carrito:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const carts = JSON.parse(data);
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    fs.writeFile(CART_FILE_PATH, JSON.stringify(carts, null, 2), (err) => {
      if (err) {
        console.error('Error al leer el archivo del carrito:', err);
        return res.status(500).json({ error: 'Error Interno del Servidor' });
      }

      res.json(cart.products);
    });
  });
});

module.exports = cartsRouter;