+++
title= "Mac下执行sh脚本显示Command Not Found如何解决"
date= 2019-02-20T22:44:14+08:00
toc = true
mathjax = false
tags = ["unix","dos"]
categories = ["技术"]
codes = ["bash"]
slug = "how to solve the 'Command Not Found' when runing sh file"
keywords = ["hugo","unix"]
+++

## 情景回顾
在win10系统里写了一个自动部署调试的sh脚本，拷贝到mac的hugo目录下，试图运行一下，发现报`command not found`的错误，即便通过`chmod`增大权限也无济于事：

```bash
$:hugo root# chmod -R 777 *
$:hugo root# ./server.sh
: command not found: hugo server
$:hugo root# sudo chmod +x ./server.sh
$:hugo root# ./server.sh
: command not found: hugo server
```
## 问题原因
mac下执行.sh脚本错误很多情况只是.sh脚本在windows系统与Unix不同系统的编码格式引起的。

## 解决方案
转行文件的编码格式，具体操作如下：

### 确保当前用户有足够权限
```bash
$:hugo root# chmod a+x server.sh
```

### 修改文件格式

（1）使用vi工具

```bash
$:hugo root# vi server.sh
```

（2）利用如下命令查看文件格式

```bash
 :set ff
or
 :set fileformat
```
可以看到如下信息

`fileformat=dos` 或 `fileformat=unix`

（3） 利用如下命令修改文件格式

```bash
:set ff=unix
or
:set fileformat=unix
```
接下来，键入`:wq`来存盘退出。


### 重新执行脚本

```bash
$:hugo root# ./server.sh
                   | EN
+------------------+-----+
  Pages            | 898
  Paginator pages  |   2
  Non-page files   |   0
  Static files     |  45
  Processed images |   0
  Aliases          |   1
  Sitemaps         |   1
  Cleaned          |   0

Total in 696 ms
```
收工。
