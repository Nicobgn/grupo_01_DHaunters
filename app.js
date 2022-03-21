const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bRoot = path.resolve(__dirname);
// const router = require(bRoot+'/routes/index')

// Cuando haya que agregar una ruta, acá tienen el comando:
// app.get("/", (req, res) => {
//   res.sendFile(bRoot + "/views/");
// });

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'/views'))

// middlewares
app.use((req,res,next)=>{
    console.log(`En ${req.url} se utilizó ${req.method}`);
    next()
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes
// app.use('/', router)
app.get("/404", (req, res) => {
  res.send("Error, página no encontrada.");
});
app.get('/',(req,res)=>{
    res.sendFile(bRoot+'/views/index.html')
}); //Home
app.get('/carrito', (req, res) => {
  res.sendFile(bRoot + '/views/cart.html');
}); //Cart
app.get("/iniciarSesion", (req, res) => {
  res.sendFile(bRoot + '/views/log-in.html');
}); //Log in
app.get('/mercado',(req,res)=>{
    res.sendFile(bRoot+'/views/marketplace.html')
}); //Market
app.get('/coleccion',(req,res)=>{
    res.sendFile(bRoot+'/views/myCollection.html')
}); //Collection
app.get('/registro', (req, res) => {
  res.sendFile(bRoot + '/views/sign-in');
}); //Register
app.get('/productDetail', (req, res) => {
  res.sendFile(bRoot + '/views/productDetail.html')
}); //ProductDetail
app.get('/favoritos', (req, res) => {
  res.sendFile(bRoot + '/views/myFavourites.html')
}); //Favourites


// statics
app.use(express.static('public'));

// start server
app.listen(app.get('port'),()=>{
    console.log(`Server is running on port ${app.get('port')}`)
});