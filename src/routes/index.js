import express from 'express';

const indexRouter = express.Router ();

// Authorized route
indexRouter.get ('/', (req, res) => {
	res.send (`<code style="font-size: 11px">${process.env.APP_NAME || "app_name"} v${process.env.APP_VERSION || "0.0.0"} by <a target="_blank" href="${process.env.APP_AUTHOR_URL || "#"}">${process.env.APP_AUTHOR || "author"}</a></code>`);
});

export default indexRouter;