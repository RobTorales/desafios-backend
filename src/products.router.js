import { Router } from "express";
import ProductManager from "./ProductManager.js";

const productRouter = Router();
const productManager = new ProductManager();

productRouter.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts();
    console.log(products);
    if (limit) {
      let allProducts = [...products];
      console.log(allProducts);
      const productLimit = allProducts.slice(0, limit);
      console.log(productLimit);
      return res.send(productLimit);
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error al obtener los productos");
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const product = await productManager.getProductsById(id);
    if (!product) {
      res.status(404).send("Producto no encontrado");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error al obtener el producto");
  }
});

productRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  try {
    await productManager.addProduct(newProduct);
    res.send("Producto agregado");
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(400).send(`Error al agregar el producto: ${error.message}`);
  }
});

productRouter.put("/:pid", async (req, res) => {
  let pid = Number(req.params.pid);
  let newProduct = req.body;
  try {
    await productManager.updateProduct(pid, newProduct);
    res.send("Producto actualizado");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error al actualizar el producto");
  }
});

productRouter.delete("/:pid", async (req, res) => {
  let pid = Number(req.params.pid);
  try {
    await productManager.deleteProduct(pid);
    res.send({
      status: "ok",
      message: "El Producto se eliminó correctamente!",
    });
  } catch (error) {
    if (error.message === "Producto no encontrado") {
      res.status(404).send({
        status: "error",
        message:
          "Error! No se pudo eliminar el Producto. Producto no encontrado!",
      });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error! No se pudo eliminar el Producto!",
      });
    }
  }
});

export default productRouter;