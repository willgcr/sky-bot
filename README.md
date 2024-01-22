# SkyBot

Hi there!

SkyBot is a user-friendly and straightforward implementation designed for retrieving astrological transits based on specific time and location parameters. This project was built to provide astrological enthusiasts, developers, and businesses with accurate astrological data for their applications ***(for free!)***.

This work is derived from [CircularNatalHoroscopeJS](https://github.com/0xStarcat/CircularNatalHoroscopeJS) library (v1.1.0) wrapped into an API that can be deployed on Docker containers. By this date (Jan 2024) I haven't made any relevant changes to the main algorithm but I decided not to make use of the original modular library to make sure that it can incorporate updates and extension in the future without relying in the origin project.

## Key Features

- Astrological Transits: Access precise information about astrological transits, empowering users to explore and understand celestial events at a given time and location.

- Docker Container Compatibility: SkyBot is built with containerization in mind, allowing seamless deployment and scalability within Docker containers. This ensures easy integration into various environments and simplifies the management of dependencies.

- JWT Token Authentication: Prioritize security with JSON Web Token (JWT) authentication, adding an extra layer of protection to the API. Only authorized users with valid tokens can access and utilize the astrological transit data.

- User-Friendly Implementation: With a focus on simplicity, SkyBot offers an intuitive interface for developers to effortlessly integrate astrological data into their applications.

- Customizable Parameters: Tailor astrological transit data to your specific needs by inputting time, location and other parameters. This flexibility ensures that users can obtain accurate information and all the relevant data needed to meet their requirements.

## How to use it?

...

### Building

...

### Parameters

These are the supported parameters:

* int year: value > 0 && < 3000
* int month: (0 = january ~ 11 = december)
* int date: (1 ~ 31)
* int hours = local time hour (0...23)
* int minute = local time minute (0...59)
* float latitude = latitude in decimal format (-90.00 ~ 90.00)
* float longitude = longitude in decimal format (-180.00 ~ 180.00)
* string houseSystem: one of the following: ['placidus', 'koch', 'campanus', 'whole-sign', 'equal-house', 'regiomontanus', 'topocentric']
* string zodiac: one of the following: ['sidereal', 'tropical']
* array aspectPoints = an array containing all or none of the strings "bodies", "points", or "angles" to determine which starting points will be used in aspect generation
* array aspectWithPoints = an array containing all or none of the strings "bodies", "points", or "angles" to determine ending points will be used in aspect generation
* array aspectTypes = an array containing all or none of the following: "major", "minor", "conjunction", "opposition", "trine", "square", "sextile", "quincunx", "quintile", "septile", "semi-square", "semi-sextile"
* object customOrbs = an object with specific keys set to override the default orbs and set your own for aspect calculation.
* string language = the language code (en, es, pt) which will return labels and results in a specific language, if configured.

NOTE: "bodies" = planets, "points" = lunar nodes / lilith, "angles" = ascendant / midheaven
NOTE: You can also pass in individual bodies, points, or angles into aspectPoints or aspectWithPoints
 example: { aspectPoints: ["sun"], aspectWithPoints: ["moon"], aspectTypes: ["major", "quincunx"] }
 will only calculate sun to moon major or quincunx aspects if they exist
 All usable keys found in ./src/constant.js under BODIES, POINTS, ANGLES

## License

SkyBot is licensed under [GPLv3](LICENSE.md).

This work is derived from the following:

- [Moshier-Ephemeris-JS](https://github.com/0xStarcat/Moshier-Ephemeris-JS)
- [CircularNatalHoroscopeJS](https://github.com/0xStarcat/CircularNatalHoroscopeJS)

Special thanks to [Jade Ahking](https://jade.ahking.me/) and [Stephen Moshier](http://www.moshier.net/).