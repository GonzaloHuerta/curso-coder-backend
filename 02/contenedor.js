//const fs = require('fs');

import fs from 'fs';

class Contenedor{
    constructor(nombreArchivo){
        this.archivo = nombreArchivo;
    }

    async save(obj){
        let id = 1;
        try{
            if(!fs.existsSync(`./${this.archivo}`)){
                //id = obj.id;
                let objetoArchivoVacio = {
                    'id': id,
                    'title': obj.title,
                    'price': obj.price,
                    'thumbnail': obj.thumbnail
                }
                await fs.promises.writeFile(`./${this.archivo}`, `[${JSON.stringify(objetoArchivoVacio)}]`)
            }
            else{
                let contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
                let contenidoParse = JSON.parse(contenido);
                
                if(contenidoParse.length === 0){
                    id = 1;
                }else{
                    id = contenidoParse[contenidoParse.length-1].id + 1
                }

                let objeto = {
                    'id': id,
                    'title': obj.title,
                    'price': obj.price,
                    'thumbnail': obj.thumbnail
                }

                contenidoParse.push(objeto);
                await fs.promises.writeFile(`./${this.archivo}`, `${JSON.stringify(contenidoParse)}`)
            }
        }catch(err){
            console.log(err);
        }
        return console.log(`El id asignado es: ${id}`);

    }

    async getById(id){
        let retorno;
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            let contenidoParse = JSON.parse(contenido);

            const buscarObjetoPorId = await contenidoParse.find(producto => producto.id === id);

            if (buscarObjetoPorId === undefined){
                retorno = 'NULL'
            }else{
                retorno = buscarObjetoPorId;
            }
        } catch (error) {
            console.log(error)
        }

        return console.log(retorno);
    }

    async getAll(){
        let contenidoParse;
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            contenidoParse = JSON.parse(contenido);
        } catch (error) {
            console.log(error)
        }
        return console.log(contenidoParse);
    }

    async deleteById(id){
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            let contenidoParse = JSON.parse(contenido);
            let nuevoContenido = contenidoParse.filter(producto=>producto.id !== id);

            await fs.promises.writeFile(`./${this.archivo}`, `${JSON.stringify(nuevoContenido)}`)
            
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            let vaciarArchivo = [];
            await fs.promises.writeFile(`./${this.archivo}`, `${JSON.stringify(vaciarArchivo)}`)
            console.log(`El archivo se ha vaciado correctamente`);
        } catch (error) {
            console.log(error)
        }
    }

}

export default Contenedor;
