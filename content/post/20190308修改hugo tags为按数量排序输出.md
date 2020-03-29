+++
title= "修改hugo tags为按数量排序输出"
date= 2019-03-08T13:51:28+08:00
tags = ["hugo"]
codes = ["bash"]
categories = ["技术"]
mathjax = false
slug = "display hugo tags by counts"
keywords = ["hugo"]
+++
自从hexo搬迁到hugo，hugo server的渲染生成时间一直控制在800ms以下，但还是嫌慢，老规矩，无非是砍掉低效、冷门的tag甚至category。

不过对于选择困难症，这是一个痛苦、反复且漫长的过程。

在流感卧榻的某一个晚上，忽然脑海间，电闪雷鸣，飞沙走石，我在想何不择优输出。次日，说干就干。打开`主题/layouts/partials`下包含tags模块的html模板，用下列代码替换，作用是tags按数量排序，且只显示前50。（[具体参见hugo官方文档](https://gohugo.io/variables/taxonomy/)）

这么干还有个好处，渲染时间可以缩短40-50%，至少从本人数据来看，平均可以降至300-500ms。

```bash
<div class="Tags-Top50-Box">
{{ range first 50 .Site.Taxonomies.tags.ByCount }}
<a class="tag-link"  href="/tags/{{ .Name | urlize }}">{{ .Name }}<span>&#40;{{ .Count }}&#41;</span></a>
{{ end }}
</div>
```
