// Requiring Dependencies
const db = require("../database/models");
const { validationResult } = require("express-validator");
const fs = require("fs");

// Placing Abbreviations of Models
const Product = db.Product;
const Tier = db.Tier;
const Universe = db.Universe;

// Requiring Middlewares & Declaring Variables
const formattedDateDb = require("../middlewares/other/formattedDateDb");
const consoleLogError = require("../middlewares/other/consoleLogError");

// Defining Controller
const controller = {
  store: async (req, res) => {
    let scripts = ["util/cart"];
    try {
      let products = await Product.findAll({
        where: {
          deleted: 0,
        },
      });
      res.render("store/store.ejs", {
        css: "stylesHome",
        title: "Store",
        products,
        scripts,
      });
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  productCreate: async (req, res) => {
    let tiers = await Tier.findAll({
      order: [["tier_id", "ASC"]],
    });
    let universes = await Universe.findAll({
      order: [["universe", "ASC"]],
    });
    res.render("store/productCreate.ejs", {
      title: "Crea un nuevo producto",
      css: "stylesCreateProduct",
      tiers,
      universes,
    });
  },
  productCreated: async (req, res) => {
    let validationResults = validationResult(req);
    let tiers = await Tier.findAll({
      order: [["tier_id", "ASC"]],
    });
    let universes = await Universe.findAll({
      order: [["universe", "ASC"]],
    });
    try {
      if (validationResults.errors.length > 0) {
        return res.render("store/productCreate.ejs", {
          errors: validationResults.mapped(),
          title: "Crea un nuevo producto",
          css: "stylesCreateProduct",
          tiers,
          universes,
          user: req.session.user,
          oldData: req.body,
        });
      } else {
        // Requiring form fields
        let { name, price, shortDesc, longDesc, tier, universe } = req.body;

        // Setting fields that doesn't came directly form the form
        let image;
        req.file ? (image = req.file.filename) : (image = "default.png");

        let created_at = formattedDateDb;
        let updated_at = formattedDateDb;
        let deleted = 0;

        // Creating Product
        let newProduct = await Product.create({
          universe_id: universe,
          tier_id: tier,
          name: name,
          short_desc: shortDesc,
          long_desc: longDesc,
          price: price,
          image: image,
          created_at: created_at,
          updated_at: updated_at,
          deleted: deleted,
        });

        console.log(newProduct);

        // Sending Response
        res.redirect("/store");
      }
    } catch (error) {
      consoleLogError(error);
      res.render("store/productCreate.ejs", {
        errors: validationResults.mapped(),
        title: "Crea un nuevo producto",
        css: "stylesCreateProduct",
        tiers,
        universes,
        user: req.session.user,
        oldData: req.body,
      });
    }
  },
  productDetail: async (req, res) => {
    try {
      let name = req.params.name.split("%20").join("");
      console.log(name);
      let product = await Product.findOne({
        where: {
          name: name,
        },
      });
      console.log(`El producto es ${product}`);
      res.render("store/productDetail", {
        css: "stylesProDelta",
        title: `${product.name}`,
        product,
      });
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  productDelete: async (req, res) => {
    let { id } = req.params;
    let product = await Product.findOne({
      where: { product_id: id },
    });
    try {
      await Product.update(
        {
          updated_at: formattedDateDb,
          deleted: 1,
        },
        {
          where: { product_id: id },
        }
      );
      res.redirect("/store");
    } catch (error) {
      console.log(error);
      res.redirect(`/store/${product.name}`);
    }
  },
  productEdit: async (req, res) => {
    let scripts = ["validations/createProductValidation"];
    try {
      let name = req.params.name.split("%20").join("");
      let tiers = await Tier.findAll({
        order: [["tier_id", "ASC"]],
      });
      let universes = await Universe.findAll({
        order: [["universe", "ASC"]],
      });
      let product = await Product.findOne({ where: { name: name } });
      console.log(`El producto es ${product}`);
      res.render("store/productEdit", {
        title: `Edita ${product.name}`,
        css: "stylesCreateProduct",
        tiers,
        universes,
        product,
        scripts,
      });
    } catch (error) {
      consoleLogError(error);
      res.render("store/productEdit", {
        title: `Edita ${req.params.name}`,
        css: "stylesCreateProduct",
      });
    }
  },
  productEdited: async (req, res) => {
    let validations = validationResult(req);
    let scripts = ["validations/createProductValidation"];

    let paramsId = req.params.id;

    let product = await Product.findOne({ where: { product_id: paramsId } });
    let tiers = await Tier.findAll({
      order: [["tier_id", "ASC"]],
    });
    let universes = await Universe.findAll({
      order: [["universe", "ASC"]],
    });
    let oldData = req.body;

    console.log(oldData);
    try {
      // Verify if has errors
      if (validations.length > 0) {
        res.render("store/productEdit", {
          title: `${product.name} - !`,
          css: "stylesCreateProduct",
          tiers,
          universes,
          product,
          oldData,
          errors: validations.mapped(),
          scripts,
        });
      } else {
        // Fields to update
        let name =
          req.body.name != undefined &&
          req.body.name != "" &&
          req.body.name != " "
            ? req.body.name
            : product.name;
        let price =
          req.body.price != undefined &&
          req.body.price != "" &&
          req.body.price != " "
            ? req.body.price
            : product.price;
        let shortDesc =
          req.body.shortDesc != undefined &&
          req.body.shortDesc != "" &&
          req.body.shortDesc != " "
            ? req.body.shortDesc
            : product.short_desc;
        let longDesc =
          req.body.longDesc != undefined &&
          req.body.longDesc != "" &&
          req.body.longDesc != " "
            ? req.body.longDesc
            : product.long_desc;
        let universe =
          req.body.universe != undefined &&
          req.body.universe != "" &&
          req.body.universe != " "
            ? req.body.universe
            : product.universe_id;
        let tier =
          req.body.tier != undefined &&
          req.body.tier != "" &&
          req.body.tier != " "
            ? req.body.tier
            : product.tier_id;
        let image;
        req.file ? (image = req.file.filename) : product.image;

        // Updating the product
        let updatedProduct = await Product.update(
          {
            name: name,
            price: price,
            short_desc: shortDesc,
            long_desc: longDesc,
            universe_id: universe,
            tier_id: tier,
            image: image,
            updated_at: formattedDateDb,
          },
          { where: { product_id: paramsId } }
        );
        console.log(updatedProduct);
        res.redirect(`/store/${name}`);
      }
    } catch (error) {
      consoleLogError(error);
      // res.render("store/productEdit", {
      //   title: `${name} - !`,
      //   css: "stylesCreateProduct",
      //   tiers,
      //   universes,
      //   product,
      //   oldData,
      //   errors: validations.mapped(),
      // });
      res.json({
        errors: {
          "express-validator": validations.mapped(),
          other: error,
        },
      });
    }
  },
  productSearch: async (req, res) => {
    try {
      let productName = req.query.search || undefined;

      let products = await Product.query();

      res.render("store/store", {
        title: `Resultados para ${search}`,
        products: products,
      });
    } catch (error) {
      res.render("products/store", {
        title: `Resultados - !`,
        error: error,
      });
    }
  },
  universeList: async (req, res) => {
    let validationResults = validationResult(req);
    let status = res.statusCode;
    try {
      if (validationResults.errors.length > 0) {
        return res.render("store/store.ejs", {
          errors: validationResults.mapped(),
          css: "",
          title: "",
        });
      } else {
        let universe = await Universe.findAll({
          order: [["universe_id", "ASC"]],
        });
        res.status(200).json({
          status: status,
          universe: universe,
        });
      }
    } catch (error) {
      consoleLogError(error);
      res.status(400).json({
        status: 400,
        error: error,
      });
    }
  },
  universeCreate: async (req, res) => {
    res.render("products/universeCreate", {
      title: "Crea un universo",
      css: "stylesCreateProduct",
    });
  },
  universeCreated: async (req, res) => {
    let validationResults = validationResult(req);
    try {
      if (validationResults.errors.length > 0) {
        return res.render("products/universeCreate", {
          errors: validationResults.mapped(),
          css: "stylesCreateProduct",
          title: "Error en la creación",
        });
      } else {
        let { universe } = req.body;
        await Universe.create({
          universe: universe,
        });
        res.redirect("/store/universe");
      }
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  universeOne: async (req, res) => {
    try {
      let { universe } = req.params;
      let getId = await Universe.findOne({
        where: {
          universe: universe,
        },
      });
      if (getId != undefined) {
        let products = await Product.findAll({
          where: { universe_id: getId.universe_id },
        });
        if (!products) {
          res.render("products/store.ejs", {
            css: "stylesHome",
            title: `Universo ${universe}`,
            errors: {
              notFound: { msg: "No se encontraron productos" },
            },
          });
        } else {
          res.render("products/store.ejs", {
            css: "stylesHome",
            title: `Universo ${universe}`,
            products,
          });
        }
      } else {
        res.render("products/store.ejs", {
          css: "stylesHome",
          title: `Universo ${universe}`,
        });
      }
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
};

module.exports = controller;
