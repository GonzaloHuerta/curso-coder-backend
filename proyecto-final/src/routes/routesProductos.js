import {Router} from 'express';
import Api from '../apiClass.js';

const api = new Api('/db/productos.json');
const router = Router();

const isAdmin = false;

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