+++
title= "池田エライザ图集示例"
date= 2019-02-25T17:26:56+08:00
tags = ["相册","hugo"]
mathjax = false
toc = true
codes = ["bash"]
categories = ["前端"]
slug = "/Ikeda-Elaiza-gallery/"
+++
如果你看过真人版的《[映画 みんな！エスパーだよ！ (2015)](https://movie.douban.com/subject/26328479/)》，一定不会对这位大秀身材的姑娘陌生。

 {{< figure src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2019-01-30-151919.jpg"  caption="♡ model : Ikeda Elaiza ♡" caption-position="bottom" caption-effect="fade" >}}

## 单个目录展示

### 简码
```bash
{{</* gallery dir="/img/hugo/" */>}}
```
### 效果
{{< gallery dir="/img/hugo/" />}}


## 自定义图集展示

### 简码
```bash
{{</* gallery hover-effect="slidedown" */>}}

 {{</* figure src="/img/Ikeda Elaiza/170201e04.jpg" link="/img/Ikeda Elaiza/170201e04.jpg" caption="池田エライサ1" */>}}
{{</* figure src="/img/Ikeda Elaiza/170201e10.jpg" link="/img/Ikeda Elaiza/170201e10.jpg"  caption="池田エライサ2" */>}}
{{</* figure src="/img/Ikeda Elaiza/170201e11b.jpg" link="/img/Ikeda Elaiza/170201e11b.jpg"  caption="池田エライサ3" */>}}
{{</* figure src="/img/Ikeda Elaiza/170201e12b.jpg" link="/img/Ikeda Elaiza/170201e12b.jpg"  caption="池田エライサ4" */>}}
{{</* figure src="/img/Ikeda Elaiza/170201e16.jpg" link="/img/Ikeda Elaiza/170201e16.jpg"  caption="池田エライサ4" */>}}
{{</* /gallery */>}}

 {{</* load-photoswipe */>}}
```
### 效果

{{< gallery hover-effect="slidedown" >}}
 {{< figure src="/img/Ikeda Elaiza/170201e04.jpg" link="/img/Ikeda Elaiza/170201e04.jpg" caption="池田エライサ1" >}}
{{< figure src="/img/Ikeda Elaiza/170201e10.jpg" link="/img/Ikeda Elaiza/170201e10.jpg"  caption="池田エライサ2" >}}
{{< figure src="/img/Ikeda Elaiza/170201e11b.jpg" link="/img/Ikeda Elaiza/170201e11b.jpg"  caption="池田エライサ3" >}}
{{< figure src="/img/Ikeda Elaiza/170201e12b.jpg" link="/img/Ikeda Elaiza/170201e12b.jpg"  caption="池田エライサ4" >}}
{{< figure src="/img/Ikeda Elaiza/170201e16.jpg" link="/img/Ikeda Elaiza/170201e16.jpg"  caption="池田エライサ4" >}}
{{< /gallery >}}

 {{< load-photoswipe >}}


## 注意markdown路径写法

`img/Ikeda Elaiza/170201e04.jpg` 所指向的路径是**post**下的目录，即

```bash
yoursite/post/img/Ikeda Elaiza/170201e04.jpg
```
`/img/Ikeda Elaiza/170201e04.jpg` 所指向的路径是**site**下的目录，即

```bash
yoursite/img/Ikeda Elaiza/170201e04.jpg
```
