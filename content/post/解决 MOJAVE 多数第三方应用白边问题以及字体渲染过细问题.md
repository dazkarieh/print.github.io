+++
title= "解决 Mojave 多数第三方应用白边问题以及字体渲染过细问题"
date= 2018-11-03T12:34:17+08:00
type = "post"
categories = ["技术"]
comments = true
reward = true
codes = ["bash"]
mathjax = false
slug = "while Mojave causes a white line"
keywords = ["MacOS"]
+++

## 一、像素白边解决方案

打开终端，输入：
```bash
defaults write -app 应用名 NSRequiresAquaSystemAppearance -bool No
```
回车，之后重启对应应用即可

注意：<u>该指令相当于让应用强行使用深色模式 UI，如果应用 /系统本身是浅色的，就没必要执行这个指令</u>

<!--more-->

## 二、解决字体渲染过细解决方案
打开终端，输入：
```bash
defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO
```
回车，之后重启对应应用即可（因为是全局修改，建议注销）

## 方案说明

Q：**我应该如何恢复修改**？

A：

对于第一种，终端输入：
```bash
defaults delete -app 应用名 NSRequiresAquaSystemAppearance
```
回车即可

对于第二种，同样在终端输入：
```bash
defaults write -g CGFontRenderingFontSmoothingDisabled -bool Yes
```
回车即可

Q：**为什么 Mojave 字体过细**？

A：因为在 Mojave 中，苹果默认关闭了子像素抗锯齿，导致字体变细锯齿增多，而这个操作，就是开启所有软件的的子像素抗锯齿（关闭「关闭平滑字体」）

Q：**为什么我对某些程序使用消除白边指令后，某些程序的部分显示不正常了**？

A：你的程序大概是浅色的，请参照说明第一条恢复修改。深色模式下，浅色的第三方程序并没有白边问题。而浅色程序显示不正常因为这条指令相当于让程序强行应用深色模式。在深色模式中，字体默认是浅色，如果应用也是浅色背景，就会导致看不清。毕竟这是非官方的解法，等待官方更新跟进吧。

## 前后参考图

白边修改前：

{{<img src="https://ws1.sinaimg.cn/large/006tNbRwly1fvly1pnepaj31kw0b2qfb.jpg" alt="">}}

白边修改后：

{{<img src="https://ws1.sinaimg.cn/large/006tNbRwly1fvly192tnkj31kw0a7gtn.jpg" alt="">}}

字体修改后：

{{<img src="https://ws3.sinaimg.cn/large/006tNbRwly1fvly3bcg6wj31kw0hvq7p.jpg" alt="">}}
