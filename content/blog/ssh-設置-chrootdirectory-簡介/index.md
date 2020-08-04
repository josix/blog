---
title: SSH 設置 ChrootDirectory 簡介
date: 2020-07-25T15:47:15.517Z
description: 此篇內容將會介紹 SSH 中的 ChrootDirectory
  關鍵字其用途及使用情境，並介紹如何設置，來達成限制特定帳號所能夠存取的檔案系統及可執行的指令的目的。
---
## `chroot` 及 `ChrootDirectory` 簡介
### `chroot` 是什麼
`chroot` 是一個 unix 指令，即代表 change root directory ，主要用途為使用提供的目錄作為參考根目錄執行指令或開啟可互動的 shell。使用 `chroot` 後，離開該環境的檔案都將無法進行存取。

`chroot` 使用語法如下：
```
chroot [OPTION] NEWROOT [COMMAND [ARG]...]
chroot OPTION

OPTION:
--groups=G_LIST 以 g1,g2,..,gN 提供附加的群組 
--userspec=USER:GROUP 給定使用者和群組 (ID 或名稱) 使用該環境
--skip-chdir 不要更換工作目錄至 '/'，只有當 NEWROOT 為 "/" 才允許，因此較常搭配 --groups, --userspec 使用
--help    輸出使用說明
--version 輸出版本號
```

## `ChrootDirectory` 用途及使用情境
## 設置 `ChrootDirectory` 限制特定使用者存取目錄
## 其他 `ChrootDirectory` 搭配設定
## 參考資料
https://www.gnu.org/software/coreutils/manual/html_node/chroot-invocation.html#chroot-invocation

