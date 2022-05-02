import {Router} from 'express';
const router = Router();

import Contenedor from './contenedor.js';
const container = new Contenedor('productos.txt');

router.get('/', (req, res)=>{
    res.send(`<h1>Inicio</h1>
    <h2><a href="/productos">Ver todos los productos</a></h2>
    <h2><a href="/productoRandom">Ver un producto aleatorio</a></h2>`)
})

router.get('/productos', async(req, res)=>{
    const productos = await container.getAll();
    res.json(productos)
})

router.get('/productoRandom', async(req, res)=>{
    const productos = await container.getAll();
    let lengthProductos = productos.length-1;
    let aleatorio = Math.floor(Math.random()*lengthProductos);
    res.json(productos[aleatorio])
})

export default router;