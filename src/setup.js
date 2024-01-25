import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import readlineSync from 'readline-sync';

// Function to generate a random hexadecimal string for APP_KEY
function generateRandomHexString (length) {
	return [...Array (length)].map (() => Math.floor (Math.random () * 16).toString (16)).join ('');
}

// Function to update .env file with new values
function updateEnvFile (envFilePath, appKey, username, password, appPort) {
	// Read the contents of the .env file
	let envFileContent = fs.readFileSync (envFilePath, 'utf8');
	// Update the APP_USERNAME, APP_PASSWORD, and APP_KEY entries if the parameters are provided and not empty
	if (username !== undefined && username !== '') envFileContent = envFileContent.replace (/APP_USERNAME=.*/, `APP_USERNAME=${username}`);
	if (password !== undefined && password !== '') envFileContent = envFileContent.replace (/APP_PASSWORD=.*/, `APP_PASSWORD=${password}`);
	if (appPort !== undefined && appPort !== '') envFileContent = envFileContent.replace (/APP_PORT=.*/, `APP_PORT=${appPort}`);
	if (appKey !== undefined && appKey !== '') envFileContent = envFileContent.replace (/APP_KEY=.*/, `APP_KEY=${appKey}`);
	// Write the updated content back to the .env file
	fs.writeFileSync (envFilePath, envFileContent, 'utf8');
	console.log (`APP_USERNAME=${username || ' <not modified>'}\nAPP_PASSWORD=${password || ' <not modified>'}\nAPP_PORT=${appPort || ' <not modified>'}\nAPP_KEY=${appKey}`);
}

const envFilePath = '.env';
const envExampleFilePath = '.env.example';

// Copy content from .env.example if .env file does not exist
if (!fs.existsSync (envFilePath)) {
	try {
		const envExampleContent = fs.readFileSync (envExampleFilePath, 'utf-8');
		fs.writeFileSync (envFilePath, envExampleContent);
		console.log ('.env file created from .env.example.');
	} catch (error) {
		console.error ('Error creating .env file:', error.message);
		process.exit (1);
	}
}

// Generate a new APP_KEY
const appKey = generateRandomHexString (32);
// Prompt user for file path, username and password
const username = process.argv[2] || readlineSync.question ('Enter the app username: ');
const password = process.argv[3] || readlineSync.question ('Enter the app password: ', { hideEchoBack: true });
const appPort = process.argv[4] || readlineSync.question ('Enter the app port: ');
// Bcrypt the password if provided
const bcryptSaltRounds = 10;
const bcryptPassword = password !== '' ? bcrypt.hashSync (password, bcryptSaltRounds) : '';
// Update .env file with new APP_KEY, username, and bcrypt'd password
updateEnvFile (envFilePath, appKey, username, bcryptPassword, appPort);
console.log ('Setup complete!');