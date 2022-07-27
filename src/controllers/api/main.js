// Requiring Libraries
const db = require("../../database/models");

// Placing abbreviations of Models
const Product = db.Product;
const Tier = db.Tier;
const User = db.User;
const Universe = db.Universe;

const controller = {
  dashboard: async (req, res) => {
    try {
      // Querying not deleted items
      let products = await Product.findAll({
        where: {
          deleted: 0,
        },
      });
      let tiers = await Tier.findAll();
      let universes = await Universe.findAll();
      let users = await User.findAll({
        where: {
          deleted: 0,
        },
      });

      // Querying deleted items
      let deletedProducts = await Product.findAll({
        where: {
          deleted: 1,
        },
      });
      let deletedUsers = await User.findAll({
        where: {
          deleted: 1,
        },
      });

      res.status(200).json({
        status: 200,
        totals: {
          products: products.length,
          tiers: tiers.length,
          universes: universes.length,
          users: users.length,
        },
        data: {
          products: products,
          tiers: tiers,
          universes: universes,
          users: users,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error,
      });
    }
  },
};

module.exports = controller;
