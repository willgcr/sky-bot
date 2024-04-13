import express from 'express';
import Origin from '../core/Origin';
import authenticate from '../middlewares/authenticate';
import Ephemeris from '../lib/ephemeris-1.2.1.bundle';

const ephemerisRouter = express.Router ();

const ephemeris = (
	year, month, date, hour = 0, minute = 0, second = 0, latitude, longitude) => {
	try {
		const origin = new Origin ({
			year: year,
			month: month,
			date: date,
			hour: hour,
			minute: minute,
			second: second,
			latitude: latitude,
			longitude: longitude,
		});
		let eph = new Ephemeris ({
			year: origin.utcTime.year (),
			month: origin.utcTime.month (),
			day: origin.utcTime.date (),
			hours: origin.utcTime.hour (),
			minutes: origin.utcTime.minute (),
			seconds: origin.utcTime.second (),
			latitude: parseFloat (origin.latitude),
			longitude: parseFloat (origin.longitude),
			calculateShadows: true,
		});
		return ({ephemeris: eph});
	} catch (e) {
		console.error ('Error:', e.message);
		return ({error: e.message});
	}
}

// Authorized route
ephemerisRouter.get ('/ephemeris', authenticate, (req, res) => {
	// Get data from user query
	let { year, month, date, hour, minute, second, latitude, longitude } = req.query;

	// Check if required parameters are present
	if (!(year && month && date && latitude && longitude)) {
		return res.status (400).json ({ error: 'Missing required parameters' });
	}

	// Generate and return the sky data
	res.status (200).json (ephemeris (
		parseInt (year), parseInt (month), parseInt (date),
		parseInt (hour??0), parseInt (minute??0), parseInt (second??0),  parseFloat (latitude), parseFloat (longitude)
	));
});


export default ephemerisRouter;