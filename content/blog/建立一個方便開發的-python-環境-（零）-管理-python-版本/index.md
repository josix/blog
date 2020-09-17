---
title: 建立一個方便開發的 Python 環境 （零）- 管理 Python 版本
date: 2020-09-14T17:42:20.679Z
description: 此篇文章將會紀錄過去在 macOS 上自己管理不同 Python 版本的痛處，為了解決該問題而嘗試透過 pyenv 管理 Python
  版本的使用筆記，並且也會稍微研究其運作的原理和介紹其他可能替代方案。
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

一般安裝後會在家目錄下產出 `.pyenv` 的資料夾，其中包含 `versions`, `shims` 和`plugins`，分別會放的內容如下：

`versions` 資料夾會放置下載的所有 Python 版本

`shims` 是 pyenv 用於截取使用者呼叫 python 的相關指令，並且將其所附帶的參數一併帶入至 pyenv 執行所想要執行的 Python 版本，`shims` 路徑會被加入至 `PATH` 環境變數當中

`plugins` 資料夾下放置的是 pyenv 相關的插件如管理虛擬環境的 `pyenv-virtualenv`、檢查安裝環境需求是否有誤的 `pyenv-doctor` 等。

### 使用 `pyenv init` 啟動 shims 及自動補全的功能

在官方文件中有提到，若希望可以讓 shell 啟動 shims 及有自動補全的功能，需要將 `pyenv init` 指令加入到 shell 配置 （configuration file）中

```bash
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile
```

> 若是 zsh 的話會需要輸出至 `.zshrc`

**請注意，由於 `pyenv init` 會改變 `PATH` 環境變數的內容，使 shell 應該要優先使用 `~/.pyenv/shims` 內的指令，請確認該指令位於配置檔案的最下方**

完成後，可以重新啟動 `shell` 讓 `PATH` 的路徑改變可以重新載入：
```bash
exec "$SHELL"
```

