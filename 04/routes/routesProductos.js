const {Router} = require("express");
const Producto = require('../productos');

const productoDePrueba = new Producto();


// Ejecuto metodos para arrancar con 3 productos. En el caso de querer arrancar con 0 se pueden comentar
productoDePrueba.guardarProducto({title: 'Test Product', price: 500, thumbnail: 'urlDePrueba'});
productoDePrueba.guardarProducto({title: 'Test Product 2', price: 500, thumbnail: 'urlDePrueba'});
productoDePrueba.guardarProducto({title: 'Test Product 3', price: 500, thumbnail: 'urlDePrueba'});

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