const pool =  require("../config/db")

const register = async (nom, email, password) => {

    const result = await pool.query("INSERT INTO users (nom, email, password) VALUES ($1, $2, $3) RETURNING *", 
        [nom, email, password]
    )

    return result.rows[0]
}


const findByEmail = async (email) => {
    const result = await pool.query ("SELECT * FROM users WHERE email = $1", 
        [email]
    )
    return result.rows[0]
}

module.exports = {register, findByEmail}