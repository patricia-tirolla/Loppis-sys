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

export default { getAllProducts };