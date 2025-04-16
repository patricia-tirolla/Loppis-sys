import connectToDatabase from "./createDatabase.js";

const auth = () => {
    const db = connectToDatabase();

    try {
        const statement = db.prepare(`
            SELECT hashed_password
            FROM authorized_passwords 
            LIMIT 1
            `);
        
        const result = statement.get();
        return result;
    } catch (err) {
        console.error("Failed authenticating", err);
        return null;
    } finally {
        db.close()
    }
};

const authRepo = { auth };

export default authRepo