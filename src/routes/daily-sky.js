import express from 'express';
import Origin from '../core/Origin';
import Horoscope from '../core/Horoscope';
import authenticate from '../middlewares/authenticate';

const dailySkyRouter = express.Router ();

// Transform the input object into a human readable text
const skyToText = (sky) => {
	let readableSky = '';
	sky.forEach ((astro, index) => {
		readableSky += astro.name + ' (' + astro.position + ') ' + astro.sign + (astro.retrograde ? ' R' : '');
		if (index !== sky.length - 1) { readableSky += '\r\n'; }
	});
	return readableSky;
};


const dailySky = (
	year, month, date, hour = 0, minute = 0, latitude, longitude, houseSystem = 'placidus', zodiac = 'tropical', language = 'en', format = 'json') => {
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
			aspectPoints: [],
			aspectWithPoints: [],
			aspectTypes: [],
			customOrbs: {}, // Not implemented yet
			language: language
		});

		// Get only a summarized version of the data
		let sky = [];
		const astros = transits._celestialBodies.all
							   .concat (transits._celestialPoints.all)
							   .concat(transits._ascendant)
							   .concat(transits._midheaven);

		astros.forEach ((astro) => {
			sky = [...sky, {
				'name': astro.label,
				'sign': astro.Sign.label,
				'position': astro.ChartPosition.Ecliptic.ArcDegreesFormatted30,
				'retrograde': astro.isRetrograde || false
			}];
		});

		const houses = transits._houses.slice (0, 12);
		houses.forEach ((house) => {
			sky = [...sky, {
				'house': house.label,
				'sign': house.Sign.label,
				'start_position': house.ChartPosition.EndPosition.Ecliptic.ArcDegreesFormatted30,
				'end_position': house.ChartPosition.StartPosition.Ecliptic.ArcDegreesFormatted30
			}];
		});

		return (format == 'text' ? skyToText (sky) : {sky});
	} catch (e) {
		console.error ('Error:', e.message);
		return ({error: e.message});
	}
}

// Authorized route
dailySkyRouter.get ('/daily-sky', authenticate, (req, res) => {
	// Get data from user query
	let { year, month, date, hour, minute, latitude, longitude, houseSystem, zodiac, language, format } = req.query;

	// Check if required parameters are present
	if (!(year && month && date && latitude && longitude)) {
		return res.status (400).json ({ error: 'Missing required parameters' });
	}

	// Generate and return the sky data
	let result = dailySky (
		parseInt (year), parseInt (month), parseInt (date),
		parseInt (hour??0), parseInt (minute??0), parseFloat (latitude), parseFloat (longitude),
		houseSystem, zodiac, language, format
	);
	if (format == 'text') { 
		res.status (200).type ('text/plain').send (result);
	} else {
		res.status (200).json (result);
	}
});


export default dailySkyRouter;