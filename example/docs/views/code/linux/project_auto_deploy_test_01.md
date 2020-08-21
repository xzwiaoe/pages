---
title: 测试服务器自动化部署(一)
date: 2020-05-08
tags:
  - linux
  - docker
categories:
  - code
---
## 说明及前置要求

本系统采用Linux系统contos8.0版本

项目使用Java语言,Spring boot框架,利用mvn插件docker-maven-plugin在打包(package/build)时自动构建镜像

项目基于微服务spring cloud全家桶.部署到码云Gitee.com中.

使用docker容器装载每个服务.docker-compose进行部署.

- 基础环境 docker-compose-env.yml

|应用|说明|
|-|-|
|nginx|http反向代理工具
|mysql|关系型数据库
|mongo|非关系型数据库
|redis|缓存中间件
|rabbitMq|消息队列中间件
|jenkins|自动化部署项目

- 配置环境 docker-compose-config.yml

|应用|说明|
|-|-|
|eureka|注册与发现中心
|config|配置中心
|gateway|网关

- 具体的项目(有依赖关系,需配置项目启动完成后启动) docker-compose-app.yml

[Centos8搭建](https://www.fumeck.com/views/code/linux/centos8_init.html)

[docker教程链接](https://www.fumeck.com/views/code/linux/docker_init.html)

## 部署思路

- 在码云配置公匙然后在测试服务器免密pull拉取新版本
- 进入项目根目录进行maven package打包重新构建docker镜像
- 停止并删除旧容器,使用docker-compose用新的docker镜像构建新容器并启动
- 编写shell脚本，配合Jenkins进行自动化部署,非专业人士也能去打包了(真香:ok_man:)

## 配置环境

### java

由于jdk-8u251-linux-x64.tar.gz需要登录才能下载.所以自行下载并上传到服务器

[下载链接](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)

``` sh
cd /usr/local
# 解压到当前目录(/usr/local)
tar -xvf /home/tool/jdk-8u251-linux-x64.tar.gz
# 返回根目录并添加以下jdk环境变量
cd ~
vim +  ./.bashrc
# 更新环境变量
source ~/.bashrc
# 查看是否生效
java -version
    java version "1.8.0_251"
    Java(TM) SE Runtime Environment (build 1.8.0_251-b08)
    Java HotSpot(TM) 64-Bit Server VM (build 25.251-b08, mixed mode)
```

::: tip jdk环境变量
export JAVA_HOME=/usr/local/jdk1.8.0_251\
export JRE_HOME=${JAVA_HOME}/jre\
export CLASSPATH=.:{JAVA_HOME}/lib:${JRE_HOME}/lib\
export PATH=${JAVA_HOME}/bin:$PATH
:::

### maven

``` sh
wget https://mirror.bit.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
cd /usr/local
tar -xvf /home/tool/apache-maven-3.6.3-bin.tar.gz
# 添加以下jdk环境变量
vim +  ./.bashrc
# 更新环境变量
source ~/.bashrc
# 查看是否生效
mvn -version
    Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
    Maven home: /usr/local/apache-maven-3.6.3
    Java version: 1.8.0_251, vendor: Oracle Corporation, runtime: /usr/local/jdk1.8.0_251/jre
    Default locale: zh_CN, platform encoding: UTF-8
    OS name: "linux", version: "4.18.0-147.el8.x86_64", arch: "amd64", family: "unix"
```

::: tip maven环境变量
export M2_HOME=/usr/local/apache-maven-3.6.3 \
export PATH=$PATH:$JAVA_HOME/bin:$M2_HOME/bin
:::
修改${maven_home}/conf/setting.xml配置：

- 仓库地址

``` xml
<localRepository>/home/repo</localRepository>
```

- 使用阿里镜像源

``` xml
<mirror> 
    <id>alimaven</id> 
    <name>aliyun maven</name> 
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url> 
    <mirrorOf>central</mirrorOf> 
</mirror>
```

### git

``` sh
yum install -y git
```

## 部署项目

### 部署公匙到gitee

``` sh
#3个回车就完事了
ssh-keygen -t rsa -C "xxx@xxx.com"
#查看 ~/.ssh/id_rsa.pub 文件内容，获取到你的 public key
cat ~/.ssh/id_rsa.pub
```

将获取到的public key添加到项目->管理->部署公匙管理->添加部署公匙
![部署公匙](https://fublog.oss-cn-shenzhen.aliyuncs.com/vuepress/project_auto_deploy_test-02.png)

### 拉取项目并打包

``` sh
#xxx/xxx换成自己的项目地址
git clone git@gitee.com:xxx/xxx.git
#打包jar(进到项目根目录中)
mvn clean package
```

**Git通过ssh协议免密pull拉取项目**

![SSH](https://fublog.oss-cn-shenzhen.aliyuncs.com/vuepress/project_auto_deploy_test-01.png)

### 使用docker-maven-plugin插件自动打包jar到Docker镜像

``` xml
<artifactId>namo-demo</artifactId>
<version>1.0.0</version>
<properties>
  <docker.maven.plugin.version>1.2.2</docker.maven.plugin.version>
</properties>
<build>
  <directory>${project.basedir}/target</directory>
  <finalName>${project.artifactId}-${project.version}</finalName>
  <plugins>
      <plugin>
          <groupId>com.spotify</groupId>
          <artifactId>docker-maven-plugin</artifactId>
          <version>${docker.maven.plugin.version}</version>
          <executions>
              <execution>
                  <id>build-image</id>
                  <phase>package</phase>
                  <goals>
                      <goal>build</goal>
                  </goals>
              </execution>
          </executions>
          <configuration>
              <imageName>namo-cloud/${project.artifactId}:${project.version}</imageName>
              <!--<dockerHost>${docker.host}</dockerHost> 不上传到其他服务器-->
              <baseImage>java:8</baseImage>
              <entryPoint>["java", "-jar", "-Dspring.profiles.active=prod","/${project.build.finalName}.jar"]
              </entryPoint>
              <resources>
                  <resource>
                      <targetPath>/</targetPath>
                      <directory>${project.build.directory}</directory>
                      <include>${project.build.finalName}.jar</include>
                  </resource>
              </resources>
          </configuration>
      </plugin>
  </plugins>
</build>
```

### 使用shell脚本启动容器

使用mvn package打包后,构建新的容器并启动

``` sh
#!/usr/bin/env bash
app_name='namo-registry'
docker stop ${app_name}
echo '----stop container----'
docker rm ${app_name}
echo '----rm container----'
docker rmi `docker images | grep none | awk '{print $3}'`
echo '----rm none images----'
docker run -p 8001:8001 --name ${app_name} \
-v /etc/localtime:/etc/localtime \
-v /mydata/app/${app_name}/logs:/var/logs \
-d namo-cloud/${app_name}:1.0.0
echo '----start container----'
```

>参数说明

- -p 8001:8001 将容器的8001端口映射到主机的8001端口
- -v /etc/localtime:/etc/localtime 容器与宿主时间同步
- -v /mydata/app/${app_name}/logs:/var/logs将日志文件夹挂载到主机
- -d 后台运行镜像

## 编辑docker-compose

``` yml
version: '3'
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-test
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    restart: always #自启动
    environment:
      MYSQL_ROOT_PASSWORD: root #设置root帐号密码
    ports:
      - 3306:3306
    volumes:
      - /mydata/mysql/conf/conf.d:/etc/mysql/conf.d #数据文件挂载
      - /mydata/mysql/conf/my.cnf:/etc/mysql/my.cnf #配置文件挂载
      - /mydata/mysql/log:/logs #日志文件挂载
      - /mydata/mysql/data:/var/lib/mysql #数据
  redis:
    image: redis:6.0.1
    container_name: redis-test
    command: redis-server --appendonly yes
    restart: always
    volumes:
      - /mydata/redis/data:/data #数据文件挂载
    ports:
      - 6379:6379
  nginx:
    image: nginx:1.17.10
    container_name: nginx-test
    restart: always
    volumes:
      - /mydata/nginx/conf:/etc/nginx #配置文件挂载
      - /mydata/nginx/html:/usr/share/nginx/html #静态资源根目录挂载
      - /mydata/nginx/logs:/var/log/nginx #日志文件挂载
    ports:
      - 80:80
  rabbitmq:
    image: rabbitmq:management
    container_name: rabbitmq-test
    restart: always
    volumes:
      - /mydata/rabbitmq/data:/var/lib/rabbitmq #数据文件挂载
      - /mydata/rabbitmq/log:/var/log/rabbitmq #日志文件挂载
    ports:
      - 5672:5672
      - 15672:15672
  mongo:
    image: mongo:4.2.6
    container_name: mongo-test
    restart: always
    volumes:
      - /mydata/mongo/db:/data/db #数据文件挂载
    ports:
      - 27017:27017
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins-test
    restart: always
    user: root
    volumes:
      - /mydata/jenkins_home:/var/jenkins_home
    ports:
      - 50000:5000
      - 8080:8080
```

接着后台启动就完事了

``` sh
docker-compose -f /root/docker-compose-env.yml up -d
```

## 参考文献

[生成/添加SSH公钥](https://gitee.com/help/articles/4181#article-header0)

[Docker三剑客之Docker-Compose](https://www.cnblogs.com/ityouknow/p/8648467.html)

[mall在Linux环境下的部署(基于Docker Compose)](http://www.macrozheng.com/#/deploy/mall_deploy_docker_compose)