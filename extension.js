console.log("=== EXTENSION LOADED ===");

const vscode = require("vscode");
const align = require("./align");

// ★ 共通処理
async function runAlignment(editor, delimiter) {
  try {
    if (!delimiter || delimiter.length > 50) {
      return;
    }
    const document = editor.document;
    const cursorLine = editor.selection.active.line;
    const lines = [];
    for (let i = 0; i < document.lineCount; i++) {
      lines.push(document.lineAt(i).text);
    }
    const block = align.findBlock(lines, cursorLine, delimiter);
    if (!block) {
      vscode.window.showInformationMessage(
        `No delimited block found (delimiter: "${delimiter}")`,
      );
      return;
    }
    const target = lines.slice(block.start, block.end + 1);
    if (target.length < 2) {
      vscode.window.showInformationMessage("Nothing to align (only one line)");
      return;
    }
    const formatted = align.formatBlock(target, delimiter);
    if (target.join("\n") === formatted.join("\n")) {
      return;
    }
    const success = await editor.edit((editBuilder) => {
      for (let i = 0; i < formatted.length; i++) {
        const lineNumber = block.start + i;
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

  // 設定delimiter版
  const disposable = vscode.commands.registerCommand(
    "alignDelimitedBlock.align",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const config = vscode.workspace.getConfiguration("alignDelimitedBlock");
      const delimiter = (config.get("defaultDelimiter") || "|").trim() || "|";
      // ★ 共通処理呼ぶだけ
      await runAlignment(editor, delimiter);
    },
  );
  context.subscriptions.push(disposable);

  // Prompt版
  const disposablePrompt = vscode.commands.registerCommand(
    "alignDelimitedBlock.alignWithPrompt",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const delimiter = await vscode.window.showInputBox({
        prompt: "Enter delimiter",
        value: vscode.workspace
          .getConfiguration("alignDelimitedBlock")
          .get("defaultDelimiter", "|"),
      });
      if (delimiter === undefined) return;
      const trimmed = delimiter.trim();
      if (!trimmed) {
        vscode.window.showWarningMessage("Delimiter cannot be empty");
        return;
      }
      // ★ 共通処理呼ぶだけ
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
