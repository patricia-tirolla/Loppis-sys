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

export default { getAllOrders, getSpecificOrder, addOrder }