---
title: "Taiwan CDK Meetup #1 回顧"
date: 2020-07-14T15:04:37.980Z
description: 2020/07/07 是台灣 AWS CDK 社群的第一次聚會，此次聚會邀請了五位講者分享使用 CDK (Cloud
  Development Kit) 在不同應用情境下藉由基礎架構即程式碼 (Infrastructure as Code，IaC)
  設計雲端基礎架構的心得，及可能會接觸到的一些坑。
---
## 緣起

第一次聽到 AWS-CDK 是在今年初實習 Onboard 時在公司聽到 Pahud 大大的分享，對於一個過去從事網站開發、機器學習算法設計的我來說，可以透過寫寫 code 便可以架設許多的雲服務感到相當的興奮的：

* 藉由 CDK，像我ㄧ樣的雲端服務新手可以更快速的學習如何使用 AWS 相關的服務
* CDK 透過了 Construct, Stack 等抽象化將過去寫許多的煩雜的 JSON、YAML 讓設定變得更加方便操作，並且更方便複製相似的基礎架設
* 這個項目是開源且支援相當多語言（Python, Typescript, Java 等)，可以使用熟悉的語言來進行建設資源並部署

由於上述幾點原因，一直以來有關注 [Pahud 在 Youtbe 上的 Vlog 分享](https://pahud.dev)，並且跟著 [Workshop](https://cdkworkshop.com/) 玩玩看，也發現了這次聚會，於是一釋出消息就速速報名了🙌

## Taiwan CDK Meetup #1

此次的聚會分別有五場分享，很可惜的是最後一場因為比較早走沒有記錄到，前四場的筆記分別如下：

### [AWS CDK 與 CDK8S 最新更新回顧](https://hackmd.io/@pahud/taiwan-cdk-meetup-01-pahud/) (@Pahud)

   在這場分享，Pahud 一開始便提到了舉辦 Meetup 的最主要的原因就是講者可以與 Operator、 Developer 可以直接互動分享外，彼此互相交流是最好的學習方式。除此以外 Pahud 也分享了近期 CDK 的更新，而其中也包含了他的貢獻：

  -  RDS Proxy (Issue@[\#8475](https://github.com/aws/aws-cdk/issues/8475), PR@[\#8476](https://github.com/aws/aws-cdk/pull/8476))，在 AWS-CDK v1.49.0 加入的新功能，此次更新後 RDS Instance 便可以使用 addProxy method 增加新的 Proxy。RDS Proxy 可以用來管理服務與 RDS 之間所建立的連線，避免在 Serverless 的架構下，過多開啟與關閉與資料庫之間的連線將導致 RDS 資源消耗快速，進而造成故障，這邊可以參考更多有關 [RDS Proxy ](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html)的資訊。有關 AWS-CDK RDS Proxy 的使用，可見下方程式碼：

```typescript
import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as secrets from '@aws-cdk/aws-secretsmanager';

const vpc: ec2.IVpc = ...;
const securityGroup: ec2.ISecurityGroup = ...;
const secret: secrets.ISecret = ...;
const dbInstance: rds.IDatabaseInstance = ...;

const proxy = dbInstance.addProxy('proxy', {
    connectionBorrowTimeout: cdk.Duration.seconds(30),
    maxConnectionsPercent: 50,
    secret,
    vpc,
});
```
   -  Lambda Filesystem (Issue@[\#8475](https://github.com/aws/aws-cdk/issues/8595), PR@[\#8602](https://github.com/aws/aws-cdk/pull/8602))，此功能將在 AWS-CDK v1.50.0 更新，使用 Lambda EFS Filesystem，你可以 mount 你的 EFS Filesystem 到你 Lambda Function 使用的環境中，並且可以讓其他資源如 EC2, ECS 等也可以存取該資料；另外也可以放入需要大量空間需求的資料科學相關套件，提供 Lambda Function 使用，提高了 Lambda Function 的整合性及更多的使用其境，其他詳細資訊可以看這篇[部落格](https://aws.amazon.com/tw/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/)。有關 AWS-CDK Lambda Filesystem 的使用，可以看這段[程式碼](https://github.com/aws/aws-cdk/tree/master/packages/%40aws-cdk/aws-lambda#filesystem-access)。
   - API Gateway HTTP API Custom Domain，(Issue@[\#8475](https://github.com/aws/aws-cdk/issues/7847), PR@[\#8602](https://github.com/aws/aws-cdk/pull/8027))，透過這個功能，預設你可以透過 ACM (Amazon Certificate Manager) 服務所提供的憑證並且使用 addDomain method 來為自己的 API Gateway 設定客製化網域，並且也可以用 addStage method 來為你的產品不同階段設計不同的 API 接口，更方便開發調用。有關如何在 AWS-CDK 上設定 APIGateway Custom Domain 可以看這段[程式碼](https://github.com/aws/aws-cdk/tree/master/packages/%40aws-cdk/aws-apigatewayv2#custom-domain)
  - 除了 AWS-CDK 以外，在前幾個月也發佈了 CDK8S (CDK for k8s)，如同 AWS-CDK，CDK8S 讓你可以使用你熟悉的語言來開發你的 Kubernetes 應用，透過物件抽象化後的 API 讓你避免寫出繁雜的 YAML 檔，可以更方便複製這樣的設定到任何機器上進行部署。

### [新手 operator 寫 CDK 之旅](https://github.com/josix/taiwan-meetup-july2020/blob/master/02-ricochen/rookie-operators-cdk-journey.pdf) (@ricochen)

Rico 來自 Bincentive，在這場分享中分享過去她在學習 CDK 所使用過的資源，在初期不熟悉專案還無法進行貢獻時，對於新手來說最好的學習方式就是模仿。Rico 將資源分類（Workshop, Example, Documents, Community, Talk...）列出讓大家[參考](https://github.com/cdkmeetup/taiwan-meetup-july2020/tree/master/02-ricochen)，很可惜我玩過得還不多，只有玩過 AWS-CDK Workshop。從中相當好理解 AWS-CDK 的觀念以及中心思想，並且可以快速建出自己的第一個架構及服務，對於新手來說會相當有成就感。另外，AWS Summit 中給的 Talk 也介紹到相當多的觀念，非常推薦，也非常謝謝 Rico 的分享！

### [堆疊架構時該思考的事](https://github.com/josix/taiwan-meetup-july2020/blob/master/03-joelzhong/cdk.pdf)(@joelzhong)



## 相關資源

[Taiwan CDK Meetup #1 Repository](https://github.com/cdkmeetup/taiwan-meetup-july2020)

[Telegram 討論區](https://t.me/AWSCDK)

[Facebook 社團討論區](https://www.facebook.com/groups/cdkmeetuptw/permalink/821680575026249/)