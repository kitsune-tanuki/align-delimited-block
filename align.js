function charWidth(ch) {
  if (/[\u0000-\u001f\u007f]/.test(ch)) return 0;
  const code = ch.codePointAt(0);
  if (
    (code >= 0x0300 && code <= 0x036f) ||
    (code >= 0x1ab0 && code <= 0x1aff) ||
    (code >= 0x1dc0 && code <= 0x1dff) ||
    (code >= 0x20d0 && code <= 0x20ff) ||
    (code >= 0xfe20 && code <= 0xfe2f)
  )
    return 0;
  if (
    (code >= 0x1100 && code <= 0x115f) ||
    (code >= 0x2329 && code <= 0x232a) ||
    (code >= 0x2e80 && code <= 0xa4cf) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe10 && code <= 0xfe19) ||
    (code >= 0xfe30 && code <= 0xfe6f) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6) ||
    (code >= 0x1f300 && code <= 0x1faff)
  )
    return 2;
  return 1;
}

function stringWidth(str) {
  return Array.from(str).reduce((sum, ch) => sum + charWidth(ch), 0);
}

function padRightByWidth(str, width) {
  const w = stringWidth(str);
  if (w >= width) return str;
  return str + " ".repeat(width - w);
}

function splitPreserveLeading(line, sep) {
  const leading = line.match(/^\s*/)[0];
  const body = line.slice(leading.length);
  if (!body.includes(sep)) return null;
  const rawParts = body.split(sep);
  return {
    leading,
    rawParts,
    parts: rawParts.map((s) => s.trim()),
  };
}

function isBorderLike(line, sep) {
  const t = line.trim();
  return t.startsWith(sep) && /^(\|=+)$/.test(t);
}

function isTargetLine(line, sep) {
  if (line.trim() === "") return false;
  if (!line.includes(sep)) return false;
  return true;
}

function findBlock(lines, cursor, sep) {
  if (cursor < 0 || cursor >= lines.length) return null;
  if (!isTargetLine(lines[cursor], sep)) return null;
  let start = cursor;
  let end = cursor;
  while (start - 1 >= 0 && isTargetLine(lines[start - 1], sep)) {
    start--;
  }
  while (end + 1 < lines.length && isTargetLine(lines[end + 1], sep)) {
    end++;
  }
  return { start, end };
}

function formatBlock(blockLines, sep) {
  const parsed = [];
  const widths = [];
  for (const line of blockLines) {
    if (isBorderLike(line, sep)) {
      parsed.push({
        type: "raw",
        line,
      });
      continue;
    }
    const info = splitPreserveLeading(line, sep);
    if (!info) {
      parsed.push({
        type: "raw",
        line,
      });
      continue;
    }
    const { leading, parts, rawParts } = info;
    let cells = parts;
    let starts = false;
    let ends = false;
    if (rawParts[0] === "") {
      starts = true;
      cells = cells.slice(1);
    }
    if (rawParts[rawParts.length - 1] === "") {
      ends = true;
      cells = cells.slice(0, -1);
    }
    parsed.push({
      type: "row",
      leading,
      starts,
      ends,
      cells,
    });
    while (widths.length < cells.length) {
      widths.push(0);
    }
    cells.forEach((cell, i) => {
      widths[i] = Math.max(widths[i], stringWidth(cell));
    });
  }
  return parsed.map((entry) => {
    if (entry.type === "raw") return entry.line;
    const padded = entry.cells.map((cell, i) =>
      padRightByWidth(cell, widths[i]),
    );
    let line = entry.leading;
    if (entry.starts) line += sep;
    if (padded.length > 0) {
      if (entry.starts) line += " ";
      line += padded.join(" " + sep + " ");
    }
    if (entry.ends) {
      if (padded.length > 0) line += " ";
      line += sep;
    }
    return line.replace(/[ \t]+$/, "");
  });
}

module.exports = {
  findBlock,
  formatBlock,
};
