import cartsRouter from "./src/carts.router.js";
import productRouter from "./src/products.router.js";
import express from "express";

const app = express();
const puerto = 8080;

app.use(express.json());

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartsRouter);

app.listen(puerto, () => {
  console.log("Servidor escuchando en puerto " + puerto);
});