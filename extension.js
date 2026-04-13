console.log("=== EXTENSION LOADED ===");

const vscode = require("vscode");
const align = require("./align");

function validateDelimiter(delimiter) {
  if (!delimiter) {
    return "Delimiter cannot be empty";
  }
  if (delimiter.length > 50) {
    return `Delimiter is too long (${delimiter.length}/50)`;
  }
  return null;
}

function detectDelimiterFromText(text) {
  const candidates = ["=>", "->", "::", "||", "|", "&", "=", ":"];
  const counts = new Map(candidates.map((d) => [d, 0]));
  for (let i = 0; i < text.length; ) {
    let matched = null;
    for (const delimiter of candidates) {
      if (text.startsWith(delimiter, i)) {
        matched = delimiter;
        break;
      }
    }
    if (matched) {
      counts.set(matched, counts.get(matched) + 1);
      i += matched.length;
    } else {
      i += 1;
    }
  }
  let best = null;
  let bestCount = 0;
  for (const delimiter of candidates) {
    const count = counts.get(delimiter);
    if (count > bestCount) {
      best = delimiter;
      bestCount = count;
    }
  }
  return bestCount > 0 ? best : null;
}

function getSuggestedDelimiter(editor) {
  const config = vscode.workspace.getConfiguration("alignDelimitedBlock");
  const fallback = config.get("defaultDelimiter", "|");
  const selection = editor.selection;
  if (!selection.isEmpty) {
    const selectedText = editor.document.getText(selection);
    const detected = detectDelimiterFromText(selectedText);
    if (detected) {
      return detected;
    }
  }
  const lineText = editor.document.lineAt(selection.active.line).text;
  return detectDelimiterFromText(lineText) || fallback;
}

function getTargetLines(editor, delimiter) {
  const document = editor.document;
  const selection = editor.selection;
  const lines = [];
  for (let i = 0; i < document.lineCount; i++) {
    lines.push(document.lineAt(i).text);
  }
  if (!selection.isEmpty) {
    const startLine = selection.start.line;
    const endLine = selection.end.line;
    return {
      start: startLine,
      end: endLine,
      lines: lines.slice(startLine, endLine + 1),
      mode: "selection",
    };
  }
  const cursorLine = selection.active.line;
  const block = align.findBlock(lines, cursorLine, delimiter);
  if (!block) {
    return null;
  }
  return {
    start: block.start,
    end: block.end,
    lines: lines.slice(block.start, block.end + 1),
    mode: "block",
  };
}

// 共通処理
async function runAlignment(editor, delimiter) {
  try {
    const error = validateDelimiter(delimiter);
    if (error) {
      vscode.window.showWarningMessage(error);
      return;
    }
    const document = editor.document;
    const targetInfo = getTargetLines(editor, delimiter);
    if (!targetInfo) {
      vscode.window.showInformationMessage(
        `No delimited block found (delimiter: "${delimiter}")`,
      );
      return;
    }
    const target = targetInfo.lines;
    if (target.length < 2) {
      vscode.window.showInformationMessage("Nothing to align (only one line)");
      return;
    }
    const config = vscode.workspace.getConfiguration("alignDelimitedBlock");
    const formatted = align.formatBlock(target, delimiter, {
      markdownTableCenterHeader: config.get("markdownTableCenterHeader", false),
    });
    if (target.join("\n") === formatted.join("\n")) {
      return;
    }
    const success = await editor.edit((editBuilder) => {
      for (let i = 0; i < formatted.length; i++) {
        const lineNumber = targetInfo.start + i;
        const line = document.lineAt(lineNumber);
        editBuilder.replace(line.range, formatted[i]);
      }
    });
    if (!success) {
      vscode.window.showWarningMessage("Alignment failed");
    }
  } catch (err) {
    vscode.window.showErrorMessage("Alignment error: " + err.message);
    console.error(err);
  }
}

function activate(context) {
  console.log("=== ACTIVATE CALLED ===");

  const disposable = vscode.commands.registerCommand(
    "alignDelimitedBlock.align",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const config = vscode.workspace.getConfiguration("alignDelimitedBlock");
      const delimiter = (config.get("defaultDelimiter") || "|").trim() || "|";
      await runAlignment(editor, delimiter);
    },
  );
  context.subscriptions.push(disposable);

  const disposablePrompt = vscode.commands.registerCommand(
    "alignDelimitedBlock.alignWithPrompt",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const suggested = getSuggestedDelimiter(editor);
      const delimiter = await vscode.window.showInputBox({
        prompt: "Enter delimiter",
        value: suggested,
      });
      if (delimiter === undefined) return;
      const trimmed = delimiter.trim();
      const error = validateDelimiter(trimmed);
      if (error) {
        vscode.window.showWarningMessage(error);
        return;
      }
      await runAlignment(editor, trimmed);
    },
  );
  context.subscriptions.push(disposablePrompt);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
