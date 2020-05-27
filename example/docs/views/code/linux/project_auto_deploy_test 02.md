---
title: 测试服务器自动化部署(二)
date: 2020-05-26
tags:
  - linux
  - docker
categories:
  - code
---

## 可视化自动部署

### 安装jkenis

- 下载Jenkins的Docker镜像：

``` sh
docker pull jenkins/jenkins:lts
```

- 在Docker容器中运行Jenkins：

``` sh
docker run -p 8080:8080 -p 50000:5000 --name jenkins \
-u root \
-v /mydata/jenkins_home:/var/jenkins_home \
-d jenkins/jenkins:lts
```

- 运行成功后访问该地址登录Jenkins，第一次登录需要输入管理员密码：http://192.168.3.8:8080/

- 使用管理员密码进行登录，可以使用以下命令从容器启动日志中获取管理密码：

``` sh
docker logs jenkins
```

- 安装必要的插件进行安装

## 编写shell脚本

- 拉取项目最新代码.打包构建新镜像
- 停止并删除旧容易
- 基于新镜像构建新容器并启动(docker-compose方式)

### sh脚本粒度思考

主要从几个维度思考.注册中心/配置/网关更新的频率比较低

后台体统.前端系统相对独立,有时只是更新一个端而已,没必要重新部署两个端

所以这里分config.sh、admin.sh、portal.sh三个脚本

``` sh
#!/usr/bin/env bash
app_name01='namo-registry'
app_name02='namo-config'
app_name03='namo-gateway'
cd /root/namo-cloud/namo-registry/
echo '----begin mvn package----'
mvn clean package
echo '----stop container----'
docker stop ${app_name01}
echo '----rm container----'
docker rm ${app_name01}
cd /root/namo-cloud/namo-config/
echo '----begin mvn package----'
mvn clean package
echo '----stop container----'
docker stop ${app_name02}
echo '----rm container----'
docker rm ${app_name02}
cd /root/namo-cloud/namo-gateway/
echo '----begin mvn package----'
mvn clean package
echo '----stop container----'
docker stop ${app_name03}
echo '----rm container----'
docker rm ${app_name03}
echo '----rm none images----'
docker rmi `docker images | grep none | awk '{print $3}'`
echo '----start container----'
docker-compose -f /root/docker-compose-config.yml up -d
```

``` sh
#!/usr/bin/env bash
app_name='namo-admin'
cd /root/namo-cloud/namo-admin/
echo '----begin mvn package----'
mvn clean package
echo '----stop container----'
docker stop ${app_name}
echo '----rm container----'
docker rm ${app_name}
echo '----rm none images----'
docker rmi `docker images | grep none | awk '{print $3}'`
echo '----start container----'
docker-compose -f /root/docker-compose-app.yml up -d
```

``` sh
#!/usr/bin/env bash
app_name='namo-portal'
cd /root/namo-cloud/namo-portal/
echo '----begin mvn package----'
mvn clean package
echo '----stop container----'
docker stop ${app_name}
echo '----rm container----'
docker rm ${app_name}
echo '----rm none images----'
docker rmi `docker images | grep none | awk '{print $3}'`
echo '----start container----'
docker-compose -f /root/docker-compose-app.yml up -d
```

为三个shell文件设置可执行权限

``` sh
chmod +x /root/jenkins_sh/config.sh
chmod +x /root/jenkins_sh/admin.sh
chmod +x /root/jenkins_sh/portal.sh
```

## 开机自启动

[Centos8搭建](https://www.fumeck.com/views/code/linux/centos8_init.html)中,已设置docker开机自启动

在docker-compose的容器中添加属性restart: always,便会伴随docker的启动而运行容器:kissing_heart:

## 参考文献

[mall在Linux环境下的部署（基于Docker Compose）](http://www.macrozheng.com/#/deploy/mall_deploy_docker_compose)

[使用Jenkins一键打包部署SpringBoot应用，就是这么6！](https://mp.weixin.qq.com/s/tQqvgSc9cHBtnqRQSbI4aw)

[微服务架构下的自动化部署，使用Jenkins来实现！](http://www.macrozheng.com/#/deploy/mall_swarm_deploy_jenkins)