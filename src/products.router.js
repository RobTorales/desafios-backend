import { Router } from "express";
import ProductManager from "./dao/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", async (req, res) => {
    const products = await PM.getProducts();
    let { limit } = req.query;

    res.send({ products: limit ? products.slice(0, limit) : products });
});

productsRouter.get("/:pid", async (req, res) => {
    const products = await PM.getProducts();
    let pid = Number(req.params.pid);

    res.send({
        product:
            products.find((item) => item.id === pid) ||
            "Error! El ID de Producto no existe!",
    });
});

productsRouter.post("/", async (req, res) => {
    let {
        title,
        description,
        code,
        price,
        stock,
        thumbnails,
    } = req.body;

    if (!title) {
        res
            .status(400)
            .send({ status: "error", message: "Error! No se cargó el campo Title!" });
        return;
    }

    

    status = !status && true;

    if (!stock) {
        res
            .status(400)
            .send({ status: "error", message: "Error! No se cargó el campo Stock!" });
        return;
    }

   

    try {
        if (await PM.addProduct({ title, description, code, price, status, stock, thumbnails })) {
            res.send({ status: "ok", message: "El Producto se agregó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo agregar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error! No se pudo agregar el Producto!" });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    let pid = Number(req.params.pid);
    let {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    } = req.body;

    

    status = !status && true;

    if (!stock) {
        res
            .status(400)
            .send({ status: "error", message: "Error! No se cargó el campo Stock!" });
        return;
    }

   

    try {
        if (await PM.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails })) {
            res.send({ status: "ok", message: "El Producto se actualizó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo actualizar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error! No se pudo actualizar el Producto!" });
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    let pid = Number(req.params.pid);

    try {
        if (await PM.deleteProduct(pid)) {
            res.send({ status: "ok", message: "El Producto se eliminó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo eliminar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error! No se pudo eliminar el Producto!" });
    }
});

export default productsRouter;