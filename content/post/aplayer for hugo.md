+++
title= "Aplayer for Hugo"
date= 2019-02-20T13:15:26+08:00
tags = ["hugo","aplayer"]
categories = ["前端"]
toc = true
aplayer = true
codes = ["php","ini"]
keywords = ["aplayer","hugo"]
slug = "install aplayer for hugo"
description = "Hugo资源稀缺，今天为大家介绍，如何为你的Hugo安装html5音乐播放器Aplayer"
+++

## 引入全局脚本样式文件
首先引入aplayer的JS与CSS,最新CDN请参考[官网](https://github.com/MoePlayer/APlayer)

在当前主题的`/layouts/partials/`目录下新建`aplayer.html`文件，内容如下：

```php
 <!-- Import APlayer -->
<link href="https://cdn.jsdelivr.net/npm/aplayer@1.9.0/dist/APlayer.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.9.0/dist/APlayer.min.js"></script>
<!-- Import meting.js -->
<script src="https://cdn.jsdelivr.net/npm/meting@1.1.1/dist/Meting.min.js"></script>
```

## 加入文章页开关模板
考虑到不是所有页面都需要嵌入`aplayer`, 所以在当前主题的`/layouts/_default/single.html`文件合适位置，插入下列代码：
```php
   {{ if eq .Params.aplayer true -}}
    {{ partial "aplayer.html" . }}
    {{ end -}}
```

## 设置Front-matter开关
在需要内嵌 `APlayer` 的文章的`Front-matter` 中加入：

```ini
    aplayer = true
```
## 嵌入APlayer播放内容：

```php
<div
class="aplayer"
data-id="22680660"
data-server="netease"
data-type="song"
data-mutex="true"
data-mini="false"
data-loop="none">
</div>
```


**播放器参数：**

| 参数 | 是否必须 | 默认值 | 描述&可选值 |
| --- | --- | --- | --- |
| data\-id | 是 |  | 单曲ID / 歌单ID / 专辑ID / 搜索关键词 |
| data\-server | 是 |  | 音乐平台：<br>`netease`,`tencent`,`kugou`,`xiami`,`baidu` |
| data\-type | 是 |  | 音乐类型：<br>`song`,`playlist`,`album`,`search`,`artist` |
| data\-autoplay | 否 | `false` | 是否自动播放，移动端浏览器不支持该选项 |
| data\-mutex | 否 | `true` | 播放时是否暂停其他`APlayer`对象 |
| data\-listmaxheight | 否 | `340px` | 播放列表最高高度 |
| data\-preload | 否 | `auto` | 音乐预加载模式：`none`, `metadata`, `auto` |
| data\-theme | 否 | `#2980b9` | 主题色 |
| data\-mini | 否 | `false` | 是否开启迷你模式 |
| data\-loop | 否 | `all` | 循环方式：`all`, `one`, `none` |
| data\-order | 否 | `list` | 播放顺序：`list`, `random` |
| data\-lrc | 否 | `false` |  |
| data\-list\-folded | 否 | `false` | 歌单列表初始时是否折叠 |
| data\-volume | 否 | `0.7` | 用户未自定义前的默认初始化音量 |

更多参数参考:
[MetingJS Options](https://github.com/metowolf/MetingJS#option)   [APlayer Options](https://aplayer.js.org/docs/#/?id=options)

## 实际效果展示

<div
class="aplayer"
data-id="22680660"
data-server="netease"
data-type="song"
data-mutex="true"
data-mini="false"
data-loop="none">
</div>
