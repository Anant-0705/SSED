const { pool } = require("../config/db");

const serializeUser = (row) => {

    if (!row) {

        return null;

    }

    return {
        _id: row.id,
        id: row.id,
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };

};

const create = async ({ name, email, password }) => {

    const { rows } = await pool.query(
        `INSERT INTO users (name, email, password)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [
            String(name).trim(),
            String(email).trim().toLowerCase(),
            password
        ]
    );

    return serializeUser(rows[0]);

};

const findOne = async ({ email }) => {

    const { rows } = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [String(email).trim().toLowerCase()]
    );

    return rows[0] || null;

};

const findById = async (id) => {

    const { rows } = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );

    return rows[0] || null;

};

module.exports = {
    serializeUser,
    create,
    findOne,
    findById
};
