# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.3.0 (2025-01-26)

- Add ascendant, midheaven, and houses data to daily sky results.

## v1.2.0 (2024-04-12)
	
### Added
- Add a new route (`ephemeris`), which returns raw ephemeris data. Useful for astronomical and scientific applications.

### Changed
- Fixed response headers for `daily-sky` and `transits` routes.

## v1.1.0 (2024-04-09)
	
### Added
- Add this changelog.
- Add a new route (`daily-sky`), which returns a summarized version of the astrological sky in a given time and location.

### Changed
- Update `src` folder structure
- Update `README.md` with new route description
- Update the `Dockerfile` to run the app as a non-root user.
- The parameters `hour` and `minute` are not required anymore. If not provided, zero is used instead.

## v1.0.0 (2024-01-25)
- Initial public release. Basic usage instructions available in the `README.md`.
