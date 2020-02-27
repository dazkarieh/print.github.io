+++
title= "为新版Chrome DevTools加鸡腿"
date= 2019-03-25T17:38:32+08:00
type = "post"
categories = ["技术"]
comments = true
mathjax = false
slug = "new chrome devtools rocks"
keywords = ["chrome","css"]
description = "Chrome for MAC 73.0.3683.86版本更新了开发者工具devtools"
+++
常年开着几十个标签页，所以Chrome右上角的更新图标一直被我忽略，今天清理了一下标签页，把重要的标签页归档进toby mini，然后顺手升级了一下[Chrome for MAC 73.0.3683.86版本](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop_20.html)，具体log文件见[这里](https://chromium.googlesource.com/chromium/src/+log/73.0.3683.75..73.0.3683.86?pretty=fuller&n=10000)。

原来以为像firefox频繁刷版本号一样，只是一个寻常版本，但当打开最常用的devtools，发现有意外惊喜。
<!--more-->
{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/2019-03-25%20at%2018.24.jpg" alt="">}}

当在页面按下`⌘+⇧+C`快捷键打开开发者工具后，点击css选择器(selector)，会出现一个css信息提示窗，包含了类名（class）、尺寸（size）、字体（font）、外边距（margin）、内边距（padding）、对照（contrast）等重要css信息。可以帮助开发者高效、快捷、直观地理解当前css布局信息。

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/2019-03-25%20at%2018.31.jpg" alt="">}}

相信有不少初学css的朋友，和我一样背过外边距（margin）、内边距（padding）的属性次序「上-右-下-左」。然而实践中，并非所有的边距都是这一顺序。因此，很早之前，就期盼着Google程序猿造出一个「所见即所得」的devtools。

时隔数年，Chrome的这个版本终于帮开发者升级了这一梦寐以求的功能。Better late than never，是时候给程序猿加个鸡腿了。

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/2019-03-25%20at%2018.42.jpg" alt="">}}
