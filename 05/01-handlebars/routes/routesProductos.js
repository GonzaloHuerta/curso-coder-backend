const {Router} = require("express");
const Producto = require('../productos');

const productoDePrueba = new Producto();


// Ejecuto metodos para arrancar con 3 productos. En el caso de querer arrancar con 0 se pueden comentar
/* productoDePrueba.guardarProducto({title: 'Test Product', price: 500, thumbnail: 'https://cdn1.iconfinder.com/data/icons/space-flat-galaxy-radio/512/starship-128.png'});
productoDePrueba.guardarProducto({title: 'Test Product 2', price: 500, thumbnail: 'https://cdn1.iconfinder.com/data/icons/space-flat-galaxy-radio/512/planets-128.png'});
productoDePrueba.guardarProducto({title: 'Test Product 3', price: 500, thumbnail: 'https://cdn1.iconfinder.com/data/icons/space-flat-galaxy-radio/512/moon_flag-128.png'}); */

const router = Router();

router.get('/', function(req, res){
    res.render('main.hbs',{})
})

router.get('/productos', (req, res)=>{
    res.render('listaProductos', {
        productos: productoDePrueba.obtenerTodosLosProductos()
    })
})

router.post('/productos', (req, res)=>{
    const producto = req.body;
    productoDePrueba.guardarProducto(producto);
    res.render('main', {
        productoAgregado: true
    })
})

module.exports = router;