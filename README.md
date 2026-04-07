# Align Delimited Block

A simple VSCode extension to automatically align delimited text blocks around the cursor.

Useful for AsciiDoc tables, LaTeX align environments, arrow expressions, configuration files, and general column formatting.

---

## Features

* Align using fixed delimiter (`|`)
* Align using custom delimiter (user input)
* Supports multi-character delimiters (`=>`, `::`, `->` etc)
* Works automatically on contiguous structured lines
* No text selection required
* Lightweight and fast

---

## How it works

Place the cursor inside a structured text block.

The extension automatically detects contiguous lines before and after the cursor that share the same delimiter structure and aligns them.

---

## Examples

### Pipe delimiter example

Before:

```
a | bb | c
aaa | b | cc
```

Run command:

```
Align Delimited Block (|)
```

Result:

```
a   | bb | c
aaa | b  | cc
```

---

### Custom delimiter example

Before:

```
x => 10
long_variable => 20
y => 5
```

Run command:

```
Align Delimited Block (Custom Delimiter)
```

Enter delimiter:

```
=>
```

Result:

```
x             => 10
long_variable => 20
y             => 5
```

---

### LaTeX align example

Before:

```
a & = b + c
long & = x
z & = 100
```

Run custom delimiter:

```
&
```

Result:

```
a    & = b + c
long & = x
z    & = 100
```

---

## Commands

| Command                                  | Description                         |
| ---------------------------------------- | ----------------------------------- |
| Align Delimited Block (\|)               | Align using pipe delimiter          |
| Align Delimited Block (Custom Delimiter) | Align using user provided delimiter |

---

## Keybindings

| Key          | Action                       |
| ------------ | ---------------------------- |
| Ctrl+Shift+A | Align using pipe delimiter   |
| Ctrl+Alt+A   | Align using custom delimiter |

---

## Supported use cases

Works well with:

* AsciiDoc tables
* LaTeX align environments
* Markdown tables
* Configuration files
* Column formatted text
* Arrow expressions
* Any delimiter-structured text

---

## Motivation

Manually aligning delimited text is tedious and error-prone.

This extension provides a simple and fast way to keep text blocks readable and consistently formatted.

---

## Requirements

None.

---

## Extension Settings

Currently no settings are required.

Future versions may include configurable defaults.

---

## Known Issues

No known issues at this time.

---

## Release Notes

### 0.1.0

Initial public release.

---

## License

MIT License

---

## Author

kitsune-tanuki

---

## Changelog

See CHANGELOG.md for details.
