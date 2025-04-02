
import sqlite3 from 'better-sqlite3';

const connectToDatabase = () => {
  try {
    const newdb = new sqlite3('database.db')
    createTables(newdb);
    return newdb
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }

};

const getAllSellers = () => {
  const db = connectToDatabase();
  try {
    const statement = db.prepare(`SELECT * FROM sellers`);
    const sellers = statement.all();
    return sellers;
  } catch (err) {
    console.error("Error fetching sellers:", err);
    return [];
  } finally {
    db.close();
  }
};

const getSpecificSeller = (sellerId) => {
  const db = connectToDatabase();
  try {
    const statement = db.prepare(`
      SELECT sellers.name FROM sellers
      WHERE id = ?
      `);
    const seller = statement.get(sellerId);
    return seller;
  } catch (err) {
    console.error("Error fetching seller: ", err);
    return null;
  } finally {
    db.close();
  }
};

const addSeller = (sellerName, sellerPhone) => {
  const db = connectToDatabase();
  try {
    const checkStatement = db.prepare(`
      SELECT id FROM sellers
      WHERE name = ? AND phone = ?
      `);
    const existingSeller = checkStatement.get(sellerName, sellerPhone);

    if (existingSeller) {
      console.log(`Seller already exists with ID: ${existingSeller.id}`);
      return existingSeller.id;
    }

    const insertStatement = db.prepare(`
      INSERT INTO sellers (name, phone)
      VALUES (?, ?)
      `);

    const result = insertStatement.run(sellerName, sellerPhone);

    return result.lastInsertRowid;

  } catch (err) {
    console.error("Error adding new seller: ", err);
    return null;
    
  } finally {
    db.close();
  }
};

const deleteSeller = (sellerId) => {
  const db = connectToDatabase();

  try {
    const checkStatement = db.prepare(`
      SELECT id FROM sellers
      WHERE id = ?
      `);
    const existingSeller = checkStatement.get(sellerId);

    if (!existingSeller) {
      console.log('Seller does not exist.');
      return null;
    }

    const deleteStatement = db.prepare(`
      DELETE FROM sellers
      WHERE id = ?
      `)

    const result = deleteStatement.run(sellerId);

    console.log(`Seller with ID ${sellerId} deleted.`)
    return result.changes > 0;

  } catch (err) {
    console.error("Error adding new seller: ", err);
    return null;

  } finally {
    db.close();
  }
}

const createTables = (newdb) => {
  try {
    newdb.exec(`
      CREATE TABLE IF NOT EXISTS sellers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
      );
      `);

    newdb.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL, 
        price INT NOT NULL,
        seller_id INT NOT NULL,
        FOREIGN KEY (seller_id) REFERENCES sellers (id)
      );
    `);

    newdb.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total INT NOT NULL
      );
    `);

    newdb.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INT UNIQUE NOT NULL,
        order_id INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (order_id) REFERENCES orders (id)
      );
      `)
  } catch (err) {
    console.error("Error creating tables:", err)
  }
}

export default { connectToDatabase, getAllSellers, getSpecificSeller, addSeller, deleteSeller }