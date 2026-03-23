const salesController = require("../controllers/salesController");

async function salesRoutes(fastify, options) {

  fastify.get("/sales", {
    schema: {
      querystring: {
        type: "object",
        required: ["month"],
        properties: {
          month: { type: "string", pattern: "^\\d{4}-\\d{2}$" }
        }
      }
    }
  }, salesController.getSalesByMonth);

  fastify.get("/customers", salesController.getAllCustomers);

}

module.exports = salesRoutes;
