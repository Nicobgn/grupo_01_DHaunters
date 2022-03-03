const express=require('express')
const router=express.Router()

app.get("/404", (req, res) => {
  res.send("Error, página no encontrada.");
});
app.get('/carrito', (req, res) => {
  res.sendFile(bRoot + '/views/cart.html');
}); //Cart
app.get('/',(req,res)=>{
    res.sendFile(bRoot+'/views/index.html')
}); //Home
app.get("/log-in", (req, res) => {
  res.sendFile(bRoot + '/views/log-in');
}); //Log in
app.get('/mercado',(req,res)=>{
    res.sendFile(bRoot+'/views/marketplace.html')
}); //Market
app.get('/coleccion',(req,res)=>{
    res.sendFile(bRoot+'/views/myCollection.html')
}); //Collection
app.get('/sign-in', (req, res) => {
  res.sendFile(bRoot + '/views/sign-in');
}); //Register


module.exports=router;