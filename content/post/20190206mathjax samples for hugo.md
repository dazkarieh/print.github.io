+++
title= "mathjax samples for hugo"
date= 2019-02-06T17:11:17+08:00
tags = ["mathjax","hugo"]
codes =["bash"]
toc = true
categories = ["前端"]
math = true
description = "mathjax 实例"
slug = "mathjax samples for hugo"
+++

还是在`Hexo`中使用`Mathjax`写`Latex`公式的问题，在需要些多行的公式的时候，
例如:

```bash
\begin{equation}\begin{split} a&=b+c-d\\
&\quad +e-f\\
&=g+h\\
& =i
\end{split}\end{equation}
```

其中:

*  `begin`和`end`表示公式的起始
*  `\\`符号表示换行
*  `&`表示对齐

结果渲染到html页面之后结果是这样的:
{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190219093546.png" alt="">}}

完全没换行啊，而且又有莫名其妙的空格，按照之前的经验，估计是`markdown`渲染的`html`的时候出了问题
{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190219093606.png" alt="">}}

发现两个问题:

* `&`符号被转义成了`&amp;`
* 双反斜杠`\\`被转义成功了`\`

这就是公式没换行的原因，肯定是`marked.js`里面做了处理，不过仔细看`Mathjax`脚本的配置项中有一项为`processEscapes: true`，说明`MathJax`是支持转义符号的，所以类似`&amp;`是不需要额外处理的。

那么压力就到了解反斜杠问题，最粗暴的是讲反斜杠的转义从`marked.js`里面去掉，但是可能会影响其他功能，既然两根反斜杠是转为一根，而`Latex`是两个换行，最简单的方法就是写4个反斜杠` \\\\ `，或者` \cr `:

```bash
\begin{equation}\begin{split} a&=b+c-d \cr
&\quad +e-f \cr
&=g+h \cr
& =i
\end{split}\end{equation}
```

就可以得到期待的结果了:

\begin{equation}\begin{split} a&=b+c-d \cr
&\quad +e-f \cr
&=g+h \cr
& =i
\end{split}\end{equation}

这种处理就不影响`Hugo`自身的功能，又可以满足多行公式的书写。

## 实验1

$$
f(n) =
\begin{cases}
n/2,  & \text{if $n$ is even} \cr
3n+1, & \text{if $n$ is odd}
\end{cases}
$$

## 实验2

\begin{equation}\begin{split}
a&=b+c-d \cr
&\quad +e-f \cr
&=g+h \cr
& =i
\end{split}\end{equation}

## 实验3

\begin{array}{c}
a_1x+b_1y+c_1z=d_1 \cr
a_2x+b_2y+c_2z=d_2 \cr
a_3x+b_3y+c_3z=d_3
\end{array}


## 实验4
$$\hat{y}= \sigma(\omega^T X+b)=\frac{1}{1+e^{-(\omega^T X+b)}}$$


\begin{pmatrix} 1&a_1&a_1^2&\cdots&a_1^n \cr  1&a_2&a_2^2&\cdots&a_2^n \cr  \vdots&\vdots&\vdots&\ddots&\vdots \cr  1&a_m&a_m^2&\cdots&a_m^n \cr  \end{pmatrix}


## 实验5
$\cos 2\theta = \cos^2 \theta - \sin^2 \theta = 2 \cos^2 \theta$

## 实验6
with pmatrix,\begin{pmatrix}1&2\cr3&4\cr \end{pmatrix}
with bmatrix,\begin{bmatrix}1&2\cr3&4\cr \end{bmatrix}
with pmatrix,\begin{Bmatrix}1&2\cr3&4\cr \end{Bmatrix}
with vmatrix,\begin{vmatrix}1&2\cr3&4\cr \end{vmatrix}
with Vmatrix,\begin{Vmatrix}1&2\cr3&4\cr \end{Vmatrix}

## 分割矩阵

$$ \left[
    \begin{array}{cc|c}
      1&2&3\cr
      4&5&6
    \end{array}
\right] $$

Each line should end with \, and should contain an ampersand at the point to align at, typically immediately before the equals sign.

\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \cr
 & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \cr
 & = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \cr
 & = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \cr
 & \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)
\end{align}

## MathJax多行公式对齐

比如多行公式推导中常用的等号对齐
begin{split} 表示开始多行公式，end{split}表示结束；公式中用`\\`(hugo用 \cr )表示回车到下一行，&表示对齐的位置。

$$
   \begin{equation}
   \begin{split}
   \frac{\partial^2 f}{\partial{x^2}} &= \frac{\partial(\Delta_x f(i,j))}{\partial x} = \frac{\partial(f(i+1,j)-f(i,j))}{\partial x}  \cr
   &= \frac{\partial f(i+1,j)}{\partial x} - \frac{\partial f(i,j)}{\partial x}  \cr
   &= f(i+2,j) -2f(f+1,j) + f(i,j)
   \end{split}
   \nonumber
   \end{equation}
$$

## MathJax公式手动编号

```bash
$$
\begin{equation}
\sum_{i=0}^n F_i \cdot \phi (H, p_i) - \sum_{i=1}^n a_i \cdot ( \tilde{x_i}, \tilde{y_i})  + b_i \cdot ( \tilde{x_i}^2  , \tilde{y_i}^2  ) \tag{1.2.3}
\end{equation}
$$
```

$$\sum_{i=0}^n F_i \cdot \phi (H, p_i) \tag{1.2.3}$$

不加`\begin{equation} \end{equation}`也可以，例如：

$$
 \beta^*(D) = \mathop{argmin} \limits_{\beta} \lambda {||\beta||}^2  \tag{我的公式3}
$$

行内公式加`\tag{}`后会自动成为行间公式，

又如：
$ s = r cos(a+b)  = r cos(a) cos(b)  - r sin(a) sin(b) \tag{1.1} $

$ t = r sin(a+b)  = r sin(a) cos(b)  - r cos(a) sin(b) \tag{1.2} $


## 将下标放到正下方

如果是数学符号，那么直接用`\limits`命令放在正下方，如Max函数下面的取值范围，需要放在Max的正下方。可以如下实现：
`\max \limits_{a<x<b}\{f(x)\}`

$ \max \limits_{a<x<b}\{f(x)\} $

若是普通符号，那么要用`\mathop`先转成数学符号再用`\limits`，如
`\mathop{a}\limits_{i=1}`

$ \mathop{a}\limits_{i=1} $

## 公式标记

`$...$`表示行内公式，`$$...$$`表示独立公式。如：

`\sum_{i=0}^n f(i) =\frac{(n^2+n)}{6}`是一个行内公式

$\sum_{i=0}^n f(i) =\frac{(n^2+n)}{6}$

`\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}`是一个独立公式：

$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$


## 希腊字母

使用`\alpha`, `\beta`, …, `\omega`来表示$\alpha$, $\beta$, …, $\omega$

大写使用`\Gamma`, `\Delta`, …, `\Omega`表示$\Gamma$, $\Delta$, …, $\Omega$

## 上下标表示

使用`^`和`_`，如`x_i^2`表示$x_i^2$

## 组(Group)

上下标或者其他命令都是以组为单位的，组可以是单个字母，也可是使用`{..}`围起来的单元，如`10^10`表示$10^10$
`10^{10}`表示$10^{10}$，`x_i^2`表示$x_i^2$，`x{i^2}`表示$x{i^2}$。需要注意的是，命令后面如果是没有{}的group，则需要加空格已区分命令和后面的参数。

## 括号

可以直接使用`()[]`表示括号，但是这些括号不会随着公式大小调节。
另一种方法是使用`\left(...\right)`，可以随着公式大小自动调整大小。如`(\frac{\sqrt x}{y^3})`表示$(\frac{\sqrt x}{y^3})$，`\left(\frac{\sqrt x}{y^3}\right)`表示$\left(\frac{\sqrt x}{y^3}\right)$。

`\left`,`\right`同样可以用于`[]`,`{}`,`||`。另外特殊的需要专门的标记，如`\langle x \rangle`来表示$\langle x \rangle$，`\lceil x \rceil`来表示$\lceil x \rceil$，`\lfloor x \rfloor`来表示$\lfloor x \rfloor$。

另外还可以通过附加`.`表示不可见的括号，如`\left.\frac12\right\rbrace`表示$\left.\frac12\right\rbrace$。


## 求和和积分

使用`\sum`和`\int`表示$\sum$和$\int$，`\sum_{i=0}^\infty i^2`表示$\sum_{i=0}^\infty i^2$。

另外，`\prod`表示$\prod$，`\bigcup`表示$\bigcup$，`\bigcap`表示$\bigcap$，`\iint`表示$\iint$


## 分数

两种方式，一种方式是`\frac ab`，表示$\frac ab$，`\frac{a+1}{b+1}`表示$\frac{a+1}{b+1}$，另一种方式是`{a+1\over b+1}`表示${a+1\over b+1}$

## 字体

可以在公式中使用多种字体，如`\mathbb{CHNQRZ}`表示$\mathbb{CHNQRZ}$，还有多种字体可以参考[MathJax basic tutorial and quick reference](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## 求根

使用`sqrt`，默认是平方求根，可以通过`[]`添加参数。如`\sqrt{x^3}`表示$\sqrt{x^3}$，`\sqrt[3]{\frac xy}`表示$\sqrt[3]{\frac xy}$，更直接的方式是直接使用上标。


## 一些特殊函数

`\lim`,`\sin`,`\cos`等，虽然可以直接用字母表示，但是只有使用了这些符号才会有符合其特征的表示，如`\sin x`表示$\sin x$，`\lim_{x\to 0}`表示$\lim_{x\to 0}$。

## 常用符合和表示

* \lt \gt \le \ge \neq表示<>≤≥≠，可以使用\not取非，如\not\lt表示≮。
* \times \div \pm \mp \cdot表示×÷±∓⋅
* \cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin \emptyset
* \varnothing表示∪∩∖⊂⊆⊊⊃∈∉∅∅
* {n+1 \choose 2k} or \binom{n+1}{2k}表示(n+12k)
* \to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto表示→→←⇒⇐↦
* \land \lor \lnot \forall \exists \top \bot \vdash \vDash表示∧∨¬∀∃⊤⊥⊢⊨
* \star \ast \oplus \circ \bullet表示⋆∗⊕∘∙
* \approx \sim \simeq \cong \equiv \prec表示≈∼≃≅≡≺
* \infty \aleph_0表示∞ℵ0
* \nabla \partial表示∇∂
* \Im \Re表示IR
* a\equiv b\pmod n表示a≡b(modn)
* \ldots表示…
* \epsilon \varepsilon表示ϵε
* \phi \varphi表示ϕφ
* \ell表示ℓ
* \\或者\cr表示new line，Hugo似乎只支持\cr
* \backslash表示∖
* \$表示$
* \{表示{

---
参考资料：

- [mathjax中的数学公式书写](http://plusaber.com/2015/06/16/Blogging_Mathjax/)
- [Hexo博客添加MathJax数学公式渲染](http://masikkk.com/article/hexo-13-MathJax/)
