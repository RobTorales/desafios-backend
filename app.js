import express from "express";
import viewRouter from "./src/view.router.js";
import cartRouter from "./src/carts.router.js";
import productsRouter from "./src/products.router.js";
import ChatManager from "./src/dao/ChatManager.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";

const app = express();
const puerto =8080;

mongoose.connect ("mongodb+srv://roberto1608torales:16AGOST004@cluster0.ggriuqe.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());
app.set("view engine","handlebars");
app.set("views", __dirname+"/views")
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartRouter);
app.use("/", viewRouter);



const httpServer=app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});

const socketServer = new Server(httpServer);

import ProductManager from "./src/dao/ProductManager.js";
const PM = new ProductManager(__dirname+"./products.json");

socketServer.on("connection", (socket) => {
    console.log("Nueva Conexión!");

    const products = PM.getProducts();
    socket.emit("realTimeProducts", products);

    socket.on("nuevoProducto", (data) => {
        const product = {title:data.title, description:"", code:"", price:data.price, status:"", stock:10, category:"", thumbnails:data.thumbnails};
        PM.addProduct(product);
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });

    socket.on("eliminarProducto", (data) => {
        PM.deleteProduct(parseInt(data));
        const products = PM.getProducts();
        socket.emit("realTimeProducts", products);
    });

    socket.on("newMessage", async (data) => {
        CM.createMessage(data);
        const messages = await CM.getMessages();
        socket.emit("messages", messages);
    });
});