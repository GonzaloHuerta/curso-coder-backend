import {Router} from 'express';
//import ProductosDaoArchivo from '../daos/productos/ProductosDaoArchivo.js';
import {productosDao as api} from '../daos/index.js';

//const api = new ProductosDaoArchivo();
const router = Router();

const isAdmin = true;

//middleware
function checkIfIsAdmin(req, res, next){
    if(!isAdmin){
        res.json({error: "Acceso denegado. No tiene permisos para acceder a esta ruta"});
    }else{
        next();
    }
}

router.get('/', async(req, res)=>{
    const productos = await api.getAll();
    res.json(productos);
})

//a
router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    const product = await api.getById(id);
    res.json(product);
})

//b
router.post('/', checkIfIsAdmin, async(req, res)=>{
    const obj = req.body;
    
    if(obj.nombre==undefined || obj.descripcion==undefined || obj.codigo==undefined || 
        obj.foto==undefined || obj.precio==undefined || obj.stock ==undefined)
    {
        res.json({error: "No se puede agregar un objeto vacío"})
        return;
    }
    
    for(let key in obj){
        if(obj[key] == ''){
            res.json({error: "Debe completar todos los campos para la creacion del producto"})
            return;
        }
    }
    const product = await api.create(obj);
    res.json(product);
})

//c
router.put('/:id', checkIfIsAdmin, async(req, res)=>{
    const {id} = req.params;
    const {timestamp, nombre, descripcion, codigo, foto, precio, stock} = req.body;
    res.json(await api.editById(id, timestamp, nombre, descripcion, codigo, foto, precio, stock));
})

//d
router.delete('/:id', checkIfIsAdmin, async(req, res)=>{
    const {id} = req.params;
    res.json(await api.deleteById(id));
})

export default router;