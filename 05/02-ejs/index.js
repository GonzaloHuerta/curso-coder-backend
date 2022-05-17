const express = require('express');
const app = express();

const routesProductos = require('./routes/routesProductos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', './views');

app.set('view engine', 'ejs');

app.set('view options',{root: './views/main.ejs'} )

app.use('/', routesProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto', PORT);
})