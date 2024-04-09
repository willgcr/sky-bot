# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v.1.1.0 (2024-04-09)
	
### Added
- Add this changelog.
- Add a new route (`/daily-sky`), which returns a summarized version of the astrological sky in a given time and location.

### Changed
- Update `src` folder structure
- Update `README.md` with new route description
- Update the `Dockerfile` to run the app as a non-root user.
- The parameters `hour` and `minute` are not required anymore. If not provided, zero is used instead.

## v.1.0.0 (2024-01-25)
- Initial public release. Basic usage instructions available in the `README.md`.