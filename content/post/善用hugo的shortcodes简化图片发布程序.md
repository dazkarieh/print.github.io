+++
title= "善用hugo的shortcodes简化图片发布程序"
date= 2019-02-25T22:04:40+08:00
mathjax = false
tags = ["shortcodes","hugo"]
codes = ["markdown","bash"]
draft = true
slug = " handle everything about figure with hugo shortcodes"
categories = ["前端"]
+++

## 图片

Images may be added to a page by either placing them in your `static/img/` media library or in your [page’s folder](https://gohugo.io/content-management/page-bundles/), and then referencing them using one of the following notations:

A figure from your `static/img/` media library:

```
{{< figure library="1" src="image.jpg" title="A caption" >}}

```

A figure within a [page’s folder](https://gohugo.io/content-management/page-bundles/) (e.g. `content/post/hello/`) :

```
{{< figure src="image.jpg" title="A caption" >}}

```

A numbered figure with caption:

```
{{< figure src="image.jpg" title="A caption" numbered="true" >}}

```

A general image:

```
{{<img src="/img/image.jpg" alt="alternative text for search engines">}}

```

## Image gallery[](#image-gallery)

**To add an image gallery to a page bundle:**

1.  Create a gallery album folder within your [page bundle](https://gohugo.io/content-management/page-bundles/) (i.e. within your page’s own folder)
2.  Add images to your new album folder
3.  Paste `{{< gallery album="<ALBUM FOLDER>" >}}` where you would like the gallery to appear in the page content, changing the album parameter to match the name of your album folder

Optionally, to add captions for your images, add the following instances to the end of your page’s front matter:

```toml
[[gallery_item]]
album = "<ALBUM FOLDER>"
image = "<IMAGE NAME>.jpg"
caption = "Write your image caption here"

```

**Alternatively, create an image gallery with images from the internet or your `static/img/` media library:**

1.  Add gallery images to within your `static/img/` media library folder
2.  Reference your images at the end of the front matter of a content file in the form:

    ```toml
    [[gallery_item]]
    album = "1"
    image = "my_image.jpg"
    caption = "Write your image caption here"

    [[gallery_item]]
    album = "1"
    image = "https://raw.githubusercontent.com/gcushen/hugo-academic/master/images/theme-dark.png"
    caption = "Dark theme"

    ```

3.  Display the gallery somewhere within your page content by using `{{< gallery album="1" >}}`
