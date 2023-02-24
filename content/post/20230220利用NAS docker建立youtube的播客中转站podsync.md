+++
title= "利用NAS Docker建立YouTube播客中转"
date= 2023-02-22T09:18:26+08:00
type = "post"
categories = ["技术"]
comments = false
toc = true
draft = false
reward = false
aplayer = false
mathjax = false
codes = ["bash"]
slug = "play with podsync in QNAP QTS system"
keywords = ["youtube","podcast","podsync","播客"]
tags = ["youtube","podcast","podsync","播客"]
+++

之前在《[二零二二年播客指北]({{< relref"20221218二零二二年播客指北.md" >}})》提到过Podsync，当时鉴于家里的老古董群晖214 play(Intel Atom CPU)硬件上不支持Docker，用了本地Youtube-dl手动转换的方式。最近添置了QNAP TS-464C，尝试了NAS Docker玩法。

## YouTube Data API

{{% notice note %}}
事实上，官方有YouTube Data API (v3) 接口，可以直接输出XML Feed信息，但只有视频摘要，大部分播客工具都无法直接转换播放。
{{% /notice %}}

```
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNELID
https://www.youtube.com/feeds/videos.xml?user=USERNAME
https://www.youtube.com/feeds/videos.xml?playlist_id=YOUR_YOUTUBE_PLAYLIST_NUMBER
```
<!--more-->

## 查找频道externalId

由于近期YouTube做了一次结构改版，变更了频道的URL网址，所以需要一点技巧来查找源码中的`externalId`

```bash
curl -D- --silent https://www.youtube.com/@sunlao | tr ',' '\n' | grep "externalId" 
"externalId":"UCX8KQ5xQlm0MnZkmHO7CBDw"
```
不习惯bash的人也可以参考其他的方法[^1]。

## 替换网址

复制`externalId`后面的字符串，替换YouTube网址URL后面的`@id`部分，譬如：

```bash
www.youtube.com/@sunlao
→→→
www.youtube.com/channel/UCX8KQ5xQlm0MnZkmHO7CBDw
```

## 配置config.toml文件

新建podsync目录，新建config.toml文件，内容根据自己的需要比照官方example修改[^2]，以下仅供参考：

```toml
[server]
port = 6969
data_dir = "/app/data" # 保留默认路径，我曾经改为QNAP绝对路径，导致本地无下载转换文档，播放出错。
hostname = "http://xxxxxx.com:6969" # xxxxx改为可以公布的外网域名

[tokens]
youtube = "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxKoUo" #填入申请的Google API Key，注意：每日有配额限制

[downloader]
self_update = true # 自动更新下载程序

[feeds]
  [feeds.WYSR]
  url = "www.youtube.com/channel/UCX8KQ5xQlm0MnZkmHO7CBDw"
  title = "五岳散人"
  description = "北京人、满族，目前生活在日本的京都"
  page_size = 5
  update_period = "4h"
  quality = "high"
  format = "audio"
  cover_art = "https://yt3.googleusercontent.com/0YVsh1foqM9dKWfns1KhXLwtSeO-4P23cHsckNPUuEpGsM6CO5SMpGP-chr7L_UHo5iBJygcLv4=s176-c-k-c0x00ffffff-no-rj"
 
  [feeds.SLS]
  url = "www.youtube.com/channel/UC1Lk6WO-eKuYc6GHYbKVY2g"
  title = "政经孙老师"
  description = "順勢而為，趨利避害。我將在這裡分享關於時政/經濟/歷史/投資的知識"
  page_size = 5
  update_period = "24h"
  quality = "high"
  format = "audio"
  cover_art = "https://yt3.googleusercontent.com/cQv7naHS4oUYjRltDL1ISldrs_2bDo_yIPUM2aoo4ZTeDmE-rHAkF6xhrzqnP7th0J28oxhGRw=s176-c-k-c0x00ffffff-no-rj"
  
  [feeds.DLDFL]
  url = "www.youtube.com/channel/UCzYYzigb1vXR0GQXXBja2kg"
  title = "多伦多方脸"
  description = "推特：多伦多方脸@torontobigface"  
  page_size = 5
  update_period = "24h"
  quality = "high"
  format = "audio"
  cover_art= "https://yt3.googleusercontent.com/CkhcsHLOHH94lWB-p9kXH0sQ4DA527KXd35tKnYCpRu2reuQjDx2AKvjSZtats3AgNOzAFxf6w=s176-c-k-c0x00ffffff-no-rj"

 
   [feeds.SSWN]
  url = "www.youtube.com/channel/UC6ebRQXZfOLrKALxwUh84Sg"
  title = "TVBS 文茜的世界周報"
  description = "全新4小時的"陳文茜"國際新聞與專家觀點"  
  page_size = 5
  update_period = "24h"
  quality = "high"
  format = "audio"
  cover_art= "https://yt3.googleusercontent.com/ytc/AL5GRJUVWerrFMfeFkR7_H6QAQXZ-jyweBLhQtiWAOKV=s176-c-k-c0x00ffffff-no-rj"

  
[log]
filename = "podsync.log"
max_size = 50 # MB
max_age = 30 # days
max_backups = 7
compress = true
```

## 运行容器Docker

复制并粘贴以下Docker命令：

```bash
docker pull tdeutsch/podsync:latest # 不要使用官方的2.5.0镜像(mxpv/podsync:latest)，会报错 
```
Docker 将拖取最新版本的 Podsync。

通过SSH登录QNAP终端运行Docker Run，也可以通过Docker Compose的建立容器：

```bash
docker run \
    -p 6969:6969 \  #映射的外部端口，如有冲突可改高位端口
    -v ${PWD}:/app/data/ \  #根据自己的文件夹路径来映射，冒号后面建议使用默认参数
    -v ${PWD}/config.toml:/app/config.toml \ #根据自己的文件夹路径来映射，冒号后面建议使用默认参数
    tdeutsch/podsync:latest
```

在浏览器地址栏输入`NAS域名:端口`或`内网ip地址:端口`，如
```
http://${IP_ADDRESS}:6969
```
就可以看到后缀名为XML的Feed URL以及对应的下载目录。

[^1]: [2023 年如何查找 Youtube Channel ID？ - Another Dayu](https://anotherdayu.com/2023/4530/)
[^2]: [podsync/config.toml.example](https://github.com/mxpv/podsync/blob/main/config.toml.example)