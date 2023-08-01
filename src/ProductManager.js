const fs = require('fs').promises;

const productManager = {
 
  getAllProducts: async () => {
    try {
      const data = await fs.readFile("../products.json", 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos.');
    }
  },


  getProductById: async (productId) => {
    try {
      const data = await fs.readFile("../products.json", 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === productId);

      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto.');
    }
  },


  addProduct: async (newProduct) => {
    try {
      const data = await fs.readFile("../products.json", 'utf-8');
      const products = JSON.parse(data);


      const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
      const newProductId = lastProductId + 1;
      newProduct.id = newProductId;

      products.push(newProduct);

      await fs.writeFile('products.json', JSON.stringify(products, null, 2));

      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto.');
    }
  },


  deleteProductById: async (productId) => {
    try {
      const data = await fs.readFile("../products.json", 'utf-8');
      const products = JSON.parse(data);
      const updatedProducts = products.filter((p) => p.id !== productId);

      if (updatedProducts.length === products.length) {
        throw new Error('Producto no encontrado.');
      }

      await fs.writeFile('products.json', JSON.stringify(updatedProducts, null, 2));

      return productId;
    } catch (error) {
      throw new Error('Error al eliminar el producto.');
    }
  },
};

module.exports = productManager;