+++
title= "Hugo shortcoeds示例"
date= 2019-02-27T20:38:40+08:00
categories = ["前端"]
toc = true
video = true
douban = true
vega = true
type = "post"
tags = ["hugo","shortcodes"]
codes = ["bash","markdown"]
mathjax = false
description = "本文介绍本hugo主题中的shortcoeds用法与示例代码。"
slug = "/several hugo shortcoeds samples/"
+++

神器shortcodes的横空出世，让hugo一举超越hexo，神奇程度不亚于当年total commander的插件系统。下面，介绍自己在用的近二十个shortcodes。

## 视频简码（video.html）

如果想让页面加载本地视频文件，你的视频文件可以放在hugo站点下的 `static/img/` 媒体目录，也可以放置在你的[页面目录](https://gohugo.io/content-management/page-bundles/), 然后，按照以下2种形式援引路径来调用。

### 媒体目录

```bash
{{%/* video src="/img/video/videojs.mp4"  controls="yes" */%}}
```
<!--more-->
效果如下：
{{< video src="/img/video/videojs.mp4" poster="andrew-neel-609846-unsplash.jpg" controls="yes" >}}

### 页面目录
比如，视频在 `content/post/hello/` 目录下：

```bash
{{</* video src="my_video.mp4" controls="yes" */>}}

```
### 在线视频

除了通过简码可以自定义加载本地视频，hugo还内置了youtube、vimeo、Twitter、Instagram等加载在线视频的简码，当然在国内被墙了，访问不了。

**Youtube**:
```bash
{{</* youtube w7Ft2ymGmfc */>}}
```
效果如下（需要翻墙查看）：


**Vimeo**:
```bash
{{</* vimeo 146022717 */>}}
```

**twitter**
```bash
{{</* tweet 877500564405444608 */>}}
```

**instagram**
```bash
{{</* instagram BWNjjyYFxVx hidecaption */>}}
```

## wikipedia

```bash
{{</* wp tag="膜蛤文化" lang="zh" title="《神秘的膜蛤文化》" */>}}
或者简化版
{{</* wp 膜蛤文化 "《神秘的膜蛤文化》" zh */>}}
```

{{< wp tag="膜蛤文化" lang="zh" title="《神秘的膜蛤文化》" >}}

## 豆瓣

```bash
{{</* douban ID */>}}
```
此处的ID是电影的IMDB号或者书籍的ISBN序列号

效果如下：

{{< douban 27037053 >}}

注意：豆瓣自18年开始即启用referrer筛除防盗链，所以为了避免出现无法显示海报或者书籍封面的情形，建议在header.html增加下列meta标签，但这样做又会影响aplayer的显示，两权其害取其轻者，在想出完美方案之前只能牺牲图片显示了。

```bash
<meta name="referrer" content="never">
```

## 嵌入文档（gdocs.html）

为了将google 文档嵌入页面，你首先要通过 文件 >发布 > 嵌入得到一段iframe代码，将其中的src=""的链接复制粘贴出来即可。

```bash
{{</* gdocs src="https://docs.google.com/document/d/e/2PACX-1vTAQPJ1wIH4OWoI3OKV2LIl8xUUwAg8ngQGcHd6VF3x8EYfRX5jLg6x2SuHhaaqVOmV_tvFvtYEqJcZ/pub?embedded=true" */>}}
```

效果如下（需要翻墙查看）：

## imgur

为了避免特定的敏感图片被国内ISP审察，我们可以将imgur作为上传图床，随后引用置入帖子中，以`https://imgur.com/a/ZT8fImy`为例

```bash
{{</* imgur id="ZT8fImy" */>}}
```

{{< imgur id="ZT8fImy" >}}


## 简易版文本居中
```bash
{{</* center */>}}
引用文本
#除去首位两行，每行行末加<br>
{{</* center */>}}
```
{{< center >}}
《从前慢》 木心<br><br>
记得早先少年时<br>
大家诚诚恳恳<br>
说一句 是一句<br>

清早上火车站<br>
长街黑暗无行人<br>
卖豆浆的小店冒着热气<br>

从前的日色变得慢<br>
车，马，邮件都慢<br>
一生只够爱一个人<br>

从前的锁也好看<br>
钥匙精美有样子<br>
你锁了 人家就懂了
{{< /center >}}

## pdf内嵌展示
```bash
{{</* pdf src="**.pdf" */>}}
```
### 相对地址效果：

{{< pdf src="/post/Hugo shortcodes.files/Andantino in C by Matteo Carcassi.pdf" >}}

### 绝对地址效果：

{{< pdf src="https://storage.fredliang.cn/web/2019-05-16-h5-retention-promotion-plan.pdf" >}}

## 声享PPT（shengxiang.html）

引入 [声享](https://ppt.baomitu.com/) PPT 演示文稿，
```bash
{{%/* shengxiang "a8a49a00" "dark" */%}}
```

## Image caption（imgcap.html）
```bash
{{</* imgcap title="戏鸟图" src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190212115749.png" */>}}
```
{{< imgcap title="戏鸟图" src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190212115749.png" >}}

## HTML4 Audio Widget（audio.html）

**参数**

*   src \- (required) Address of the audio file
*   type \- (required) Audio encoding(mp3, ogg, etc)
*   preload \- Should the audio be preloaded when the page loads Valid values are: "none", "metadata", and "auto" Default is set to "metadata"
*   title \- Title of audio track
*   attr \- Attribution
*   attr\_link \- Link to attribution
*   year \- Year the audio was produced
*   artist \- Artist of the audio
*   album\_title \- Title of the album
*   album\_art \- Link to the album art
*   label \- Record label
*   class \- Class attribute of the audio element By default it contains "audio\_controls"
*   id \- Id attribute of the audio element
*   style \- Style attribute of the audio element
*   width \- Width of HTML5 audio control widget
*   height \- Height of HTML5 audio control widget

```bash
{{</* audio src="/audio/Beep.mp3" artist="windows" tile="Beep" */>}}
```
## vega-lite

```bash
{{</* vega id="viz" spec="/post/Hugo shortcodes.files/vegalite.json" */>}}
```
{{% attachments style="grey" title="相关文档" pattern=".*(json|txt)"/ %}}

来试试Vega-Lite镶嵌的图形吧

{{< vega id="viz" spec="/post/Hugo shortcodes.files/vegalite.json" >}}

## 站内外链接

```markdown
[网易新闻](https://news.163.com)
[Hugo Math Sample]({{</* ref "post/Hugo Math Sample.md" */>}})
[A publication]({{</* ref "publication/hi.md" */>}})
[A project]({{</* ref "project/hi.md" */>}})
[mathjax组表示]({{</* relref "mathjax samples for hugo.md#组(Group)" */>}})
```

[mathjax组表示]({{< relref "mathjax samples for hugo.md#实验6" >}})

## 站内静态文件链接（staticref.html）
为站内文件创建一个链接,比如PDF文档, 首先需要新建一个文件目录如： `static/files/` ，接下来以如下形式展现:

```bash
{{%/* staticref "files/cv.pdf" "newtab" */%}}Download my CV{{%/* /staticref */%}}

```

{{% staticref "files/Summerwork2016.pdf" "newtab" %}}下载我的作品{{% /staticref %}}

增加参数 `"newtab"`可以以新标签页的形式打开。

## 个性化引用（customed blackquote）

```bash
{{%/* quote bar="true" size="17.5px"  ta="center" from="周金平" */%}}
引用文本
{{%/* /quote */%}}

#可带参数1：s或者size，控制效果和HTTML里的font-size效果一样
#可带参数2：ta或者align，控制效果与HTML里的text-align效果一样
#可带参数3：by或者frome，控制效果是靠右堆砌的作者署名
#可带参数4：bar为ture则显示顶端装饰，默认不写bar参数
```

实际效果

{{< quote bar="true" size="17.5px"  ta="center" from="周金平">}}

我们是一棵树上的枝子。<br>
当我被砍伐，<br>
你有断臂之痛。<br>
该怎样向你坦承自己的荒芜、阴影和虚妄的意念?<br>
我反复在同一场雨水里<br>
缴获清凉。<br>
在同一条河流里<br>
沉溺旧我。<br>
我是新的了。才敢坦然，<br>
念一个人的名字，念出温度和光亮。<br>
我有落雪的心境，呆在你画的苹果之中<br>
获取干干净净的饱足。<br>
{{< /quote >}}

## 附件(Attachments.html）

如果你文章需要添加多个附件链接，那么Attachments简码就派上用场了。唯一要注意的是，Attachments简码要生效，必须将附件置于指定文件夹内，目前仅支持两种方式：

1、如果你的页面源文件是markdown文件，附件必须放在遵循一定规则命名（文件名+**.files**）的文件夹内，目录结构如下：

    > * content
    >   * _index.md
    >   * page.files
    >      * attachment.pdf
    >   * page.md

2、如果你的页面是一个文件夹，附件必须是嵌套的子目录下，且目录名必须为**'files'** ，目录结构如下：。

    > * content
    >   * _index.md
    >   * page
    >      * index.md
    >      * files
    >          * attachment.pdf

注意：如果你支持多语言，那就需要为每一个语言配置对于的文件夹。

### 参数

| Parameter | Default | Description |
|:--|:--|:--|
| title | "Attachments" | 列表标题  |
| style | "" | 选择颜色样式 "orange", "grey", "blue" and "green"  |
| pattern | ".*" | A regular expressions, used to filter the attachments by file name. <br/><br/>格式参数必须是一个[正则表达式](https://en.wikipedia.org/wiki/Regular_expression).

例如:

* 为了匹配所有的'jpg'后缀的文件, 请用 `.*jpg` ，注意不是`*.jpg`
* 为了匹配所有的'jpg'或'png'后缀的文件,用 `.*(jpg|png)`

### 实例

以pdf或mp4结尾的附件

```bash
    {{%/*attachments title="Related files" pattern=".*(pdf|mp4)"/*/%}}
```

###颜色样式

```bash
{{%/*attachments style="orange" /*/%}}
{{%/*attachments style="grey" /*/%}}
{{%/*attachments style="blue" /*/%}}
{{%/*attachments style="green" /*/%}}
```

其中blue样式的效果如下：

{{% attachments style="blue" title="图像影音" pattern=".*(mp4|jpg)"/%}}


## 内容隐藏（expand.html）

这一简码可以实现文本内容的展开/折叠，按提示点击后才会出现展开/折叠 (如果没有文本，则默认提示是 "快来点我吧...")
### 问答例
```bash
{{%/*expand "三画大，两画小，打一字，想知道答案吗？" */%}}是【秦】字！{{%/* /expand*/%}}
```
实例：
{{%expand "三画大，两画小，打一字，想知道答案吗？" %}}是【秦】字!{{% /expand%}}

### 折叠型
```bash
{{%/*expand*/%}}蒸羊羔,蒸熊掌,蒸鹿尾儿,烧花鸭,烧雏鸡儿,烧子鹅,卤煮咸鸭,酱鸡,腊肉,松花,小肚儿,晾肉,香肠,什锦苏盘,熏鸡,白肚儿,清蒸八宝猪,江米酿鸭子,罐儿野鸡,罐儿鹌鹑,卤什锦,卤子鹅,卤虾,烩虾,炝虾仁儿,山鸡,兔脯,菜蟒,银鱼,清蒸哈什蚂,烩鸭腰儿,烩鸭条儿,清拌鸭丝儿,黄心管儿,焖白鳝,焖黄鳝,豆鼓鲇鱼,锅烧鲇鱼,烀皮甲鱼,锅烧鲤鱼,抓炒鲤鱼,软炸里脊,软炸鸡,什锦套肠,麻酥油卷儿,熘鲜蘑,熘鱼脯儿,熘鱼片儿,熘鱼肚儿,醋熘肉片儿,熘白蘑{{%/* /expand*/%}}
```
实例：
{{%expand%}}蒸羊羔,蒸熊掌,蒸鹿尾儿,烧花鸭,烧雏鸡儿,烧子鹅,卤煮咸鸭,酱鸡,腊肉,松花,小肚儿,晾肉,香肠,什锦苏盘,熏鸡,白肚儿,清蒸八宝猪,江米酿鸭子,罐儿野鸡,罐儿鹌鹑,卤什锦,卤子鹅,卤虾,烩虾,炝虾仁儿,山鸡,兔脯,菜蟒,银鱼,清蒸哈什蚂,烩鸭腰儿,烩鸭条儿,清拌鸭丝儿,黄心管儿,焖白鳝,焖黄鳝,豆鼓鲇鱼,锅烧鲇鱼,烀皮甲鱼,锅烧鲤鱼,抓炒鲤鱼,软炸里脊,软炸鸡,什锦套肠,麻酥油卷儿,熘鲜蘑,熘鱼脯儿,熘鱼片儿,熘鱼肚儿,醋熘肉片儿,熘白蘑{{% /expand%}}

## 图片（figure.html）

### 将thumb.jpg用于缩略图,而将image.jpg用于灯箱图集展示。
```bash
{{</* figure src="thumb.jpg" link="image.jpg" */>}}
```
### 将image.jpg 同时用于缩略图和灯箱。
```bash
{{</* figure src="image.jpg" >}} or {{< figure link="image.jpg" */>}}
```
### 将image-small.jpg 同时用于缩略图和灯箱。
```bash
{{</* figure link="image.jpg" thumb="-small" */>}}
```

## 图集（gallery.html）

### `caption-position`
决定图片描述文字的显示位置，可选参数有:

- `bottom` (默认)
- `center`
- `none` hides captions on the page (they will only show in PhotoSwipe)

###  `caption-effect`
决定鼠标滑过图片时描述文字如何出现，可选参数有:

- `slide` (默认)
- `fade`
- `none` (captions always visible)

###  `hover-effect`
决定鼠标滑过图片时的特效动作，可选参数有:

- `zoom` (默认)
- `grow`
- `shrink`
- `slideup`
- `slidedown`
- `none`

###  `hover-transition`
决定鼠标滑过图片时是否需要过渡. 可选参数有:

- 默认 - 平滑过渡
- `none` - 生硬过渡

## 拟terminal窗口

```bash
{{</* terminal "root@xdd-iMAC" "~/Sites/jiridj.be (zsh)" */>}}
代码
{{</* /terminal */>}}
```

效果如下：
{{< terminal "root@xdd-iMAC" "~/Sites/jiridj.be (zsh)" >}}
$ ls -l ~
total 40
drwx------+  8 jiri  staff    272 Mar 21 14:30 Desktop
drwx------+ 11 jiri  staff    374 Mar 21 16:47 Documents
drwx------+ 10 jiri  staff    340 Mar 22 13:36 Downloads
drwx------@ 70 jiri  staff   2380 Mar 15 12:44 Library
drwx------+  8 jiri  staff    272 Feb 14 04:54 Movies
drwx------+  5 jiri  staff    170 Oct 19 17:07 Music
drwx------+  9 jiri  staff    306 Feb  3 10:26 Pictures
drwxr-xr-x+  5 jiri  staff    170 Oct 19 14:23 Public
$ _
{{< /terminal >}}

## 注意提示(notice.html)

注意提示是一个非常有用的shortcodes模板，可以为文章增加贴士、笔记、引言以及基于文章的告诫等多用途，目前支持`warning`、 `info`、`note`、`tip`.四种风格显示。

```bash
#$$可以在warning、info、note、tip中四选一
{{%/* notice $$ */%}}
your text
{{%/* /notice */%}}
```

**info**
{{% notice info %}}
他是个极端的爵士怪物（He is the ultimate jazz freak）
{{% /notice %}}

**note**
{{% notice note %}}
1965年5月20日第9版的《卫报》刊登了拉金的一篇访谈，诗人的态度振聋发聩：“没有诗歌我可以活上一周，但是没有爵士乐我一天都活不下去。”
{{% /notice %}}

**tip**
{{% notice tip %}}
一个和平主义者，警告你们：不要回答！不要回答！不要回答！
{{% /notice %}}

**warning**
{{% notice warning %}}
交规千万条，安全第一条...
{{% /notice %}}


## gallery slider

### 配置参数
| 变量 | 默认 | 说明 |
| -------------- | ------- | ----------- |
| `dir` | none | 图片文件夹 *(必填项)* |
| `width` | 500px | 滚动区域宽度 |
| `height` | 300px |滚动区高度 |
| `arrow-left` | fa-chevron-left | 自定义左侧图标|
| `arrow-right` | fa-chevron-right | 自定义右侧图标 |
| `no-fa` | false | FontAwesome依赖开关|
| `no-jquery` | false | JQuery依赖开关 |
| `auto-slide` | 0 | 设置自动滚动周期（ms） |

左右提示图标可以在[FontAwesome图标库](http://fontawesome.io/icons/)挑选。

### 示例
```bash
#全部以默认参数运行
{{</* gallery-slider dir="/img/portfolio/" */>}}
#推荐配置
{{</* gallery-slider dir="/img/hugo/" width="600px" height="400px" arrow-left="fa-angle-double-left" arrow-right="fa-angle-double-right" auto-slide="2500" */>}}

{{</* gallery-slider dir="/img/portfolio/" auto-slide="2000" */>}}
```

效果如下：
{{< gallery-slider dir="/img/ikeda/" width="600px" height="400px" arrow-left="fa-angle-double-left" arrow-right="fa-angle-double-right" auto-slide="3000" >}}
