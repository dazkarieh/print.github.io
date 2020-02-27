---
title: 通过Coding提供的WebIDE来使用Hexo
tags:
  - hexo
categories: 技术
mathjax: false
date: 2018-10-19 23:59:31
---
Hexo这类静态博客，最不方便的就是跨平台使用。因为你必须安装npm、git、hexo、nodejs以及源码同步，这些条件一般只有自己的电脑符合。

所以我们必须未雨绸缪，让自己随时随地都可以管理Hexo！

### 方案

目前已经有很多种方案来实现跨平台使用和备份还原等

*   Travis CI：作者推荐的一种方案，但是我看不懂门槛太高
*   插件：官网有一款`hexo-admin`的插件，但是部署还需要依赖环境，作用不大
*   Git：这是我目前使用的方案，即通过在git新建分支备份源码
*   便携版Hexo：这是我在贴吧看见的一篇帖子

关于Git的方案，我曾在一篇文章中写过。它只是提供了跨平台的可能，但是还需要大量准备工作，不完美。
直至发现了WebIDE。

### WebIDE

这是Coding自主研发的在线集成开发环境，用户可以通过 WebIDE 创建项目的工作空间, 进行在线开发, 调试等操作。

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-050833.jpg" alt="">}}

我们可以直接通过它来发布文章，管理和调试你的博客
同时能够在线commit、push代码到coding仓库

这就是一个云端的Hexo目录文件夹

### 安装

由于这方面的搜索结果很少，我也只能慢慢摸索了几个小时才初步完成
首先新建一个工作空间，自己选择配置

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-050921.jpg" alt="">}}

虽然说不是直接收费的，码币可以通过提交代码获得…可是每天最多0.01
暂时还不清楚支撑的住不，刚刚已经花了两个小时的时间了，上面写着10个小时0.01
这块待我使用一段时间后再说吧

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-2018-10-20%20at%2012.58.jpg" alt="">}}

你可以直接从coding同步你的仓库，但是我的master分支，并不包括node_modules等文件夹，而文件树并不能直接上传文件夹，只好重新安装hexo。

运行环境选择`ide-tty-hexo`，直接点击使用即可

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-045741.jpg" alt="">}}

安装命令我也搞混了，中间报了好几次错，然后我就一条条命令试
结果是对的，我也懒得管了。
```bash
sudo npm install hexo-cli -g # 在workspace根目录
hexo init # 必须是空目录，自动拷贝landscape主题
npm install
```
默认编辑主题是黑色，当然，你也可以在设置里面更改编辑器的主题（目前只支持黑白两色）等等

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-050147.jpg" alt="">}}

我们首先先解锁一下配置文件（将所有文件提权至777）

```bash
sudo chmod -R 777 *
```
接着我手动将一些配置文件通过文件树上传，在目录右键即可

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-051024.jpg" alt="">}}

如果你是第一次安装倒省事…将本地的迁移上去还麻烦些

接着输入`hexo s`在本地开启你的网站渲染吧

记得在右侧“访问链接”里面设置端口4000，点击生成临时访问链接

