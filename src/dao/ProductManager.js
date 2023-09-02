import { productModel } from "./models/product.model.js";

class ProductManager {
    async addProduct(product) {
        try {
            if (await this.validateCode(product.code)) {
                console.log("Error! Code exists!");
    
                return false;
            } else {
                await productModel.create(product)
                console.log("Product added!");
    
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async updateProduct(id, product) {
        try {
            if (this.validateId(id)) {   
                if (await this.getProductById(id)) {
                    await productModel.updateOne({_id:id}, product);
                    console.log("Product updated!");
        
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.log("Not found!");
    
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.validateId(id)) {    
                if (await this.getProductById(id)) {
                    await productModel.deleteOne({_id:id});
                    console.log("Product deleted!");
    
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.log("Not found!");
    
            return false;
        }
    }

    async getProducts(params = {}) {
        try {
            let { limit = 10, page = 1, query = {}, sort = 0 } = params;
    
            
            if (sort !== 1 && sort !== -1) {
                sort = 0; 
            }
    
            const products = await productModel.paginate(query, {
                limit: limit,
                page: page,
                sort: { price: sort }
            });
    
           
            if (!products) {
                throw new Error("No se pudieron obtener productos");
            }
    
            
            const prevLink = products.hasPrevPage
                ? this.generatePaginationLink(limit, products.prevPage)
                : null;
            const nextLink = products.hasNextPage
                ? this.generatePaginationLink(limit, products.nextPage)
                : null;
    
            const result = {
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink
            };
    
            return result;
        } catch (error) {
           
            throw error;
        }
    }
    
    generatePaginationLink(limit, page) {
        return `http://localhost:8080/products?limit=${limit}&page=${page}`;
    }

    async getProductById(id) {
        if (this.validateId(id)) {
            return await productModel.findOne({_id:id}).lean() || null;
        } else {
            console.log("Not found!");
            
            return null;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }

    async validateCode(code) {
        return await productModel.findOne({code:code}) || false;
    }
}

export default ProductManager;