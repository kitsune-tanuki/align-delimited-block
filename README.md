# Align Delimited Block

A VSCode extension that automatically aligns delimiter-structured text blocks around the cursor.

[🇯🇵 日本語版はこちら / Japanese README](./README.ja.md)

Align delimiter-structured text blocks instantly — with correct visual width.

<video src="https://raw.githubusercontent.com/kitsune-tanuki/align-delimited-block/main/assets/demo/basic.mp4"
       controls
       muted
       loop>
</video>

---

## Key features

* Full-width (CJK) support
* Multi-character delimiters
* No selection required
* Auto block detection
* Display-width based alignment

---

## Overview

This extension automatically aligns text structured with delimiters.

While common formatting tools align based on character count, they often cause misalignment when dealing with full-width (CJK) characters.

This extension calculates the actual "display width" to ensure text is visually aligned correctly.

---

## Features

* Align using the configured default delimiter (`|` by default)
* Align using a custom delimiter (user input)
* Supports multi-character delimiters (`=>`, `::`, `->`, etc.)
* Pre-fills the custom delimiter prompt based on the current line or selection
* Automatically detects contiguous structured lines around the cursor
* Skips single-line blocks
* No text selection required
* Avoids unnecessary edits when no alignment changes are needed
* Lightweight and fast
* Correctly aligns full-width characters (CJK support)
* Handles emoji and combining characters correctly
* Aligns by display width, not character count
* Includes improved validation and error handling

---

## Why this extension?

Many alignment tools count characters rather than actual display width.

This results in broken visual alignment when text includes Japanese, Chinese, Korean, or other full-width characters.

Example:

Typical formatter output:

```text
a   | b
日本語 | c
```

Expected alignment:

```text
a      | b
日本語 | c
```

This extension resolves the issue by calculating true visual width.

---

## How it works

Place the cursor inside a structured text block.

The extension automatically detects contiguous lines before and after the cursor that share the same delimiter structure and aligns them.

If the detected block contains only one line, alignment is skipped.

If the aligned result is identical to the original text, no edit is applied.

---

## Examples

> [!NOTE]
> For readability, spaces in the following examples are represented by `·` (MIDDLE DOT).
> The extension outputs normal spaces.

### Pipe delimiter example

Before:

```text
a·|·bb·|·c
aaa·|·b·|·cc
```

Run:

```text
Align Delimited Block (Default Delimiter)
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

| Command                                   | Description                                  |
| ----------------------------------------- | -------------------------------------------- |
| Align Delimited Block (Default Delimiter) | Align using the configured default delimiter |
| Align Delimited Block (Custom Delimiter)  | Align using a custom delimiter               |

---

## Keybindings

| Key          | Action                            |
| ------------ | --------------------------------- |
| Ctrl+Shift+A | Align using the default delimiter |
| Ctrl+Alt+A   | Align using a custom delimiter    |

---

## Use cases

Works well with:

* AsciiDoc tables
* LaTeX align environments
* Markdown tables
* Configuration files
* Column-aligned text
* Arrow expressions
* Any delimiter-structured text

---

## Requirements

No additional requirements.

---

## Extension Settings

This extension supports the following setting:

* `alignDelimitedBlock.defaultDelimiter`  
  Sets the delimiter used by **Align Delimited Block (Default Delimiter)** (`Ctrl+Shift+A`).  
  Default: `|`
* `alignDelimitedBlock.markdownTableCenterHeader`  
  If enabled, forces Markdown table headers to be centered, ignoring alignment markers such as `:---`, `---:`, or `:---:`.

---

## Notes

* Single-line blocks are intentionally skipped
* If alignment produces no changes, no edit is applied
* Empty or invalid delimiters are safely rejected

---

## Known Issues

No known issues at this time.

---

## License

MIT License

---

## Author

kitsune-tanuki

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and details.
