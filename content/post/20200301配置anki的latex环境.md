+++
title= "配置Anki的LaTeX环境"
date= 2020-03-01T14:27:20+08:00
type = "post"
categories = ["技术"]
draft = false
toc = false
reward = true
codes = ["bash"]
douban = false
mathjax = false
slug = "installation of anki-customized latex in macOS majove"
comments = false
keywords = ["LaTeX","BasicTeX","Anki"]

+++

TeX(读作/'laːtɛx/或 /'leɪtɛk/)是最强大的文字排版系统之一，它被广泛地用来制作幻灯片、论文甚至书籍(早年网红垠神当年即以TeXpert－Tex布道者、Tex专家的形象出道)。

很多人认为TeX排版与Microsoft Office Word或类似软件的最大异同在于「非所见即所得」。实则不然，TeX的作者Donald E. Knuth曾形象地形容过 ：

> 一个版面就像一个含有胶水（glue）的页面，然后每一个要排版的内容就是各种不同的 box，在这些 box 还没有固定正确位置时，都是可以移动的（胶水还没有干），一旦排版完成，胶水就干了，于是每个 box 的位置就固定无法再移动了，除非又从头再来。

<!--more-->

本文的重点当然不是如何理解、使用LaTeX，而是前期「打地基」的工作。

Mac环境下，Tex提供了各种安装版本。以Mactex为例，完整版体积已然过G，而基本版的话只有90MB左右。事实上，完整版大部分功能对于Anki用户来讲，永远都不会用到，所以我们的需求仅仅是让Anki支持LaTeX格式内容渲染。

因此，我选择轻量化的BasicTeX。

为了测试，我随意在Anki中创建了一张卡片：

- 正面为：

```latex
[latex]$ x_i $[/latex]
```

- 背面为：

```latex
[latex]
$$ \int_a^b f(x)$$\\

$$\left(\sum_{k=\frac{1}{2}}^{N^2}\frac{1}{k}\right)$$\\

$$\sqrt{1+\sqrt[^p\!]{1+a^2}}$$\\

\begin{equation}\nonumber
   \begin{cases}
    f(x)=1+x+x^2\\
    g(x)=a_nx^n+a_{n-1}x^{n-1}+...+a_1x^1
   \end{cases}
\end{equation}
[/latex]
```

用homebrew安装最新版本即可。


```bash
$ brew cask install basictex
```

结果发现被墙了，直接扔到aria2上下载2019版的BiasicTeX，或者：

```
$ proxy
$ wget http://mirrors.ctan.org/systems/mac/mactex/BasicTeX.pkg
```

原以为`installer -pkg`安装完毕后开箱即用，但如果你不幸和我一样出现了以下提示：

```bash
Error executing dvipng.
Generated file: /var/folders/x2/8dh4jx2j64n9tvvts_l2pqk00000gp/T/anki_temp/tmp.tex
```

或者

```bash
sudo: tlmgr: command not found
```

**注意：**请在终端配置好tlmgr的路径

```bash
sudo /usr/local/texlive/2019basic/bin/x86_64-darwin/tlmgr path add
```
然后，以防万一可在终端再升级下tlmgr版本

```bash
$ sudo tlmgr update --self
```

等待数秒完成后，安装dvipng组件。

```bash
$ sudo tlmgr install dvipng
```
上述命令可以归纳为一句：

```bash
sudo tlmgr update --self && sudo tlmgr install dvipng
```

不出意外的话，打开Anki就可以看到你的TeX开始渲染输出了。

{{< img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20200303184136.png" alt="成功问鼎" >}}


