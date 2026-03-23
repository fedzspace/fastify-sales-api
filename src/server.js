const fastify = require("fastify")({ logger: true });
const db = require("./database/db");
const salesRoutes = require("./routes/salesRoutes");

/* ---------- DATABASE TABLE CREATION ---------- */

db.serialize(() => {

  // Create customers table
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT
    )
  `);

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL
    )
  `);

  // Create sales table
  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      sale_date TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);

  // Insert sample customers
  db.run(`
    INSERT INTO customers (name, email)
    VALUES 
      ('John Doe', 'john@example.com'),
      ('Jane Smith', 'jane@example.com')
  `);

  // Insert sample products
  db.run(`
    INSERT INTO products (name, price)
    VALUES 
      ('Laptop', 1200),
      ('Phone', 800)
  `);

  // Insert sample sales
  db.run(`
    INSERT INTO sales (customer_id, product_id, quantity, sale_date)
    VALUES 
      (1, 1, 1, '2026-03-10'),
      (2, 2, 2, '2026-03-15')
  `);

});

/* ---------- ROUTES ---------- */

fastify.get("/", async (request, reply) => {
  return { message: "Sales API is running" };
}); //healthcheck or root endpoint

fastify.register(salesRoutes);

/* ---------- SERVER START ---------- */

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();