+++
title= "命令行检索神器FZF x 效率启动器Alfred"
date= 2023-09-30T09:27:20+08:00
type = "post"
categories = ["技术"]
draft = false
reward = true
codes = ["bash"]
douban = false
mathjax = false
slug = "When FZF meets Alfred"
comments = false
keywords = ["macOS","Alfred","FZF"]
tags = ["macOS","Alfred"]
+++
小夏同学被选中参加NOIP竞赛，为此不得不提前给他选购了一台笔电。装机时下意识给他安利了检索利器Everything，才怀念起win下基于USN journal索引方案的丝滑顺畅，macOS当然也有平替品——魔法帽Alfred，但全盘模糊索引一直是个令人头痛的问题，英文尚可，对中文的支持异常生硬诡异，譬如调用Alfred原生引擎进行文件检索，输入完整的文件名「20210908合同文本法律审核指引」可以显示结果，若只记得局部关键词，如「合同文本」、「审核指引」，结果呢，十有八九检索不到目标文件，单这一点，就已经完全落于国产启动器HapiGo的下风，更惶论Raycast。
<!--more-->

## 1、 利用mdutil重建spotlight引擎元数据
macOS文件索引机制虽然号称是实时的，实际并非如此，往往要过数个小时甚至几天才会更新，遇上大版本的系统升级，往往会导致Index Metadata的损毁或局部丢失，这个问题在Alfred使用中特别明显。
解决这个问题鲜有标准化操作，但近些年简中圈似乎达成了一个共识——重建系统内置引擎Spotlight的元数据，常见的方式有二：

```bash
方案1:
$ sudo mdutil -a -i on  // 强制开启所有卷上的数据索引
方案2:
$ sudo mdutil -E /  //  删除根盘下的元数据并重建索引
```

两种方案实质是同一的，`mdutil` 命令调用不同的参数。`mdutil` 是macOS系统管理Spotlight元数据的命令行工具，这里提供其完整的参数表：

```bash
$ mdutil -h
mdutil: invalid option -- h
Usage: mdutil -pEsa -i (on|off) -d volume ...
       mdutil -t {volume-path | deviceid} fileid
    Utility to manage Spotlight indexes.
    -i (on|off)    Turn indexing on or off.
    -d             Disable Spotlight activity for volume (re-enable using -i on).
    -E             Erase and rebuild index.
    -s             Print indexing status.
    -a             Apply command to all stores on all volumes.
    -t             Resolve files from file id with an optional volume path or device id.
    -p             Publish metadata.
    -V vol         Apply command to all stores on the specified volume.
    -v             Display verbose information.
    -r plugins     Ask the server to reimport files for UTIs claimed by the listed plugin.
    -L volume-path List the directory contents of the Spotlight index on the specified volume.
    -P volume-path Dump the VolumeConfig.plist for the specified volume.
    -X volume-path Remove the Spotlight index directory on the specified volume.  Does not disable indexing.
                   Spotlight will reevaluate volume when it is unmounted and remounted, the
                   machine is rebooted, or an explicit index command such as 'mdutil -i' or 'mdutil -E' is
                   run for the volume.
NOTE: Run as owner for network homes, otherwise run as root.
```
 
## 2、安装官方认证的FZF搜索神器workflow

Alfred野生插件平台颇多，我通常去github“淘金”，会有意想不到的收获，另外一个平台便是 [packal](http://www.packal.org/)。因为插件繁多，功能重叠，版权凌乱，我多次致函Alfred维护团队催促其建立一个平台。在我已经放弃的时候，他们才姗姗在V5之后创建了官方的 [Alfred Gallery](https://alfred.app/)平台，寥寥数页，但质量上乘，无意翻了几页，竟瞥见上架了一款日本大学教授写的[fzf search](https://alfred.app/workflows/yohasebe/fzf/)，着实惊呆，没想vim等键盘党簇拥的命令行模糊神器也能有朝一日被移植到Alfred平台。

根据作者提示，该插件的优势如下：

- ⚡️ Fuzzy Search(模糊搜索): You can enter search keys that partially match file/directory paths in any order.
- 🧠 Memorization(搜索历史记录): Alfred manages the order of items according to past usage.
- 🗂 Folder Action（文件目录操作）: Search directory can be set in user preferences or specified dynamically in a folder action.
- 📝 Editable Search History(检索历史编辑): Search history is automatically recorded and can be edited lator.

由于该插件依赖于fd、fzf等包，建议先用CLI包管理工具譬如Brew安装下，就两三行命令，十分便捷。

```bash
$ brew outdated && brew upgrade // 更新brew，可省。
$ brew install fd
$ brew install fzf
```

如此一路打直球，便大功告成。
经测试，Alfred平台下的检索速度与我在LazyVim中利用fzf插件检索文件的耗时接近。

捎带一句，作者在github上也开档了，项目地址：[fzf-alfred-workflow](https://github.com/yohasebe/fzf-alfred-workflow/)，建议从头到尾看完项目readme。