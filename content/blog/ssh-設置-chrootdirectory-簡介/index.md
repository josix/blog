---
title: Chroot 指令與 SSH 設置 ChrootDirectory
date: 2020-07-25T15:47:15.517Z
description: 此篇內容首先將會介紹 UNIX 指令中的 chroot 指令及其相關的使用方式及情境，並且介紹在 SSH 中的
  ChrootDirectory 關鍵字其用途及如何設置，來達成限制特定帳號所能夠存取的檔案系統及可執行的指令等目的。
---
## `chroot` 是什麼

`chroot` 是一個限於 superuser 執行的 UNIX 指令，即代表 change root directory ，主要用途為使用提供的目錄作為根目錄來執行指令或開啟可互動的 shell。使用 `chroot` 後，離開該根目錄的檔案都將無法進行存取。

[`chroot` 使用語法]((http://manpages.ubuntu.com/manpages/focal/zh_TW/man8/chroot.8.html))如下：

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

* **建立開發、測試環境**：使用 `chroot` 建立的環境中測試軟體，避免直接部署到完整的生產環境當中。
* **修復系統**：當一系統故障時，可以透過 `chroot` 在其他目錄開啟系統，最後再回到故障系統中進行修復。
* **相依性控制**：不同軟體可能產生的相依性可以透過 `chroot` 建立的不同根目錄環境來進行分隔。
* **權限分離**：將特定使用者允許存取的檔案放入 `chroot` 的目錄當中，當使用者使用 ssh 登入後限制其所能存取的環境僅限於該 `chroot` 的目錄下。

### 執行 `chroot`

在執行 `chroot` 之前，首先要確定該 `chroot` 所需執行到的指令已經放入該新的根目錄下。
以下假設 `chroot` 後要使用到 `/bin/bash`, `/usr/bin/rsync`，先手動建置該檔案：

**Note. 除了所需的程式外基本的 /dev 節點設置，也都需要透過 `mknode` 建立 **
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

**Note. 上述複製的檔案與目錄需確認權限是 `root` **

3. 準備好所需執行的指令後，便可以使用 `chroot` 了，並且只能夠執行先前提供的指令。

```bash
chroot $CHROOT
# or
chroot $CHROOT /bin/bash
```

### 小結
在現在容器盛行的情況下，使用 `chroot` 來進行測試、開發及相依性維護已經較不大需要，更多時候會是在維護、修復系統、開設 guset 帳戶時使用。另外，使用 `chroot` 並非完全安全的，需要特別移除會使用到 [setuid](https://man7.org/linux/man-pages/man2/setuid.2.html) 的程式、編譯器等任何可能在 `chroot` 後又獲得 root 權限[逃離 `chroot jail`](https://web.archive.org/web/20160127150916/http://www.bpfh.net/simes/computing/chroot-break.html) 的漏洞。

## `ChrootDirectory` 用途及使用情境
除了於登入後使用 `chroot` 指令可以執行更換根目錄，也可以在登入過程中使用 `chroot`。

`ChrootDirectory` 是在 [sshd_config](https://linux.die.net/man/5/sshd_config) (OpenSSH SSH daemon configuration) 可以設定的一個關鍵字，通常搭配 `Match` 來使用，針對 `Match` 到的使用者參考 `ChrootDirectory` 後帶的參數（NEWROOT 位置）執行 `chroot`，主要目的為針對特定的使用者，讓其登入後所能存取的檔案及指令皆限制在 `chroot` 的根目錄下。

### 設置 `ChrootDirectory` 限制特定使用者存取目錄
下面例子將從零開始開一個 Chroot SFTP 使用者帳號（[參考這篇文章](https://www.thegeekstuff.com/2012/03/chroot-sftp-setup/)）：
1. 新增一個使用者及群組
```bash
groupadd sftpusers
useradd -g sftpusers -d /incoming -s /sbin/nologin $USERNAME
passwd $USERNAME
```
`groupadd sftpusers:` 新增 `sftpusers` 這個 group

`useradd -g sftpusers -d /incoming -s /sbin/nologin $USERNAME`: 新增名稱為   $USERNAME 的使用者，並設置其群組為 `sftpusers`、家目錄為 `/incoming` 並用[無法登入的 Shell](http://linux.vbird.org/linux_basic/0410accountmanager.php#nologin) 作為這個帳號的 Shell

`passwd $USERNAME`: 設置該帳號的密碼

2. 設置該使用者 `chroot jail`
```bash
mkdir -p /sftp/$USERNAME/incoming
chown $USERNAME:sftpusers /sftp/$USERNAME/incoming
```
`mkdir -p /sftp/$USERNAME/incoming`: 先建立該帳戶登入後會進入的目錄

`chown $USERNAME:sftpusers /sftp/$USERNAME/incoming`: 修改該目錄權限供該帳戶使用

**Note. `/sftp/$USERNAME/` 目錄下除了使用者可存取的位置都需要為 root 權限**

3. 修改 `/etc/ssh/sshd_config`
```bash
vim /etc/ssh/sshd_config
```

4. 使用 openssh 提供之 sftp 服務
```bash
#Subsystem      sftp    /usr/libexec/openssh/sftp-server
Subsystem       sftp    internal-sftp
```
internal-sftp 是 openssh 提供的關鍵字用於辨認使用 sshd 內部的 sftp 服務

關於 sftp-server 與 internal-sftp 的差別，參照[這裏](https://serverfault.com/questions/660160/openssh-difference-between-internal-sftp-and-sftp-server)

5. 設置 `ChrootDirectory`
```bash
Match Group sftpusers
    ChrootDirectory /sftp/%u
    ForceCommand internal-sftp
```
Match Group sftpusers: 選取符合群組為 `sftpusers` 的使用者

ChrootDirectory /sftp/%u: 設置更換根目錄到 `/sftp/%u`，`%u`會被代換為該使用者名稱

ForceCommand internal-sftp: 強制使用執行 internal-sftp 指令忽略其他定義在 `.ssh/rc` 的指令


6. 重啟 sshd
```bash
service sshd restart
```
### 其他 `chroot` 環境設定
- 若有使用非在新目錄下的外部目錄的需要，需要 Bind Mount 到該目錄下的任意位置，作法如下：
1. 修改 `/etc/fstab`(假設外部目錄為 `/var/www/html`)
```bash
vim /etc/fstab
# Add
# /var/www/html   $CHROOT/mounted_folder        none    bind    0 0`
```

2. 將該外部目錄掛載到指定位置下
```bash
mkdir $CHROOT/mounted_folder
mount $CHROOT/mounted_folder
```

## 參考資料

- [chroot wiki](https://zh.wikipedia.org/wiki/Chroot)

- [chroot manual](http://manpages.ubuntu.com/manpages/focal/zh_TW/man8/chroot.8.html)

- [chroot 完整文件](https://www.gnu.org/software/coreutils/manual/html_node/chroot-invocation.html#chroot-invocation)

- [逃離 chroot jail](https://web.archive.org/web/20160127150916/http://www.bpfh.net/simes/computing/chroot-break.html)

- [sshd_config manual](https://linux.die.net/man/5/sshd_config)

- [Cross server SSH Rsync backups done more securely with chroot](https://www.marcus-povey.co.uk/2015/04/09/cross-server-ssh-rsync-backups-done-more-securely/)

- [How to Setup Chroot SFTP in Linux (Allow Only SFTP, not SSH)](https://www.thegeekstuff.com/2012/03/chroot-sftp-setup/)

- [What's the difference between /sbin/nologin and /bin/false](https://unix.stackexchange.com/questions/10852/whats-the-difference-between-sbin-nologin-and-bin-false)

- [OpenSSH: Difference between internal-sftp and sftp-server](https://serverfault.com/questions/660160/openssh-difference-between-internal-sftp-and-sftp-server)

- [Bind mount an SFTP user after using chroot](https://support.rackspace.com/how-to/bind-mount-an-sftp-user-after-using-chroot/)