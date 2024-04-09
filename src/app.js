import dotenv from 'dotenv';
import express from 'express';
import indexRouter from './routes/index';
import loginRouter from './routes/login';
import transitsRouter from './routes/transits';
import dailySkyRouter from './routes/daily-sky';

// Initialize environment variables
const result = dotenv.config ();
if (result.error) {
	console.error ('Error loading .env file:', result.error);
	process.exit (1); // Exit the application if .env file cannot be loaded
}

const app = express ();

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost';
const appName = process.env.APP_NAME || 'app_name';

app.use (indexRouter);
app.use (loginRouter);
app.use (transitsRouter);
app.use (dailySkyRouter);

app.listen (port, host, () => {
	console.log (`${appName} running on ${host}:${port}`);
});