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
      SELECT * FROM sellers
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
      return null;
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
    const deleteStatement = db.prepare(`
      DELETE FROM sellers
      WHERE id = ?
      `);

    const result = deleteStatement.run(sellerId);

    console.log(`Seller with ID ${sellerId} deleted.`)
    return result.changes > 0;

  } catch (err) {
    console.error("Error deleting seller: ", err);
    return null;

  } finally {
    db.close();
  }
};

const updateSeller = ({ id, phone, name }) => {
  const db = connectToDatabase();

  try {
    const updateStatement = db.prepare(`
      UPDATE sellers
      SET phone = ?, name = ?
      WHERE id = ?
      `);
    
    const result = updateStatement.run(phone, name, id);
    return result;

  } catch (err) {
    console.error("Error updating seller", err);
    return null;

  } finally {
    db.close();
  }
};

export default { getAllSellers, getSpecificSeller, addSeller, deleteSeller, updateSeller }