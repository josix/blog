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

而 Flask 的作者大大 [Armin Ronacher](https://github.com/mitsuhiko) 也製作了 [pipsi](https://github.com/mitsuhiko/pipsi)（現已不維護） 來將上面所進行的工具打包起來提供使用者更好的使用體驗，受此影響 pipx 也跟著被 [Chad Smith](https://github.com/cs01/) 大大創造出來，並且包含了相似於 npx 的功能，讓使用者可以安裝使用該套件並隨後刪除。

這讓 pipx 有著以下的主要特色：
- 基於 pip 同樣也有 `list`、`upgrade` 和 `uninstall` 套件的功能。
- 可以在安裝套件時為每個套件建出一個分離的環境，並可以在不啟動虛擬環境的情況下直接使用。
- 使用 `pipx run` 可以在暫時的虛擬環境中執行最新版的套件功能。
- 另外，所有指令都不會需要 `root` 權限，一切都在使用者權限下進行。

完美解決了上述提到的所以要注意的地方。

## pipx 基本使用方式

### 使用 `brew install pipx` 安裝 pipx (macOS)

**首先需要確認系統支援 Python 3.6+ 和 pip**

接者只需要輸入下方指令別可以使用 Homebrew 安裝 pipx：
```bash
brew install pipx
pipx ensurepath
```

pipx 也可以使用 pip 安裝，至於安裝 pipx 建議還是使用虛擬環境，使用 Python 的 venv 模組先建出虛擬環境再用其中的 pip 安裝，這樣確保全域的 pip 完全乾淨。

預設的虛擬環境位置會開設在 `~/.local/pipx/venvs` 下，而預設的 binary 執行檔會在 `~/.local/bin` 下，分別可以由 `PIPX_HOME` 和 `PIPX_BIN_DIR` 環境變數來覆寫成放置在 `$PIPX_HOME/venvs` 和 `$PIPX_BIN_DIR/bin`。

而 `pipx ensurepath` 作用為確認 pipx 所下載的 app 其執行檔位置有被加入至 `PATH` 環境變數中，若[沒有則會加進去](https://github.com/pipxproject/pipx/blob/master/src/pipx/commands/ensure_path.py#L61)。

### 使用 `pipx completions` 顯示自動補全設定指示
輸入 `pipx completions` 後將會輸出：
```
Add the appropriate command to your shell's config file
so that it is run on startup. You will likely have to restart
or re-login for the autocompletion to start working.

bash:
    eval "$(register-python-argcomplete pipx)"

zsh:
    To activate completions for zsh you need to have
    bashcompinit enabled in zsh:

    autoload -U bashcompinit
    bashcompinit

    Afterwards you can enable completion for pipx:

    eval "$(register-python-argcomplete pipx)"

tcsh:
    eval `register-python-argcomplete --shell tcsh pipx`

fish:
    register-python-argcomplete --shell fish pipx | source
```
有對於不同 shell 給予不同的指示，遵循其操作便可以讓 pipx 可以自動補全。以 zsh 舉例，只需要將
```
autoload -U bashcompinit
bashcompinit
eval "$(register-python-argcomplete pipx)"
```
加入至 `.zshrc` 就可以在 shell 中讓 pipx 可以按 tab 自動補全。

### 使用 `pipx install <package_spec>` 安裝套件

當使用 `pipx install <package_spec>` 後， pipx 會為將要安裝的套件開啟一個虛擬環境，並且將該套件安裝到裡面，再為其執行檔複製或建立一個 sympolic link 到 `$PIPX_BIN_DIR/bin` 下，供使用者直接調用。

`<package_spec>` 並不限定是套件名稱只要是符合 pip 安裝規範（pip installation spec）的都可以，如 VCS_URL, ZIP_FILE, TAR_GZ_FILE 都是可以的，使用範例如下：
```
pipx install pycowsay
pipx install --python python3.6 pycowsay
pipx install --python python3.7 pycowsay
pipx install git+https://github.com/psf/black
pipx install git+https://github.com/psf/black.git@branch-name
pipx install git+https://github.com/psf/black.git@git-hash
pipx install https://github.com/psf/black/archive/18.9b0.zip
pipx install black[d]
```
其中可以發現有 `--python` 這個選項是用於要開啟虛擬環境的 Python 版本，其限定必須是 Python3.5 以上。

其他常見的選項還有 `--force -f` 用於安裝時修改已經存在的虛擬環境及已安裝的檔案， `--editable -e` 用於使用可編輯模式（editable mode）安裝，讓你可以在開發套件同時可以直接在環境下使用開發中的版本。

安裝完套件之後將可以發現有幾個目錄[依照預設](https://github.com/pipxproject/pipx/blob/master/src/pipx/constants.py#L6)會出現在 `~/.local/pipx` 或覆寫的 `$PIPX_HOME` 路經當中：
- `shared`: `shared` 為 pipx 在執行安裝套件之前建立之前，預設透過 `python -m venv --clear shared` 會建立的第一個虛擬環境，其中包含了供後續安裝其他套件共用的 `pip`，建立過一次之後每次安裝套件都會檢查是否可用，並且會隔[特定時間（30 天）](https://github.com/pipxproject/pipx/blob/master/src/pipx/shared_libs.py#L45)升級更新。
- `venvs`: 
- `.cache`:


## pipx 怎麼運作

## 資料來源
- [這樣的開發環境沒問題嗎？ — TP@PyConTW’18](https://speakerdeck.com/uranusjr/zhe-yang-de-kai-fa-huan-jing-mei-wen-ti-ma?slide=31)
- [pipx Repository](https://github.com/pipxproject/pipx)
- [pipx Document](https://pipxproject.github.io/pipx/)
- [PEP 582](https://www.python.org/dev/peps/pep-0582/)