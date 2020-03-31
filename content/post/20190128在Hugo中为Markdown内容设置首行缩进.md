+++
title= "在Hugo中为Markdown内容设置首行缩进"
date= "2019-01-28T13:39:35+08:00"
toc = false
slug = "set text-indent for markdown article in hugo"
tags = ["Hugo"]
keywords = ["Hugo","Front matter"]
categories = ["前端"]
codes = ["css","htmlbars"]
draft= false
+++
每个段落首行缩进两个字，是中文文章排版的默认规则。 本文以hugo主题为例，介绍如何在[Hugo](https://gohugo.io/)中实现这一点。

## 首行缩进

汉字原先是竖排的，没有所谓『首行』的概念。 五四时，受西方文字排版的影响，改为横排，从左至右。

为了区分段落，于是有了首行缩进的排版方式。

> 1919年，胡适与周作人、钱玄同、刘半农、朱希祖、马裕藻等北大教授向教育部提出 《请颁行新式标点符号议案》， 其《附则》中规定：『每段开端，必须低两格。』

在纸媒时代必须遵守的准则，在电子屏幕时代则显得不必要。 即使段首行顶格，只要增大段间距，也同样可以区分段落。

不过，从视觉习惯方面考虑，个人仍然更喜欢约定俗成的首行缩进。 一般，末行自然有行尾空格，所以，添加首行缩进，有一种中心对称的美感。

## text-indent

对[Hugo](https://gohugo.io/)来说，Markdown是内容，会转换成HTML。 而具体的样式，可以通过订制CSS来改变。

在CSS中，有[text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent)这个属性，可以控制缩进。

> The **text-indent** CSS property specifies the amount of indentation (empty space) that is put before lines of text in a block.

首行缩进可以指明长度或百分比。 在这里，首行缩进两字符，通过指定 `2rem`即可实现。

此外，还需注意两点：

* 只有正文需要首行缩进。
* 其它内容的样式也需要一起调整。

## 主题示例

对[Hyde](https://themes.gohugo.io/hyde/)来说，其正文内容，默认是以`post`包裹的。

```htmlbars
<div class="post">
    <h1>{{ .Title }}</h1>
    <span class="post-date">{{ .Date.Format "Mon, Jan 2, 2006" }}</span>
        {{ .Content }}
</div>

```

因此，以`.post`作为选择器，可以指定正文内容。

```css
.post p {
    margin-top: 0;
    margin-bottom: 1rem;
    text-indent: 2rem;
}

.post blockquote p {
    text-indent: 0rem;
}

.post ul, ol, dl {
    margin-left: 1rem;
}

```

`<p>`的内容，除了首行缩进两字以外，还有段尾空一行。

与此同时，孤发现引用内容会比较难看。 因为引用中会有若干个 `<p>`段落，并且很多多只有一行，也可能会是英文，缩进后视觉效果不佳。 所以，调整为引用不缩进。

列表的调整，也是为了和缩进后的文本对齐。
