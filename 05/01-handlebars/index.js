const express = require('express');
const app = express();

const routesProductos = require('./routes/routesProductos');

const handlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials'
}));

app.use('/', routesProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto', PORT);
})