import {Router} from 'express';
import {productosDao as productsApi} from '../daos/index.js';
import {carritosDao as cartApi} from '../daos/index.js';

const router = Router();

//a
router.post('/', async(req, res)=>{
    const obj = req.body;
    const {productos} = req.body
    const productosAAgregar = [];
    let existeProducto = true;
console.log(productos)
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
    const productsCart = await cartApi.getById(id);
    res.json(productsCart);
})

//d
router.post('/:id_cart/productos', async(req, res)=>{
    const {id_cart} = req.params;
    const {productos} = req.body
    let productosAAgregar = [];
    let error = false;
    const cart = await cartApi.getById(id_cart);

    if(cart==null){
        res.json({error: 'No existe carrito con el id indicado'})
        return;
    }

    productos.forEach(async id => {
        if(await productsApi.getById(id)==null){
            error = true;
            return;
        }
        productosAAgregar.push(await productsApi.getById(id))
    });

    setTimeout(async() => {
        if(!error){
            const addProducts = await cartApi.addProductsToCart(productosAAgregar, id_cart);
            res.json(addProducts);
        }else{
            res.json({error: 'Uno o más productos que intenta agregar al carrito no existen'})
        }
    }, 1000);
})

//e
router.delete('/:id_cart/productos/:id_prod', async(req, res)=>{
    const {id_cart, id_prod} = req.params;
    const deleteProduct = await cartApi.deleteProductsToCart(id_cart, id_prod);
    res.json(deleteProduct);
})

export default router;