import cartsRouter from "./src/carts.router.js";
import productRouter from "./src/products.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import express from "express";

const app = express();
const puerto = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname +"/views");
app.set("view engine","handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartsRouter);

app.get("/", (req, res) => {
  const product = {
    title:"Hamburguesa Onion melt",
    price:2320
  }

  res.render("index", product);
})

app.listen(puerto, () => {
  console.log("Servidor escuchando en puerto " + puerto);
});