+++
title= "为hugo开启abc记谱显示"
date= 2019-03-02T00:19:45+08:00
tags = ["abc.js","hugo","shortcodes"]
abcjs = true
mathjax = false
toc = true
type = "post"
codes =["bash"]
categories = ["前端"]
slug = "rendering abc music notation by abcjs in Hugo"
keywords = ["abc.js","hugo","shortcodes"]
+++
家里有个练古典吉他的小朋友，经常会阅读、检索乐谱，为了展示他日常的练习片段而不用每次截乐谱或者加载乐谱pdf附件，于是研究了一下Music Notation（记谱），并着手将目前比较通用的[Chris Walshaw](http://chriswalshaw.co.uk/)发明的[abc记谱法](http://abcnotation.com/wiki/abc:standard:v2.0#reelsabc)（abc music notation）部署到hugo上。

实现途径其实很简单，abc记谱法有一个 [abcjs](https://github.com/paulrosen/abcjs) 公共库，支持将[abc](https://www.abcnotation.com) 中的乐谱格式源码自动转译成乐谱（sheet music）。有了这个库，就可以便捷高效地渲染网页中存在的乐谱源码，不用再镶嵌乐谱截图或者pdf文件。
<!--more-->
## abc.js的部署和实现

### abcjs的简码范例

片段一：

```bash
{{</* abcjs */>}}
X:1
%
T:Ryans Rant
M:C
L:1/8
R:Reel
B:Morris/Maurice Hime – Forty Eight Original Irish Dances never Before Printed
B:with Basses for the Piano-Forte, vol. 2 (Dublin,1804, No. 23)
Z:AK/Fiddler’s Companion
K:Ador
cege afge|cege dBGB|cege afge|afge dBGB:|
|:ceAe ceAe|ceAe dBGB|ceAe ceAe|a^fge fdBG:|]
{{</*/ abcjs */>}}
```
片段二：

```bash
{{</* abcjs */>}}
X: 1
T: Misirlou
C: N.Roubanis 1934
O: Greece
R:Jig
W: 1. Misirlou mou i glikia sou matia
W:    Floga m'ehi inapsi mes tin kardia
W:    Ah! Yahabibi Ah! Yaleleli Ah!
W:    Apto diko sou to sto mataki ime
W: Chorus:
W:    A Misirlou
W:    Trella tha m'erthi den ipofero pia
W:    Ah! tha si klepso mes ap tin Arapia.
W:    Ah Misirlou.
W:
W: 2. Mavro mata Misirlou mou trelli
W:    Ti zoi m'allazo mena fili
W:    Ah! yahabibi M'ena filaki Ah!
W:    ta dio sou hili stazoune meli ime
M: 4/4
L: 1/8
K: Gm
|: "D"D3 E ^F2 G2 | A3B ^c2BA | A8- | A8 |
w: 1.~Mi-sir-lou mou i gli-kia sou ma-tia
w: 2.~Mav-ro ma-ta Mi-sir-lou mou tre-lli
| D3E ^F2G2 | A3B ^c2BA | A8- | A8 |
w: Flo-ga m'e-hi~i-na-psi mes tin kar-dia
w: Ti zo-i m'al-la-zo me-na fi-li
| "Gm"BA2B A2G2 | AG2A G2^F2 | "D"^F8- | ^F8 |
w: Ah! Ya-ha-bi-bi Ah! Ya-le-le-li Ah!
w: Ah! ya-ha-bi-bi M'e-na fi-la-ki Ah!
| "Cm"AG2A G2^F2 | ^FE2F E2DD | "D"D8- | D8 :|
w: ta dio sou hi-li sta-zou-ne me-li i-me
w: Ap-to di-ko sou to sto ma-ta-ki i-me
|: "Gm"G8- | G6 ^FG | "F"A8- | A6 GA | "Bm"B6 AB | "A"^c6 Bc | "D"d8- | d8 |
w: A___________ Mi-sir-lou
| "Cm"e d2 e d2 c2 | d c2 d c2 B2 | "D"A8- | A8 |
w: Tre-lla tha m'er-thi den i-po-fe-ro pia
| "Cm"c B2 c B2 A2 | A G2 A ^F2 E2 | "D"D8- | D8 :|
w: Ah! tha si kle-pso mes ap tin A-ra-pia.
P: Coda
|| "Gm"B6 AB | "A"^c6 Bc | "D"d8- | d8- | d8- | d z7 |]
w: Ah___ Mi-sir-lou.
{{</*/ abcjs */>}}
```

### 效果如下

片段一：
{{< abcjs >}}
X:20
T:Teviot Bridge
R:Jig
O:Scotland
M:6/8
C:Trad.-Richard Wood
K:G
e|dBG D2 G|E2 G D2 G|DED D2 d|c2 B A2 G|dBG D2 G|E2 G D2 B|c2 e dBG|
A3 G2|:e|dBG GBd|efe efg|dBG GBG|AFD D2 e|dBG GBd|gfe dcB|1.c2 g dBG:|
2.ceg dBG|\A3 G2||
{{</ abcjs >}}

片段二：
{{< abcjs >}}
X: 1
T: Misirlou
C: N.Roubanis 1934
O: Greece
R:Jig
W: 1. Misirlou mou i glikia sou matia
W:    Floga m'ehi inapsi mes tin kardia
W:    Ah! Yahabibi Ah! Yaleleli Ah!
W:    Apto diko sou to sto mataki ime
W: Chorus:
W:    A Misirlou
W:    Trella tha m'erthi den ipofero pia
W:    Ah! tha si klepso mes ap tin Arapia.
W:    Ah Misirlou.
W:
W: 2. Mavro mata Misirlou mou trelli
W:    Ti zoi m'allazo mena fili
W:    Ah! yahabibi M'ena filaki Ah!
W:    ta dio sou hili stazoune meli ime
M: 4/4
L: 1/8
K: Gm
|: "D"D3 E ^F2 G2 | A3B ^c2BA | A8- | A8 |
w: 1.~Mi-sir-lou mou i gli-kia sou ma-tia
w: 2.~Mav-ro ma-ta Mi-sir-lou mou tre-lli
| D3E ^F2G2 | A3B ^c2BA | A8- | A8 |
w: Flo-ga m'e-hi~i-na-psi mes tin kar-dia
w: Ti zo-i m'al-la-zo me-na fi-li
| "Gm"BA2B A2G2 | AG2A G2^F2 | "D"^F8- | ^F8 |
w: Ah! Ya-ha-bi-bi Ah! Ya-le-le-li Ah!
w: Ah! ya-ha-bi-bi M'e-na fi-la-ki Ah!
| "Cm"AG2A G2^F2 | ^FE2F E2DD | "D"D8- | D8 :|
w: ta dio sou hi-li sta-zou-ne me-li i-me
w: Ap-to di-ko sou to sto ma-ta-ki i-me
|: "Gm"G8- | G6 ^FG | "F"A8- | A6 GA | "Bm"B6 AB | "A"^c6 Bc | "D"d8- | d8 |
w: A___________ Mi-sir-lou
| "Cm"e d2 e d2 c2 | d c2 d c2 B2 | "D"A8- | A8 |
w: Tre-lla tha m'er-thi den i-po-fe-ro pia
| "Cm"c B2 c B2 A2 | A G2 A ^F2 E2 | "D"D8- | D8 :|
w: Ah! tha si kle-pso mes ap tin A-ra-pia.
P: Coda
|| "Gm"B6 AB | "A"^c6 Bc | "D"d8- | d8- | d8- | d z7 |]
w: Ah___ Mi-sir-lou.
{{</ abcjs >}}

片段三
{{< abcjs >}}
X: 1
T: Balance the Straw
R: jig
N: This tune goes with one of the best-known Morris dances. It is also a good jig
N: for other dances, usually in AABB form. The B phrase bears a strong resemblance
N: to a certain Christmas carol, and at Morris dances you will hear words like:
N: __ Hark! the herald angels sing, __
N: __ Glory to the Morris Ring. __
N: Sometimes assorted other things are praised by the angels.
N:
M: 6/8
L: 1/8
K: G
D \
|: "G"G2B B>AB | "C"c2A A>ce | "D7"d>ed cAc | "G"G2B B2D \
|  "G"G2B B>AB | "C"c2A A>ce | "D7"d>ed cEF | "G"G4 z2 :|
B/c/ \
|: "G"dz d dz G | "(D7)"c2B "D7"B2A |  "G"dz d dz G | "D7"B2A A2D \
|  "G"G2B B>AB | "C"c2A A>ce | "D7"d>ed cEF | "G"G4 z2 :|
{{</ abcjs>}}

片段四
{{< abcjs >}}
M:6/8
L:1/8
K:G
[V:1] B3 A3 | G6 | B3 A3 | G6 ||
[V:2] BdB AcA | GAG D3 | BdB AcA | GAG D6 ||
[V:3] D3 D3 | D6 | D3 D3 | D6 ||
{{</ abcjs>}}

片段五
{{< abcjs >}}
M:4/4
O:Irish
R:Reel

X:1
T:Untitled Reel
C:Trad.
K:D
eg|a2ab ageg|agbg agef|g2g2 fgag|f2d2 d2:|\
ed|cecA B2ed|cAcA E2ed|cecA B2ed|c2A2 A2:|
K:G
AB|cdec BcdB|ABAF GFE2|cdec BcdB|c2A2 A2:|

X:2
T:Kitchen Girl
C:Trad.
K:D
[c4a4] [B4g4]|efed c2cd|e2f2 gaba|g2e2 e2fg|
a4 g4|efed cdef|g2d2 efed|c2A2 A4:|
K:G
ABcA BAGB|ABAG EDEG|A2AB c2d2|e3f edcB|ABcA BAGB|
ABAG EGAB|cBAc BAG2|A4 A4:|
{{</ abcjs>}}

### 不足之处

- 本主题的shortcodes目前不支持本地的abc格式文件转译。不过从实际使用上来说，也建议展示乐谱片段，太长的视觉体验不好。
- 目前没有特别好的乐谱库,在abc notation即便搜guns N' Roses也没几个符合的结果，另一个库[lotro-abc](http://www.lotro-abc.com/)资源量还算可以，但将abc文件里的内容直接复制黏贴到abcjs简码内，不一定都会正确显示。
- 目前hugo各主题对abc乐谱支持最好的是[story主题](https://story.xaprb.com/music/)，其次是[notebook-searcher](https://cyrusn.github.io/notebook-searcher/note/abcjs/)。

## ABC记谱法概述
关于The abc Notation System记谱格式的文章可以参考这篇。

{{% staticref "files/abc.txt" "newtab" %}}abc格式用法说明{{% /staticref %}}

翻译如下：

每首曲子都包含一个头部和一个正文。头部由不同的信息字段组成，X编号（reference number）字段后跟一个T曲名（Title）字段开始，以K声调(key)字段结束。在abc记谱法中，曲子的正文部分必须紧随其后。而曲子则由空行分隔。

### 信息字段（Information fields）

字母及意义|头部|曲子|其他位置|示例
:-: | :-: | :-: | :-: | :-:
A:地区area|是|||A:北京, A:上海
B:书籍book|是||是|B:北京大学出版社
C:作曲composer|是|||C:雷颂德
D:唱片discography|是|||D:试音金碟
E:跳过elemskip|是|是||参见Line Breaking
F:文件名file name|||是|参见index.tex
G:组名group|是||是|G:长笛
H:历史history|是||是|H:这歌据说很邪门…
I:信息information|是||是|
K:声调key|最末尾|是||K:G, K:Dm, K:AMix
L:音长default note length|是|是||L:1/4, L:1/8
M:节拍meter|是|是|是|M:3/4, M:4/4
N:笔记notes|是|||N:参见O'Neills出版社的P234
O:起源origin，通常是地理区域|是||是|O:I, O:Irish, O:English
P:声部parts|是|是||P:ABAC, P:A, P:B
Q:速度tempo|是|是||Q:200, Q:C2=200
R:旋律rhythm|是||是|R:Strathspey，R:reel，R:Jig，tango等
S:来源source|是|||S:傣族自治区采集
T:曲名title|第二|是||T:希望之光
W:留言words||是||W:留言
X:编号reference number|第一|||X:1, X:2
V:声部Voice|是|||V:1, V:2
Z:版本注释reference number|是|||Z:照片版本

上述的A-Z信息字段用于标记诸如作曲、节拍等信息，实际上这些都不是音乐本身，但又是决定音乐呈现的关键。大多数信息字段都是出现在曲子头部，但也不是绝对的，也可以标记在曲子正文或其他位置。这些字段可以溯及整首曲子始末。例如一首曲子一开始标记为`M:6/8` 、`R:Jigs`，紧接着是`M:4/4` 、 `R:Reels`，那么曲子会在每个部分自动在M: 和 R: 字段切换， 最后留神任何以A-Z字母开头的乐句，马上跟着`a :`，会被当做一个字段中断。（就像 `E:|`，会被解析为`E:`，紧接着一个右重复符号，会导致出错）

有若干特定区域的代表字母要值得注意：

**T - 曲名**，有些曲子有多个标题，因此，每首曲子可以有多个title，但第一次出现才会被默认为大标题，而随后的则会被当成小标题，T: 字段是用来标记一首曲子的名称。因此，比其他的音调和节拍字段都要靠前。

**K - 音调**，K字母后面有2种不同的写法，#代表升调、b表示降调。另外，也可以标识不同的调式。比如 `K:F lydian`、`K:C`、`K:C major`、`K:C ionian`、
`K:G mixolydian`、`K:D dorian`、`K:A minor`、`K:Am`、`K:A aeolian`、`K:E phrygian`以及`K:B locrian`等等，必须留空格，调式大小写可忽略。实际上，只有前三个字符才会被解析，举个例子, 和 `K:F#Mix` 甚至 `K:F#MIX`、`K:F# mixolydian`效果是一样的。有两个专门用标记高地风笛曲子的音调写法。如K:HP 在五线谱上并非用以标记音调, 而是和 `F sharp`,  `C sharp` 和 `G natural`效果类似.  都是强制所有的符杠（beam）和谱表（staff）往下走。

最后，全局性临时记号（global accidentals）也会在这一字段出现，譬如 `K:D =c` 代表在D调的基础上降了两个半调（sharp） 然后把每一个c当做还原记号（natural），概念上等同于`D mixolydian`调式.

注意可以有多个全局临时记号，靠空格来分开，每一个都以还原符号区分，如下的 `__,  _, =, ^ `或`^^`紧接着的是一个小写字母，全局临时记号，可以被曲子正文附加的还原记号，也可以随着每次调式的改变而重置。

**L - 默认音长**， 比如 `L:1/4`  指四分之一音符,  `L:1/8` 指八分之一音符,  `L:1/16` 指十六分之一音符,  `L:1/32` 指三十二分之一音符。默认音长也会自动随着节拍字段的变化而变化。

**M - 节拍**， 除了常见的节拍 `M:6/8` 或 `M:4/4`，还有两个特殊符号 `M:C`和`M:C|` 分别表示四分之四拍（common time）和 二二拍（cut time）。

**P - 声部**，出现在头部，有两个作用：一用来声明曲子分谱的演奏顺序, 例如 `P:ABABCDCD` , 二用以标记取自内部的各个部分，例如 `P:A` 或 `P:B` 。

**Q - 速度**，用来说明每分钟的音符数，如默认音符长度是八分之一，而速度标示为 `Q:120` 或者 `Q:C=120`，那就表示每分钟有120个八分之一音符，类似的，`Q:C3=40` 代表每分钟有40个附点四分之一音符（dotted quarter notes）。当然也可以设置绝对速度，如`Q:1/8=120` 即指定了每分钟有120个八分之一音符，不再考虑默认音长是多少。

**G - 组名**; 将音符组合在一起是出于便于检索的目的。

**H - 历史**; 可以写多行的趣事、掌故、逸闻, 除非下一个字段出现，否则会被自动忽略。
