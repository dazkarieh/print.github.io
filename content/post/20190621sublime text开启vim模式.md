+++
title= "sublime text开启vim模式"
date= 2019-06-21T21:38:34+08:00
type = "post"
categories = ["技术"]
draft = false
toc = true
comments = false
reward = true
mathjax = false
codes = ["ini","bash"]
slug = "start sublime text with VIM mode"
keywords = ["Sublime Text","Vim"]
+++
Vim不用说了，江湖人称两大神器之一，原话是「Emacs，神的编辑器，而Vim，则为编辑器之神」，个人而言，日常文本代码编辑中，使用频率更高的是界面更为自由友好的Sublime Text，但又羡慕Vim键盘流的高效与简洁，为此，把Chrome装上了Vimium来体验vim的快感，很少人知道Sublime Text其实是内置了vi模式编辑包——Vintage模块，基于此，可以组合vi命令来调用Sublime Text的功能，包括多重选择。
<!--more-->
## 启用Vintage

Vintage默认是禁用的， 通过ignored_packages 配置。如果要从ignored packages列表中移除"Vintage"的话可以通过下面的方式编辑:

- 选择Preferences/Settings - Default菜单
- 编辑ignored_packages配置, 如下修改并保存:

```ini
    "ignored_packages": ["Vintage"]
成:
    "ignored_packages": []
```

