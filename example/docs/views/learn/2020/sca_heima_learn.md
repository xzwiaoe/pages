---
title: Spring-Cloud-Alibaba学习
date: 2020-05-12
tags:
  - 学习心得
categories:
  - leran
---


## 前言
B站的黑马程序员Spring-Cloud—Alibaba:点击[链接地址](https://www.bilibili.com/video/BV1zT4y1G7Ru)跳转学习

资料放在网盘了 链接：https://pan.baidu.com/s/1Y6Zh4hSKYoJv3rX2RqMcfg 提取码：3vyb 

### 课程介绍1

课程设计贯彻以下流程:
 - 抛出问题
 - 解决思路
 - 业界方案
 - 阿里组件
 - 代码实战
 - 必要补充

## 系统架构演变2-6

#### 演变过程
- 单体应用架构
- 垂直应用架构
- 分布式架构
- SOA架构(面向服务架构-Dubbo)
- 微服务架构(服务的原子化拆分)

#### 微服务架构产检问题和解决思路
- 如何管理他们
- 服务之间如何调用
- 客户端如何访问
- 有个出问题了(如何避免雪崩)
- 这么多服务中间那个环节出问题了怎么排查

#### 微服务架构的常见概念
- 服务治理\
    进行服务的自动化管理,其核心服务的注册于发现.并自动剔除故障服务
- 服务调用\
    基于Http的RESTful和基于TCP的RPC协议
- 服务网关\
    统一接入、安全防护、协议适配、流量管控、容错能力\
    API网关更专注于安全(鉴权)、流量、路由等问题
- 服务容错\
    雪崩效应无法预防.只能尽可能去做好容错\
    不被上游压跨不把下游拖垮不被外界影响
- 链路追踪

## 环境搭建7-10
### 技术选型
- Maven：3.6.3
- 数据库：Mysql8.0
- 持久层：SpringData Jpa
- 其他：SoringCloudAlibaba技术栈

**spring-cloud每个版本号对应有具体的Spring-Boot、Cloud-alibaba版本**


| Spring cloud Release Train | Boot Version                     | Alibaba       |
| -------------------------- | -------------------------------- | ------------- |
| 2020.0.x aka Ilford        | 2.4.x                            | 2.2.3.RELEASE |
| Hoxton                     | 2.2.x, 2.3.x (Starting with SR5) | 2.2.1.RELEASE |
| Greenwich                  | 2.1.x                            | 2.1.0 RELEASE |

具体看[spring-cloud官网](https://spring.io/projects/spring-cloud)

### 模块设计
**<font color='red'>注：占用7x/8x端口主要为了后续的集群</font>**

spring-cloud-alibaba-learn父工程

shop-common公共模块【实体类】

shop-user用户微服务【端口：807x】

shop-product商品微服务【端口:808x】

shop-order订单微服务【端口:809x】

## 微服务整合11
### 服务治理
用于**服务的注册与发现**,并实时心态检测剔除不可用服务

他解决了我们许多硬编码的问题:
- 提供者ip或者端口变更需要手动更改
- 采用硬编码(ip:port)的形式.很难做到集群负载均衡
- 服务变多难于管理

#### Nacos注册与配置中心
[Nacos官网](https://nacos.io/zh-cn/index.html):一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

### 负载均衡
Ribbon是Spring Cloud的组件之一，使用注解@LoadBalanced便能很方便的实现负载均衡

### 声明式调用
OpenFegin是Spring Cloud提供的一个**声明式的违Http客户端**

Nacos很好的兼容了Fegin.而Fegin默认已经实现了Ribbon负载均衡.

**所以在Nacos中使用Fegin就默认实现了负载均衡**

### 服务容错
由于网络或服务自身的原因导致服务不可用.会导致任务堆积从而造成整个微服务的瘫痪
#### 常见的容错解决方案
1. 隔离
 采用线程池或者信号量
2. 超时
3. 限流
4. 熔断
 当下游服务负载过高响应变慢.上游系统为了保证系统整体的可用性.会暂时性切断对下游服务的调用。这种牺牲局部保全整体的措施就叫做熔断
5. 降级
提供拖底方案.一旦服务不可用便使用拖底方案

#### Sentinel
阿里巴巴开源的一套用于**服务容错的综合性解决方案**组件.在阿里内部大规模使用,很稳定

它以流量为切入点,对**流量控制、熔断降级、系统负载保护**等多个维度来保护系统的稳定性

- 丰富的应用场景
    秒杀(突发流量控制在系统容量可以承受的方位)、消息削峰填谷、<font color='red'>**集群流量控制**</font>、实时熔断下游不可用服务
- 完备的实时监控
  通过控制台可以实时查看接入应用的单台机器秒级数据
- 广泛的开源生态
    与Spring Cloud、Dubbo、gRPC整合开箱即用.只需引入依赖进行简单的配置即可
- 完善的<font color='red'>**SPI拓展点**</font>
    提供简单易用、晚上的SPI拓展接口，用来快速定制逻辑，如<font color='red'>**规则管理、适配动态数据源点**</font>

### 服务网关
传统的直接请求微服务,存在以下几个问题
1. 客户端多次请求不同的微服务,增加客户端代码或配置编写的复杂性
2. 无法进行统一的安全防护.如鉴权等
3. 存在跨域的问题

而API网关提供**统一入口**便于管理,安全防护等与具体业务无关的**认证、鉴权、监控、路由转发**等都可以再这里实现

#### GateWay
Spring公司为了替换Zuul而开发的网关服务

相对于Zuul1.0使用Servlet同步的多线程阻塞模型.性能高出很多

而Gateway和Zuul2.0都是采用的是基于Netty的异步非阻塞模型

GateWay不仅仅提供路由,还配套基于fliter链的处理.比如安全、监控、限流

### 链路追踪
​	一个请求往往涉及到多个微服务.当响应延迟或者故障时，如何快速定位问题.

​	这个时候就要进行**分布式链路追踪**:

将一次请求的调用链路集成起来.进行集中展示

#### Sleuth
Spring Cloud的Sleuth就是专门用来记录追踪链路的调用情况.一般与Zipkin集成解决方案

1. Trace

   有一组TraceId相同的SpanId串联成一个树状结构

2. Span

   基本的工作单元.统计了各个单元的延时

3. Annotation

   记录了工作单元内的事件时间.包括cs(client send)、sr(server received)、ss(server send)、cr(client received)

#### Zipkin集成

​	zipkin是Twitter的一个开源项目.致力于收集服务的定时数据.以解决架构的延迟问题、包括数据的**采集、存储、查找和展示**

Zipkin还提供了可插拔式的数据存储方式,如mysql、Elasticsearch

### 消息队列

消息队列是一种跨进程的通信机制.应用场景主要有：

1. 异步解耦

   与业务无强关联并且**比较耗时而且不需要即时（同步）返回结果**的操作作为消息放入消息队列，比如邮件/短信通知等

   邮件/短信系统只需消费对应业务生产出来的消息即可

2. 流量削锋

   在秒杀场景中.由于请求量过大。下游的通知系统无法承载海量的调用量会导致系统崩溃或者漏发的情况。这个时候可在应用和下游系统中间加入消息队列

#### RocketMq

主要概念分以下：

1. Broker

   核心，负责接收，存储，投递等功能

2. NameServer

   协调者.Broker向他注册路由信息.同事Producer和Consumer向其获取注册路由信息

3. Producer

   消息的生产者(应用)

4. Consumer

   消息的消费者(下游业务)

5. Topic

   主题.针对topic来对号入座进行topic的生产和发送

6. Message Queue

   为了提高吞吐量引入的消息数据。可以并行的往各个queue投递消息消费者也可以并行的消费

7. Message

   消息的载体

8. Producer Group

   生产者数组

9. Consumer Group

   消费者数组

##### 普通消息

1. 可靠同步消息

   发送方会在接收方返回响应后才继续发送下一个包.常见的场景如重要邮件、报名短信通知等

2. 可靠异步消息

   不等接收方返回响应就接着发送下一个包.发送方通过回调接口接受服务器响应.一般用于链路耗时较长的流处理等

3. 单向发送

   直接发送不需要接收方任何反馈

##### 顺序消息

消息指定hash值便可抵达同一Message Queue

##### 事务消息

通过事务消息，能达到消息的最终一致性

1. 投递半消息事务到消息队列

2. 提交本地事务.通知消息队列Commit/Rollback

   1. commit就投递消息到事务订阅方
   2. rollback则删除消息不做任何操作

3. 消息回查:当发生网络故障或服务宕机时，应提供消息队列回查功能(服务方得存储事务状态)

   事务订阅方异常也得进行回滚操作

### 服务配置

#### Nacos Config

**注：不能使用appliction.yml得使用bootstrap.yml**

> 配置文件优先级(由高到低):
>
> bootstrap.properties -> bootstrap.yml -> application.properties -> application.ym

### 分布式事务

#### 事务的四大特性

​	ACID:原子性、一致性、隔离性、持久性

#### 应用场景

​	事务的参与者分布在不同的节点中

#### 解决方案

##### 全局事务

全局事务基于DTP模型实现.Distributed Transaction Processing Reference Model

它需要三种角色

1. AP（Application Program）微服务应用
2. TM（Transaction Manager）事务管理器
3. RM （Resource Manager）资源管理器

两阶段提交：

1. 表决阶段.参与者都执行本地事务到差最后的一步commit/rollback
2. 执行阶段.根据所有参与者的反馈统一执行commit/rollback操作

优点：数据强一致性、简单

缺点:

1. 单点问题：事务协调者故障
2. 资源在两阶段中处于锁阻塞状态
3. 执行阶段无法知道commit结果

##### 可靠消息服务

通过中间件来保证上下游服务数据的最终一致性

##### 最大努力通知

##### TCC事务

即Try Confirm Cancel.它属于补偿型分布式事务

TCC与XA区别

XA是资源层面的分布式事务.2PC阶段资源处于锁状态.属于强一致性书屋

TCC是业务层面的分布式事务.最终一致性.不会一直持有资源锁

#### Seata

阿里巴巴中间件团队开源的中间件.是一套分布式解决方案

对业务无侵入式.对于传统的XA分布式事务RM本身就是数据库.而Seata的RM则是以jar包的方式最为中间件部署在应用程序中

## 参考资料
[API网关 Zuul1.0 和 2.0 我们该如何选择？](https://blog.didispace.com/api-gateway-Zuul-1-zuul-2-how-to-choose/)

[TCC、XA 、DTP区别](https://www.cnblogs.com/agilestyle/p/11623047.html)