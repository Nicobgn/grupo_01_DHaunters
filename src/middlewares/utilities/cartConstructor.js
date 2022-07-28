module.exports = (oldCart, newItem) => {
  let newCart = {};
  oldCart.items.push({
    newItem,
  });
  oldCart.totalQuantity++;
};
