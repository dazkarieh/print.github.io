+++
title= "如何在代码块里内嵌Hugo的简码(Shortcodes)"
date= 2019-02-25T13:45:35+08:00
type = "post"
mathjax = false
tags = ["markdown","hugo","Shortcodes"]
categories = ["前端"]
codes = ["bash"]
slug = "How to Escape Hugo shortcodes within Hugo markdown"
keywords = ["markdown","hugo","Shortcodes"]
+++
在之前的《[HUGO如何默认以新建标签方式打开外链]({{< relref "20190225HUGO如何默认以新建标签方式打开外链.md" >}})》文末的a -blank简码展示模块，我遇到了有一个markdown的实际问题，我只是想在hugo mardown（.md）文件里展示代码，而非运行hugo的简码(Shortcodes)。那该如何写呢？
<!--more-->
 对于 `{< myshortcode >}` 这样的简码，如何找到一个办法阻止转义，对于大部分markdown解释器，反斜杠`\`似乎不起作用，显示的结果只能是
```bash
 \{{</* myshortcode >\}}
```
或者
```bash
\{\{< myshortcode >\}\}
```
甚至干脆报错或无法阻止简码运行。

一个简单的办法是在左括号或者左百分号的右边添加`/*`，如`{{%/*` 或 `{{</*`，之后在右括号或者右百分号之前添加`*/`，如 `*/*/>}}` 或 `*/%}}`。

如此一来，就可以避免简码被hugo引擎执行，而得以以代码形式在代码块被高亮显示, 你可以在hugo md文件里尝试一下:

```bash
{{</*/* myshortcode */*/>}}
```
输入出结果：

```bash
{{</* myshortcode */>}}
```
