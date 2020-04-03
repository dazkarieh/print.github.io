+++
title= "如何给你的iPhone快速安排上Mac制作的anki牌组"
date= 2020-02-22T09:42:20+08:00
type = "post"
categories = ["技术"]
reward = true
codes = ["shell"]
mathjax = false
slug = "how to import anki deck from imac to iphone quickly"
comments = true
keywords = ["武汉肺炎","anki"]
tags = ["Anki"]
+++
这是个魔幻的春天，世界好像被分割成无数个平行空间，有人被病毒追赶，有人转向火线不放过点点星火；虚拟世界的“动森”，无人小岛的岛主们营造着最理想的生活；线上直播销售未曾停止过“煽动”；阳台上的歌声、琴声交织，自娱自乐的视频在云端漫布……

日升日落，同又不同的，每一天。

疫情信息混着谣言从四面八方涌来，几乎所有人从“日常”中暂停，不得不去重新认识周遭的世界，可能大到无垠宇宙、自然万物的息息相关，小到一草一木、甚至微观世界的点点生机——“尘埃与大山”不过只是瞬息的pov互换。

<!--more-->

{{< img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20200228152921.png" >}}

人只能于宅中隐匿，空荡的城市是暂时的喘息，也给了我们所有人一次“重启”的机会。

外在未必能够重塑，也许以伤痛滋养出的坚韧、希望，以及自省，可能是这一年里，这个时代下最重要的印痕。

阴霾暂无散场之意，吾辈唯有埋首于学业。

近日带领犬儿「步履蹒跚」学习anki，抽空给他做了一年级的英语牌组，详情另表。重点是克服重重困难后，遇到了一个棘手问题，anki官方服务器同步速度龟速，如果遇到大体积的牌组，同步经常会异常甚至丢包。

最原始又是最安全的办法自然是导出到本地，想办法下载到iPhone上导入。

Anki官方手册中给出的方案[^1]为：

>Connect your Apple device to your computer via the USB cable, or wi-fi if you have wi-fi syncing set up in iTunes.

itunes早在十年前就被我拉黑了，纵然只剩最后一个选项，我也不回头。那么电脑上辛辛苦苦制作的牌组，有什么办法可以快速导入到iPhone的anki app呢？

搜索网上的解决方案无非是以下几种：

* 百度中转[^2]：先导出为apkg格式，再通过百度网盘中转，下载到本地后用anki读取添加。
* 自建server[^3]：这种成本较高，且不适宜于ios端的anki，因为iOS端不支持自定义服务器。

静心观察ios端的anki，发现导入选项只有三个：

* 共享卡组列表=>ankiweb同步
* 下载链接
* 从iTune中导入=>

唯一可以琢磨的即「下载链接」这一选项。

灵光一闪，首先想到的是局域网共享，但剩下的事就水到渠成了。

**目标：在mac上建一个http server**。

搜现成轮子，github上就有[simple http server][l1]，但每次需要点开可执行文件，非常不方便。于是想到了pyhon官方手册里有个http.server[^4]，能靠一条指令就能快速实现web server功能。

为了快速操作该命令，我还在zsh设置了快捷键

```shell
$ vi ~/.zshrc
```

```shell
Alias hs ='python -m http.server'
```

{{< img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20200223160453.png" >}}


于是本诉求的workflow就变得异常简单（以文件管理器pathfinder为例）：

**壹**：在pathfinder中定位要作为分享目录的文件夹

**贰**：用alfred的[alfred-terminalfinder](https://github.com/LeEnno/alfred-terminalfinder)定位于iterms

**叁**：输入`hs`快速打开http server功能。

**肆**：在浏览器端输入http://0.0.0.0:8000 即可访问当前目录下所有内容，也可以自定义端口号：

```shell
$ python -m http.server  8888
```

用`http://0.0.0.0:8888` 即可访问当前目录下的文件清单。

**伍**：复制文件链接，把`0.0.0.0`改成PC的本地IP，如`192.168.1.21`之类。于是得到一个完整的URL。

**陆**：通过mac与iOS设备之前的Handoff 功能传递URL，在anki下载链接中粘贴导入。

**染**：关闭服务器也很简易：

在终端界面中按下 `ctrl+c` 停止


[^1]: [anki manual:iTunes Import/Export](https://apps.ankiweb.net/docs/am-manual.html#itunes-import/export)
[^2]: [怎么获取anki中的分享牌组，怎么下载到anki呢](https://www.zhihu.com/question/331439631/answer/740820205)
[^3]: [利用群晖Synology进行Anki同步](https://zhuanlan.zhihu.com/p/70269217)
[^4]: [http.server — HTTP servers](https://docs.python.org/3.0/library/http.server.html)

[l1]: https://github.com/TheWaWaR/simple-http-server
