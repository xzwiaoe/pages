## 总结

早期的mysql版本将utf8  
编码设置为1~3个字节，而emoji表情是4个字节,存到utf8编码的字段里当然报异常了.  
为此mysql后续增加utf8mb4编码.完美的兼容了emoji表情的保存


-----------------------------------------------------------------------------------------------------------

## Linux设置mysql字符编码

本人的linux系统为centos7.4.过程如下

- 1.进入文件编辑 vim /etc/my.cnf

- 2.在\[mysqld\]添加\
character-set-server=utf8mb4\
![](http://fublog.oss-cn-shenzhen.aliyuncs.com/20181211-b53fe2da49374b51a82cd98349c336cb.jpg)    

- 3.重启服务service mysql restart
- 4.mysql -u root -p 进入mysql
- 5.查看mysql字符集
```
mysql>SHOW VARIABLES WHERE Variable\_name LIKE 'character\\\_set\\_%' OR Variable_name LIKE 'collation%';
```
![](http://fublog.oss-cn-shenzhen.aliyuncs.com/20181211-dcc17908e004406ea8c9de3686751821.jpg)

OK,完美解决



### 下面这么设置更为彻底

```
\[client\]
default-character-set = utf8mb4

\[mysqld\]
character-set-client-handshake = false
character-set-server = utf8mb4
init_connect='SET NAMES utf8mb4'

\[mysql\]
default-character-set = utf8mb4
```
![](http://fublog.oss-cn-shenzhen.aliyuncs.com/20181211-ef9a7d7940064a38a08a987779c76280.jpg)    

### Windows设置mysql字符编码
----------------------

基本上与linux大同小异

去到目录(记得显示隐藏的文件) C:\\ProgramData\\MySQL\\MySQL Server 5.7，修改my.ini的文件

然后菜单cmd控制台net stop mysql/net start mysql

## MySQL混合utf8 utf8mb4是否比纯utf8mb4更具优势？


其实都差不多.utf8mb4其实就是标准的utf8.**他可以实现存储4个字节的emjoy表情而utf8不行**

另外需要注意的一点就是**utf8mb4的表字段最好不要用char固定字符.因为N个char字符所占用的空间是N*4字节.建议改用可变长度的varchar进行存储.效率方面稍好(增加额外的1-2字节记录其字段大小)**

而**纯英文字符**的字段(例如密码等).可以用varbinary(可变长度binary)和binary列(适用于固定长度的英文字符, 例如密码哈希)类型.性能比varchar略好, 因为这个存储二进制数据
