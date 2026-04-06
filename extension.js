console.log("=== EXTENSION LOADED ===");

const vscode = require("vscode");
const align = require("./align");

function activate(context) {

  console.log("=== ACTIVATE CALLED ===");

  // 決め打ち版
  const disposable = vscode.commands.registerCommand(
    "alignDelimitedBlock.align",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const document = editor.document;
      const cursorLine = editor.selection.active.line;
      const lines = [];
      for (let i = 0; i < document.lineCount; i++) {
        lines.push(document.lineAt(i).text);
      }
      const block = align.findBlock(lines, cursorLine, "|");
      if (!block) return;
      const target = lines.slice(block.start, block.end + 1);
      const formatted = align.formatBlock(target, "|");
      editor.edit((editBuilder) => {
        for (let i = 0; i < formatted.length; i++) {
          const lineNumber = block.start + i;
          const line = document.lineAt(lineNumber);
          editBuilder.replace(line.range, formatted[i]);
        }
      });
    }
  );
  context.subscriptions.push(disposable);

  // ★ 入力版（ここに追記）
  const disposablePrompt = vscode.commands.registerCommand(
    "alignDelimitedBlock.alignWithPrompt",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const sep = await vscode.window.showInputBox({
        prompt: "Enter delimiter (default: |)",
        value: "|"
      });
      if (!sep) return;
      const document = editor.document;
      const cursorLine = editor.selection.active.line;
      const lines = [];
      for (let i = 0; i < document.lineCount; i++) {
        lines.push(document.lineAt(i).text);
      }
      const block = align.findBlock(lines, cursorLine, sep);
      if (!block) return;
      const target = lines.slice(block.start, block.end + 1);
      const formatted = align.formatBlock(target, sep);
      editor.edit((editBuilder) => {
        for (let i = 0; i < formatted.length; i++) {
          const lineNumber = block.start + i;
          const line = document.lineAt(lineNumber);
          editBuilder.replace(line.range, formatted[i]);
        }
      });
    }
  );
  context.subscriptions.push(disposablePrompt);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
