+++
title= "WIN10通过iTunes将iPhone备份到移动硬盘的方法"
date= 2019-02-11T12:04:05+08:00
tags = ["iTunes","Apple"]
categories = ["技术"]
slug = "change itunes backup dir in Win10"
description = ""
+++

## 问题描述

在WIN10系统，通过iTunes备份iPhone数据时，只能备份到默认的C盘目录下：
`C:\Users\%USERNAME%\AppData\Roaming\Apple Computer\MobileSync\Backup`

随着iPhone存储空间越来越大（普遍在256G以上），备份占用的C盘空间将会非常大，甚至会出现C盘空间不足的情况。这时就需要将备份存到C盘以外的硬盘空间，或者自己的移动硬盘上。而这是iTunes自身不支持的方式。

## 解决方法
解决方法就是使用**mklink**，将默认的Backup文件映射到自己指定的位置。例如，将`C:\Users\...\MobileSync\Backup`文件夹映射到`D:\Backup`，则备份文件只会占用D盘的空间，而不会占用C盘的空间。从而达到节省C盘空间的目的。

## 准备

1. 安装WIN10系统的电脑
2. 已安装的iTunes
3. 电脑硬盘上C盘以外分区足够的存储空间，或者外接移动硬盘足够的存储空间

## 注意
<u>mklink只能用于NTFS和FAT32文件系统，如果你的硬盘不是这两种文件格式，则无法使用本方法。</u>

## 具体操作步骤
1. 在希望放置备份文件的硬盘空间建立备份文件夹，本例是放在移动硬盘上，路径为`D:\iTunes Backup\Backup`。
2. 在iTunes默认存储路径C:\Users\%USERNAME%\AppData\Roaming\Apple Computer\MobileSync\Backup删除`Backup`文件夹。
3. 打开cmd，按照下面命令建立链接。

```bash

mklink /J "C:\Users\%USERNAME%\AppData\Roaming\Apple Computer\MobileSync\Backup" "D:\iTunes Backup\Backup"

```
运行以上命令后，会在`C:\Users...\MobileSync\`下创建一个名为“Backup”的类似于快捷方式的文件夹图标。此时`C:\Users...\MobileSync\Backup`文件夹与`D:\iTunes Backup\Backup`文件夹里的文件是完全一致的，且会同时被修改。而只占用F盘的存储空间，不占用C盘的存储空间。

4.关闭iTunes，重新打开即可，或多等几分钟。
{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190211121106.png" alt="">}}

需要恢复备份时，一定要保证移动硬盘正确连接，而且存储备份数据的目录不能更改。一旦更改的话，需要使用mklink命令重新建立链接。

每次备份会在`C:\Users...\MobileSync\Backup`路径下的同一个文件夹内存储数据，新的备份会覆盖上一次备份的数据。

每次恢复时，会在相同路径下重新建立一个文件夹，名称为备份文件夹名称+恢复日期和时间。
