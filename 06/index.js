const express = require('express');
const app = express();

const {Server : ioServer} = require('socket.io');

const http = require('http');
const httpServer = http.createServer(app);
const Producto = require('./productos');

const io = new ioServer(httpServer);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productoDePrueba = new Producto();
const productos = [];
const mensajes = productoDePrueba.obtenerArrayMensajes();


app.get('/productos', (req, res)=>{
    res.json(productoDePrueba.obtenerTodosLosProductos());
})

app.post('/productos', (req, res)=>{
    const producto = req.body;
    productoDePrueba.guardarProducto(producto);
    res.redirect('/')
})

io.on('connection', (socket)=>{
    console.log("Cliente conectado", socket.id);
    socket.emit('productos', productos);
    socket.emit('mensajes', mensajes);

    socket.on('nuevo-producto', (producto)=>{
        productos.push(producto);
        io.sockets.emit('productos', productos);
    })

    socket.on('nuevo-mensaje', (mensaje)=>{
        mensajes.push(mensaje);
        productoDePrueba.guardarMensajesEnArchivo(mensaje);
        io.sockets.emit('mensajes', mensajes);
    })
})

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log("Corriendo en el puerto ", PORT)
})