{{<img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/2018-10-20-2018-10-20%20at%2013.30.jpg" alt="">}}

访问这个网址就可以预览了…

webide的预览步骤与本地的localhost略微不同

至此整个安装过程结束

## 配置
hexo默认的链接是http://xxx.yy.com/2013/07/14/hello-world这种类型的，这源于站点目录下的配置_config.yml里的配置:permalink: :year/:month/:day/:title/.这种默认配置的缺点就是一般文件名是中文，导致url链接里有中文出现，这会造成很多问题。

为了使得网址唯一化，向搜索引擎表明静态化，我选择了abbrlink插件

首先在hexo目录下安装
`npm install hexo-abbrlink --save`
然后，在主題配置文件加上:

```bash
permalink: :abbrlink.html #添加html后缀有利于seo
permalink_defaults: #可自定义参数

# abbrlink config
abbrlink:
  alg: crc32  #算法support crc16(default) and crc32
  rep: hex    #进制support dec(default) and hex

 #crc16/crc32:差別在於編號個數的極限，crc16可以生出65535個
 #dec/hex:差別在於編號生出來是十進制還是十六進制
```

## 部署
###方法一
在config.yaml填入填入了repo
```bash
deploy:
 type: git
 repo: https://用户名:密码@git.coding.net/dazkarieh/Hexo.git
 branch: master
 message: blog update
```
###方法二
在部署开始前，我们还需要安装依赖以及修改配置。
在『工作区』的 WebIDE 环境，执行这条命令安装部署到 git 服务器上的依赖：

```bash
npm install hexo-deployer-git --save
```
输入以下两条命令来配置 git 环境变量，告诉 git 是谁在使用，将『you@example.com』和『Your Name』替换成你自己的邮箱和名字：

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

在文章开头已经说过，Hexo 的『写作』和『部署』是分开的，所以我们需要另外新建一个项目作为源文件编译后的『存储区』。
项目为私有或公有都可以，勾选“启用README.md文件初始化项目”。

{{<img src="https://dn-coding-net-production-pp.qbox.me/2f901114-0720-4092-ad9c-7c4f793326b1.png" alt="Hexo 部署区">}}

记录下这个『存储区』项目的 SSH 地址：

{{<img src="https://dn-coding-net-production-pp.qbox.me/f9e9069e-0758-47d5-97fd-6fc7a5ac2f1e.png" alt="存储区地址">}}

接下来回到『工作区』的 WebIDE，在目录中找到 `_config.yml` ，配置好部署参数，在其最下方找到 `deploy:` 字段，在 `type:` 后面填入 `git`，冒号后面记得加个空格，在 `repo:` 后面填入刚才记录下来的『存储区』项目的 SSH 地址，在 `branch:` 后面填入 `master`，记得，以上所有冒号后面都要跟一个空格才能生效。

如图所示：

{{<img src="https://dn-coding-net-production-pp.qbox.me/2ec40172-392f-47e5-ac7f-744bbe4cd6b5.png" alt="设置1">}}

还需要在 `_config.yml` 中配置 #URL 参数。在 `url:` 后面填入`你的用户名.coding.me/『存储区』项目名字`，`root:` 后面填入`『存储区』项目名字`。

比如我的用户名是 `chenjuntong`，我的『存储区』项目名字是 `Hexo-Blog`，则在这里的 `url:` 填入 `chenjuntong.coding.me/Hexo-Blog`， `root:` 填入 `/Hexo-Blog/`， 注意，以上所有冒号后面都要跟一个空格才能生效。

如图所示：

{{<img src="https://dn-coding-net-production-pp.qbox.me/154a18ec-44c5-4af0-863f-2220275e51a7.png" alt="设置2">}}

最后一步，执行部署命令，即可部署到我们指定的『存储区』里。
执行部署命令：
`hexo deploy`
或者其简写形式：
`hexo d`

执行效果如下：

{{<img src="https://dn-coding-net-production-pp.qbox.me/4fa34317-2ca4-4670-b73e-53d74be7cb6c.png" alt="hexo-d">}}

## 开启静态Pages服务,配置域名

打开『存储区』项目页面，会发现之前在『工作区』生成的静态文件已经部署进来了：

{{<img src="https://dn-coding-net-production-pp.qbox.me/93dd0b5c-22f7-40cc-b61a-de20d814708f.png" alt="存储区项目页面">}}

点开`Pages 服务`设置页，在`静态 Pages`中，选择`master 分支`为部署来源，点击保存。
如图所示：

{{<img src="https://dn-coding-net-production-pp.qbox.me/87348e4d-ccde-4f85-9976-0fa1bc0fb226.png" alt="开启Pages">}}
{{<img src="https://dn-coding-net-production-pp.qbox.me/e0c27537-5782-4026-b878-74241ba4e223.png" alt="开启成功">}}

恭喜！成功部署后，点击运行网址，你的个人博客了上线啦！


当然，如果你已经是老手的话，以上所有操作也可以放在同一个仓库的两个不同分支（一个分支用来写作，一个分支用来部署）。


## （可选）导入原有博客

上述操作是在webIDE里新建一个hexo博客，但是如何导入已有的博客呢？

### 方式一

右键点击文件树空白处，可以选择上传文件。（但是好像不能上传整个目录）

### 方式二

由于每次更新博客之后，我都会把博客文件备份在coding的仓库里。所以，现在只需把该仓库clone到webIDE中即可。

// 复制原有的博客文件到文件夹 hexo_cloud/blog_backup 下
`git clone https://git.coding.net/orzyt/blog_backup.git`

// 删除之前初始化的博客文件
`sudo rm -rf blog/*`

// 将blog_backup中的所有文件移到blog中
`sudo mv blog_backup/* blog_backup/.[^.]* blog/`

// 安装原有博客所依赖的插件
`npm install`

## hexo的常用命令
hexo的常用命令有这些，**都要在Hexo的根目录下执行**
```bash
hexo g # 编译生成静态文件
hexo d  # 部署博客
hexo g -d # g 跟 d 一起使用
hexo clean # 清除以前生成的静态文件。
            # 通常，清理一下可以解决大多数问题。
hexo s # 本地预览博客
hexo new xxx # 新建一篇标题为xxx的文章
hexo new draft xxx  # 新建一篇标题为xxx的草稿
hexo new page xxx # 新建一个页面
hexo help #查看帮助
npm ls --depth 0 ##查看依赖
```
## 几个常用的Unix终端命令

```bash
切换到上一级目录 cd ..
切换到根目录 cd /
重命名目录 mv A B
重命名文件 mv a.md b.md
远程拷贝主题 git clone url
列出当前目录下属文件 ls
列出当前目录下属文件的详尽信息 ls -l
强制删除文件 rm -rf
```
