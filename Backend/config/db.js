const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const SCHEMA = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT NOT NULL DEFAULT 'medium'
            CHECK (priority IN ('low', 'medium', 'high')),
        status TEXT NOT NULL DEFAULT 'pending'
            CHECK (status IN ('pending', 'in-progress', 'completed')),
        due_date DATE,
        user_id UUID NOT NULL
            REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_tasks_user_id
        ON tasks(user_id);
`;

const connectDB = async () => {

    try {

        const client = await pool.connect();

        try {

            await client.query(SCHEMA);

        } finally {

            client.release();

        }

        console.log(
            `PostgreSQL connected: ${pool.options.host || "database"}`
        );

    } catch (error) {

        console.error(
            "PostgreSQL connection failed:",
            error.message
        );

        throw error;
    }

};

module.exports = {
    pool,
    connectDB
};
