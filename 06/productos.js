const fs = require('fs');
class Producto{
    constructor(){}
     
    productos = [];
    mensajes = [];

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
            //return {error:'No hay productos'}
            return this.productos
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

    async  guardarMensajesEnArchivo(obj){
        let id = 1;
        try{
            if(!fs.existsSync(`./mensajes.txt`)){
                let objetoArchivoVacio = {
                    'id': id,
                    'email': obj.email,
                    'fecha': obj.fecha,
                    'mensaje': obj.mensaje
                }
                await fs.promises.writeFile(`./mensajes.txt`, `[${JSON.stringify(objetoArchivoVacio)}]`)
            }
            else{
                let contenido = await fs.promises.readFile(`./mensajes.txt`, 'utf-8')
                let contenidoParse = JSON.parse(contenido);
                
                if(contenidoParse.length === 0){
                    id = 1;
                }else{
                    id = contenidoParse[contenidoParse.length-1].id + 1
                }
    
                let objeto = {
                    'id': id,
                    'email': obj.email,
                    'fecha': obj.fecha,
                    'mensaje': obj.mensaje
                }
    
                contenidoParse.push(objeto);
                await fs.promises.writeFile(`./mensajes.txt`, `${JSON.stringify(contenidoParse)}`)
            }
        }catch(err){
            console.log(err);
        }
        return (`El id asignado es: ${id}`);
    }

    async obtenerMensajesDeArchivo(){
        let contenidoParse;
        try {
            let contenido = await fs.promises.readFile(`./mensajes.txt`, 'utf-8')
            contenidoParse = JSON.parse(contenido);
            this.mensajes.push(contenidoParse);
        } catch (error) {
            console.log(error)
        }
        
        return contenidoParse;
    }

    obtenerArrayMensajes(){
        return this.mensajes;
    }
}

module.exports = Producto;