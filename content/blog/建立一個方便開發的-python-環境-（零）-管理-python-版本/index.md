---
title: 建立一個方便開發的 Python 環境 （零）- 管理 Python 版本
date: 2020-09-14T17:42:20.679Z
description: TBD
---
![Python Env](https://imgs.xkcd.com/comics/python_environment.png)

以我第一次拿到 macOS 中的 Python 環境來說， Python 的版本相當多，就像上面這張圖一樣，除了原生系統的 Python 大概就有六隻以外，使用了 Homebrew 還會有 Homebrew 的 Python，可能在某天 brew update 了，預設 Python 還會升級讓過去所有的 Python Soft Link 改變並且導致虛擬環境全部不能 activate，不熟 Homebrew 無奈只好去官方網站下載 Python，此時只看來源不論版本就已經有三個地方會放 Python。再加上每年幾乎都會有不少的功能推陳出新，在 2020-01-01 Python2 還沒有 EOF (End of Life) 之前多多少少會有人還會傾向使用 Python2 開發，同一時刻，許多人已經轉換到使用 3.4, 3.5 甚至 3.6 等較新的版本，然而作為開發者，就會需要同時擁有多個 Python 的版本在機器上來開發不同來源的 Python 專案。至少會需要用來跑 Python2 和 Python3.3+ 的 Python 程式碼，也許原作者使用了 F-String, 還會多需要 Python3.7+ 的 Python 來執行它。

Hmm... 聽起來不太妙，總要一個籠子來好好管理這些蛇，~~免得早晚被蛇咬到寫不出 code 來~~ ，`Pyenv` 就是那個籠子，以下將會介紹 `Pyenv` 的使用方式及運作原理以及一些不用 `Pyenv` 的替代方案。
## 系統 Python 不好嗎
使用系統的 Python 確實會有些問題的：
- 最基本的原因是該版本應該也不會是想要用的版本，現行的版本多為 3.6 - 3.8，稍微舊的系其統內建 Python 多半是 2.7, 3.3, 3.4 等，若有 3.6 可能已經相當堪用，但還是會有下述的問題。
- 由於是系統的 Python，每當要使用 pip 下載任何套件，可能會需要下 `sudo pip install` 的指令，然而一但全部東西都裝在全域，接下來的套件管理也將會是場災難，當這台機器的其他使用者要使用同套件的不同版本時，他將覆蓋先前的版本又或者他根本裝不了，也許帶上 `--user` 參數可以緩解這個狀況，但當不同 Project 有著不同的套件版本時，同樣的問題又誕生了，你可能會需要虛擬環境來進行管理，那又會有其他的問題要誕生了。
- 由於是系統的 Python，通常不太敢對它做出更動，以免相依於上面的整個系統壞掉，這也代表著你不能夠完全掌控它，當不可掌控的 Python 因為 OS 更新而發生什麼改變時，可能自己的專案也會跟著不可掌控了。
## 為什麼要使用 Pyenv
首先 Pyenv 解決了上述有關 Python 版本的全部問題，有著下列的好處
- 可以讓使用者依照自己需求切換全域的 Python 版本
- 可以基於不同專案決定該專案需要的 Python 版本
- 並且不會相依於 Python，是由 shell script 撰寫而成
- 可以透過修改環境變數來覆寫 Python 的版本

另外 Pyenv 本身並沒有提供虛擬環境控管，因此有關套件管理部分尚未得到解決，未來可能還需要自行使用內建的 `venv` module 或 `pyenv-virtualenv` plugin 來達成目的。

## Pyenv 基本使用方法

### 安裝 Pyenv (macOS)

安裝 Pyenv (macOS) 需要輸入下面的指令
```bash
brew update
brew install pyenv
```
其中也會有下載相依的套件：
```bash
brew install openssl readline sqlite3 xz zlib
```
並且依照官方文件教學設定
一般安裝後會在 Home 目錄下產出 `.pyenv` 的資料夾，其中包含 `versions`, `shims` 和`plugins`，分別會放的內容如下：

`versions`資料夾會放置下載的所有 Python 版本

`shims` 是 pyenv 用於截取使用者呼叫 python 的相關指令，並且將其所附帶的參數一併帶入至 pyenv 執行所想要執行的 Python 版本，`shims` 路徑會被加入至 `PATH` 環境變數當中

`plugins` 資料夾下放置的是 pyenv 相關的插件如管理虛擬環境的 `pyenv-virtualenv`、檢查安裝環境需求是否有誤的 `pyenv-doctor` 等。

### 使用 `pyenv install` 安裝 Python
接著可以輸入 `pyenv install PYTHON_VERSION` 來下載想要的 Python 版本，例如想要下載 3.8.0 版的話可以輸入：
```bash
pyenv install -v 3.8.0
```
`-v` 代表會輸出冗長模式說明其中安裝的執行內容，除此以外也可以透過 `pyenv install --list` 顯示全部可以下載的 Python 版本，可以再透過 `grep` 輸出想要的版本有哪些

### 使用 `pyenv global PYTHON_VERSION` 設定全域的 Python 版本

舉例來說，輸入 `pyenv global 3.8.0` 將會設定全域的 Python 版本為 3.8.0，設定後也可以輸入 `pyenv global` 來確認當前設定的 Python 版本為何。另外設定過後也可以在 `.pyenv` 上看到多出一個 `version`的檔案，其內容為當前設定的全域 Python 版本

### 使用 `pyenv local PYTHON_VERSION` 設定本地（local）的 Python 版本

舉例來說，輸入 `pyenv local 3.8.0` 將會設定本地（local）的版本為系統 3.8.0，設定後也同樣可以輸入 `pyenv local` 來確認當前設定的本地（local） pyenv 版本為何，並且在設定的該目錄下，可以看到一個 `.python-version` 檔案，其內容會是該本地（local）的 Python 版本

### 使用 `pyenv versions` 顯示已經安裝的 Python 版本

透過輸入 `pyenv versions` 可以輸出已經下載的所有 Python：
```bash
pyenv versions
  system
* 3.8.0 (set by /Users/xxx/.pyenv/version)
  3.8.5
```
`pyenv versions` 會顯示當下 local 或 global 的所使用的 Python 版本，括號內容為 Python 來源位置，另外若輸入 `pyenv version` 則不會顯示全部的 Python 可用版本，並只顯示當前使用的 Python 版本，且本地會優先於全域的版本。

### 使用 `pyenv which COMMAND` 得知目前的 COMMAND 來源

舉例來說，`pyenv which pip3` 會顯示當前使用的 `pip3` 來的來源會是哪個，可能會是系統的 `/usr/local/bin/pip3` 或是 `/Users/xxxx/.pyenv/versions/3.8.0/bin/pip3`，端看自己透過 `pyenv` 選用的 Python 版本決定，與 `which pip3` 差別在於，`which pip3` 會回傳的是 `~/.pyenv/shims` 下的 `pip3` 而無從得知 `pyenv` 選擇的版本為何。

### 使用 `pyenv uninstall PYTHON_VERSION` 解除安裝指定的 Python 版本

假設要刪除 Python 3.8.5 的話，只需要輸入 `pyenv uninstall 3.8.5`，則 pyenv 會刪除 `~/.pyenv/versions/3.8.5`

## Pyenv 其他使用方法

除了上述安裝、解除安裝、在不同 Scope 切換不同的 Python 版本以外，以下還有一些比較特別的使用方法

### 使用 `pyenv init` 


## 淺析 Pyenv 原理
## 替代方案
## 參考資料
- [這樣的開發環境沒問題嗎？](https://www.youtube.com/watch?v=6Nl0IYkU0hU)
- [Managing Multiple Python Versions With pyenv](https://realpython.com/intro-to-pyenv/#why-not-use-system-python)
- [Pyenv](https://github.com/pyenv/pyenv#understanding-path)
- [Pyenv Commands](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-global)