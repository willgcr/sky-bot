import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

// Initialize environment variables
const result = dotenv.config ();
if (result.error) {
	console.error ('Error loading .env file:', result.error);
	process.exit (1); // Exit the application if .env file cannot be loaded
}

// Create a database file in memory
const db = new sqlite3.Database (':memory:');

// Create users table
db.serialize (() => {
	db.run ("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)", (err) => {
		if (err) {
			console.error ('Error creating users table:', err.message);
		} else {
			console.log ('Users table created.');
			// Insert user credentials from .env file if not already present
			const stmt = db.prepare ("INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)");
			stmt.run (process.env.APP_USERNAME || 'user', process.env.APP_PASSWORD || 'password', (insertErr) => {
				if (insertErr) {
					console.error ('Error inserting user credentials:', insertErr.message);
				} else {
					console.log ('User credentials inserted.');
				}
				stmt.finalize ();
			});
		}
	});
});

export default db;