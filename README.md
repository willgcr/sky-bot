# SkyBot

[![GitHub](https://img.shields.io/github/license/willgcr/sky-bot?style=for-the-badge)](https://github.com/willgcr/sky-bot/blob/main/LICENSE.md)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/willgcr/sky-bot?sort=semver&style=for-the-badge)](https://github.com/willgcr/sky-bot/releases)

Hi there, welcome to **SkyBot** repository!

**SkyBot** is a user-friendly and straightforward implementation designed for retrieving astronomical transits based on specific parameters for astrology applications. This project was built to provide astrology enthusiasts, developers, and businesses with accurate astrological data for their applications ***(yep, it is free and open-source!)***.

Also, this API might be used for scientific purposes too, since the astronomical data it provides comes from [Moshier's Ephemeris algorithms](http://www.moshier.net/).

This work is derived from *[CircularNatalHoroscopeJS (v1.1.0)](https://github.com/0xStarcat/CircularNatalHoroscopeJS)*. I just wrapped it into an API that can be deployed on Docker containers. There are no relevant changes to the main algorithm but I decided not to make use of the origin library as a module so **SkyBot** can incorporate updates and extension in the future without relying in the origin project.

## Table of Contents

- [Key Features](#key-features)
- [Future Work](#future-work)
- [How to Run SkyBot?](#how-to-run-skybot)
	 - [Using Docker](#using-docker)
	 - [Without Docker](#without-docker)
- [Using the API](#using-the-api)
	 - [Login Endpoint](#login)
	 - [Transits Endpoint](#transits)
	 - [Daily Sky Endpoint](#daily-sky)
	 - [Ephemeris Endpoint](#ephemeris)
- [License / Special Thanks](#license--special-thanks)

## Key Features

**SkyBot** inherits all the features of the *CircularNatalHoroscopeJS v1.1.0*, but was built with containerization in mind, so these are the actual features:

1. Allows user to switch between `tropical` and `sidereal` zodiacs when constructing calculations;
2. Calculates the major angles (`ascendant` and `midheaven`) in relation to the point of origin;
3. Calculates the positions for all major bodies (`sun`, `moon`, `mercury`, `venus`, `mars`, `jupiter`, `saturn`, `uranus`, `neptune`, `pluto`, `chiron`, `sirius`) in relation to the point of origin;
4. Calculates the positions of the north/south Lunar Nodes and Lilith in relation to the point of origin;
5. Notes whether a planet is in retrograde at the given date/time;
6. Provides the cusps of each house in relation to the point of origin within multiple house systems (`placidus`, `koch`, `topocentric`, `regiomontanus`, `campanus`, `whole-sign`, `equal-house`);
7. Provides the cusps of each astrological sign in relation to the point of origin;
8. Provides a configurable list containing all the computed major and minor aspects of all bodies / points / angles;
9. Provides a way to extend the project with other language and deliver language-specific labels and names within the results (**SkyBot** added Brazilian Portuguese);
10. Docker Container Compatibility: **SkyBot** allows seamless deployment and scalability within Docker containers. This ensures easy integration into various environments;
11. JWT Token Authentication: Adds an extra layer of security to the API and allows future extension into a multi-user API.

## Future Work

- The current version uses an SQLite database in memory to store user credentials, in the future **SkyBot** can be extended to support multiple users, move the SQLite database to disk and store usage information for each user, making possible to set limits per user and quantify some metrics;

- Validate query parameters;

- Implement customOrbs query parameter.

## How to Run SkyBot?

### Using Docker

This project is designed to run in Docker containers. To configure the application and build the Docker image, use the `build.sh` script:

```bash
./build.sh -u <username> -p <password> -a <app-port>
```

**Parameters:**
- `-u` or `--username`: Provide the username for the application.
- `-p` or `--password`: Provide the password for the application.
- `-a` or `--app-port`: Specify the port on which the application will run.

**Example:**
```bash
./build.sh -u your_username -p your_password -a 3000
```

Please note that you need to replace `<username>`, `<password>` and `<app-port>`	with your actual values.
After building, you need to deploy a container and route the ports, to make it easier you can run the `deploy.sh` script:

```bash
./deploy.sh -p <app-port>
```

**Parameters**
- `-p` or `--app-port`: Specify the port on which the application will run. It routes from container to host.

**NOTE:** You don't need to use the `build.sh` and `deploy.sh` scripts, they are there just to make things easier, but if you know what you're doing you can build and deploy without them.

### Without Docker

If you don't want to run the app in a Docker container, you can run it in the host machine by following these steps:

1. Install dependencies:

```bash
npm install
```

2. Configue the app:

```bash
npm run setup <username> <password> <app-port>
```

The setup script creates a `.env` file containing the encrypted password and other important app variables, like the APP_KEY (which is used to generate JSON Web Tokens). If you know what you're doing, you can edit the `.env` file manually.

3. Build the app:

```bash
npm run build
```

4. After building, you can run it from the `dist` folder:

```bash
npm run dist
```

By doing so, the **SkyBot** starts running on port `8080` (you can change in the `.env` file). Now you are free to setup your production environment the way you want or just start having fun!

## Using the API

With **SkyBot** running you have the following API routes:

### Login

Endpoint to authenticate a user and obtain a JSON Web Token (JWT).

- **URL:** `/login`
- **Method:** `POST`
- **Request:**
	- Content-Type: `application/json`
	- Body:
		```json
		{
			"username": "example_user",
			"password": "secure_password"
		}
		```

- **Response:**
	- Status: `200 OK`
		```json
		{
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
		}
		```
	- Status: `401 Unauthorized`
		```json
		{
			"error": "Unauthorized"
		}
		```
	- Status: `500 Internal Server Error`
		```json
		{
			"error": "Internal Server Error"
		}
		```

- **Description:**
	- Validates user credentials against the stored hash in the database.
	- Issues a JWT token with a 1-hour expiration upon successful authentication.
	- Returns appropriate error responses for failed authentication or internal errors.

### Transits

Endpoint to generate transits based on user-provided parameters.

- **URL:** `/transits`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.

- **Query Parameters:**
	- `year` (numeric, required): Year (0 ~ 3000)
	- `month` (numeric, required): Month (0 ~ 11)
	- `date` (numeric, required): Day of the month (1 ~ 31)
	- `hour` (numeric, optional, default: 0): Hour of the day (0 ~ 23)
	- `minute` (numeric, optional, default: 0): Minutes (0 ~ 59)
	- `latitude` (numeric, required): Latitude (-90 ~ 90)
	- `longitude` (numeric, required): Longitude (-180 ~ 180)
	- `houseSystem` (string, optional, default: 'placidus'): Horoscope house system
	- `zodiac` (string, optional, default: 'tropical'): Zodiac system
	- `aspectPoints` (comma-separated string, optional): Which starting points will be used in aspect generation
	- `aspectWithPoints` (comma-separated string, optional): Which ending points will be used in aspect generation
	- `aspectTypes` (comma-separated string, optional): Types of aspects (major, minor, conjunction...) to calculate
	- ~~*`customOrbs`: Custom orbs for aspects*~~ (not implemented yet)
	- `language` (string, optional, default: 'en'): Language for transits labels output

**NOTE:**

- `bodies`: planets
- `points`: lunar nodes / Lilith
- `angles`: ascendant / midheaven

You can also pass in individual bodies, points, or angles into `aspectPoints` or `aspectWithPoints`. For example:
```
GET ... aspectPoints=sun&aspectWithPoints=moon&aspectTypes=major,quincunx
```

- **Response:**
	- Status: 
		- `200 OK` (application/json)
		- `400 Bad Request` (application/json)
		- `401 Unauthorized` (application/json)
		- `403 Forbidden` (application/json)

- **Description:**
	- Generates transits data based on the provided parameters.
	- Requires authentication via a valid JWT token.
	- Supports various options such as house system, zodiac system, and aspect configurations.
	- Returns the generated transits data in the response.
	- Handles errors for missing parameters, unauthorized access, and forbidden actions.

### Daily Sky

Generates a summarized version of the astrological sky for a given time and location.

- **URL:** `/daily-sky`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.

- **Query Parameters:**
	- `year` (numeric, required): Year (0 ~ 3000)
	- `month` (numeric, required): Month (0 ~ 11)
	- `date` (numeric, required): Day of the month (1 ~ 31)
	- `hour` (numeric, optional, default: 0): Hour of the day (0 ~ 23)
	- `minute` (numeric, optional, default: 0): Minutes (0 ~ 59)
	- `latitude` (numeric, required): Latitude (-90 ~ 90)
	- `longitude` (numeric, required): Longitude (-180 ~ 180)
	- `houseSystem` (string, optional, default: 'placidus'): Horoscope house system
	- `zodiac` (string, optional, default: 'tropical'): Zodiac system
	- `language` (string, optional, default: 'en'): Language for transits labels output
	- `format` (string, optional, default: 'json'): The format to return the data (`json` or `text`)

- **Response:**
	- Status: 
		- `200 OK` (application/json | text/plain)
		- `400 Bad Request` (application/json)
		- `401 Unauthorized` (application/json)
		- `403 Forbidden` (application/json)

- **Description:**
	- Generates transits data based on the provided parameters.
	- Requires authentication via a valid JWT token.
	- Handles errors for missing parameters, unauthorized access, and forbidden actions.

### Ephemeris

Returns only ephemeris data. Useful for astronomical and scientific applications.

- **URL:** `/ephemeris`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the `Authorization` header.

- **Query Parameters:**
	- `year` (numeric, required): Year (0 ~ 3000)
	- `month` (numeric, required): Month (0 ~ 11)
	- `date` (numeric, required): Day of the month (1 ~ 31)
	- `hour` (numeric, optional, default: 0): Hour of the day (0 ~ 23)
	- `minute` (numeric, optional, default: 0): Minutes (0 ~ 59)
	- `second` (numeric, optional, default: 0) Seconds (0 ~ 59)
	- `latitude` (numeric, required): Latitude (-90 ~ 90)
	- `longitude` (numeric, required): Longitude (-180 ~ 180)

- **Response:**
	- Status: 
		- `200 OK` (application/json)
		- `400 Bad Request` (application/json)
		- `401 Unauthorized` (application/json)
		- `403 Forbidden` (application/json)

- **Description:**
	- Returns only the raw ephemeris data, useful for scientific purposes.
	- Requires authentication via a valid JWT token.
	- Handles errors for missing parameters, unauthorized access, and forbidden actions.

## License / Special Thanks

**SkyBot** is licensed under [GPLv3](LICENSE.md).

This work is derived from the following:

- [Moshier-Ephemeris-JS](https://github.com/0xStarcat/Moshier-Ephemeris-JS)
- [CircularNatalHoroscopeJS](https://github.com/0xStarcat/CircularNatalHoroscopeJS)

Special thanks to [Jade Ahking](https://jade.ahking.me/) and [Stephen Moshier](http://www.moshier.net/).
