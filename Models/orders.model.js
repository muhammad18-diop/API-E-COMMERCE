const pool = require("../config/db")

const createOrder = async (user_id, total) => {

    const result = await pool.query("INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *", 
        [user_id, total]
    )

    return result.rows[0]
}

const createOrderItem = async (order_id, product_id, quantity, price) => {

    const result = await pool.query("INSERT INTO orders_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [order_id,  product_id, quantity, price]
    )

    return result.rows[0]
}

const getOrdersDetails = async (order_id) => {

    const result = await pool.query("SELECT users.nom, orders.id, products.nom as produit, orders_items.quantity, orders_items.price from users join orders on users.id = orders.user_id join orders_items on orders.id = orders_items.order_id join products on products.id = orders_items.product_id WHERE orders.id = $1",
        [order_id]
    )
    return result.rows
}


const getOrderTotal = async (order_id) => {
    const result = await pool.query(
        "SELECT SUM(price * quantity) AS total FROM orders_items WHERE order_id = $1",
        [order_id]
    )

    return result.rows[0]
}

const createFullOrder = async (user_id, product_id, quantity, price) => {

    const client = pool.connect()
    try {
        
        (await client).query("BEGIN");

        const total = quantity * price

        const orderResult = await client.query("INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *", 
            [user_id, total]
        )

        const order = orderResult.rows[0]

        const itemresult = await client.query("INSERT INTO orders_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *", 
            [order.id, product_id, quantity, price]
        )

        const item = itemresult.rows[0]
        await client.query("COMMIT");

        return {order, item}
    } catch (error) {
        (await client).query("ROLLBACK")
        throw error
    }finally{
        (await client).release()
    }
}

module.exports = {createOrder, createOrderItem, getOrdersDetails, getOrderTotal, createFullOrder    }