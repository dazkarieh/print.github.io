+++
title= "h5ai个性化配置页眉页脚教程"
categories = ["技术"]
tags = ["h5ai"]
codes = ["php","bash"]
date= 2018-11-27T13:20:09+08:00
+++

## h5ai页眉页脚设置

h5ai作者在主配置文件`_h5ai/private/conf/options.json`提到，

```bash
/*
  Allow customized header and footer files.
  First checks for files "_h5ai.header.html" and "_h5ai.footer.html" in the current directory.
  If not successful it checks all parent directories (starting in the current directory) for
  files "_h5ai.headers.html" and "_h5ai.footers.html".
  Note the different filenames: "header" (only current) - "headers" (current and sub directories)!
  The file's content will be placed inside a &lt;div/&gt; tag above/below the main content.
  If a file's extension is ".md" instead of ".html" its content will be interpreted as markdown.
  */
  "custom": {
  "enabled": true
  },
```

由此可见，想要为h5ai添加页眉和页脚，只需要在对应目录下放置好`_h5ai.header.html`或`_h5ai.footer.html`，同时h5ai自身支持**Markdown**格式页面，同样可以作为页眉页脚插入网页。

需要注意的是，不同文件名称以及不同的存放位置会呈现不同的效果

## **_h5ai.header.html与_h5ai.footer.html**

通过配置文件可知，此种页眉页脚仅在访问此html的存储目录时才会显现

```bash
├── _h5ai
│  ├──  private
│  └──  public
│  └──  .htaccess
├──  my music
│  ├── test.mp3
│  ├── sing.mp3
│  ├── record.mp3
│  └── _h5ai.header.html
├──  my video
│  ├── video.mp4
│  ├── record.mp4
│  └── _h5ai.footer.html
```

如上存储目录所示，仅在访问`my music`文件夹时，加载该目录下的`_h5ai.header.html`

类似地，仅在访问`my video`文件夹时，加载该目录下的`_h5ai.footer.html`

通过配置文件可知，此种页眉页脚在访问此html的存储目录及其子目录时显现

```bash
├── _h5ai
│  ├──  private
│  └──  public
│  └──  .htaccess
├──  my music
│  ├── test.mp3
│  ├── sing.mp3
│  └── record.mp3
├──  my video
│  ├──  new
│  │ ├──  new.mp4
│  ├── video.mp4
│  ├── record.mp4
│  └── _h5ai.footers.html
└── _h5ai.headers.html
```

如上存储目录所示

在访问`my music`  `my video`文件夹时，加载根目录下的`_h5ai.headers.html`，即在两个目录下显示出的页眉与访问根目录的页眉相同

在访问`my videonew`文件夹时，加载`my video`下的`_h5ai.footers.html`，即在 `my videonew`目录下显示出的页眉与访问`my video`目录的页眉相同

## 结束语

相信通过以上的说明，你已经了解了如何个性化配置h5ai的页眉与页脚

小编在这里悄悄地给大家一个福利，一个扁平、边框灰度渐变的页眉设计代码，欢迎大家参考

（Reference：[https://github.com/lrsjng/h5ai/issues/575](https://github.com/lrsjng/h5ai/issues/575)）

```php
<iframe frameborder="0" scrolling="no" style="width: 100%" srcdoc="

<!DOCTYPE html>
<html>
<head>
    <!--Import CSS library .CSS file-->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css'>
</head>

<body>
    <!--Demo Content-->
    <div class='row'>
        <div class='col s12'>
            <div class='card'>
                <div class='card-content'>
                    <div class='card-title' style='text-align: center;'>
                        标题
                    </div>
                    <p>写点东西吧</p>
                </div>
            </div>
        </div>
    </div>

    <!--Import CSS library JavaScript files-->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js'></script>

    <!--Initialise CSS library-->‎
    <script type='text/javascript'>
        M.AutoInit();
    </script>

    <!--Import Iframe resizer library-->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.0/iframeResizer.contentWindow.min.js'></script>

</body>
</html>
">
```
