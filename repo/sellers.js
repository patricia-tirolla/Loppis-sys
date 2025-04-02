import connectToDatabase from "./createDatabase.js";

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



export default { getAllSellers, getSpecificSeller, addSeller, deleteSeller }