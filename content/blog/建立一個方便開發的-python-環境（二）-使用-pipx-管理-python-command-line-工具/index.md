---
title: 建立一個方便開發的 Python 環境（二）- 使用 pipx 管理基於 Python 的 Command-Line 工具
date: 2020-09-20T09:35:07.698Z
description: 在這篇文章終將介紹 pipx 這個工具將可以解決什麼樣的問題，其中也將會介紹使用的方法，進而探究其中的運作原理。
---
## 為什麼要使用 pipx
在[上一篇文章](https://josix.tw/pip-porblems-and-current-stats/)中有提到，`pip` 有幾點使用時需要注意的地方，其中有包含 「安裝套件時一定要使用虛擬環境」、「永遠不要使用 `sudo pip install`」、「不要將套件安裝至全域」，針對這三點，非常合理的照做就會是自己創建一個獨立的虛擬環境，並且 activate 該虛擬環境或直接使用虛擬環境 `bin/` 中的指令來安裝自己想要的工具，最後再將該安裝完成的執行檔加入到 `PATH` 環境變數中。舉例來說，想要安裝一個 commandline 使用的 pipenv 工具並不會直接使用 `pip3 install pipenv` 來進行安裝，而是輸入下列的指令：
```bash
mkdir -p ~/.local/bin ~/.local/venvs
python3 -m venv ~/.local/venvs/pipenv
~/.local/venvs/pipenv/bin/pip install pipenv
ln -s ~/.local/venvs/pipenv/bin/pip ~/.local/bin
```
（擷取自：這樣的開發環境沒問題嗎？ — TP@PyConTW’18）

而 Flask 的作者 [Armin Ronacher](https://github.com/mitsuhiko) 也製作了 [pipsi](https://github.com/mitsuhiko/pipsi)（現已不維護） 來將上面所進行的工具打包起來提供使用者更好的使用體驗，受此影響 pipx 也跟著被 [Chad Smith](https://github.com/cs01/) 創造出來，並且包含了相似於 npx 的功能，讓使用者可以安裝使用該套件並隨後刪除。

這讓 pipx 有著以下的主要特色：
- 基於 pip 有 `list`、`upgrade` 和 `uninstall` 套件的功能。
- 可以在安裝套件時為每個套件建出一個分離的環境。
- 在暫時的虛擬環境中執行最新版的套件功能。
- 另外，所有指令都不會需要 `root` 權限，一切都在使用者權限下進行。

## pipx 基本使用方式

## pipx 怎麼運作

## 資料來源
- [這樣的開發環境沒問題嗎？ — TP@PyConTW’18](https://speakerdeck.com/uranusjr/zhe-yang-de-kai-fa-huan-jing-mei-wen-ti-ma?slide=31)
- [pipx Repository](https://github.com/pipxproject/pipx)
- [pipx Document](https://pipxproject.github.io/pipx/)
- [PEP 582](https://www.python.org/dev/peps/pep-0582/)