`pyenv init -` 會輸出一些 shell 腳本，例如在 zsh 下呼叫下會輸出：（可參考[原始碼](https://github.com/pyenv/pyenv/blob/master/libexec/pyenv-init)）
```bash
export PATH="/Users/xxxx/.pyenv/shims:${PATH}"
export PYENV_SHELL=zsh
source '/usr/local/Cellar/pyenv/1.2.20/libexec/../completions/pyenv.zsh'
command pyenv rehash 2>/dev/null
pyenv() {
  local command
  command="${1:-}"
  if [ "$#" -gt 0 ]; then
    shift
  fi

  case "$command" in
  rehash|shell)
    eval "$(pyenv "sh-$command" "$@")";;
  *)
    command pyenv "$command" "$@";;
  esac
}
```
其中做了以下的事情：
- 修改 `PATH` 環境變數，使其加入 "${PYENV_ROOT}/shims/"，讓之後的指令可以優先選擇 shims 中的指令執行
- 新增 `PYENV_SHELL` 環境變數，此變數將會於下方 `pyenv rehash` 及 `pyenv shell` 使用
- 導入 `pyenv` 自動補全腳本
- 執行 `pyenv rehash` 安裝 shims

### 使用 `pyenv install` 安裝 Python
接著可以輸入 `pyenv install <python_version>` 來下載想要的 Python 版本，例如想要下載 3.8.0 版的話可以輸入：
```bash
pyenv install -v 3.8.0
```
`-v` 代表會輸出冗長模式說明其中安裝的執行內容，除此以外也可以透過 `pyenv install --list` 顯示全部可以下載的 Python 版本，可以再透過 `grep` 輸出想要的版本有哪些

### 使用 `pyenv global <python_version>` 設定全域的 Python 版本

舉例來說，輸入 `pyenv global 3.8.0` 將會設定全域的 Python 版本為 3.8.0，設定後也可以輸入 `pyenv global` 來確認當前設定的 Python 版本為何。另外設定過後也可以在 `.pyenv` 上看到多出一個 `version` 的檔案，其內容為當前設定的全域 Python 版本

### 使用 `pyenv local <python_version>` 設定區域的 Python 版本

舉例來說，輸入 `pyenv local 3.8.0` 將會設定區域的版本為系統 3.8.0，設定後也同樣可以輸入 `pyenv local` 來確認當前設定的區域 pyenv 版本為何，並且在設定的該目錄下，可以看到一個 `.python-version` 檔案，其內容會是該區域的 Python 版本

### 使用 `pyenv versions` 顯示已經安裝的 Python 版本

透過輸入 `pyenv versions` 可以輸出已經下載的所有 Python：
```bash
$ pyenv versions
  system
* 3.8.0 (set by /Users/xxx/.pyenv/version)
  3.8.5
```
`pyenv versions` 會顯示當下 local 或 global 的所使用的 Python 版本，括號內容為 Python 來源位置，另外若輸入 `pyenv version` 則不會顯示全部的 Python 可用版本，並只顯示當前使用的 Python 版本，且本地會優先於全域的版本。

### 使用 `pyenv which <command>` 得知目前的 command 來源

舉例來說，`pyenv which pip3` 會顯示當前使用的 `pip3` 來的來源會是哪個，可能會是系統的 `/usr/local/bin/pip3` 或是 `/Users/xxxx/.pyenv/versions/3.8.0/bin/pip3`，端看自己透過 `pyenv` 選用的 Python 版本決定，與 `which pip3` 差別在於，`which pip3` 會回傳的是 `~/.pyenv/shims` 下的 `pip3` 而無從得知 `pyenv` 選擇的版本為何。

### 使用 `pyenv uninstall <python_version>` 解除安裝指定的 Python 版本

假設要刪除 Python 3.8.5 的話，只需要輸入 `pyenv uninstall 3.8.5`，則 pyenv 會刪除 `~/.pyenv/versions/3.8.5`

## Pyenv 其他使用方法

除了上述安裝、解除安裝、在不同 Scope 切換不同的 Python 版本以外，以下還有一些比較特別的使用方法


### 使用 `pyenv shell`
在 shell 配置檔末加入 `pyenv init -` 將可以自動載入 `pyenv`，接著才能夠使用 `pyenv shell`

`pyenv shell <verison>` 將可以設定 PYENV_VERSION 環境變數，作為 shell 使用的 Python 版本，此版本將會覆蓋全域及區域的 Python 版本，若不需要可以使用 `pyenv shell --unset` 取消。

當想要在 shell 中使用多個版本的 Python 的話，可以輸入 `pyenv shell <version>...`，輸入後便可以在環境中使用 Python 的版本，舉例來說，想要可以使用 2.7.7 和 3.8.0 的話可以輸入 `pyenv shell 2.7.6 3.8.0`，接著可以看到下面的結果：
```bash
$ pyenv versions
  system
* 2.7.6 (set by PYENV_VERSION environment variable)
* 3.3.3 (set by PYENV_VERSION environment variable)
$ python --version
Python 2.7.6
$ python2.7 --version
Python 2.7.6
$ python3.3 --version
Python 3.3.3
```

輸入比較前面的版號將會為是優先使用的 Python 版本，所以指令 python 會使用 2.7.6

另外，`pyenv global` 和 `pyenv local` 同樣接受多個版本號的參數，作用如同 `pyenv shell` 輸入多個版本號，差別在於 `pyenv shell` 版本將會覆蓋 `pyenv local` 版本，並且 `pyenv local` 版本會覆蓋 `pyenv global` 版本。

### 使用 `pyenv rehash`

`pyenv rehash` 是在每次下載新的 Pyton 版本時，用於更新 Shims 可以使用的指令，其實在 `pyenv init` 和 `pyenv install` 中都會在執行這個指令，供使用者方便使用。

## 淺析 Pyenv 原理

如同前面介紹 `pyenv init` 時提及的， `pyenv` 將會修改 `PATH` 這個環境變數，要了解 Pyenv 的運作怎麼切換不同版本的 Python 首先要先了解 `PATH` 環境變數，以及 Shims 在 Pyenv 中扮演的角色為何。

### `PATH` 環境變數

當想要在 shell 中執行任何指令時，系統首先要知道這些指令是什麼，然而系統便會去一個個的路徑尋找相同名字的可執行檔案，而這些路徑將會首先定義在 `PATH` 環境變數中，若在 shell 中執行 `echo $PATH` 將可以看到一串由冒號分隔的字串，例如：
```
/Users/xxx/.pyenv/shims:/usr/local/opt/llvm/bin:/Users/xxx/torch/install/bin:/Library/Frameworks/Python.framework/Versions/3.5/bin:/opt/local/bin/:/Users/xxx/bin
```
系統將會由左至右開始查找，因此在前面的目錄先找到的話便不會往下繼續找，而當輸入 `eval "$(pyenv init -)"` 時會將把 "${PYENV_ROOT}/shims" 加入 `PATH` 的最前面，因此達到呼叫 Pyenv `shims` 中的指令而非系統的。

### Shim 是什麼

Shim 在維基百科的解釋是：
> In computer programming, a shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere.

大意指的是 Shim 的主要工作就是擷取 API 呼叫並且改變其中的參數，並改變後的參數傳給其他執行單元執行、或自身處理。
而在 "${PYENV_ROOT}/shims" 中的每支腳本都是做這樣的事情（Pyenv 稱之為 rehashing），其中的程式碼如下：
```bash
#!/usr/bin/env bash
set -e
[ -n "$PYENV_DEBUG" ] && set -x

program="${0##*/}"
if [[ "$program" = "python"* ]]; then
  for arg; do
    case "$arg" in
    -c* | -- ) break ;;
    */* )
      if [ -f "$arg" ]; then
        export PYENV_FILE_ARG="$arg"
        break
      fi
      ;;
    esac
  done
fi

export PYENV_ROOT="/Users/wilson/.pyenv"
exec "/usr/local/Cellar/pyenv/1.2.20/libexec/pyenv" exec "$program" "$@"
```
其中會將輸入的指令及參數帶入至 `pyenv exec` 執行，這些檔案也是在 `pyenv rehash` 時建立的。

### `pyenv exec` 在做什麼

查看[原始碼](https://github.com/pyenv/pyenv/blob/master/libexec/pyenv-exec)可以發現，下面者一段：

```bash
PYENV_COMMAND_PATH="$(pyenv-which "$PYENV_COMMAND")"
PYENV_BIN_PATH="${PYENV_COMMAND_PATH%/*}"
# ...
if [ "${PYENV_BIN_PATH#${PYENV_ROOT}}" != "${PYENV_BIN_PATH}" ]; then
  # Only add to $PATH for non-system version.
  export PATH="${PYENV_BIN_PATH}:${PATH}"
fi
exec "$PYENV_COMMAND_PATH" "$@"
```
中透過呼叫 `pyenv which` 可以得出當前使用的 Python 版本，並且取得其 `bin/` 位置加入至 `PATH` 環境變數，最後再帶入原先帶入的參數執行。

## 替代方案

- 若不希望使用 pyenv 的 Shim，也不希望看到像是 `.python-version`, `version`, `PYTHON_VERSION` 這樣的檔案或變數在，也可以透過 pyenv 中的 python-build 來幫助自己下載 特定的 Python 版本並解壓縮、編譯到想要的位置。
擷取自 PyConTW'18 TP 大大的分享：
```bash
$ python-build 3.6.5 ~/.local/pythons/3.6
$ python-build 3.5.4 ~/.local/pythons/3.5
$ ln -s ~/.local/pythons/3.6/python3.6 ~/.local/bin
$ ln -s ~/.local/pythons/3.5/python3.5 ~/.local/bin
$ ln -s ~/.local/bin/python3.6 ~/.local/bin/python3
```

- 若不使用 Pyenv 也完全不希望使用系統的 Python 版本，可以將下列指令放入 shell 配置檔中，同樣取自 PyConTW'18 TP 大大的分享：
```bash
python() {
  local PYTHON="$(which python)"
  if [[ "$PYTHON" == /usr/* ]];
  then
     echo "nope" >&2 | echo >/dev/null
  else
     "$PYTHON" "$@"
  fi
}
```
如此便可以避免呼叫到系統的 Python 版本。


## 參考資料
- [這樣的開發環境沒問題嗎？ (-- TP@PyConTW'18 )](https://www.youtube.com/watch?v=6Nl0IYkU0hU) [(slides)](https://speakerdeck.com/uranusjr/zhe-yang-de-kai-fa-huan-jing-mei-wen-ti-ma)
- [Managing Multiple Python Versions With pyenv](https://realpython.com/intro-to-pyenv/#why-not-use-system-python)
- [Pyenv](https://github.com/pyenv/pyenv#understanding-path)
- [Pyenv Commands](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-global)
- [
Deep dive into how pyenv actually works by leveraging the shim design pattern](https://mungingdata.com/python/how-pyenv-works-shims/#:~:text=Shims%20are%20lightweight%20executables%20that,the%20beginning%20of%20your%20PATH)
- [PATH (variable)](https://en.wikipedia.org/wiki/PATH_(variable)#:~:text=PATH%20is%20an%20environment%20variable,has%20its%20own%20PATH%20setting.)
- [Shim Wiki](https://en.wikipedia.org/wiki/Shim_(computing))
## 其他備註
- [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) （看原始碼會需要知道一些 Expansion 的意思）
