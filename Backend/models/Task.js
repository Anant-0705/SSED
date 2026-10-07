const { pool } = require("../config/db");

const TASK_COLUMNS = `
    id AS _id,
    title,
    description,
    priority,
    status,
    to_char(due_date, 'YYYY-MM-DD') AS "dueDate",
    user_id AS "userId",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
`;

const normalizeRow = (row) => {

    if (!row) {

        return null;

    }

    return {
        ...row,
        _id: String(row._id),
        userId: String(row.userId)
    };

};

const find = async (filter = {}) => {

    const { userId } = filter;

    const { rows } = await pool.query(
        `SELECT ${TASK_COLUMNS}
         FROM tasks
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows.map(normalizeRow);

};

const findOne = async (filter = {}) => {

    const { _id, userId } = filter;

    const { rows } = await pool.query(
        `SELECT ${TASK_COLUMNS}
         FROM tasks
         WHERE id = $1 AND user_id = $2`,
        [_id, userId]
    );

    return normalizeRow(rows[0]);

};

const create = async (data) => {

    const {
        title,
        description,
        priority,
        status,
        dueDate,
        userId
    } = data;

    const { rows } = await pool.query(
        `INSERT INTO tasks
            (title, description, priority, status, due_date, user_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING ${TASK_COLUMNS}`,
        [
            title,
            description,
            priority || "medium",
            status || "pending",
            dueDate || null,
            userId
        ]
    );

    return normalizeRow(rows[0]);

};

const findOneAndUpdate = async (filter, update) => {

    const { _id, userId } = filter;

    const fields = {
        title: update.title,
        description: update.description,
        priority: update.priority,
        status: update.status,
        dueDate: update.dueDate
    };

    const sets = [];
    const values = [userId, _id];
    let index = 3;

    for (const [column, value] of Object.entries(fields)) {

        if (value === undefined) {

            continue;

        }

        const columnName =
            column === "dueDate" ? "due_date" : column;

        sets.push(`${columnName} = $${index}`);

        values.push(
            column === "dueDate" && value === ""
                ? null
                : value
        );

        index += 1;

    }

    if (sets.length === 0) {

        return findOne(filter);

    }

    sets.push("updated_at = now()");

    const { rows } = await pool.query(
        `UPDATE tasks
         SET ${sets.join(", ")}
         WHERE user_id = $1 AND id = $2
         RETURNING ${TASK_COLUMNS}`,
        values
    );

    return normalizeRow(rows[0]);

};

const findOneAndDelete = async (filter = {}) => {

    const { _id, userId } = filter;

    const { rows } = await pool.query(
        `DELETE FROM tasks
         WHERE id = $1 AND user_id = $2
         RETURNING ${TASK_COLUMNS}`,
        [_id, userId]
    );

    return normalizeRow(rows[0]);

};

module.exports = {
    normalizeRow,
    find,
    findOne,
    create,
    findOneAndUpdate,
    findOneAndDelete
};
