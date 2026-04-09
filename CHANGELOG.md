# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog:
https://keepachangelog.com/en/1.0.0/

## [0.1.2] - 2026-04-09

### Improved

* Skip alignment for single-line blocks
* Avoid unnecessary edits when no changes are detected
* Improve delimiter validation
* Improve error handling during alignment

### Internal

* Add defensive checks for safer editor operations
* Validate editor.edit operation result

## [0.1.1] - 2026-04-08

### Added

* Extension setting `alignDelimitedBlock.defaultDelimiter` for configurable default delimiter

### Changed

* Refactored alignment command to use shared processing logic
* Improved delimiter validation (prevent empty input)

### Documentation

* Improved README (English and Japanese)
* Added Japanese documentation
* Added CJK usage notes and examples

### Internal

* Normalize line endings to LF
* Add `.gitattributes` for consistent line endings
* Minor formatting cleanup

## [0.1.0] - 2026-04-06

### Added

* Initial release
* Align columns by pipe (`|`) delimiter
* Align columns by custom delimiter (user input)
* Supports multi-character delimiters (ex: `=>`, `&&`)
* Works on contiguous structured lines around the cursor
* Designed for AsciiDoc tables and LaTeX align environments

### Notes

* No configuration options yet
* More features may be added in future versions
