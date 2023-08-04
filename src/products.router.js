import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", async (req, res) => {
    try {
        const products = await PM.getProducts();
        let { limit } = req.query;
        res.send({ products: limit ? products.slice(0, limit) : products });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener los productos" });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const products = await PM.getProducts();
        let pid = Number(req.params.pid);
        const product = products.find(item => item.id === pid);
        if (product) {
            res.send({ product });
        } else {
            res.send({ message: "Error! El ID de Producto no existe!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener el producto" });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        let { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // Verificación de campos omitida para mantener el código más conciso.

        if (await PM.addProduct({ title, description, code, price, status, stock, category, thumbnails })) {
            res.send({ status: "ok", message: "El Producto se agregó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo agregar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al agregar el producto" });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        let pid = Number(req.params.pid);
        let { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // Verificación de campos omitida para mantener el código más conciso.

        if (await PM.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails })) {
            res.send({ status: "ok", message: "El Producto se actualizó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo actualizar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al actualizar el producto" });
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        let pid = Number(req.params.pid);
        if (await PM.deleteProduct(pid)) {
            res.send({ status: "ok", message: "El Producto se eliminó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo eliminar el Producto!" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al eliminar el producto" });
    }
});

export default productsRouter;