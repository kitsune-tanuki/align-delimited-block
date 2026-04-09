# Align Delimited Block

カーソル周辺の区切り文字付きテキストブロックを自動整列する VSCode 拡張です。

多くの整列ツールとは異なり、この拡張は **表示幅(display width)** を計算して整列します。そのため、日本語・中国語・韓国語などの全角文字や絵文字を含むテキストでも正しく揃います。

AsciiDocテーブル、LaTeX align環境、アロー式、設定ファイルなどに便利です。

---

## 特徴

* デフォルト区切り文字 (`|`) で整列
* 任意区切り文字で整列可能
* 複数文字区切り対応 (`=>`, `::`, `->` など)
* カーソル周辺の連続行を自動検出
* 選択不要
* 軽量・高速
* 全角文字 (CJK) 対応
* 絵文字対応
* 文字数ではなく表示幅で整列

---

## この拡張を作った理由

多くの整列ツールは文字数で整列するため、日本語などを含むと見た目が崩れます。

正しく動作しない例:

一般的なフォーマッターの結果:

```text
a   | b
日本語 | c
```

こうなってほしい整列:

```text
a      | b
日本語 | c
```

この拡張は表示幅を計算することでこの問題を解決します。

---

## 使い方

区切り構造の中にカーソルを置きます。

前後の連続行を自動検出して整列します。

---

## 例

> [!NOTE]
> 視認性を高めるため、以下の例ではスペースを `·` (MIDDLE DOT) で表記しています。
> 拡張機能の出力結果は、実際には標準的なスペースとなります。

### パイプ区切り

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

### カスタム区切り

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

### CJKの例

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

### LaTeX align環境の例

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

## コマンド

| コマンド                                 | 説明         |
| ---------------------------------------- | ------------ |
| Align Delimited Block (\|)               | パイプで整列 |
| Align Delimited Block (Custom Delimiter) | 任意区切り   |

---

## キーバインド

| キー         | 動作         |
| ------------ | ------------ |
| Ctrl+Shift+A | パイプ整列   |
| Ctrl+Alt+A   | カスタム整列 |

---

## 用途

* AsciiDocのテーブル
* LaTeX align環境
* Markdownのテーブル
* 設定ファイル
* カラム整形
* アロー式
* 区切りテキスト全般

---

## 必要条件

なし

---

## ライセンス

MIT License

---

## 作者

kitsune-tanuki
