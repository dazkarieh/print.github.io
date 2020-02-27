+++
title= "Git停留在writing objects/上传慢解决方案"
date= 2019-02-01T16:06:50+08:00
tags = ["github","hugo"]
categories = ["前端"]
codes = ["bash"]
draft= false
slug = "Git stuck on writing objects"
description = "Git停留在writing_objects和上传慢一般发生在push命令中，有很大可能是push的文件过大所致"
+++

## 1.git push 停留在writing objects的问题

Git 在push的时候报错，始终无法继续下一步,终端显示信息：

```bash
error: RPC failed; result=22, HTTP code = 411
fatal: The remote end hung up unexpectedly
fatal: The remote end hung up unexpectedly
Everything up-to-date
```
以上发生在push命令中，有可能是push的文件过大导致。

### 解决方法

1. **windows系统**
在`.git/config`文件中加入
```bash
[http]
postBuffer = 524288000
```
如果找不到`.git`目录，请设置显示不可见文件。

2. **linux/macOS**
在终端输入：
```bash
$ git config --global http.postBuffer 524288000
```

### 问题关键
http.postBuffer默认上限为1M，上面的命令是把git的配置里http.postBuffer的变量改大为500M


## 2.文件大,上传慢

### 解决方法

把远程仓库的上传由原来的HTTPS改为SSH上传
```bash
$ git remote set-url origin [你的ssh地址]
```
### 问题关键
github在国内本身就慢，还可能被dns污染 , 因此推荐使用SSH上传

### 如何验证更改成功

```bash
$ git remote -v
#origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
#origin  git@github.com:USERNAME/REPOSITORY.git (push)
```