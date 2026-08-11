import pool from "./db.js";
export const createUser = async (req, res, next) => {
  try {
    const { name, email, age, address } = req.body;
    if (!name || !email) {
      throw new CustomError(
        "Name and email must be provided",
        status.BAD_REQUEST
      );
    }
    const checkEmailExists = `SELECT * FROM "users" WHERE email=$1`;
    const checkEmail = await pool.query(checkEmailExists, [email]);
    const createQuery = `INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(createQuery, [name, email, age, address]);
    res
      .status(201)
      .json({ message: "User created Successfully", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};