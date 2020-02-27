+++
title= "h5ai使用nginx加密目录配置"
categories = ["技术"]
tags = ["h5ai","nginx"]
codes = ["php","nginx"]
date= 2018-11-27T14:17:41+08:00
+++
## 全局加密

代码如下:

```php

<?php
$lifeTime = 60; //设置密码过期时间
session_set_cookie_params($lifeTime);
session_start();
if(isset($_POST['password']) && $_POST['password'] == 'siji'){
    $_SESSION['ok'] = 1;
    header('location:?');
}
if(!isset($_SESSION['ok'])){
    exit('
       <html>
       <head>
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="stylesheet" href="/_h5ai/public/css/styles.css">
       </head>
       <body class="info" id="root">
       <div style="height:100px; line-height:100px;" align="center" valign="center">
       </div>
       <div id="login-wrapper" style="height:100px; line-height:40px;" align="center" valign="center">
       <img src="https://oclog.pw/doc/zq.jpg"/ width="280px" height="280px">
       <h2 id="header"class="h1" >
          输入密码
       </h2>
       <form method="post" class="form" >
            <input id="pass" name="password"/>
            <input type="submit" id="login" value ="确认" style="border:none;background:#42a5f5"/>
        </form>
        </div>
        </body>
       </html>
    ');
}
?>
```

不能加密单个目录，只是在index.php做判断，然后显示输入密码 (目录在 _h5ai/public/index.php)，结果如下：

{{<img src="http://ian2.oss-cn-hangzhou.aliyuncs.com/2018-11-27-061814.jpg" alt="">}}

## function加密

进入`h5ai`目录找到`_h5ai/public/index.php`并编辑

1、在头部`<?php`的下一行，增加

```php
auth();
```

2、在底部增加

```php
function auth ()
{
        $valid_passwords = array ("账号" => "密码");
        $valid_users = array_keys($valid_passwords);

        $user = $_SERVER['PHP_AUTH_USER'];
        $pass = $_SERVER['PHP_AUTH_PW'];

        $validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);

        if (!$validated) {
          header('WWW-Authenticate: Basic realm="My Realm"');
          header('HTTP/1.0 401 Unauthorized');
          die ("Not authorized");
        }
}
```

**注：**账号和密码可以随便填。

## nginx认证

参考网址 [nginx 官方加密教程](https://link.jianshu.com?t=https%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_auth_basic_module.html)

在网站对应的conf中配置如下 （/www/server/panel/vhost/nginx）

```nginx
#禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.project|LICENSE|README.md)
    {
        return 404;
    }

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        access_log off;
    }

    location ~ .*\.(js|css)?$
    {
        expires      12h;
        access_log off;
    }
---------------------------------------------------------------------------------
    location ~ /secret_h {
    auth_basic           "root";
    auth_basic_user_file /www/wwwroot/htpasswd;
    }
------------------------------------------------------------------------------
```

*   增加的部分是虚线部分， ~ 表示匹配开头，递归全部目录 （不懂得参考！[nginx 中location的用法](https://link.jianshu.com?t=http%3A%2F%2Fseanlook.com%2F2015%2F05%2F17%2Fnginx-location-rewrite%2F)）
*   htpasswd 采用 crypt加密，参考 [crypt在线](https://link.jianshu.com?t=http%3A%2F%2Ftool.oschina.net%2Fhtpasswd)

结果如下：
{{<img src="http://ian2.oss-cn-hangzhou.aliyuncs.com/2018-11-27-062001.jpg" alt="">}}
