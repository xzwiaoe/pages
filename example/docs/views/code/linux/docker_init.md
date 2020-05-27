---
title: docker基本配置与安装
date: 2020-05-06
tags:
  - linux
  - docker
categories:
  - code
---

## 设置国内镜像源
``` sh
vim /etc/docker/daemon.json

#新增以下内容(无则创建)
{
 "registry-mirrors": ["https://hub-mirror.c.163.com","https://reg-mirror.qiniu.com","https://registry.docker-cn.com"],
 "live-restore": true
}
```
之后重新启动服务：
``` sh
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```
检查加速器是否生效:
``` sh
$ docker info
  Registry Mirrors:
    https://hub-mirror.c.163.com/
    https://reg-mirror.qiniu.com/
    https://registry.docker-cn.com/

```

## 设置时区
### 镜像中直接修改(Dockerfile)
如果该镜像中有时区的设置,则可以直接修改
``` docker
FROM alpine:3.9

# 设置时区为上海
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
```

或者启动容器的时候添加环境变量时区为上海(镜像中有时区设置的话)
``` sh
-e TZ=Asia/Shanghai 
```
## 安装docker-compose
``` sh
#下载3种选一
sudo curl -L https://github.com/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.25.5/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
cp /home/tool/docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
#安装
chmod +x /usr/local/bin/docker-compose
#查看版本
docker-compose version
```

## docker安装中间件

### 安装mysql:8.0
#### 下载镜像文件
docker pull mysql:8.0
#### 创建实例并启动
``` sh
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/conf/conf.d:/etc/mysql/conf.d \
-v /mydata/mysql/conf/my.cnf:/etc/mysql/my.cnf \
-v /mydata/mysql/log:/logs \
-v /mydata/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root  \
-e TZ=Asia/Shanghai \
-d mysql:8.0
```

> 参数说明
- -p 3306:3306：将容器的3306端口映射到主机的3306端口
- -v /mydata/mysql/conf/my.cnf:/etc/mysql/my.cnf：将配置文件夹挂在到主机
- -v /mydata/mysql/log:/logs：将日志文件夹挂载到主机
- -v /mydata/mysql/data:/var/lib/mysql：将配置文件夹挂载到主机
- -e MYSQL_ROOT_PASSWORD=root：初始化root用户的密码

``` sh
#复制容器配置文件到宿主机目录
docker cp mysql:/etc/mysql/my.cnf /mydata/mysql/conf/my.cnf
#添加字符集配置并重启
vim /mydata/mysql/conf/conf.d/mysql.cnf
docker restart mysql
```
::: tip mysql.cnf
character_set_server=utf8mb4 \
collation-server=utf8mb4_general_ci \
init-connect='SET NAMES utf8mb4' \
init_connect='SET collation_connection = utf8mb4_general_ci' \
skip-character-set-client-handshake
:::

``` sh
# 进入mysql容器交互式
docker exec -it mysql /bin/bash
# 进入mysql
mysql  -uroot -proot
# 设置远程访问
use mysql;
alter user 'root'@'%' identified with mysql_native_password by 'root';
```
### 安装nginx:1.17.10
#### 下载镜像文件
``` sh
docker pull nginx:1.17.10
```
#### 创建实例并启动
``` sh
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-d nginx:1.17.10
```
#### 修改nginx配置
1. 将容器内的配置文件拷贝到当前目录：docker  cp nginx:/etc/nginx .
2. 修改文件名称：mv nginx conf
3. 终止容器：docker stop nginx
4. 执行命令删除原容器：docker rm nginx
5. 执行以下命令：
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx  \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.17.10

### 安装redis6.0.1
#### 下载镜像文件
``` sh
docker pull redis:6.0.1
```
#### 创建实例并启动
``` sh
docker run -p 6379:6379 --name redis -v /mydata/redis/data:/data -d redis:6.0.1 redis-server --appendonly yes
```
#### 使用redis镜像执行redis-cli命令连接
``` sh
docker exec -it redis redis-cli
```

### 安装mongodb4.2.6
#### 下载镜像文件
``` sh
docker pull mongo:4.2.6
``` 
#### 创建实例并运行
```sh
docker run -p 27017:27017 --name mongo -v /mydata/mongo/db:/data/db -d mongo:4.2.6
``` 
#### 使用mongo命令进入容器
``` sh
docker exec -it mongo mongo
```

### 安装rabbitmq
#### 下载镜像文件
``` sh
docker pull rabbitmq:management
```
#### 创建实例并启动
``` sh
docker run -d --name rabbitmq --publish 5671:5671 \
 --publish 5672:5672 --publish 4369:4369 --publish 25672:25672 --publish 15671:15671 --publish 15672:15672 \
rabbitmq:management
```
#### 常规设置
- 访问管理页面地址：http://192.168.3.10:15672/
- 输入账号密码并登录：guest guest
- 创建帐号并设置其角色为管理员：mall mall 
- 创建一个新的虚拟host为：/mall

## 常用命令
### 运行容器(run)
run是我们最常用的命令：
``` docker
docker run nginx
```
如上，便启动了一个nginx容器

### 端口映射(-p)
此时，我们还无法通过访问宿主机的IP来访问刚才部署的Nginx，需要先进行端口映射：
``` docker
docker run -p 8080:80 nginx
```

### 后台运行(-d)
默认情况下，当我们推出命令行时，容器也会被关闭

我们可以使用-d参数使容器保持后台运行：

`docker run -d <image-name>`

然后访问宿主机的IP:8080，便可以看到`Welcome to nginx!`

### 指定名称(-n)
`docker run --name <container-name> <image-name>`
``` docker
docker run --name myredis redis
```
如上，创建了一个名称为redis的容器

### 进入交互模式(-it)
`docker run -it [image-name] /bin/bash`
- -i interact 进入交互模式
- -t tty 分配一个伪终端
执行之后，可以看到命令行的主机名已经变成了容器的Id，表示成功进入到了容器中，可以使用exit命令退出容器

## 参考文献
[Docker 镜像加速](https://www.runoob.com/docker/docker-mirror-acceleration.html)

[Docker 镜像，基于 alpine 系统的时区配置](https://blog.csdn.net/isea533/article/details/87261764)

[Docker Hello World](https://www.runoob.com/docker/docker-hello-world.html)

[mall在Linux环境下的部署(基于Docker Compose)](http://www.macrozheng.com/#/deploy/mall_deploy_docker_compose)