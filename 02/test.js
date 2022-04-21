import Contenedor from './contenedor.js';

const prueba = new Contenedor('productos.txt');

//Agrego 4 productos
await prueba.save({title: 'Pc', price: 600, thumbnail: 'imagenDePc'});
await prueba.save({title: 'iPhone', price: 1200, thumbnail: 'imagenDeiphone'});
await prueba.save({title: 'Macbook', price: 2000, thumbnail: 'imagenDeMacbook'});
await prueba.save({title: 'Apple Watch', price: 1500, thumbnail: 'imagenDeApplewatch'});

//Obtengo producto con id 2
await prueba.getById(2);

//Obtengo todos los productos
await prueba.getAll();

//Borro producto con id 1
//prueba.deleteById(1);

//Borro todo el archivo
//prueba.deleteAll();

//Los dos métodos de borrar están comentados para evitar errores. Descomentar para probar funcionamiento