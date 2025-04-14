import connectToDatabase from "./createDatabase.js"

const sellersTotalReport = () =>{
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT 
	            sellers.id AS seller_id,
                sellers.name,
                SUM(products.price) AS total
            FROM order_items
            INNER JOIN products ON products.id = order_items.product_id
            INNER JOIN sellers ON sellers.id = products.seller_id
            GROUP BY sellers.id
            `);

        const result = statement.all();
        return result;

    } catch (err) {
        console.error("Error fetching total report", err);
        return null;

    } finally {
        db.close();
    }
};

export default sellersTotalReport