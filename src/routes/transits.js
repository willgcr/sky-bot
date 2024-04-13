import express from 'express';
import Origin from '../core/Origin';
import Horoscope from '../core/Horoscope';
import authenticate from '../middlewares/authenticate';

const transitsRouter = express.Router ();

const createHoroscope = (
	year, month, date, hour = 0, minute = 0, latitude, longitude, houseSystem = 'placidus', zodiac = 'tropical',
	aspectPoints = ['bodies', 'points', 'angles'], aspectWithPoints = ['bodies', 'points', 'angles'], 
	aspectTypes = ["major", "minor"], customOrbs = {}, language = 'en') => {
	try {
		const origin = new Origin ({
			year: year,
			month: month,
			date: date,
			hour: hour,
			minute: minute,
			latitude: latitude,
			longitude: longitude,
		});
		const transits = new Horoscope ({
			origin: origin,
			houseSystem: houseSystem,
			zodiac: zodiac,
			aspectPoints: aspectPoints,
			aspectWithPoints: aspectWithPoints,
			aspectTypes: aspectTypes,
			customOrbs: {}, // Not implemented yet
			language: language
		});
		return ({transits: transits});
	} catch (e) {
		console.error ('Error:', e.message);
		return ({error: e.message});
	}
}

// Authorized route
transitsRouter.get ('/transits', authenticate, (req, res) => {
	let {
		year, month, date, hour, minute, latitude, longitude,
		houseSystem, zodiac, aspectPoints, aspectWithPoints,
		aspectTypes, customOrbs, language
	} = req.query;

	// Check if required parameters are present
	if (!(year && month && date && latitude && longitude)) {
		return res.status (400).json ({ error: 'Missing required parameters' });
	}

	// Get array parameters as csv from request body
	if (aspectPoints) aspectPoints = aspectPoints.split (',');
	if (aspectWithPoints) aspectWithPoints = aspectWithPoints.split (',');
	if (aspectTypes) aspectTypes = aspectTypes.split (',');

	// Not implemented yet
	customOrbs = {};

	// Generate and return the map
	res.status (200).json (createHoroscope (
		parseInt (year), parseInt (month), parseInt (date),
		parseInt (hour??0), parseInt (minute??0), parseFloat (latitude), parseFloat (longitude),
		houseSystem, zodiac, aspectPoints, aspectWithPoints, aspectTypes, customOrbs, language
	));
});


export default transitsRouter;