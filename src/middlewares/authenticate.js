import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
	const token = req.header ('Authorization')?.split (' ')[1];
	if (!token) {
		return res.status (401).json ({ error: 'Unauthorized' });
	}
	jwt.verify (token, process.env.APP_KEY || '', (err, user) => {
		if (err) {
			return res.status (403).json ({ error: 'Forbidden' });
		}
		req.user = user;
		next ();
	});
};

export default authenticate;