---
title: 建立一個方便開發的 Python  環境（一）- pip 過去存在的問題與現況
date: 2020-09-19T14:15:43.810Z
description: 在這篇文章中將會簡介何謂套件管理以及 pip 使用尚有哪些問題及需要注意的地方，而針對這些問題有什麼解決辦法近期又有那些工具或修正正在進行。
---
<!--
- What is a neat dev environment
- what is the difference between pip
- PEP 518 (https://www.python.org/dev/peps/pep-0518/)
- https://medium.com/@grassfedcode/pep-517-and-518-in-plain-english-47208ca8b7a6
- Current Recommended Tools
-->
## 什麼是套件管理工具 (Package Manager)
無論是在開發時或是在系統安裝第三方軟體時，你可能會在安裝說明文件上看過 `pip install`、`npm install`、`apt-get install`、`brew install` 等指令，而在你輸入這些指令時，你就正在操作套件管理工具下載並安裝軟體了！套件管理工具（Package Manager）如 `pip`、`npm`、`yarn`、`apt-get`等相當常在你日常的操作中出現（你可以在[這裡](https://en.wikipedia.org/wiki/List_of_software_package_management_systems)找到各個語言、不同使用情境的套件管理工具），他們的存在最主要是為了讓你更加方便安裝、刪除、升級原有系統或開發語言所缺少的第三方工具。以撰寫科學計算的程式為例，當你發現 Python 沒有算特徵值、特徵向量的模組而又不想要自己造輪子時，你可能會在 [PyPI](https://pypi.org/) 這個 Python 官方第三方軟體倉儲找到 `NumPy` 是完全符合你的需求的，並且依照指示在終端機輸入 `pip install numpy` 指令後，你就可以在你的程式中呼叫 NumPy 這個套件所提供的所有函式、類別，而也許隨著時間久了，`NumPy` 發佈了更新的版本，你可以透過 `pip install numpy --upgrade` 升級並使用最新的 API，或者有天你發現更好的工具想要刪除 `NumPy`，你可以用 `pip uninstall numpy` 刪掉它。然而 像 pip 這樣的 Python 內建套件管理工具的看似方便管理許多第三方套件，但隨著產品開發的複雜度增加，卻也慢慢出現了一些開發上不方便之處。
## pip 的一些問題

pip 看似方便，可以用來下載第三方套件，然而卻也有著下列的問題：
- 基於先前提到過在環境之中有著多個版本 Python 的問題，隨著不同的 Python 版本也會有不同版本的 pip，那麼當在輸入指令 `pip` 時，難以得知自己使用的 pip 是哪一個版本的，必須自行查看 `PATH` 的優先度，並且確認該路徑下的 Python 是哪個版本。
- pip 安裝的第三方套件皆為全域，也就是說，當今天有多個專案要同時進行開發，但專案之間有用著相同套件但有著不同的版本，由於 pip 只能夠安裝一個版本，將會導致有一個專案可能不能夠運作。
- pip 通常會使用 Requirements File 將已經安裝的版本以特定格式紀錄（如下面範例，參閱 [PEP 440](https://www.python.org/dev/peps/pep-0440/)），然而這樣的紀錄方式，卻讓人難以發現套件彼此的相依性為何，常常發生安裝了一個套件，`pip freeze` 之後卻跳出了一堆相依且不知道哪裡來的套件，而要解除安裝時，卻無法將所有相依的套件也一並刪除掉。
```
appdirs==1.4.4
argcomplete==1.12.0
attrs==19.3.0
black==19.10b0
click==7.1.2
pathspec==0.8.0
pipx==0.15.4.0
regex==2020.7.14
toml==0.10.1
typed-ast==1.4.1
userpath==1.4.1
```
- Requirements File 的內容若規則未定義清楚，也容易產生相依性衝突，舉例來說當要安裝 `requests` 時，並不會知道安裝的版本為哪一版（通常是 PyPI 上最新的版本），也因此當專案要協作時，需透過 Requirements File 中寫清楚每個使用的套件版號，用來統一好大家應該要使用哪個版本來進行安裝，但相對 JS 中的 `package.json` 並沒有明確地將 dev 與 prod 時使用的相依套件區隔出來，並且也缺少了 Lock File 明確指出要的版本。


## 使用 pip 需要注意的地方

針對上述的問題，前兩點可以透過下方的實踐來避免：

- 所有套件請都使用虛擬環境安裝：如同前面所提到的，為了避免使用 pip 所安裝的套件都安裝到全域而導致不同專案使用的套件產生衝突，最好的做法是依照專案建立不同區域的（local）虛擬環境，以確保每個專案中使用到的套件是獨立的不會互相影響。即便沒有專案，也請不要在將套件安裝到系統當中，可以使用 `pipx` 來安裝系統會使用到的套件，原因是要避免影響到系統相依的套件進而導致系統故障，因此使用者需注意「請ㄧ定要使用虛擬環境」、「請不要將套件安裝至全域」。
- 永遠不要 `sudo pip intall`：在使用 `pip install` 不要使用 `sudo` 一方面是因為如上一點所述，不應該將套件安裝至全域。另一方面，這樣將出現讓惡意軟體有權限以 root 身份執行 setup.py 的機會，進而獲得使用者資訊或進行其他有安全疑慮的行為，事實上 PyPI 上過去也有許多命名假以亂真的套件（例如此 [issue](https://github.com/pypa/warehouse/issues/3948)），若不小心安裝到可能會洩漏個人資訊。
- 使用 `python3.X -m pip` 而不是 `pip install`：為避免當使用者擁有多版 Python 版本時，使用自己不明確的 pip 版本，最好的做法會是習慣使用特定版本的直譯器呼叫該版本的 pip 進行安裝，以免搞亂自己的安裝環境。即便可以搭配上一篇的 `pyenv` 使用 `pip`，但我想透過 `python3.X -m pip` 使用 pip 雖然字數較多，但卻還是一個表達比較明確的指令，以避免歧義。
- 在 Requirements File 中定出明確的版本號：在 `requirements.txt` 中，需要完全定義好每一個相依版本的版本號，只使用 `==` 確認每一個相依套件版本，若使用 `>=`、`<=` 等規則決定要安裝的相依套件，則可能導致安裝到相依套件彼此衝突的版本，因此在要釋出開發時所需的相依套件時，請務必只使用 `==` 確定每一個套件的版本號。

## Python 套件管理近況

- pip's new resolver：在今年 (2020) Mozilla 和 Chan Zuckerberg Initiative的幫助下將推動 pip 的 dependency resolver 發展，pip 在 20.x 版本之中將可以使用 resolver 來解決相依套件之間的版本衝突問題，這將加強 pip 在安裝相依套件時維持套件之間的一致性，舉例來說，過去 `pip install "six<1.12" "virtualenv==20.0.2"` 將會下載到 `six==1.11 ` 然而 `virtualenv==20.0.2` 需要的是 `six>=1.12.0,<2` [（參閱此連結）](https://github.com/pypa/virtualenv/blob/20.0.2/setup.cfg#L42-L50)，而在新版本推出後，將會顯示錯誤資訊拒絕安裝。

- pip 的替代方案：同樣為了解決上方所述的問題，也發展出了許多可使用的替代套件管理工具，如此[連結](https://grassfedcode.com/python-packaging/)，例如 pipx 在安裝套件時自動開啟一個獨立的虛擬環境放置該套件並且讓使用者不用 activate 也能夠使用該指令, pipenv 提供了專案專用的虛擬環境、明確的套件相依樹並透過 `Pipfile` 和 `Pipfile.lock` 來明確定出使用的相依套件, poetry 相似於 pipenv 然而提供了較快的 lock 時間並且多了套件發佈的指令可以使用。



## 參考資料
- [Package Manager](https://en.wikipedia.org/wiki/Package_manager#Front-ends_for_locally_compiled_packages)
- [What is a package manager](https://web.archive.org/web/20171017151526/http://aptitude.alioth.debian.org/doc/en/pr01s02.html)
- [What Is Pip? A Guide for New Pythonistas](https://realpython.com/what-is-pip/)
- [這樣的開發環境沒問題嗎？ -- TP@PyConTW'18](https://speakerdeck.com/uranusjr/zhe-yang-de-kai-fa-huan-jing-mei-wen-ti-ma)
- [Python Table Manners- Cut the Cookie Gracefully -- Lee Wei@EuroPython'20](https://speakerdeck.com/leew/python-table-manners-cut-the-cookie-gracefully-at-euro-python-2020)
- [List of software package management systems](https://en.wikipedia.org/wiki/List_of_software_package_management_systems)
- [Why you should use `python -m pip`](https://snarky.ca/why-you-should-use-python-m-pip/)
- [Python Application Dependency Management -- Liuyang Wan@PyConTW'20](https://drive.google.com/file/d/1AZoWKI3OQfpFETD2NoT6C9spanrsrOSG/view)
- [New pip resolver to roll out this year](https://pyfound.blogspot.com/2020/03/new-pip-resolver-to-roll-out-this-year.html)
- [Mozilla and Chan Zuckerberg Initiative to support pip](https://pyfound.blogspot.com/2019/12/moss-czi-support-pip.html)
- [Managing Python packages the right way](https://opensource.com/article/19/4/managing-python-packages)