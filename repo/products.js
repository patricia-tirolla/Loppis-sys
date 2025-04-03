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
        const checkSellerStatement = db.prepare(`
            SELECT * FROM sellers
            WHERE id = ?
            `);
        const existingSeller = checkSellerStatement.get(sellerId);

        if (!existingSeller) {
            console.log(`Seller doesn not exists with ID: ${sellerId}`);
            return null;
        }

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
        const checkStatement = db.prepare(`
            SELECT id FROM products
            WHERE id = ?
            `);
        const existingProduct = checkStatement.get(productId);

        if (!existingProduct) {
            console.log("Product does not exist.");
            return null;
        }

        const deleteStatement = db.prepare(`
            DELETE FROM products
            WHERE id = ?
            `);

        const result = deleteStatement.run(productId);
        console.log(`Product with ID ${productId} deleted.`);
        return result.changes > 0;

    } catch (err) {
        console.error("Error deleting new product: ", err);
        return null;

    } finally {
        db.close();
    }
};

const updateProductCategory = (productId, newCategory) => {
    const db = connectToDatabase();

    try {
        const checkStatement = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `);
        const existingProduct = checkStatement.get(productId);

        if (!existingProduct) {
            console.log(`Product with ID ${productId} does not exists`);
            return null;
        }

        const updateStatement = db.prepare(`
            UPDATE products
            SET category = ?
            WHERE id = ?
            `);

        const result = updateStatement.run(newCategory, productId);
        console.log(`Category from product with ID: ${productId} changed to: ${newCategory}.`);
        return result;

    } catch (err) {
        console.error("Error updating category: ", err);
        return null;

    } finally {
        db.close();
    }
};

const updateProductPrice = (productId, newPrice) => {
    const db = connectToDatabase();

    try {
        const checkStatement = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `);
        const existingProduct = checkStatement.get(productId);

        if (!existingProduct) {
            console.log(`Product with ID ${productId} does not exists`);
            return null;
        }

        const updateStatement = db.prepare(`
            UPDATE products
            SET price = ?
            WHERE id = ?
            `);

        const result = updateStatement.run(newPrice, productId);
        console.log(`Price from product with ID: ${productId} changed to: ${newPrice}.`);
        return result;

    } catch (err) {
        console.error("Error updating price: ", err);
        return null;

    } finally {
        db.close();
    }
};

export default { getAllProducts, getSpecificProduct, addProduct, deleteProduct, updateProductCategory, updateProductPrice }