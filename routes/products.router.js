const express = require('express');
const fs = require('fs');
const productsRouter = express.Router();


productsRouter.use(express.json());

productsRouter.get('/', (req, res) => {
  const limit = req.query.limit || null;

  fs.readFile('../products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de productos:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    let products = JSON.parse(data);

    if (limit) {
      products = products.slice(0, limit);
    }

    res.json(products);
  });
});

productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;

  fs.readFile('../products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de productos:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  });
});

productsRouter.post('/', (req, res) => {
  const newProduct = req.body;

  fs.readFile('../products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de productos:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const products = JSON.parse(data);

    
    const newId = Date.now().toString();
    newProduct.id = newId;

    products.push(newProduct);

    fs.writeFile('../products.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error('Error al leer el archivo de productos:', err);
        return res.status(500).json({ error: 'Error Interno del Servidor' });
      }

      res.json(newProduct);
    });
  });
});

productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;

  fs.readFile('../products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de productos:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    const products = JSON.parse(data);
    const existingProduct = products.find((p) => p.id === productId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    
    updatedProduct.id = existingProduct.id;

    
    Object.assign(existingProduct, updatedProduct);

    fs.writeFile('../products.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error('Error al leer el archivo de productos:', err);
        return res.status(500).json({ error: 'Error Interno del Servidor' });
      }

      res.json(existingProduct);
    });
  });
});

productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;

  fs.readFile('../products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de productos:', err);
      return res.status(500).json({ error: 'Error Interno del Servidor' });
    }

    let products = JSON.parse(data);

    const filteredProducts = products.filter((p) => p.id !== productId);

    if (filteredProducts.length === products.length) {
      return res.status(404).json({ error: 'Error Interno del Servidor' });
    }

    fs.writeFile('../products.json', JSON.stringify(filteredProducts, null, 2), (err) => {
      if (err) {
        console.error('Error al leer el archivo de productos:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Producto eliminado con exito' });
    });
  });
});

module.exports = productsRouter;