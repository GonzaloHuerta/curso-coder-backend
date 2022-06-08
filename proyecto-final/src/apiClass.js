import fs from 'fs';

class Api{
    constructor(rutaDB){
        this.rutaDB = rutaDB;
    }

    async getAll(){
        let contenidoParse;
        try {
            let contenido = await fs.promises.readFile(__dirname + this.rutaDB, 'utf-8')
            contenidoParse = JSON.parse(contenido);
        } catch (error) {
            console.log(error)
        }
        return contenidoParse;
    }

    async getById(id){
        let retorno;
        try {
            let todos = await this.getAll();

            const buscarObjetoPorId = todos.find(producto => producto.id == id);
            
            buscarObjetoPorId ? retorno = buscarObjetoPorId : retorno = null;
        
        } catch (error) {
            console.log(error)
        }

        return retorno;
    }

    async create(obj){
        try {
            let todos = await this.getAll();
            let id;
            let timestamp = Date.now();
            
            if(todos.length===0){
                id=1;
            }
            else{
                id = todos[todos.length-1].id +1;
            }

            todos.push({...obj, timestamp, id});

            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(todos));

            return id;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.filter(producto=>producto.id != id);
            console.log(nuevoContenido);
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido))
            
        } catch (error) {
            console.log(error)
        }
    }

    async editById(id, timestamp, nombre, descripcion, codigo, foto, precio, stock){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((product, index)=>{
                if(product.id == id){
                    product.timestamp = timestamp ? timestamp : product.timestamp,
                    product.nombre = nombre ? nombre : product.nombre,
                    product.descripcion = descripcion ? descripcion : product.descripcion,
                    product.codigo = codigo ? codigo : product.codigo,
                    product.foto = foto ? foto : product.foto,
                    product.precio = precio ? precio : product.precio,
                    product.stock = stock ? stock : product.stock
                }
                return product;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsCart(id){
        try {
            let cart = await this.getById(id);
            let retorno;
            cart ? retorno = cart.productos : retorno = null;
            return retorno;
        } catch (error) {
            console.log(error)
        }
    }
    
    async addProductsToCart(products, cartId){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((item, index)=>{
                if(item.id == cartId){
                    products.forEach(product => {
                        item.productos.push(product)
                    });
                }
                return item;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cartId, productId){
        try {
            let todos = await this.getAll();
            let nuevoContenido = todos.map((item, index)=>{
                if(item.id == cartId){
                    let nuevosProductos = item.productos.filter(producto=>producto.id != productId)
                    item.productos = nuevosProductos; 
                }
                return item;
            })
            await fs.promises.writeFile(__dirname + this.rutaDB, JSON.stringify(nuevoContenido));
        } catch (error) {
            console.log(error)
        }
    }
}


export default Api;