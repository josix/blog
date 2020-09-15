---
title: 建立一個方便開發的 Python 環境 （零）- 管理 Python 版本
date: 2020-09-14T17:42:20.679Z
description: TBD
---
![Python Env](https://imgs.xkcd.com/comics/python_environment.png)

以我第一次拿到的 MacOS 中的 Python 環境來說， Python 的版本相當多，就像上面這張圖一樣，除了原生系統的 Python 大概就有六隻以外，使用了 Homebrew 還會有 Homebrew 的 Python，可能在某天 brew update 了，預設 Python 還會升級讓過去所有的 Python Soft Link 改變並且導致虛擬環境全部不能 activate，不熟 Homebrew 無奈只好去官方網站下載 Python，此時已經光來源不論版本就有三個地方會放 Python。再加上每年幾乎都會有不少的功能推陳出新，在 2020-01-01 Python2 還沒有 EOF (End of Life) 之前多多少少會有人還會傾向使用 Python2 開發，同一時刻，許多人已經轉換到使用 3.4, 3.5 甚至 3.6 等較新的版本，然而作為開發者，就會需要同時擁有多個 Python 的版本在機器上來開發不同來源的 Python 專案。至少會需要用來跑 Python2 和 Python3.3+ 的 Python 程式碼，也許原作者使用了 F-String, 還會多需要 Python3.7+ 的 Python 來執行它。

Hmm... 聽起來不太妙，總要一個籠子來好好管理這些蛇，~~免得早晚被蛇咬到寫不出 code 來~~ ，`Pyenv` 就是那個籠子，以下將會介紹 `Pyenv` 的使用方式及運作原理以及一些不用 `Pyenv` 的替代方案。
## 系統 Python 不好嗎
使用系統的 Python 確實會有些問題的：
- 最基本的原因是該版本應該也不會是想要用的版本，現行的版本多為 3.6 - 3.8，稍微舊的系其統內建 Python 多半是 2.7, 3.3, 3.4 等，若有 3.6 可能已經相當堪用，但還是會有下述的問題。
- 由於是系統的 Python，每當要使用 pip 下載任何套件，可能會需要下 `sudo pip install` 的指令，然而一但全部東西都裝在全域，接下來的套件管理也將會是場災難，當這台機器的其他使用者要使用同套件的不同版本時，他將覆蓋先前的版本又或者他根本裝不了，也許帶上 `--user` 參數可以緩解這個狀況，但當不同 Project 有著不同的套件版本時，同樣的問題又誕生了，你可能會需要虛擬環境來進行管理，那又會有其他的問題要誕生了。
- 由於是系統的 Python，通常不太敢對它做出更動，以免相依於上面的整個系統壞掉，這也代表著你不能夠完全掌控它，當不可掌控的 Python 因為 OS 更新而發生什麼改變時，可能自己的專案也會跟著不可掌控了。
## 為什麼要使用 Pyenv
## Pyenv 使用方法
## Pyenv 原理
## 替代方案
## 參考資料
- [這樣的開發環境沒問題嗎？](https://www.youtube.com/watch?v=6Nl0IYkU0hU)
- [Managing Multiple Python Versions With pyenv](https://realpython.com/intro-to-pyenv/#why-not-use-system-python)
- [Pyenv](https://github.com/pyenv/pyenv#understanding-path)