推荐一款Vim模拟器插件[NeoVintageous](https://github.com/NeoVintageous/NeoVintageous)，基于原Vintageous二次开发而成。

- Vintage模式则已启用——你可以看到"INSERT MODE"显示在状态栏了。

Vintage默认是插入模式。可以添加:

```ini
    "vintage_start_in_command_mode": true
```
这项配置到User Settings里。


## Sublime常用功能

### 代码缩进

按v键再按上下左右进行视图选中，进行快速缩进。当在命令模式选中文字时，处于视图模式，visual。

右缩进: \[Tab\]，vim中使用 '>>'

左缩进：\[Shift\] + \[Tab\]，vim中使用 '<<'

### 代码注释

单行注释：\[Ctrl\] + \[ / \]

多行注释：\[Ctrl\] + \[Shift\] + \[ / \]

### Vim模式

从输入模式和末行模式进入命令模式用\[Esc\]键。

## 命令模式进入输入模式

<table>
    <tbody>
        <tr>
            <th colspan="2"><center>命令模式进入输入模式</center></th>
        </tr>
        <tr>
            <td width="20%">i</td>
            <td>从目前光标所在处插入，进入输入模式</td>
        </tr>
        <tr>
            <td>I</td>
            <td>在目前所在行的第一个非空格符处开始插入，进入输入模式</td>
        </tr>
        <tr>
            <td>o</td>
            <td>在目前光标所在的下一行处插入新的一行，进行输入模式</td>
        </tr>
        <tr>
            <td>O</td>
            <td>目前光标所在处的上一行插入新的一行，进行输入模式</td>
        </tr>
        <tr>
            <td>a</td>
            <td>从目前光标所在的下一个字符处开始插入，进行输入模式</td>
        </tr>
        <tr>
            <td>A</td>
            <td>从光标所在行的最后一个字符处开始插入，进行输入模式</td>
        </tr>
        <tr>
            <td>s</td>
            <td>删除当前字符进入输入模式</td>
        </tr>
        <tr>
            <td>S</td>
            <td>删除当前行进入输入模式</td>
        </tr>
    </tbody>
</table>


## 命令模式

<table>
    <tbody>
        <tr>
            <th colspan="2"><center>移动光标的方法</center></th>
        </tr>
        <tr>
            <td width="26%">h 或 向左箭头键(←)</td>
            <td>光标向左移动一个字符</td>
        </tr>
        <tr>
            <td>j 或 向下箭头键(↓)</td>
            <td>光标向下移动一个字符</td>
        </tr>
        <tr>
            <td>k 或 向上箭头键(↑)</td>
            <td>光标向上移动一个字符</td>
        </tr>
        <tr>
            <td>l 或 向右箭头键(→)</td>
            <td>光标向右移动一个字符</td>
        </tr>
        <tr>
            <td>H</td>
            <td>光标移动到这个屏幕的最上方那一行的第一个字符</td>
        </tr>
        <tr>
            <td>M</td>
            <td>光标移动到这个屏幕的中央那一行的第一个字符</td>
        </tr>
        <tr>
            <td>L</td>
            <td>光标移动到这个屏幕的最下方那一行的第一个字符</td>
        </tr>
        <tr>
            <td>G</td>
            <td>移动到这个档案的最后一行(常用)</td>
        </tr>
        <tr>
            <td>nG</td>
            <td>n 为'数字'。移动到这个档案的第 n 行。例如 20G 则会移动到这个档案的第 20 行</td>
        </tr>
        <tr>
            <td>gg</td>
            <td>移动到这个档案的第一行，相当于 1G (常用)</td>
        </tr>
        <tr>
            <td>0 、^或功能键[Home]</td>
            <td>这是数字' 0 '：移动到这一行的最前面字符处，0含空格，^不含空格 (常用)</td>
        </tr>
        <tr>
            <td>$ 或功能键[End]</td>
            <td>移动到这一行的最后面字符处(常用)</td>
        </tr>
        <tr>
            <td>n&lt;space&gt;</td>
            <td>那个 n 表示'数字'，例如 20 。按下数字后再按空格键，光标会向右移动这一行的 n 个字符。例如 20&lt;space&gt; 则光标会向后面移动 20 个字符距离。</td>
        </tr>
        <tr>
            <td>n&lt;Enter&gt;</td>
            <td>n 为数字。光标向下移动 n 行(常用)</td>
        </tr>
        <tr>
            <th colspan="2">复制、粘贴与删除</th>
        </tr>
        <tr>
            <td>x, X</td>
            <td>在一行字当中，x 为向后删除一个字符 (相当于 [del] 按键)， X 为向前删除一个字符(相当于 [backspace] 亦即是退格键) (常用)</td>
        </tr>
        <tr>
            <td>nx</td>
            <td>n 为数字，连续向后删除 n 个字符。举例来说，我要连续删除 10 个字符， ' 10x '。</td>
        </tr>
        <tr>
            <td>dd</td>
            <td>删除游标所在的那一整行(常用)</td>
        </tr>
        <tr>
            <td>ndd</td>
            <td>n 为数字。删除光标所在的向下 n 行，例如 20dd 则是删除 20 行(常用)</td>
        </tr>
        <tr>
            <td>d1G</td>
            <td>删除光标所在到第一行的所有数据</td>
        </tr>
        <tr>
            <td>dG</td>
            <td>删除光标所在到最后一行的所有数据</td>
        </tr>
        <tr>
            <td>d$</td>
            <td>删除游标所在处，到该行的最后一个字符</td>
        </tr>
        <tr>
            <td>d0 或 d^</td>
            <td>那个是数字的 0 ，删除游标所在处，到该行的最前面一个字符,d0含空格，d^不含空格</td>
        </tr>
        <tr>
            <td>dw</td>
            <td>删除一个单词，删除光标到下一个空格之间的字符</td>
        </tr>
        <tr>
            <td>yy</td>
            <td>复制游标所在的那一行(常用)</td>
        </tr>
        <tr>
            <td>nyy</td>
            <td>n 为'数字'。复制光标所在的向下 n 行，例如 20yy 则是复制 20 行(常用)</td>
        </tr>
        <tr>
            <td>y1G</td>
            <td>复制游标所在行到第一行的所有数据</td>
        </tr>
        <tr>
            <td>yG</td>
            <td>复制游标所在行到最后一行的所有数据</td>
        </tr>
        <tr>
            <td>y0</td>
            <td>复制光标所在的那个字符到该行行首的所有数据</td>
        </tr>
        <tr>
            <td>y$</td>
            <td>复制光标所在的那个字符到该行行尾的所有数据</td>
        </tr>
        <tr>
            <td>p, P</td>
            <td>p 为将已复制的数据在光标下一行贴上，P 则为贴在游标上一行！ 举例来说，我目前光标在第 20 行，且已经复制了 10 行数据。则按下 p 后， 那 10 行数据会贴在原本的 20 行之后，亦即由 21 行开始贴。但如果是按下 P 呢？ 那么原本的第 20 行会被推到变成 30 行。 (常用)</td>
        </tr>
        <tr>
            <td>J</td>
            <td>将光标所在行与下一行的数据结合成同一行</td>
        </tr>
        <tr>
            <td>c</td>
            <td>重复删除多个数据，例如向下删除 10 行，[ 10cj ]</td>
        </tr>
        <tr>
            <td>u</td>
            <td>复原前一个动作。撤销(常用)</td>
        </tr>
        <tr>
            <td>[Ctrl] + [Y]</td>
            <td>恢复撤销操作</td>
        </tr>
        <tr>
            <td>.</td>
            <td>意思是重复前一个动作的意思。</td>
        </tr>
        <tr>
            <th colspan="2">搜索替换</th>
        </tr>
        <tr>
            <td>/word</td>
            <td>向光标之下寻找一个名称为 word 的字符串。(常用)</td>
        </tr>
        <tr>
            <td>?word</td>
            <td>向光标之上寻找一个字符串名称为 word 的字符串。</td>
        </tr>
        <tr>
            <td>n</td>
            <td>这个 n 是英文按键。代表重复前一个搜寻的动作。</td>
        </tr>
        <tr>
            <td>N</td>
            <td>这个 N 是英文按键。与 n 刚好相反，为'反向'进行前一个搜寻动作。</td>
        </tr>
        <tr>
            <td>r</td>
            <td>单字符替换</td>
        </tr>
        <tr>
            <td>:n1,n2s/word1/word2/g</td>
            <td>n1 与 n2 为数字。在第 n1 与 n2 行之间寻找 word1 这个字符串，并将该字符串取代为 word2 ！(常用)</td>
        </tr>
        <tr>
            <td>:1,$s/word1/word2/g</td>
            <td>从第一行到最后一行寻找 word1 字符串，并将该字符串取代为 word2 ！与' :%s/word1/word2/g '相同(常用)</td>
        </tr>
    </tbody>
</table>

## 末行模式

<table>
    <tbody>
        <tr>
            <td>:w</td>
            <td>将编辑的数据写入硬盘档案中(常用)</td>
        </tr>
        <tr>
            <td>:q</td>
            <td>不保存退出</td>
        </tr>
        <tr>
            <td>:q!</td>
            <td>强制不保存退出</td>
        </tr>
        <tr>
            <td>wq</td>
            <td>储存后离开，若为 :wq! 则为强制储存后离开 (常用)</td>
        </tr>
        <tr>
            <td>x</td>
            <td>保存退出</td>
        </tr>
    </tbody>
</table>
<p align="center"></p>
