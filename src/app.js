const express = require('express');
const productManager = require('./ProductManager');

const app = express();
const puerto = 8080;

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un producto por su ID
app.get('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;

  try {
    const product = await productManager.addProduct(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por su ID
app.delete('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const deletedProductId = await productManager.deleteProductById(productId);
    res.json({ id: deletedProductId, message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor Express iniciado en :` +puerto);
});