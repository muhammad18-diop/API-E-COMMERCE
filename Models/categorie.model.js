const pool = require("../config/db")

const createCategorie = async (nom) => {
    const result = await pool.query ("INSERT INTO categories (nom) VALUES ($1) RETURNING *",
        [nom]
    )

    return result.rows[0]
}

const getAllCategorie = async () => {
    const result = await pool.query("SELECT * FROM categories")

    return result.rows
}

const getOnecategorie = async (id) => {

    const result = await pool.query("SELECT * FROM categories WHERE id = $1", 
        [id]
    )

    return result.rows[0]
}

const updateCategorie = async (nom, id) =>{

    const result = await pool.query("UPDATE categories SET nom = $1 WHERE id = $2 RETURNING *", 
        [nom, id]
    )

    return result.rows[0]
}

const deleteCategorie = async (id) => {
    const result = await pool.query ("DELETE FROM categories WHERE id = $1 RETURNING *",
        [id]
    )

    return result.rows[0]
}

module.exports = {createCategorie, getAllCategorie, getOnecategorie, updateCategorie, deleteCategorie }