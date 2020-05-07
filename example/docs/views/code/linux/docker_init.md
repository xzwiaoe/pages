---
title: docker基本配置
date: 2020-5-6
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