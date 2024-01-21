module.exports = {
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: false,
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',
	// An array of file extensions your modules use
	moduleFileExtensions: ['js', 'json', 'node'],
	// The test environment that will be used for testing
	testEnvironment: 'node',
	// A list of paths to directories that Jest should use to search for files in
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	// The glob patterns Jest uses to detect test files
	testMatch: ['**/tests/**/*.js', '**/?(*.)+(spec|test).js'],
	// Ignore build directories
	watchPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
	// Transform files with babel-jest
	transform: {
		'^.+\\.m?js$': 'babel-jest',
	}
}