+++
title= "为Hugo增加Valine评论系统"
date= 2019-03-15T16:16:03+08:00
type = "post"
tags = ["valine","hugo"]
toc = true
comments = false
codes =["bash","php"]
categories = ["技术"]
mathjax = false
slug ="add Valine comment system for hugo"
+++
无论是早些年坚守Hexo还是19年进驻Hugo，始终没动过评论系统的念头，其因有二，一是本站的原生评论系统是Disqus，已经被墙，无法访问。二是印象中Disqus留言必须有Google账号，这就对读者群无形中形成技术性筛选。

不久前，看了fooleap大神的《[科学使用 Disqus](https://blog.fooleap.org/use-disqus-correctly.html)》，忽然对架设Disqus API有了兴趣，但这种[disqus-php-api](https://github.com/fooleap/disqus-php-api)这种方案需要有一个境外空间实例，只得作罢。

直到今天，外貌协会如我看到了[deserts二开的Valine](https://deserts.io/diy-a-comment-system/#leanapp)，毅然下定决心给自己来一套。
<!--more-->
亦步亦趋按官方给的安装步骤改造博客，然而到最后还是永远在加载状态，而且控制台提示一连串的bug：

```bash
已拦截跨源请求：同源策略禁止读取位于 https://api.ipify.org/?format=json 的远程资源。（原因：CORS 请求未能成功）。[详细了解]
Error: "Class or object doesn't exists."
 r error.js:8
 v request.js:123
 C es6-promise.js:465
 q es6-promise.js:873
 v request.js:106
 T es6-promise.js:416
 N es6-promise.js:431
 A es6-promise.js:399
 b es6-promise.js:341
 u es6-promise.js:126
```
调试了无数遍不同版本的`av.min.js`和`valine.min.js`，故障依然。

尽管心有不甘，但也只能姑且放弃这套方案。一番挣扎后，我又乱入到[原生态的valine官网](https://valine.js.org/quickstart.html)，看到了[无数个hexo主题的成功案例](https://valine.js.org/hexo.html)，又激起了永不言败的斗志。

这一次，退而求其次，参照了[hexo-theme-Anisina](https://github.com/Haojen/hexo-theme-Anisina)的评论系统，悟出了适合自己的部署办法：

### 准备工作

在[leancloud](https://leancloud.cn/)注册、获取APPID、APPKEY、设置云引擎等过程就此略过不表，不明白的多看几遍[Valine Admin配置手册](https://deserts.io/valine-admin-document/)。

### 第一步

在`xxx/layouts/partials/`目录下，新建`comment.html`，内容如下：

```php
{{ if eq .Params.comments true }}
   <div class="vcomments"></div>
    <script src="/js/av-min.js"></script>
    <script src="/js/Valine.min.js"></script>
    //必须保证jquery在上述两个js之前已加载
    //Valine.min.js也可以调用官方原生态js
    //<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
    //<script src="//cdn.jsdelivr.net/npm/valine"></script>
    <script>
        var GUEST = ['nick','mail','link'];
        var meta = '{{ .Site.Params.Valine.meta }}';
        meta = meta.split(',').filter(function (item) {
            return GUEST.indexOf(item)>-1;
        });
        var notify = '{{ .Site.Params.Valine.notify }}' == true ? true : false;
        var verify = '{{ .Site.Params.Valine.verify }}' == true ? true : false;
        new Valine({
            el: '.vcomments',
            emoticon_url: '{{ .Site.Params.Valine.emojiURL }}',
            emoticon_list: ["狂汗.png","不说话.png","哭泣.png","邪恶.png","吐舌.png","无奈.png","内伤.png","脸红.png","得意.png","汗.png","喜极而泣.png","赞一个.png","吐血倒地.png","喷水.png","黑线.png","中刀.png","中指.png","害羞.png","惊喜.png","扇耳光.png","瞅你.png"],
            notify: notify,
            verify: verify,
            app_id: "{{ .Site.Params.Valine.ID }}",
            app_key: "{{ .Site.Params.Valine.Key }}",
            placeholder: "{{ .Site.Params.Valine.placeholder }}",
            avatar:"{{ .Site.Params.Valine.avatar }}",
            meta:meta
        });
      </script>
{{ end }}
```
### 第二步

然后打开`post.html`，在正文容器后加入评论开关代码：

```php

 {{ if eq .Params.comments true -}}
    {{ partial "comment.html" . }}
    {{ end -}}
```
### 第三步

然后打开`config.toml`或`config.json`，加入valine相关参数：

```bash
"Valine": {
            "ID": "VvF*****************GzoHsz",
            "Key": "XL4po***************2ncFGU",
            "emojiURL": "https://cloud.panjunwen.com/alu",
            "placeholder": "看你骨骼清奇，来一发评论吧骚年",
            "verify": "false",
            "notify": "false",
            "avatar": "mm"
        },
```

清除`/public`路径下的缓存文件后，再来一发`hugo server`。

当你梦寐以求的valine赫然跃入你的眼帘时，岂不美哉美哉？

### 第四步
如果希望对评论的管理更上一阶，那么建议增加Valine后台管理面板，具体设置参数请见deserts的《[Valine Admin 配置手册](https://deserts.io/valine-admin-document/)》

{{% notice note %}}
2021年说明：本教程因leancloud政策变更现已失效，仅供参考
{{% /notice %}}