import express from 'express';
import router from './routes.js';

const app = express();
const routes = router;

app.use(routes);

const PORT = 8080;
app.listen(8080);
console.log("Servidor http escuchando en el puerto", PORT);

