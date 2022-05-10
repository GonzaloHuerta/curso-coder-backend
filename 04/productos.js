class Producto{
    constructor(){}
     
    productos = [];

    guardarProducto(nuevoProducto){
        //console.log("Esto llega: ", nuevoProducto)
        let id = 0;
        if(this.productos.length === 0){
            id = 1;
        }
        else{
            id = this.productos[this.productos.length-1].id + 1;
        }

        let objetoNuevoProducto = {
            'id': id,
            'title': nuevoProducto.title,
            'price': nuevoProducto.price,
            'thumbnail': nuevoProducto.thumbnail
        }
        
        this.productos.push(objetoNuevoProducto);
    }

    obtenerProductoPorId(id){
        let retorno;
        let idNum = Number(id);
        const buscarProductoPorId = this.productos.find(producto => producto.id === idNum);

        if (buscarProductoPorId === undefined){
            retorno = {error: "Error, producto no encontrado"};
        }else{
            retorno = buscarProductoPorId;
        }

        return retorno;
    }

    obtenerTodosLosProductos(){
        if(this.productos.length === 0){
            return {error:'No hay productos'}
        } else{
            return this.productos;
        } 
    }

    modificarProducto(id, nuevoTitle, nuevoPrice, nuevoThumbnail){
        let idNum = Number(id);
        this.productos.forEach((producto)=>{
            if(producto.id === idNum){
                producto.title = nuevoTitle;
                producto.price = nuevoPrice;
                producto.thumbnail = nuevoThumbnail;
            }
        })
    }

    borrarProductoPorId(id){
        let idNum = Number(id);
        if(this.productos.filter(producto=>producto.id === idNum).length > 0){
            let nuevoArrayProductos = this.productos.filter(producto=>producto.id !== idNum);
            this.productos = nuevoArrayProductos;
            return {mensaje: `Producto con id ${idNum} eliminado correctamente`}
        }else{
            return {error: 'No existe producto para eliminar con ese id'} 
        }
    }
}

module.exports = Producto;