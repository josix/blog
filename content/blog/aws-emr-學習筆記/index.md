---
title: AWS EMR 學習筆記
date: 2021-01-26T04:15:08.800Z
description: AWS EMR 學習筆記
---
## Amazon EMR 中的 Clusters 和 Nodes
Amazon EMR 提供一個叢集，其中包含多台 Amazon EC2 作為節點，這些節點共扮演三種角色並有不同的 node type，隨著不同的 node type 也會安裝不同的軟體：

1. Master node: 主要職責為管理其他節點的資料分布和任務執行，並且會追蹤這些任務狀態。每一個叢集之中必要有一個 Master node，單一節點叢集 (single-node cluster) 即僅含 master node
2. Core node: 主要用於執行任務，並同時儲存資料於叢集中的 HDFS，多節點叢集 (Multi-node cluster) 需包含至少一個 core node
3. Task node（選用）: 僅用於執行任務，並不會將資料存於 HDFS

![](https://i.imgur.com/thiqX0X.png)

## Amazon EMR 中的工作執行
Amazon EMR 可以透過多個方式定義要執行的工作 (works)：
 - 在建立叢集時於完成步驟區塊提供完整定義需完成的工作，執行個體將會依照定義直行工作並在完成後終止 (terminate)。
 - 建立叢集後，透過 Amazon EMR Console, AWS CLI, Amazon EMR API 提交要執行的步驟，一份工作包含多個 steps，並且每一個 step 中包含多個 Hadoop Jobs
<!-- TO READ https://docs.aws.amazon.com/emr/latest/ManagementGuide/AddingStepstoaJobFlow.html -->
 - 建立叢集後，直接透過 SSH 連線至 master node 和其他 nodes，透過程式提供的介面執行任務


## Amazon EMR 中的資料處理
Amazon EMR 叢集提供兩種方式處理資料包含直接提交 Hadoop Jobs 到安裝的應用程式和執行 EMR steps：

- 直接提交 Hadoop Jobs 到安裝的程式：使用者僅需透過安全的連線連線至 master node，並可以透過已安裝好的程式介面進行操作。Master node 有一個可見的 DNS 讓使用者可以練線，Amazon EMR 預設一些 security group 規則給叢集中的節點，需注意的是預設並沒有提供 inbound SSH 存取，使用者需自行加入允許 SSH (TCP port 22) 的規則到 Security Group。

- 執行 EMR steps：使用者可以提交一或多個有順序的 steps 到 Amazon EMR 叢集，執行過程包含以下過程

    1. 當提交後叢集開始執行 steps 時，所有的 step 狀態會被設定成 PENDING
    2. 開始執行第一個 step，其狀態會被修改為 RUNNING，其他 step 維持 PENDING，
    3. 第一個 step 成功完成後，狀態會被修改為 COMPLETED
    4. 下一個 step 開始執行，其狀態修改為 RUNNING，成功完成後將被修改為 COMPLETED
    5. 反覆前述步驟直到所有 step 完成

![](https://i.imgur.com/GU83MxD.png)

    若執行過程中任何 step 執行失敗其狀態會被修改為 FAILED，使用者可以決定是否要繼續執行下一個 step 或是終止 (terminate) cluster，預設是將後續 step 狀態修改為 CANCELLED 並不執行。

    ![](https://i.imgur.com/WKorafX.png)

## Amazon EMR 的生命週期


![](https://i.imgur.com/JbYS90c.png)


## Reference
- [Overview of Amazon EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-overview.html)
- [Connect to the Cluster](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node.html)