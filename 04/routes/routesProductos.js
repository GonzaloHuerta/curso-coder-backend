const {Router} = require("express");
const Producto = require('../productos');

const productoDePrueba = new Producto();

productoDePrueba.guardarProducto({title: 'Test Product', price: 500, thumbnail: 'urlDePrueba'});
productoDePrueba.guardarProducto({title: 'Test Product 2', price: 500, thumbnail: 'urlDePrueba'});
productoDePrueba.guardarProducto({title: 'Test Product 3', price: 500, thumbnail: 'urlDePrueba'});
//console.log(productoDePrueba.obtenerTodosLosProductos())
//console.log(productoDePrueba.obtenerProductoPorId(2))
console.log(productoDePrueba.modificarProducto(1, 'Nuevo Title', 'Nuevo precio', 'Nuevo thumb'));

const router = Router();

router.get('/', (req, res)=>{
    res.json(productoDePrueba.obtenerTodosLosProductos());
})

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    res.json(productoDePrueba.obtenerProductoPorId(id));
})

router.post('/', (req, res)=>{
    const producto = req.body;
    productoDePrueba.guardarProducto(producto);
    res.json(productoDePrueba.obtenerProductoPorId(productoDePrueba.obtenerTodosLosProductos().length));
})

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    productoDePrueba.modificarProducto(id, title, price, thumbnail)
    res.json(productoDePrueba.obtenerProductoPorId(id));
})

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    res.json(productoDePrueba.borrarProductoPorId(id));
})

module.exports = router;