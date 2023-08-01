import cartsRouter from '../routes/carts.router';
import productsRouter from '../routes/products.router';

const express = require('express');



const app = express();
const puerto = 8080;


app.use(express.json());

const productsRouter = express.Router();
app.use('/api/products', productsRouter);

const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);


productsRouter.get('/', (req, res) => {

  const limit = req.query.limit || null;
  
});

productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  
});

productsRouter.post('/', (req, res) => {
  const newProduct = req.body;
  
});

productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  
});

productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  
});


cartsRouter.post('/', (req, res) => {
  const newCart = req.body;
 
});

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
 
});

cartsRouter.post('/:cid/products/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  
});

app.listen(puerto, () => {
  console.log(`Servidor Express iniciado en :` +puerto);
});