const pool = require("../config/db")

const createProduct = async (nom, prix, stock, category_id) => {
    const result = await pool.query("INSERT INTO products (nom, stock, prix, category_id) VALUES ($1, $2, $3, $4) RETURNING *", 
        [nom, prix, stock, category_id]
    )

    return result.rows[0]
}

const getAllProduct = async ()  => {
    const result = await pool.query("SELECT products.id, products.nom, products.prix, products.stock, categories.nom as categorie FROM products join categories ON products.category_id = categories.id")

    return result.rows
}

const getOneProduct = async (id)  => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1 ", 
        [id]
    )

    return result.rows[0]
}

const modifierProduct = async (nom, prix, stock, category_id, id)  => {
    const result = await pool.query("UPDATE products SET nom = $1, prix = $2, stock = $3, category_id = $4 WHERE id = $5 RETURNING *", 
        [nom, prix, stock, category_id, id]
    )

    return result.rows[0]
}

const deleteProducts = async(id)  => {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", 
        [id]
    )
    return result.rows[0]

}

const getProductsByCategorie = async(category_id) => {

    const result = await pool.query("SELECT products.nom, products.prix, products.stock, categories.nom as categorie FROM products join categories ON products.category_id = categories.id WHERE products.category_id = $1",
        [category_id]
    )

    return result.rows
}

module.exports = {createProduct, getAllProduct, getOneProduct, modifierProduct, deleteProducts, getProductsByCategorie}