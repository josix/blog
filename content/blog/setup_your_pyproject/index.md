---
title: 建立一個方便開發的 Python  環境（一）：套件管理工具簡介
date: 2020-08-14T15:53:01.619Z
description: 此篇文章是自己配置 Python Project
  環境的系列筆記第一篇，將會在這篇文章中簡介何謂套件管理以及隨著開發越來越複雜化，套件管理需要有哪些支援，其中在 Python
  專案上又會碰到什麼樣的問題或不方便的地方，而針對這些問題近期又有那些工具或修正正在進行。
---
<!--
- What is a neat dev environment
- what is the difference between pip
- PEP 518 (https://www.python.org/dev/peps/pep-0518/)
- https://medium.com/@grassfedcode/pep-517-and-518-in-plain-english-47208ca8b7a6
- Current Recommended Tools
-->
## 什麼是套件管理工具 (Package Manager)
無論是在開發時或是在系統安裝第三方軟體時，你可能會在安裝說明文件上看過 `pip install`、`npm install`、`apt-get install`、`brew install` 等指令，而在你輸入這些指令時，你就正在操作套件管理工具下載並安裝軟體了！套件管理工具（Package Manager）如 `pip`、`npm`、`yarn`、`apt-get`等相當常在你日常的操作中出現（你可以在[這裡](https://en.wikipedia.org/wiki/List_of_software_package_management_systems)找到各個語言、不同使用情境的套件管理工具），他們的存在最主要是為了讓你更加方便安裝、刪除、升級原有系統或開發語言所缺少的第三方工具。以撰寫科學計算的程式為例，當你發現 Python 沒有算特徵值、特徵向量的模組而又不想要自己造輪子時，你可能會在 [PyPI](https://pypi.org/) 這個 Python 官方第三方軟體倉儲找到 `NumPy`是完全符合你的需求的，並且依照指示在終端機輸入 `pip install numpy` 指令後，你就可以在你的程式中呼叫 NumPy 這個套件所提供的所有函式、類別，而也許隨著時間久了，`NumPy` 發佈了更新的版本，你可以透過 `pip install numpy --upgrade` 升級並使用最新的 API，或者有天你發現更好的工具想要刪除 `NumPy`，你可以用 `pip uninstall numpy` 刪掉它。然而 像 pip 這樣的 Python 內建套件管理工具的看似方便管理許多第三方套件，但隨著產品開發的複雜度增加，卻也慢慢出現了一些開發上不方便之處。
## pip 的一些問題
## 怎麼樣是一個方便開發的 Python 環境
## Python 套件管理近況
## 參考資料
- [Package Manager](https://en.wikipedia.org/wiki/Package_manager#Front-ends_for_locally_compiled_packages)
- [What is a package manager](https://web.archive.org/web/20171017151526/http://aptitude.alioth.debian.org/doc/en/pr01s02.html)
- [What is pip?](https://realpython.com/what-is-pip/)
- [這樣的開發環境沒問題嗎？ - TP@PyConTW'18](https://speakerdeck.com/uranusjr/zhe-yang-de-kai-fa-huan-jing-mei-wen-ti-ma)
- [Python Table Manners- Cut the Cookie Gracefully -- Lee Wei@EuroPython'20](https://speakerdeck.com/leew/python-table-manners-cut-the-cookie-gracefully-at-euro-python-2020)
- [List of software package management systems](https://en.wikipedia.org/wiki/List_of_software_package_management_systems)