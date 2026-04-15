# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog:
https://keepachangelog.com/en/1.0.0/

## [0.2.1] - 2026-04-15

* add demo GIF to README
* add extension icon
* improve README presentation for marketplace publishing
* refine packaging rules for VSIX

## [0.2.0] - 2026-04-13

### Added

* Support alignment on selected lines in addition to automatic block detection
* Auto-detect delimiter from selection or current line for prompt input
* Dedicated Markdown table formatter with alignment and separator handling
* New setting: `markdownTableCenterHeader`
* Localization support (EN/JA) using `package.nls`

### Improved

* More robust alignment processing with defensive checks
* Skip single-line blocks
* Skip edit when no changes are detected
* Improved validation and error handling

## [0.1.2] - 2026-04-09

### Changed

* Skip alignment for single-line blocks
* Avoid unnecessary edits when no changes are detected
* Improve delimiter validation and alignment error handling
* Improve error handling during alignment

### Internal

* Add defensive checks for safer editor operations
* Validate `editor.edit` operation results
* Refactor command handling to use shared alignment processing

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
