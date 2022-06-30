const productSerachService = require("../services/productSearch-service");

const responseHandler = require("./response-handler");

const productSearchController = {
  /**
   * Inits controller.
   *
   * @since 1.0.0
   * @return {object} productSearchController
   */
  init: function() {
    this.responseHandler = Object.create(responseHandler).init();
    return this;
  },





  /**
  * Returns the products
  *
  * @since 1.0.0
  * @param {object} ctx context object
  * @param {object} next koa next callback
  * @return {object} productSearchController
  */
  getProducts: async function(ctx, next) {
    const nProducts = 20;
    var cursor = ctx && ctx.request.query.cursor ? ctx.request.query.cursor : ''
    var title =  ctx.request.query.title;
    products;

    try {

      products = await productSerachService
        .getProducts(nProducts, cursor, title);

    } catch (error) {
      this.responseHandler.onError(ctx)(error);
    }


    if (products) {
      this.responseHandler.objectFound(ctx, { data: { products: products } });
    } else {
      this.responseHandler.onError(ctx)({ message: this.responseHandler.graphQlErrorMessage });
    }
    return this;
  },

};

module.exports = productSearchController;
