---
title: 基于Spring-Cloud-Alibaba搭建微服务
date: 2020-06-07
tags:
  - 学习心得
categories:
  - leran
---
## 基于SCA搭建微服务

### 工具及架构选型

#### 工具

Linux终端可视化工具：[MobaXterm](https://mobaxterm.mobatek.net/)

开发工具:[Idea 2020.2](https://www.jetbrains.com/)

压测工具：[jmeter](https://jmeter.apache.org/)

#### 架构

服务器：Centos8.0

JDK版本：jdk-8u251

容器：Docker

构建工具：Maven3.6.3

数据库：Mysql8.0

数据库中间件:Mybatis-plus4.0

消息队列：RocketMQ

缓存中间件：Redis

注:结构中涉及到的可视化webUI客户端全部部署在Docker-Compose中，例如RocketMQ消息队列、Sentinel限流

### 部署中间件

### 参考文献

[docker-compose部署ELK(亲测)](https://www.cnblogs.com/dalianpai/p/11986481.html):指定网卡、并指出kibana慢，推荐用K8S