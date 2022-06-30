import { gql } from "@apollo/client";
var graphQueries = require("./graph-queries");
var nestedProperty = require("nested-property");

var searchProduct = {

 

   /**
     * Fetches the details of n products.
     *
     * @since 1.0.0
     * @param {int} nProducts number of the products to fetch.
     * @param {string} cursor current cursor.
     * @return {array}
     */
    getProducts: async function(nProducts = 20, cursor, title) {
      const query = gql`
          query {
            products(
              first: ${nProducts},
              query: "title:${title}",
              reverse: true,
              ${cursor && cursor.length ? `after:"${cursor},"` : ''}
            ) {
              edges{
                cursor
                node{
                  id
                  handle
                  title
                  status
                  images(first: 1){
                    edges{
                      node{
                        originalSrc
                        altText
                      }
                    }
                  }
                  
                }
              }
              pageInfo {
                hasPreviousPage
                hasNextPage
              }
            }
          }
        `;

      const result = await graphQueries.get(query);

      var products;
      if (nestedProperty.has(result, 'data.products.edges')) {
        products = result.data.products.edges.map(edge=>{
          var node = edge.node;
          return node;
        });

        if(products[0]){
          products[0].cursor = result.data.products.edges.slice(-1)[0].cursor;
          products[0].pageInfo = result.data.products.pageInfo;
        }

      }
      return products;
    },

};

module.exports = searchProduct;
