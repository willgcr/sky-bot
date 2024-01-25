import dotenv from 'dotenv';
import express from 'express';

// Initialize environment variables
const result = dotenv.config ();
if (result.error) {
	console.error ('Error loading .env file:', result.error);
	process.exit (1); // Exit the application if .env file cannot be loaded
}

const indexRouter = express.Router ();

// Authorized route
indexRouter.get ('/', (req, res) => {
	res.send (`<code style="font-size: 11px">${process.env.APP_NAME} v${process.env.APP_VERSION} by <a target="_blank" href="${process.env.APP_AUTHOR_URL}">${process.env.APP_AUTHOR}</a></code>`);
});

export default indexRouter;