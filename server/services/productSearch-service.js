var product = require("../models/product-service");

var productSerachService = {

  
  
    /**
     * Returns products.
     *
     * @since 1.0.0
     * @param {int} nProducts number of products.
     * @param {string} cursor current cursor.
     * @param {string}  title product title for searching.
     * @return {Array}
     */
    getProducts: async function (nProducts,  cursor) {
      const products = await product.getProducts(nProducts, cursor);
      return products;
    },
  
  };
  
  
  
  module.exports = productSerachService;
  