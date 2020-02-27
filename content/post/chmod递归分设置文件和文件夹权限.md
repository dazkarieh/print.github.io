+++
title= "chmod递归分设置文件和文件夹权限"
categories = ["技术"]
mathjax = false
toc = true
codes = ["bash"]
date= 2018-07-05T12:20:32+08:00
tags = ["chomd"]
+++

PC 端修改文件访问权限算是比较常用的操作，在安装部分软件时经常需要使用到。在 Mac 系统的终端上修改文件权限使用的是 Linux 中的 `chmod` 命令。这里详细介绍一下该命令的相关使用。

> 也可以直接通过 `man chmod` 在终端工具上查看该命令的帮助手册。

## 查看文件权限

`ls -l` 命令可以查看当前目录下所有文件的访问权限，也可以查看指定文件。比如，查看 Tomcat bin 目录中的 startup.sh 文件的访问权限时：

```bash
yifeng:bin yifeng$ ls -l startup.sh
-rwxrwxrwx@ 1 yifeng  staff  1904  9 27 18:32 startup.sh
```

上面打印的文件信息中每一部分所代表的含义，分别对应如下解释：

```bash
文件类型和访问权限 文件数量 所属用户 所在群组 文件大小 修改日期（月 日 时 分） 文件名称
```

第一部分详细说明一下，就以 “-rwxrwxrwx” 为例：第一个符号代表文件类型， “-” 符号表示该文件是非目录类型，“d” 符号表示目录类型；（ 末尾的 @ 符号表示文件拓展属性，属于文件系统的一个功能。）

后面九个字母分为三组，从前到后每组分别对应所属用户（user）、所属用户所在组（group）和其他用户（other）对该文件的访问权限；

每组中的三个字符 “rwx” 分别表示对应用户对该文件拥有的可读／可写／可执行权限，没有相应权限则使用 “-” 符号替代。

## 修改访问权限

根据上面查看权限部分的介绍，修改权限也应包括访问用户、添加或取消操作、具体权限和访问文件，即：

```bash
chmod 用户+操作+权限 文件
```
用户部分：使用字母 u 表示文件拥有者（user），g 表示拥有者所在群组（group），o 表示其他用户（other），a 表示全部用户（all，包含前面三种用户范围）；

操作部分：“+” 符号表示增加权限，“-” 符号表示取消权限，“=” 符号表示赋值权限；

权限部分：“r” 符号表示可读（read），“w” 表示可写（write），“x” 表示可执行权限（execute）；

文件部分：如不指定文件名，表示操作对象为当前目录下的所有文件。

还以前面 startup.sh 文件为例，将拥有者所在群组和其他用户改为可读可写权限、取消可执行权限的使用方式为：

```bash
chmod go-x startup.sh
```
然后使用 ls 命令查看权限，

```bash
yifeng:bin yifeng$ ls -l startup.sh
-rwxrw-rw-@ 1 yifeng  staff  1904  9 27 18:32 startup.sh
```
可以看到，文件访问权限已经按照要求发生对应变化。

如果是复杂一点操作的话，可以同时使用多种操作符添加和取消权限，并且可以使用 “,” 符号同时对不同用户范围修改权限，比如：

```bash
chmod g+x,o+x-w startup.sh
```
还有一种简单的写法，使用数字表示权限部分的读／写／可执行权限类型。数字和权限类型的对应关系，可以从这张图中直观地看出来：

{{<img src="https://upload-images.jianshu.io/upload_images/1094967-97e85df254188be1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/332" alt="">}}

即，1 表示可执行，2 表示可写，4 表示可读。每种类型数字相加所得到的值表示交叉部分的公共类型。

这样的话，使用三个数字便可以分别代表三种不同用户类型的权限修改结果。比如，修改所有用户的访问权限均为可读可写可执行（rwx）的话，这样使用即可：

```bash
chmod 777 startup.sh
```
三个数字从前到后分别表示 u、g、o 三种用户类型的访问权限，使用时按需修改。

补充一点，有时候需要递归修改目录文件及其子目录中的文件类型，可以使用 `-R` 选项。

**可以使用选项`-R`递归权限授予文件夹及其所有内容的权限**

但我会建议不要给所有文件夹777权限，这是所有内容。 您应该对www目录文件夹中的每个子文件夹给予特定的权限。

**理想情况下，出于安全原因向Web文件夹授予`755`权限**

```bash
sudo chmod -R 755 /www/store
```

**每个号码在许可中都有意义。 不要给予完全的权限**

```bash
N   Description                      ls   binary
0   No permissions at all            ---  000
1   Only execute                     --x  001
2   Only write                       -w-  010
3   Write and execute                -wx  011
4   Only read                        r--  100
5   Read and execute                 r-x  101
6   Read and write                   rw-  110
7   Read, write, and execute         rwx  111
```
*   第一个数字7 - 对用户进行读取，写入和执行。
*   第二个数字5 - 读取并执行组。
*   第三个数字5 - 读取并执行其他。

对于mac，应该是'超级用户做';

首先：

```bash
sudo -s
password:
```
接着：

```bash
chmod -R 777 directory_path
```
如果不起作用。

```bash
sudo chmod -R 777 /path/to/your/file/or/directory
```
也可以尝试`-f` ：

```bash
sudo chmod -R -f 777 /path/to/your/file/or/directory
```
