import express from 'express';
import routesProductos from './routes/routesProductos.js';
import routesCarrito from './routes/routesCarrito.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routesProductos);
app.use('/api/carrito', routesCarrito);

app.get('*', function(req, res){
    res.status(404).json({error: 'Ruta no implementada'});
});


const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT);
})