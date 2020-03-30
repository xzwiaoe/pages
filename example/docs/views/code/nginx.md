---
title: Nginx之location、root详解
date: 2020-03-26
tags:
  - Web
categories:
  - code
---

## 概述
是一个高效的HTTP反向代理服务器.他的功能很强大
- 路由
- 缓存
- 负载均衡
- 防盗链
还有许多许多的，欢迎补上

## location匹配
### 格式
``` nginx
location [ 空格 | = | ~ | ~* | !~ | !~* ]  /uri/ {
    
}
```

::: warning
#### 精确匹配: 相等(=)
#### 字符串匹配: 字符串匹配(空格) 匹配开头(^~)
#### 正则匹配: 区分大小写匹配(~) 不区分大小写匹配(~\*) 区分大小写不匹配(!~) 不区分大小写不匹配(!~\*)
:::

### 搜索优先级
::: warning
精确匹配 > 
字符串匹配( 长 > 短 [ 注: ^~ 匹配则停止匹配 ]) > 
正则匹配( 上 > 下 )

精确匹配只能命中一个\
字符串匹配使用匹配最长的为匹配结果\
正则匹配按照location定义的顺序进行匹配，先定义具有高优先级
:::

> 特别注意：  
字符串匹配优先搜索，但是只是记录下最长的匹配 ( 如果 ^~ 是最长的匹配，则会直接命中，停止搜索正则 )，然后继续搜索正则匹配，如果有正则匹配，则命中正则匹配，如果没有正则匹配，则命中最长的字符串匹配.

### root与alias
``` nginx
location /img/ {
    alias /var/www/image/;
}
```
若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去<font color='red'>**/var/www/image**</font>目录找文件

``` nginx
location /img/ {
    root /var/www/image;
}
```
若按照这种配置的话，则访问/img/目录下的文件时，nginx会去<font color='red'>**/var/www/image/**</font><font color='red'><td bgcolor=yellow>**img/**</td></font>目录下找文件
> 注：alias与root最主要的差别就在于`多了黄色`背景块

alias是一个目录别名的定义，root则是最上层目录的定义。
还有一个重要的区别是alias后面<font><td bgcolor=yellow>**必须要用“/”结束**</td></font>,否则会找不到文件的。。。而root则可有可无~~

## 参考文献
[nginx配置：location配置方法及实例详解](https://www.cnblogs.com/sunkeydev/p/5225051.html)\
[Nginx——location常见配置指令，alias、root、proxy_pass](https://blog.csdn.net/zhangliangzi/article/details/78257593)\
[nginx的location root 指令](https://www.cnblogs.com/shihaiming/p/6183923.html)\
[后端程序员不得不会的 Nginx 转发匹配规则](https://juejin.im/post/5e78626ae51d45270c27a66f?utm_source=gold_browser_extension)