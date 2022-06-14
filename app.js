const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const methodOverride = require("method-override");
const session = require("express-session");

const routesMain = require(path.join(__dirname + "/src/routes/main"));
const routesUser = require(path.join(__dirname + "/src/routes/user"));
const routesProducts = require(path.join(__dirname + "/src/routes/products"));

//	Settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Estas 2 lineas son para settear los forms y que se vuelvan objetos literales
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 	Middlewares
app.use((req, res, next) => {
  console.log(`En ${req.url} se utilizó ${req.method}`);
  next();
});
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// 	Routes
app.use("/", routesMain);
app.use("/user", routesUser);
app.use("/store", routesProducts);
app.use((req, res, next) => {
  res.status(404).send("Error 404, page not found");
});



// 	Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
