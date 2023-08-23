import mongoose from "mongoose"
import  { productModel }  from "./models/product.model.js";

class ProductManager {
    constructor() {
        this.products = [];
    }

     getProducts() {
        return productModel.find().lean();
    }

    getProductsById(id){
        return productModel.find({id:id}).lean();
    }

    validateCode(code) {
        console.log (productModel.find({code:code}).lean())
        return 2;
    }

    async addProduct(product) {
        const producto = {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            thumbnails: product.thumbnails
        };
        console.log(producto);
    
        try {
            await productModel.create({ producto });
            console.log("Producto agregado!");
            return true;
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            return false;
        }
    }

    async updateProduct(productId, updatedProductData) {
        this.products = await this.getProducts();
        const productIndex = this.products.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
            await this.saveProducts();
            console.log("Product updated!");
            return true;
        }

        return false;
    }

    async deleteProduct(productId){
        const allproducts=await this.getProducts({})
        const productswithoutfound=allproducts.filter(elemento=>elemento.id!==parseInt(productId))
        await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2))
      }


    generateId() {
        let max = 0;
        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max + 1;

    }

    async saveProducts() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
}

export default ProductManager;