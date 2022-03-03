const express = require('express');
const router = require(bRoot+'/routes/index')
const bRoot = path.resolve(__dirname);
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3030;

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
app.use(routes)

// statics
app.use(express.static('public'));

// start server
app.listen(app.get('port'),()=>{
    console.log(`Server is running on port ${app.get('port')}`)
});