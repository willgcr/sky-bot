import dotenv from 'dotenv';
import express from 'express';
import db from './db';
import loginRouter from './login';
import indexRouter from './index';

// Initialize environment variables
const result = dotenv.config ();
if (result.error) {
	console.error ('Error loading .env file:', result.error);
	process.exit (1); // Exit the application if .env file cannot be loaded
}

const app = express ();

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost';

app.use (loginRouter);
app.use (indexRouter);

app.listen (port, host, () => {
	console.log (`${process.env.APP_NAME} running on ${host}:${port}`);
});