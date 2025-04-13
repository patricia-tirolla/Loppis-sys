import res from "express/lib/response.js";
import connectToDatabase from "./createDatabase.js";

const getAllOrders = () => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`SELECT * FROM orders`);

        const orders = statement.all();
        return orders;

    } catch (err) {
        console.error("Error fetching orders: ", err);
        return [];

    } finally {
        db.close();
    }
};

const getSpecificOrder = (orderId) => {
    const db = connectToDatabase();

    try {
        const checkStatement = db.prepare(`
            SELECT * FROM orders
            WHERE id = ?
            `);

        const existingOrder = checkStatement.get(orderId);

        if (!existingOrder) {
            console.log(`Order with ID: ${orderId} does not exists.`);
            return null;
        }
        return existingOrder;

    } catch (err) {
        console.error("Error fetching order: ", err);
        return null;

    } finally {
        db.close();
    }
};

const addOrder = () => {
    const db = connectToDatabase();

    try {
        const insertStatement = db.prepare(`
            INSERT INTO orders
            VALUES (null)
            `);

        const result = insertStatement.run();
        return result.lastInsertRowid;

    } catch (err) {
        console.error("Error adding new order: ", err);

    } finally {
        db.close();
    }
};

const getAllOrderItemsFromSpecificOrder = (orderId) => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT 
            order_items.id AS order_item_id,
            products.id AS product_id, 
            products.category, 
            products.price
            FROM products
            INNER JOIN order_items ON order_items.product_id = products.id
            INNER JOIN orders ON orders.id = order_items.order_id
            WHERE orders.id = ?
            `);

        const result = statement.all(orderId);
        return result;

    } catch (err) {
        console.error("Error getting products: ", err);
        return null;

    } finally {
        db.close();
    }
};

const sumAllOrderItems = (orderId) => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT 
	        orders.id AS order_id,
	        SUM(products.price) AS total_price, 
            COUNT(1) AS number_of_items
            FROM orders
            INNER JOIN order_items ON orders.id = order_items.order_id
            INNER JOIN products ON products.id = order_items.product_id
            WHERE orders.id = ?
            `);

        const result = statement.get(orderId);
        return result;

    } catch (err) {
        console.error("Error getting sum: ", err);
    return null;

    } finally {
        db.close();
      }
};

export default { getAllOrders, getSpecificOrder, addOrder, getAllOrderItemsFromSpecificOrder, sumAllOrderItems }