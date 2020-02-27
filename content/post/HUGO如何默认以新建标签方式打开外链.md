+++
title= "HUGO如何默认以新建标签方式打开外链"
date= 2019-02-25T10:37:55+08:00
type = "post"
mathjax = false
tags = ["markdown","Hugo"]
categories = ["前端"]
codes = ["json","bash","php"]
slug = "How To open a external Link With a new tab in Hugo Markdown"
keywords = ["markdown","Hugo"]
+++
Markdown是一种非常简洁、高效、优雅的文本解决方案，只需依照规则键入特定标记，便可实现丰富的排版效果。无需各种菜单与工具栏，也免除了字体行距等排版元素的干扰，我们得以将精力更加集中于写作本身。

Markdown的理念由John Gruber首次提出，而其基础语法的制定与修补则由Gruber与Aaron Swartz二人协作完成。随着语法的完善与各种扩展的加入，Markdown被越来越多的文字工作者所推崇，但是Markdown毕竟是一个轻量级的标记性语言，有诸多不便，无法满足某些重度用户的每一个细微需求。

对我来讲，Markdown就存在两个挠心的不便，一是Image Caption问题，二即今天要说的Markdown外链打开方式。
<!--more-->
在官方文档中，Markdown的外链写法是
```bash
[链接文字](链接url "鼠标滑过显示的标题")
```
它相当于 HTML 中的
```php
<a href="链接url">链接文字</a>
```
众所周知，HTML 的 a 标签有一个实用的属性 target
```php
<a href="链接url" target="_blank">链接文字</a>
```
当它的值为`“_blank”`的时候，浏览器会默认为这个链接打开一个新标签，而不是在当前页面跳转新页面。

大部分人以为多数Markdown解释器（如 GitHub Flavored Markdown）是不支持`“_blank”`选项的，所有链接都只能在当前页面打开。
甚至很多国外知名论坛stackoverflow、GitHub上的码农认为这个问题无解，只能曲线救国，即如果一个Markdown解释器同时兼容HTML语法，则建议通过直接写HTML解决。

从hexo转到hugo阵营后，一直不满足于无法自定义外链，在hugo论坛找到了两个解决方案，供选择[^1]：

## 修改BlackFriday hrefTargetBlank参数
从0.15版本开始，Hugo就开始支持BlackFriday的hrefTargetBlank参数开关：

```json
[blackfriday]
  hrefTargetBlank = true
 ```
hugo 官方文档介绍如下

>hrefTargetBlank
>
>default: false
>
>Blackfriday flag: HTML\_HREF\_TARGET\_BLANK
>
>Purpose: true opens external links absolute links in a new window or tab. While the target="\_blank" attribute is typically used for external links, Blackfriday does that for all absolute links (ref). One needs to make note of this if they use absolute links throughout, for internal links too (for example, by setting canonifyURLs to true or via absURL).

这时候，Hugo中<u>所有正文的外链（不包括导航栏）就会以默认以新标签页打开</u>，例如:
```bash
[链接文字](链接url)
```
会转译成如下一段HTML代码：

```php
<a href="链接url" target="_blank">链接文字</a>
```
案例：
[《How to configure your Hugo site》](https://gohugo.io/getting-started/configuration/#configure-blackfriday)

这种做法相对比较简单，很多hugo主题的config.toml中都可以看到这个参数的身影，如[LeaveIt](https://github.com/liuzc/LeaveIt/blob/2884e266babbe95c0abce22d064ecae35c1ac184/exampleSite/config.toml),[academic](https://github.com/gcushen/hugo-academic/blob/3462cadba1eab42c7872de8a44f2a9fcf572f090/exampleSite/config/_default/config.toml)等。
## 创建自定义HUGO shortcode模板
当然，也可以利用HUGO丰富的shortcode功能，去创建一个自定义shortcode模板的方式去新建一个`a_blank.html`[^2]，效果是一样的。具体代码如下(将\%替换成%)：

```bash

#用法: {{%/* a_blank "TITLE" "URL" */%}}

<a target="_blank" href="{{ .Get 1 }}">{{ .Get 0 | markdownify }}</a> <i class="fa fa-external-link"></i>
```

其中的`<i>`标签是外链图标,，如果你不想用，可以移除`<i>`标签。


再提供一个简码模板：
```bash

# 用法: {{</* url-link "title" "www.link.com" "target" */>}}

{{ $numOfParams := len .Params }}
{{ if and (ge $numOfParams 2) (le $numOfParams 3) }}
    {{ if eq $numOfParams 3 }}
        {{ $.Scratch.Set "target" (.Get 2) }}
    {{ else }}
        {{ $.Scratch.Set "target" "_blank" }}
    {{ end }}

    <a href="{{ .Get 1 }}" target='{{ $.Scratch.Get "target"}}'>{{ .Get 0 }}</a>
{{ end }}
```

[^1]: [How to target=“\_blank”in md?](https://discourse.gohugo.io/t/how-to-target--blank-in-md/524)
[^2]: [Link with \_target=“blank”in Markdown](https://discourse.gohugo.io/t/link-with--target-blank-in-markdown-tipp/7569/5)
