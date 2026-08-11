const app = require('./app');

const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
app.listen(PORT, () => {
    console.info(`Server is listening on ${PORT}`);
});