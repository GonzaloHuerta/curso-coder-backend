import {Router} from 'express';
import Api from '../apiClass.js';

const cartApi = new Api('/db/carrito.json');
const productsApi = new Api('/db/productos.json');
const router = Router();

//a
router.post('/', async(req, res)=>{
    const obj = req.body;
    const {productos} = req.body
    const productosAAgregar = [];
    let existeProducto = true;

    productos.forEach(async id => {
        if(await productsApi.getById(id) == null){
            existeProducto = false;
            return;
        }
        productosAAgregar.push(await productsApi.getById(id));
        obj.productos = productosAAgregar;
    });
    
    setTimeout(async() => {
        if(existeProducto){
            const cart = await cartApi.create(obj);
            res.json(cart);
        }else{
            res.json({error: 'Uno o más productos que intenta agregar al carrito no existen'})
        }
    }, 1000);
    
})

//b
router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    res.json(await cartApi.deleteById(id));
})

//c
router.get('/:id/productos', async(req, res)=>{
    const {id} = req.params;
    const productsCart = await cartApi.getProductsCart(id);
    res.json(productsCart);
})

//d -- Esta ruta la modifiqué para que además de id del producto tome el id del carrito, sino no sabía a que carrito debía agregar el producto
router.post('/:id_cart/productos/:id_prod', async(req, res)=>{
    const {id_cart, id_prod} = req.params;
    const product = await productsApi.getById(id_prod);
    const addProduct = await cartApi.addProductToCart(product, id_cart);
    res.json(addProduct);
})

//e
router.delete('/:id_cart/productos/:id_prod', async(req, res)=>{
    const {id_cart, id_prod} = req.params;
    const deleteProduct = await cartApi.deleteProductToCart(id_cart, id_prod);
    res.json(deleteProduct);
})

export default router;