const db = require("../database/db");

const getSalesByMonth = async (request, reply) => {
  const { month } = request.query;

  if (!month) {
    return reply.status(400).send({
      error: "Month query parameter is required (format: YYYY-MM)"
    });
  }

  const query = `
    SELECT
      customers.name AS customer,
      products.name AS product,
      sales.quantity,
      sales.sale_date
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    JOIN products ON sales.product_id = products.id
    WHERE strftime('%Y-%m', sales.sale_date) = ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [month], (err, rows) => {
      if (err) {
        reply.status(500);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getAllCustomers = async (request, reply) => {

  const query = `
    SELECT id, name, email
    FROM customers
  `;

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reply.status(500);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

};

module.exports = {
  getSalesByMonth,
  getAllCustomers
};
