import express from "express";
import cartsRouter from "../routes/cartsRouter";
import productsRouter from "../routes/productsRouter";


const app = express();
const puerto = 8080;


app.use(express.json());
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.listen(puerto, () => {
  console.log(`Servidor Express iniciado en :` +puerto);
});