import connectToDatabase from "./createDatabase.js";

const getAllOrderItems = () => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`SELECT * FROM order_items`);

        const orderItems = statement.all();
        return orderItems;

    } catch (err) {
        console.error("Error fetchin orders: ", err);
        return [];

    } finally {
        db.close();
    }
};

const getSpecificOrderItem = (orderItemId) => {
    const db = connectToDatabase();

    try {
        const checkStatement = db.prepare(`
            SELECT 
            order_items.id AS order_item_id,
            order_items.order_id,
            order_items.product_id,
            products.category, 
            products.price
            FROM order_items
            INNER JOIN products ON products.id = order_items.product_id
            WHERE order_items.id = ?
            `);
        
        const existingOrderItem = checkStatement.get(orderItemId);
        if (!existingOrderItem) {
            console.log(`Order item with ID: ${orderItemId} does not exixt.`);
            return null;
        }

        return existingOrderItem;

    } catch (err) {
        console.error("Error fetching order item: ", err);
        return null;
    } finally {
        db.close();
    }
};

const addOrderItem = (orderId, productId) => {
    const db = connectToDatabase();

    try {
        const insertStatement = db.prepare(`
            INSERT INTO order_items (product_id, order_id)
            VALUES (?, ?)
            `);
        
        const result = insertStatement.run(productId, orderId);
        return result.lastInsertRowid;

    } catch (err) {
        console.error("Error adding new order item: ", err);
        return null;

    } finally {
        db.close();
    }
};

const deledeOrderItem = (orderId) => {
    const db = connectToDatabase();

    try {
        const deleteStatement = db.prepare(`
            DELETE FROM order_items
            WHERE id = ?
            `);
        
        const result = deleteStatement.run(orderId);
        return result.changes > 0;

    } catch (err) {
        console.error("Error deleting seller: ", err);
        return null;

    } finally {
        db.close();
    }
};

export default { getAllOrderItems, getSpecificOrderItem, addOrderItem, deledeOrderItem }