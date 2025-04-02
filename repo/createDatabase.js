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
  };

export default connectToDatabase;