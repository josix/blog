---
title: 建立一個方便開發的 Python 環境 （零）- 管理 Python 版本
date: 2020-09-14T17:42:20.679Z
description: TBD
---
![Python Env](https://imgs.xkcd.com/comics/python_environment.png)

以我目前 Mac 電腦中來說， Python 的版本相當多，就像上面這張圖一樣，除了原生系統的 Python 大概就有六隻以外，假如使用 Homebrew 的話，還會有 Homebrew 的 Python，可能在某天 Homebrew update 了，預設 Python 還會升級讓過去所有的 Python Soft Link 改變並且導致虛擬環境全部失效，因此還去官網下載的 Python，再加上每年幾乎都會有不少的功能推陳出新，在 2020-01-01 Python2 還沒有 EOF (End of Life) 之前多多少少會有人還會傾向使用 Python2 開發，同一時刻，需多人已經轉換到使用 3.4, 3.5 甚至 3.6 等較新的版本，然後作為開發者，可能會需要同時擁有多個 Python 的版本機器上，至少會需要用來跑 Python2 和 Python3.3+ 的 Python 程式碼，也許原作者使用了 F-String, 還會多需要 Python3.7+ 的 Python 來執行它。

Hmm... 聽起來不太妙，總要一個籠子來好好管理這些蛇，~~免得早晚被蛇咬到~~
## 系統 Python 不好嗎
## Pyenv 使用方法
## Pyenv 原理
## 替代方案
## 參考資料