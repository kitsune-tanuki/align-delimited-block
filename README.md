# Align Delimited Block

A VSCode extension to automatically align delimiter-structured text blocks around the cursor.

Unlike many alignment tools, this extension calculates **visual display width**, so full-width characters (Japanese, Chinese, Korean) and emoji align correctly.

Useful for AsciiDoc tables, LaTeX align environments, arrow expressions, configuration files, and general column formatting.

---

## Features

* Align using default delimiter (`|`)
* Align using custom delimiter (user input)
* Supports multi-character delimiters (`=>`, `::`, `->` etc)
* Works automatically on contiguous structured lines
* No text selection required
* Lightweight and fast
* Correct alignment of full-width characters (CJK support)
* Handles emoji and combining characters correctly
* Aligns by display width, not character count

---

## Why this extension?

Many alignment tools only count characters instead of display width.

This causes broken formatting when text contains Japanese, Chinese, Korean or other full-width characters.

Example problem:

Typical formatter result:

```text
a   | b
日本語 | c
```

Correct alignment:

```text
a      | b
日本語 | c
```

This extension fixes this by calculating real visual width.

---

## How it works

Place the cursor inside a structured text block.

The extension automatically detects contiguous lines before and after the cursor that share the same delimiter structure and aligns them.

---

## Examples

> [!NOTE]
> For better visibility, spaces in the following examples are represented by `·` (MIDDLE DOT).
> The extension outputs actual standard spaces.

### Pipe delimiter example

Before:

```text
a·|·bb·|·c
aaa·|·b·|·cc
```

Run:

```text
Align Delimited Block (|)
```

Result:

```text
a···|·bb·|·c
aaa·|·b··|·cc
```

---

### Custom delimiter example

Before:

```text
x·=>·10
long_variable·=>·20
y·=>·5
```

Run:

```text
Align Delimited Block (Custom Delimiter)
```

Enter:

```text
=>
```

Result:

```text
x·············=>·10
long_variable·=>·20
y·············=>·5
```

---

### CJK example

Before:

```text
name·|·value
長い名前·|·10
x·|·5
```

Result:

```text
name·····|·value
長い名前·|·10
x········|·5
```

---

### LaTeX align example

Before:

```text
a·&·=·b·+·c
long·&·=·x
z·&·=·100
```

Delimiter:

```text
&
```

Result:

```text
a····&·=·b·+·c
long·&·=·x
z····&·=·100
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
