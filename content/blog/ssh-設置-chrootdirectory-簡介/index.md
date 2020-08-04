---
title: SSH 設置 ChrootDirectory 簡介
date: 2020-07-25T15:47:15.517Z
description: 此篇內容將會介紹 SSH 中的 ChrootDirectory
  關鍵字其用途及使用情境，並介紹如何設置，來達成限制特定帳號所能夠存取的檔案系統及可執行的指令的目的。
---
## `chroot` 是什麼
`chroot` 是一個限於 superuser 執行的 unix 指令，即代表 change root directory ，主要用途為使用提供的目錄作為參考根目錄執行指令或開啟可互動的 shell。使用 `chroot` 後，離開該根目錄的檔案都將無法進行存取。

`chroot` 使用語法如下：
```
chroot [OPTION] NEWROOT [COMMAND [ARG]...]
chroot OPTION 
(Note. 如果沒有給定指令，則執行 `${SHELL} -i`)

OPTION:
--groups=G_LIST 
以 g1,g2,..,gN 格式提供附加的群組 

--userspec=USER:GROUP
給定使用者和群組 (ID 或名稱) 使用該環境

--skip-chdir
不要更換工作目錄至 '/'
Note. 只有當 NEWROOT 為 "/" 才允許，因此較常搭配 --groups, --userspec 使用

--help
輸出使用說明

--version
輸出版本號
```
`chroot` 常被用於下列情境：
- 建立開發、測試環境：使用 `chroot` 建立的環境中測試軟體，避免直接部署到完整的生產環境當中。
- 修復：當一系統故障時，可以透過 `chroot` 在其他目錄開啟系統，最後再回到故障系統中進行修復。
- 相依性控制：不同軟體可能產生的相依性可以透過 `chroot` 建立的不同根目錄環境來進行分隔。
- 權限分離：將特定使用者允許存取的檔案放入 `chroot` 的目錄當中，當使用者使用 ssh 登入後限制其所能存取的環境僅限於該 `chroot` 的目錄下。

### 執行 `chroot`
在執行 `chroot` 之前，首先要確定該 `chroot` 所需執行到的指令已經放入該目錄下。
以下假設 `chroot` 後要使用到 `/bin/bash`, `/usr/bin/rsync`，並手動建置該檔案：
1. 複製原系統的檔案位置 `(/bin/bash)` 至 CHROOT 對應的目錄位置下 `($CHROOT/bin/bash)`
```bash
cp /bin/bash $CHROOT/bin
cp /usr/bin/rsync $CHROOT/usr/bin
```
2. 複製指令使用到的 shared object。可以使用 `ldd` 來找到所需要複製的檔案（也就是相依的 shared object）。
```bash
ldd /bin/bash
#	linux-vdso.so.1 (0x00007ffee39e4000)
#	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f7722ca5000)
#	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f7722aa1000)
#	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f77226b0000)
#	/lib64/ld-linux-x86-64.so.2 (0x00007f77231e9000)
```
需要複製這些檔案到 CHROOT 對應的目錄下 (例如 /lib/x86_64-linux-gnu/libtinfo.so.5 需要複製到 $CHROOT/lib/x86_64-linux-gnu)
相同的步驟也需要對 `/usr/bin/rsync` 做一遍。
3. 準備好所需執行的指令後，便可以使用 `chroot` 了，並且只能夠執行先前提供的指令。
```bash
chroot $CHROOT
# or
chroot $CHROOT /bin/bash
```

## `ChrootDirectory` 用途及使用情境
## 設置 `ChrootDirectory` 限制特定使用者存取目錄
## 其他 `ChrootDirectory` 搭配設定
## 參考資料
[chroot wiki](https://zh.wikipedia.org/wiki/Chroot)

[chroot manual](http://manpages.ubuntu.com/manpages/focal/zh_TW/man8/chroot.8.html)

[chroot 完整文件](https://www.gnu.org/software/coreutils/manual/html_node/chroot-invocation.html#chroot-invocation)

