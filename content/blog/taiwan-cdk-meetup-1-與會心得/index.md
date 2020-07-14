---
title: "Taiwan CDK Meetup #1 回顧"
date: 2020-07-14T15:04:37.980Z
description: 2020/07/07 是台灣 AWS CDK 社群的第一次聚會，此次聚會邀請了五位講者分享使用 CDK (Cloud
  Development Kit) 在不同應用情境下藉由基礎架構即程式碼 (Infrastructure as Code，IaC)
  設計雲端基礎架構的心得，及可能會接觸到的一些坑
---
## 緣起

第一次聽到 AWS-CDK 是在今年初實習 Onboard 時在公司聽到 Pahud 大大的分享，對於一個過去從事網站開發、機器學習算法設計的我來說，可以透過寫寫 code 便可以架設許多的雲服務感到相當的興奮的：

* 藉由 CDK，像我ㄧ樣的雲端服務新手可以更快速的學習如何使用 AWS 相關的服務
* CDK 透過了 Construct, Stack 等抽象化將過去寫許多的煩雜的 JSON、YAML 讓設定變得更加方便操作，並且更方便複製相似的基礎架設
* 這個項目是開源且支援相當多語言（Python, Typescript, Java 等)，可以使用熟悉的語言來進行建設資源並部署

由於上述幾點原因，一直以來有關注 [Pahud 在 Youtbe 上的 Vlog 分享](https://pahud.dev)，並且跟著 [Workshop](https://cdkworkshop.com/) 玩玩看，並且發現了這次聚會，於是一釋出消息就速速報名了🙌

## Taiwan CDK Meetup #1

此次的聚會分別有五場分享，很可惜的是最後一場因為比較早走沒有記錄到，前四場的筆記分別如下：

1. [AWS CDK 與 CDK8S 最新更新回顧](https://hackmd.io/@pahud/taiwan-cdk-meetup-01-pahud/) (Pahud)

   在這場分享，Pahud 一開始便提到了舉辦 Meetup 的最主要的原因就是講者可以與 Operator、 Developer 可以直接互動分享外彼此互相交流是最好的學習方式。除此以外有關 CDK 上，分享了近期 CDK 的更新其中也包含了他的貢獻：

   \- RDS Proxy (Issue@[\#8475](https://github.com/aws/aws-cdk/issues/8475))，在AWS-CDK [v1.49.0](https://github.com/aws/aws-cdk/releases/tag/v1.49.0) 加入的新功能，此次更新後在創建 RDS 的 Instance 後你可以使用

   \- Lambda Filesystem，

   \- API Gateway HTTP API Custom Domain，

   \- 

## 相關資源

[Taiwan CDK Meetup #1 Repository](https://github.com/cdkmeetup/taiwan-meetup-july2020)

[Telegram 討論區](https://t.me/AWSCDK)

[Facebook 社團討論區](https://www.facebook.com/groups/cdkmeetuptw/permalink/821680575026249/)