+++
title= "如何给你的iPhone快速安排上Mac制作的牌组"
date= 2020-02-22T09:42:20+08:00
type = "post"
categories = ["技术"]
draft = false
reward = true
codes = ["bash"]
douban = false
mathjax = false
slug = "how to import anki deck from imac to iphone quickly"
+++
多少年以后，中国人回忆起2020这个春节的时候，一定会记住「停课不停学」、「用书香守护希望」的口号。

整个甬城闻疫而动，枕戈待旦。一场惨烈的瘟疫即将拉开序幕，与死神共舞的广播踞在城市上空不断播撒死亡的恐怖情景将牢牢锁定在00、10后这一代人的记忆中。

瘟疫阴霾挥之不去，小儿在家，埋首于学业，最近研究anki入迷，于是抽空给他做了一年级的英语牌组，详情另表。但克服重重困难后，又遇到了一个棘手问题，anki官方服务器同步速度龟速，如果遇到体积大的牌组，同步经常会异常甚至丢包。

最原始但最安全的办法自然是导出到本地，想办法下载到iPhone上导入。

<!--more-->

Anki官方手册中给出的方案[^1]为：

>Connect your Apple device to your computer via the USB cable, or wi-fi if you have wi-fi syncing set up in iTunes.

itunes早在十年前就被我拉黑了，纵然只剩最后一个选项，我也不回头。那么电脑上辛辛苦苦制作的牌组，有什么办法可以快速导入到iPhone的anki app呢？

搜索网上的解决方案无非是以下几种：

* 百度中转[^2]：先导出为apkg格式，再通过百度网盘中转，下载到本地后用anki读取添加。
* 自建server[^3]：这种成本较高，且不适宜于ios端的anki，因为无法更改服务器。

我仔细观察ios端的anki，发现导入选项只有三个：

* 共享卡组列表=>ankiweb同步
* 下载链接
* 从iTune中导入=>

唯一可以琢磨的即「下载链接」这一选项。

灵光一闪，首先想到的是局域网共享，但剩下的事就水到渠成了。

**目标：在mac上建一个http server**。

搜现成轮子，github上就有[simple http server][l1]，但每次需要点开可执行文件，非常不方便。于是想到了pyhon官方手册里有个http.server[^4]，能靠一条指令就能快速实现web server功能。

```bash
vi ~/.zshrc
```

```bash
Alias hs ='python -m http.server'
```

用http://0.0.0.0:8000 即可访问目录下内容

或者自定义端口号：

```bash
python -m http.server  8888
```

用http://0.0.0.0:8888 即可访问目录下内容

关闭服务器也很简易：

在终端界面中按下 `ctrl+c` 停止

为了快速操作该命令，我还在zsh设置了快捷键

{{< img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20200223160453.png" >}}

[^1]: [anki manual:iTunes Import/Export](https://apps.ankiweb.net/docs/am-manual.html#itunes-import/export)
[^2]: [怎么获取anki中的分享牌组，怎么下载到anki呢](https://www.zhihu.com/question/331439631/answer/740820205)
[^3]: [利用群晖Synology进行Anki同步](https://zhuanlan.zhihu.com/p/70269217)
[^4]: [http.server — HTTP servers](https://docs.python.org/3.0/library/http.server.html)
[l1]: https://github.com/TheWaWaR/simple-http-server
