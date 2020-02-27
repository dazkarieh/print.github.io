+++
title= "Hugo Math Sample"
date= 2019-01-31T17:04:40+08:00
categories = ["前端"]
toc = true
tags = ["hugo","mathjax"]
codes = ["bash","ini"]
math = true
description = "本文介绍Hugo中的公式的显示，以及如何修正转义错误。"
slug = "/hugo-math-sample/"
+++

有时候，会有需要在网页中展示数学公式。 与代码高亮不同， [Hugo](http://gohugo.io/)本身是不支持渲染数学公式的。 因此，只能用前端的方式实现。

在已经生成好的HTML页面中，使用JavaScript来渲染[LaTeX](https://www.latex-project.org/)形式的数学公式，是一个可行思路。 [MathJax](https://www.mathjax.org/)是这方面最流行的JavaScript库。

官方文档的[MathJax](https://www.mathjax.org/)使用方案有一些问题，本文提供的方案胜于官方。

## MathJax简介

[MathJax](https://www.mathjax.org/)是一个开源的JavaScript数学公式渲染引擎，支持LaTeX、MathML、AsciiMath等形式的数学公式，并且适配所有现代的浏览器。

> A JavaScript display engine for mathematics that works in all browsers.
>
> No more setup for readers. It just works.
> 与代码类似，数学公式也有有行内（inline）公式和区块（block）公式。 前者需要与同行的其它文字混排，而后者需要独占一行，居中显示。 以下展示了两个行内公式和一个区块公式的测试代码，可以放到Markdown中测试MathJax的渲染效果。

## 测试样例


$$
AveP = \int_0^1 p(r) dr
$$


## (c)(r)等转义问题

默认情况下，`(c)`可转换为©，`(r)`可转换为®。

```bash
$$
AveP = \int_0^1 p(r) dr
$$
```

于是，以上公式会转义为：

{{<img src="https://discourse-cdn-sjc2.com/standard10/uploads/gohugo/original/2X/9/9b7a5e6728496061573c6096073cfaf8cf518ec7.png" alt="bad r">}}

以上提到的`<div>`方案，是可以解决这个问题的。 此外，要禁用全局的这种转义，也可以在 `config.toml`中添加以下配置，禁用该功能。

```ini
[blackfriday]
smartypants = false
```

效果如下：

When $a \ne 0$, there are two solutions to `\(ax^2 + bx + c = 0\)` and they are:

$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

