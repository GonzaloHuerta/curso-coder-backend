import express from 'express';
const app = express();
import Contenedor from './contenedor.js';

const prueba = new Contenedor('productos.txt');

const PORT = 8080;
app.listen(8080);
console.log("Servidor http escuchando en el puerto", PORT);

let productos = await prueba.getAll();

let lengthProductos = productos.length-1;

app.get('/', (req, res)=>{
    res.send(`<h1>Inicio</h1><h2><a href="/productos">Ver todos los productos</a><br/><br/><a href="productoRandom">Ver un producto aleatorio</a></h2>`)
})

app.get('/productos', (req, res)=>{
    res.send(`<h1 style='color: #2b2b2b;'>Todos los productos</h1> <h3>${JSON.stringify(productos)}</h3>`)
})

app.get('/productoRandom', (req, res)=>{
    let aleatorio = Math.floor(Math.random()*lengthProductos);
    res.send(`<h1 style='color: #2b2b2b;'>Un producto random</h1> <h3>${JSON.stringify(productos[aleatorio])}</h3>`)
})