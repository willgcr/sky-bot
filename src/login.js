import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './db';
import dotenv from 'dotenv';

// Initialize environment variables
const result = dotenv.config ();
if (result.error) {
	console.error ('Error loading .env file:', result.error);
	process.exit (1); // Exit the application if .env file cannot be loaded
}

const loginRouter = express.Router ();
loginRouter.use (express.json ());

loginRouter.post ('/login', (req, res) => {
	const { username, password } = req.body;
	// Retrieve the hashed password from the database
	db.get ("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
		if (err) {
			return res.status (500).json ({ error: 'Internal Server Error' });
		}
		if (!user) {
			return res.status (401).json ({ error: 'Unauthorized' });
		}
		// Compare the provided password with the stored bcrypt hash
		bcrypt.compare (password, user.password, (bcryptErr, result) => {
			if (bcryptErr || !result) {
				return res.status (401).json ({ error: 'Unauthorized' });
			}
			// Create a JWT token
			const token = jwt.sign ({ username }, process.env.APP_KEY, { expiresIn: '1h' });
			let currentTimeString = new Date ().toLocaleTimeString();
			console.log (`Token issued to ${username} at ${currentTimeString}`);
			res.json ({ token });
		});
	});
});

export default loginRouter;