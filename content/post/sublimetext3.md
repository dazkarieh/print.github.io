+++
title= "Sublime text 3 package contrl无法安装的解决方案"
date= 2019-02-03T20:00:06+08:00
toc = true
tags = ["sublime text","软件"]
codes = ["bash","ini"]
categories = ["技术"]
slug = "Sublime text 3 package contrl resource"
description = "Sublime text 3 package contrl无法安装的解决方案"
+++

## 修复package control源

1. 准备好[package control](https://github.com/RhythmJnh/Sublime-package-control-Install)两个文件

2. 打开`preferences>Browse Packages`，在上级目录找到`Installed Packages`，放入Package Control.sublime-package文件。

3. 重启Sublime，若Install Package显示如下出错信息：

```bash
Package Control:There are no packages available for installation
```
需要修改一下package来源：

1. 将channel_v3.json文件放在想放的位置，如**C:/channel_v3.json**

2. 打开`preferences>package setting>Package Control>Settings User`

3. 添加如下：

```ini
"channels":
	[
		// "https://raw.githubusercontent.com/SuCicada/channel_v3.json/master/channel_v3.json"
		"C:/channel_v3.json"
	]

```

或者可以直接取消上面的注释去链接这个文件，如果网速好的话。

## 安装汉化包

使用快捷键：`Ctrl+shift+p`（或者：菜单 – Tools – Command Paletter），输入`package control install`。

然后回车并等待弹出窗口，之后输入Chinese，之后选择`ChineseLocalization`，选择help->language->简体中文，就可以大功告成了。
