import cartsRouter from "./carts.router";
import productRouter from "./products.router";
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartsRouter);

app.listen(port, () => {
  console.log("Servidor escuchando en puerto " + port);
});