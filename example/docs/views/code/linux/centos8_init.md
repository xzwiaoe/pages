---
title: Centos8搭建
date: 2020-05-05
tags:
  - linux
categories:
  - code
---

## 前言
最近在学习微服务系统.基本都是docker容器化\
还有许多中间件的安装
-   消息中间件RabbitMq、RocketMq
-   分布式事务zk、Redis

所以打算在电脑装个虚拟机运行Linux系统\
最后选择用CentOs8.0系统

## 环境搭建
|名称|说明|下载链接
|-|-|-
|VirtualBox|Oracle虚拟机|https://www.virtualbox.org/wiki/Downloads
|Centos8.8.1.1911|Linux系统版本|http://mirrors.aliyun.com/centos/8.1.1911/isos/x86_64/
|Redis|缓存中间件|http://download.redis.io/releases/redis-5.0.8.tar.gz
|RocketMq|消息队列中间件|

## 系统设置
### 关闭图形资源
``` sh
init 3 #暂时关闭
systemctl set-default mutil-user.target #设置默认，重启生效
```
### 设置阿里镜像源
#### 备份
``` sh
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
#### 下载新CentOS-Base.repo到/etc/yum.repos.d/
``` sh
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```
#### 运行yum makecache 生成缓存

### 安装docker容器
::: danger
centos7.X的安装方式会失败
::: 
#### 卸载旧版本
``` sh
yum remove docker  docker-common docker-selinux docker-engine
```
#### 安装依赖
``` sh
yum install -y yum-utils  device-mapper-persistent-data  lvm2

yum-config-manager  --add-repo   https://download.docker.com/linux/centos/docker-ce.repo

yum install https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm

yum install docker-ce docker-ce-cli containerd.io
```
#### 启动docker
``` sh
systemctl start docker
```
#### 查看版本
``` sh
docker --version
```
#### 开机自启
``` sh
systemctl enable docker
```
### 安装node
``` sh
#下载
sudo curl -L https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz -o /home/tool/node-v12.18.3.tar.xz
tar -xvf node-v12.18.3.tar.xz
mv node-v12.18.3/ /usr/local/nodejs
# 返回根目录并添加以下jdk环境变量
cd ~
vim +  ./.bashrc
# 更新环境变量
source ~/.bashrc
#查看版本
node -v
npm -v
```
::: tip node环境变量
export PATH=$PATH:/usr/local/nodejs/bin
:::

## 参考文献
[CentOS7设置阿里镜像教程](https://www.cnblogs.com/zhaoyanhaoBlog/p/12118473.html)

[阿里Centos镜像设置](https://developer.aliyun.com/mirror/centos?spm=a2c6h.13651102.0.0.3e221b11QPgwkB)

[centos图形界面的开启和关闭](https://www.cnblogs.com/beyang/p/8513215.html)

[centos8 安装 docker](https://www.cnblogs.com/yadongliang/p/12535004.html)

[CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html)

[CentOS Nodejs 安装](https://www.cnblogs.com/zhi-leaf/p/10979629.html)

[修改Nodejs内置的npm默认配置路径方法](https://www.cnblogs.com/fuqiang88/p/11426804.html)