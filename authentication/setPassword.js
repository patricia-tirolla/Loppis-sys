import bcrypt from 'bcryptjs';
import connectToDatabase from '../repo/createDatabase.js';

const db = connectToDatabase();

const setPassword = async (plainPassword) => {
    try {
        const hashed = await bcrypt.hash(plainPassword, 10);

        db.prepare(`DELETE FROM authorized_passwords`).run();
        db.prepare(`
            INSERT INTO authorized_passwords (hashed_password)
            VALUES (?)
            `).run(hashed);
        console.log("Password set successfully!")
        process.exit(1);

    } catch (err) {
        console.error("Failed to set password", err);
        process.exit(1);
    }
};

const input = process.argv[2];
if (!input) {
  console.error("Please provide a password as an argument");
  process.exit(1);
}

setPassword(input);
