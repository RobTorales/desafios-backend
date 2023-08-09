import express from "express";

const router = express.Router();

const products = [
    {id:1,title:" Onion Melt con papas fritas",description:"3 cuotas sin interes de $12.330ARS",price:2320,thumbnail:"https://vcp.com.ar/cdn/shop/files/Topo6_81943047-662b-4e1c-82ae-9e26fb212505.jpg?v=1688741569&width=700",code:"Hamburguesa",stock:10},
    {id:2,title:"Doble Factory con papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2320,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515042-5abf2961-6b30-4f53-aa00-8b911deda468.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:3,title:"Country con papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2070,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515871-d1ccb632-cf2b-43e4-a727-979e3051a8db.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:4,title:"Brunch con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2320,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515848-17565679-a93e-4883-ac80-cd2da8caad79.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:5,title:"Big Factory con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2420,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515854-e43fd401-067d-4e56-a061-da934e3ae0fb.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:6,title:"Bacon Cheese con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2420,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/a86a8f35-3019-4d2d-934e-af32a6fc990a.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:7,title:"Blt con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2070,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515860-2bca37da-4cbc-4bf8-8c1d-ed6795a5060d.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:8,title:"King Factory con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2560,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/d0c289b9-cb48-4441-b6cf-0fee72676530.png?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:9,title:"Bumper con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:2560,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515860-2bca37da-4cbc-4bf8-8c1d-ed6795a5060d.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8},
    {id:10,title:"Cheeseburger con papas fritas papas fritas",description:"3 cuotas sin interes de $14.330ARS",price:1200,thumbnail:"https://images.deliveryhero.io/image/pedidosya/products/33515860-2bca37da-4cbc-4bf8-8c1d-ed6795a5060d.jpeg?quality=90&height=96&width=96&webp=1",code:"Hamburguesa 2",stock:8}
];



export default router;