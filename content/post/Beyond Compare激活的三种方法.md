+++
title= "Beyond Compare激活的三种方法"
date= 2019-02-18T13:04:07+08:00
categories = ["技术"]
slug = "how to crack Beyond compare trial"
codes = ["ini"]
description = ""
+++

## 1、删除BCUnrar.dll

找到Beyond Compare 4安装文件夹下面的BCUnrar.dll(过期后才生成)，将其删掉或重命名，再重新打开，就可以接着使用30天。但是下次过期，还需要再次删除BCUnrar.dll。

<!--more-->

## 2、自定义破解方法

找到`C:\\Users\\%Username%\\AppData\\Roaming\\BeyondCompare\\BCompare.ini`
文件内容如下：

```ini
\[BCompare\]

InstallTime=1524891125（安装时间）

LastLoading=1528959797（最近一次打开时间）
```

而所谓的试用期，就是LastLoading - InstallTime，看是否超过30天。

因此，只需在未过期时，修改`BCompare.ini`的读写权限，让其只读，使lastLoading不能被修改。

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190218130641.png" alt="">}}

用上一个月试试就知道咯!

## 3、删除Beyond Compare 4文件夹

删除`C:\\Users\\%username%\\AppData\\Roaming\\Scooter Software`这个目录里面的`Beyond Compare 4`文件夹，重新打开Beyond Compare即可。
