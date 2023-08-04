import { Router } from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", async (req, res) => {
  try {
    await CM.newCart();
    res.send("Carrito agregado");
  } catch (error) {
    console.error("Error al agregar el carrito:", error);
    res.status(500).send("Error al agregar el carrito");
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const id = Number(req.params.cid);
    const cart = await CM.getCart(id);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
    } else {
      res.send(cart);
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid); 
    const cart = await CM.getCart(cid);
    if (cart) {
      if (await CM.addProductToCart(cid, pid)) { 
        res.send({
          status: "ok",
          message: "El producto se agregó correctamente!",
        });
      } else {
        res
          .status(400)
          .send({
            status: "error",
            message: "Error! No se pudo agregar el Producto al Carrito!",
          });
      }
    } else {
      res
        .status(400)
        .send({
          status: "error",
          message: "Error! No se encuentra el ID de Carrito!",
        });
    }
  });

export default cartsRouter;