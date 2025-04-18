import connectToDatabase from "./createDatabase.js";

const getAllProducts = () => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT * FROM products
            `);
        const products = statement.all();
        return products;

    } catch (err) {
        console.error("Error fetching products: ", err);
        return [];
    } finally {
        db.close();
    }
};

const getSpecificProduct = (productId) => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `);
        const product = statement.get(productId);
        return product;

    } catch (err) {
        console.error("Error fetching product: ", err);
        return null;

    } finally {
        db.close();
    }
};

const addProduct = (category, price, sellerId) => {
    const db = connectToDatabase();

    try {
        const insertStatement = db.prepare(`
            INSERT INTO products (category, price, seller_id)
            VALUES (?, ?, ?)
            `);

        const result = insertStatement.run(category, price, sellerId);
        return result.lastInsertRowid;

    } catch (err) {
        console.error("Error adding new product", err);
        return null;

    } finally {
        db.close();
    }
};

const deleteProduct = (productId) => {
    const db = connectToDatabase();

    try {
        const deleteStatement = db.prepare(`
            DELETE FROM products
            WHERE id = ?
            `);

        const result = deleteStatement.run(productId);
        return result.changes > 0;

    } catch (err) {
        console.error("Error deleting new product: ", err);
        return null;

    } finally {
        db.close();
    }
};

const updateProduct = ({ id, category, price }) => {
    const db = connectToDatabase();

    try {
        const updateStatement = db.prepare(`
            UPDATE products
            SET category = ?, price = ?
            WHERE id = ?
            `);

        const result = updateStatement.run(category, price, id);
        return result;

    } catch (err) {
        console.error("Error updating product", err);
        return null;

    } finally {
        db.close();
    }
};

export default { getAllProducts, getSpecificProduct, addProduct, deleteProduct, updateProduct }