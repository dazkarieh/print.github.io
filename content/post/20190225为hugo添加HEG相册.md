+++
title= "为hugo添加HEG相册"
date= 2019-02-25T17:26:56+08:00
tags = ["相册","hugo"]
mathjax = false
codes =["markdown","bash"]
categories = ["前端"]
slug = "install hugo-easy-gallery"
+++

事情的起因是昨天写完hugo一键部署的sh脚本，今天想改进一下细节。尤其是hugo的初衷是为了迁移hexo站点，而之前的md源文件里有很多类似如下的代码：

```markdown
![text](url)
```
hexo里有一款插件`hexo-image-figure-caption`可以帮助显示caption部分，而hugo默认对上述代码的caption是不显示的，严格来讲，hugo内置了很多短码/简码([shortcode](https://gohugo.io/content-management/shortcodes/))，可以帮助用户快速实现小需求，包括图片配置(Figure字段)，可以对src、link、target、title、caption、height、width、attrlink等一系列参数进行快速配置，十分便捷，然而本人的需求仅仅是显示caption内容，并支持自定义样式（如文本居中、动作特效）。

众所周知，hugo比hexo更加小众，有issue只能自己自力更生、丰衣足食。作为css苦手，我亲手写了一段css，然并卵，根本不起作用。水平有限，只能向万能Google求助，天知道真的有一个hugo辅助插件可以实现。这就是今天要介绍的[**hugo-easy-gallery**](https://www.liwen.id.au/heg/)，作者简称为HEG，它主要有两大功能：

### 图集相册功能(Image Gallery)

*   赋予Figure字段新功能，且向下兼容Hugo内置的Figure字段。
*   给Figure字段开启漂亮的图片注释(captions)。
*   可在 Gallery字段内添加多个 Figure字段，自由创作一个酷炫相册。
*   为 Gallery指定源内容目录，自动为该路径内的所有图片集成一个相册
*   响应式相册图集, 图片可以自适应性缩放、裁剪填满。
*   鼠标划过图片区域，可以自动展示图片标题(title)和图片注释(captions)。
*   可对图集相册自定义缩放、滑动等动作。
*   CSS样式原始文件仅3.6kB，你完全可以继续压缩。
*   使用一次 Figure字段，在每个页面都会自动加载CSS样式。

### 图片浏览（PhotoSwipe）
*   在页面任意位置可通过 `load-photoswipe` 短码(只需要添加一遍)唤醒图片浏览（PhotoSwipe）功能。
*   无论你在哪里、是否调用过Figure字段，在一个lightbox旋转式的图集相册中载入页面中所有的Figure元素。
*   可以兼容同一个页面中的任意位置的Figure元素/短码。
*   勿需预定义图片尺寸，初始化脚本会对预加载的图片尺寸进行自动处理;当然，你也可以在预加载之前对图片尺寸进行自定义。
*   远程从`cdnjs.cloudflare.com` 加载图片浏览（PhotoSwipe）功能所需的js和css库。

你可以添加一个目录作为图集源，也可以在gallery中添置多个figure，代码如下：

```bash
{{</* gallery hover-effect="shrink" */>}}
  {{</* figure src="img/hugo/003027635.JPG" link="/img/hugo/003027635.JPG" caption="篮球宝贝1" caption-position="bottom" caption-effect="fade" */>}}
  {{</* figure src="img/hugo/003027713.JPG" link="/img/hugo/003027713.JPG" caption="篮球宝贝2" caption-position="bottom" caption-effect="fade" */>}}
  {{</* figure src="img/hugo/015353332.JPG" link="/img/hugo/015353332.JPG" caption="美人醉卧" caption-position="bottom" caption-effect="fade" */>}}
{{</* /gallery */>}}

{{</* load-photoswipe */>}}
```

实际效果如下：

{{< gallery hover-effect="shrink" >}}
  {{< figure src="/img/hugo/003027635.JPG" link="/img/hugo/003027635.JPG" caption="篮球宝贝1" caption-position="bottom" caption-effect="fade">}}
  {{< figure src="/img/hugo/003027713.JPG" link="/img/hugo/003027713.JPG" caption="篮球宝贝2" caption-position="bottom" caption-effect="fade">}}
  {{< figure src="/img/hugo/015353332.JPG" link="/img/hugo/015353332.JPG" caption="美人醉卧" caption-position="bottom" caption-effect="fade">}}
{{< /gallery >}}

{{< load-photoswipe >}}

参考下一篇[《池田エライザ图集示例》]({{< relref "Ikeda Elaiza图集示例.md" >}})

**注意**

- 目录图集与自定义图集无法并存的原因有可能是src=后面的路径不带/，而link=后面的路径带/，否则可能会导致页面渲染出错，或者无法开启photoswipe模式。
- photoswipe模式无法正常显示的原因有可能是前面存在figure字段（例如本页）。
- figure字段如果引用的是cdn地址，不建议加`load-photoswipe` 短码，否则点击会显示空白。


