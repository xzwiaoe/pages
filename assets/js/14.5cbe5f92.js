(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{356:function(t,s,a){"use strict";a.r(s);var n=a(2),e=function(t){t.options.__data__block__={flowchart_382ee165:"process=>operation: master有push更新\nprocess2=>operation: 触发Github Actions\nprocess3=>operation: 打包并部署到gh-pages分支\nprocess4=>operation: SSH远程登录云服务器git pull(gh-pages分支)\ne=>end: End\n\nprocess->process2\nprocess2->process3\nprocess3->process4\nprocess4->e"}},r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),a("h3",{attrs:{id:"流水式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#流水式"}},[t._v("#")]),t._v(" 流水式")]),t._v(" "),a("p",[t._v("传统写MD文章，然后提交到Github并本地执行build打包完上传到云服务器")]),t._v(" "),a("h3",{attrs:{id:"自动化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动化"}},[t._v("#")]),t._v(" 自动化")]),t._v(" "),a("p",[t._v("新建gh-pages分支,配合pages.github.io和Github Actions"),a("br"),t._v("\n触发push到master主分支的行为就执行.github/workflows/*.yml下的文件.而达到自动化打包更新")]),t._v(" "),a("h3",{attrs:{id:"加快网络访问"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#加快网络访问"}},[t._v("#")]),t._v(" 加快网络访问")]),t._v(" "),a("p",[t._v("毕竟是国外的网络,对于国内访问非常卡😨,于是此篇文章的目是"),a("br"),t._v("\n只要master有更新😀便同步执行云服务器的shell脚本更新😍.生成最新的文章页面💪")]),t._v(" "),a("FlowChart",{attrs:{id:"flowchart_382ee165",code:t.$dataBlock.flowchart_382ee165,preset:"vue"}}),a("h2",{attrs:{id:"准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[t._v("#")]),t._v(" 准备")]),t._v(" "),a("h3",{attrs:{id:"切换-npm-镜像源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#切换-npm-镜像源"}},[t._v("#")]),t._v(" 切换 NPM 镜像源")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g nrm\n\n/**\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" ---- https://registry.npmjs.org/\n  cnpm --- http://r.cnpmjs.org/\n  taobao - http://registry.npm.taobao.org/\n  eu ----- http://registry.npmjs.eu/\n  au ----- http://registry.npmjs.org.au/\n  sl ----- http://npm.strongloop.com/\n  nj ----- https://registry.nodejitsu.com/\n**/\n \n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#切换到taobao")]),t._v("\nnrm use taobao\n")])])]),a("h2",{attrs:{id:"选用开源项目并部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#选用开源项目并部署"}},[t._v("#")]),t._v(" 选用开源项目并部署")]),t._v(" "),a("p",[t._v("本文采用此开源项目："),a("a",{attrs:{href:"https://vuepress-theme-reco.recoluan.com/views/1.x/",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuepress-theme-reco"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://vuepress-theme-reco.recoluan.com/views/other/domain.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Pages 自定义域名"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://vuepress-theme-reco.recoluan.com/views/other/deploy.html#github",target:"_blank",rel:"noopener noreferrer"}},[t._v("Pages 部署"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用 GitHub Actions 自动部署博客"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"开始部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开始部署"}},[t._v("#")]),t._v(" 开始部署")]),t._v(" "),a("p",[t._v("按照以上的教程链接就能成功.")]),t._v(" "),a("p",[t._v("如果还有不懂的就看下我的github："),a("a",{attrs:{href:"https://github.com/xzwiaoe/xzwiao.github.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("xzwiao.github.io"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("里面有两个分支master(主分支.放源码)和gh-pages(存放build编译后的包)")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# ${home}/.github/workflows/main.yml")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy GitHub Pages\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 触发条件：在 push 到 master 分支后")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branches")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 任务")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build-and-deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 服务器环境：最新版 Ubuntu")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拉取代码")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Checkout\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/checkout@v2\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("persist-credentials")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 生成静态文件")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Build\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" npm install && npm run build\n\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 部署到 GitHub Pages")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" JamesIves/github"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("deploy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("action@releases/v3\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ACCESS_TOKEN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.ACCESS_TOKEN "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("BRANCH")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("FOLDER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" dist\n")])])]),a("h2",{attrs:{id:"github-actions自动触发服务器更新"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-actions自动触发服务器更新"}},[t._v("#")]),t._v(" github Actions自动触发服务器更新")]),t._v(" "),a("p",[t._v("由于github.io的服务器是在国外.并且并发量比较大，导致带宽的严重缓慢"),a("br"),t._v("\n于是便有了部署到个人的阿里云服务器上的想法\\")]),t._v(" "),a("h3",{attrs:{id:"生成rsa公私匙"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成rsa公私匙"}},[t._v("#")]),t._v(" 生成RSA公私匙")]),t._v(" "),a("p",[t._v("这里推荐码云的教程："),a("a",{attrs:{href:"https://gitee.com/help/articles/4191#article-header0",target:"_blank",rel:"noopener noreferrer"}},[t._v("生成/添加SSH公钥"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("TIP:记得在云服务器上操作")]),t._v(" "),a("h3",{attrs:{id:"添加公匙到github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加公匙到github"}},[t._v("#")]),t._v(" 添加公匙到Github")]),t._v(" "),a("p",[t._v("把在云服务生成的id_rsa.pub添加到settings->Deploy Keys中(如下图)\n"),a("img",{attrs:{src:"https://fublog.oss-cn-shenzhen.aliyuncs.com/vuepress/vuepress_deploy.png",alt:"添加公匙到Github"}})]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#克隆项目到云服务器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/xzwiaoe/xzwiao.github.io.git\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#切换到分支gh-pages(记得cd到项目根目录)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout gh-pages\n")])])]),a("h3",{attrs:{id:"编写shell-vs-nginx-conf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写shell-vs-nginx-conf"}},[t._v("#")]),t._v(" 编写shell VS nginx.conf")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#deploy_blog.sh")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#!/bin/bash")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#去到目录")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /home/blog\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#更新最新代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull\n")])])]),a("p",[t._v("记得赋予deploy.sh执行权限(chmod命令)")]),t._v(" "),a("p",[t._v("配置https请先自行百度.晚点把教程补上")]),t._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#nginx.conf")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#重定向到https")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v("  fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("rewrite")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("$ "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("https")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" permanent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#开启https")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("443")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v(" www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl")]),t._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v(" html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("htm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_certificate")]),t._v("   cert"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3652143")]),t._v("_www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_certificate_key")]),t._v("  cert"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3652143")]),t._v("_www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fumeck"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_session_timeout")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_ciphers")]),t._v(" ECDHE"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("RSA"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("AES128"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("GCM"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("SHA256"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("ECDHE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("ECDH"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("AES"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("HIGH"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("NULL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("aNULL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("MD5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("ADH"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("RC4"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_protocols")]),t._v(" TLSv1 TLSv1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" TLSv1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ssl_prefer_server_ciphers")]),t._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("home"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("blog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"云服务器允许ssh远程登录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#云服务器允许ssh远程登录"}},[t._v("#")]),t._v(" 云服务器允许SSH远程登录")]),t._v(" "),a("p",[t._v("到目前为止,网站已能访问，但还不够自动化"),a("br"),t._v("\n每次发布文章还得手动的执行deploy_blog.sh脚本."),a("br"),t._v("\n所以这里还差两歩：")]),t._v(" "),a("ul",[a("li",[t._v("1.云服务器允许SSH远程登录")]),t._v(" "),a("li",[t._v("2.Github Actions触发远程更新")])]),t._v(" "),a("p",[t._v("登录"),a("a",{attrs:{href:"https://homenew.console.aliyun.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("阿里云控制台"),a("OutboundLink")],1),t._v(",云服务器ECS->网络与安全->密匙对"),a("br"),t._v("\n创建密匙对并绑定到对应的ECS实例中，然后重启实例\n实例就只允许使用RSA密匙的方式登录(旧的密码方式失效)")]),t._v(" "),a("p",[t._v("以下为客户端访问远程服务器测试")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("#此时有需要RSA密匙对.可以重用之前的\n#远程服务器放置公匙(已在阿里云密匙对中添加并绑定)\n#客户端放置私匙\nssh-add ~/.ssh/id_rsa\n#默认端口是22.其他端口得加 -p 端口号\nssh-keyscan -t rsa 47.106.96.91\n")])])]),a("h3",{attrs:{id:"出bug了"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#出bug了"}},[t._v("#")]),t._v(" 出Bug了")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#执行ssh")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" -o "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("StrictHostKeyChecking")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("no -i ~./ssh/id_rsa -A -tt -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22506")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("39.108")]),t._v(".175.238 "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#报如下错误.去掉 -i ~./ssh/id_rsa就不会")]),t._v("\ntilde_expand_filename: No such user "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),a("p",[t._v("这个暂时找不到原因，Github Actions不会有这个问题，所以先略过")]),t._v(" "),a("p",[t._v("以下是部署方式")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(' deploy-on-aliyun:\n    needs: build-and-deploy\n    # 服务器环境：最新版 Ubuntu\n    runs-on: ubuntu-latest\n    steps:\n      - name: Setup git file\n        env: \n          ACTIONS_DEPLOY_KEY: ${{ secrets.deploy_key }}\n        run: |\n          SSH_PATH="~/.ssh"\n          mkdir -p $SSH_PATH\n          touch "$SSH_PATH/known_hosts"\n          echo "$ACTIONS_DEPLOY_KEY" > "$SSH_PATH/id_rsa"\n          chmod 700 "$SSH_PATH"\n          chmod 600 "$SSH_PATH/known_hosts"\n          chmod 600 "$SSH_PATH/id_rsa"\n          echo "file addad"\n      - name: Setup git excute\n        env: \n          USER: root\n          HOST: 39.108.175.238\n          PORT: 22506\n        run: |\n          SSH_PATH="~/.ssh"\n          eval $(ssh-agent)\n          ssh-add "$SSH_PATH/id_rsa"\n          ssh-keyscan -t rsa -p $PORT $HOST >> "$SSH_PATH/known_hosts"\n          ssh -o StrictHostKeyChecking=no -i $SSH_PATH/id_rsa -A -tt -p $PORT $USER@$HOST ./deploy_blog.sh\n')])])]),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/ddc0b8f8f72a",target:"_blank",rel:"noopener noreferrer"}},[t._v("切换镜像源"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/e3ba86e9c46d",target:"_blank",rel:"noopener noreferrer"}},[t._v("通过GitHub actions发布hugo到私有云服务器"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("阮一峰："),a("br"),t._v(" "),a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("SSH原理与运用（一）：远程登录"),a("OutboundLink")],1),a("br"),t._v(" "),a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("SSH原理与运用（二）：远程操作与端口转发"),a("OutboundLink")],1)])],1)}),[],!1,null,null,null);"function"==typeof e&&e(r);s.default=r.exports}}]);