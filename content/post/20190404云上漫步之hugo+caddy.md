+++
title= "云上漫步之hugo+caddy"
date= 2019-04-04T22:51:34+08:00
toc = true
type = "post"
tags = ["hugo"]
categories = ["技术"]
reward = true
mathjax = false
codes = ["bash"]
slug = "install hugo on ali ECS"
keywords = ["hugo","centOS","阿里云"]
+++
## 准备工作：

- 一个ECS实例；
- 两个密码（远程登录密码、实例密钥）；
- 一个可供SSH的终端（ZOC为例）。

阿里云实例的SSH默认闲置3分钟自动断开，为此你先要修改SSH断开时间。
<!--more-->
### 方法一
```bash
$ vi /etc/ssh/sshd_config
```
修改`ClientAliveCountMax`为想要的值，比如30，单位为分

2、修改完成并保存后，执行命令：#service sshd reload使配置立即生效！

### 方法二
```bash
$ vi /etc/profile
```
增加`TMOUT=1800`，单位为秒，30分钟没操作才自动LOGOUT

## 获得实例的宝塔和SSH控制权

### 登录SSH
SSH登录到实例公用IP，例如

```bash
$sudo -i
$ ssh root@101.35.107.81
iMac:~ root# ssh root@101.*.*.81
Last login: Thu Apr  4 22:29:51 2019 from 39.*.*.182
Welcome to Alibaba Cloud Elastic Compute Service
```
### 登录宝塔
如果你忘了宝塔面板的admin账户密码，在ssh界面用root权限的账户去执行这条命令，`yourpasswd`替换成新密码

```bash
cd /www/server/panel && python tools.py panel yourpasswd
```

如果提示多次登录失败，被暂时禁止登录，用root权限的账户去执行这条命令清除登录限制。

```bash
rm -f /www/server/panel/data/*.login
```

新装面板用户获取默认账号密码命令：`bt default`，6.x及以后版本，用root权限的账户登录终端，输入`bt`命令获得菜单：

{{< img src="https://ian2.oss-cn-hangzhou.aliyuncs.com/clt6/20190404225906.png" >}}

### 登录宝塔
在`软件管理-运行环境`里查看Git、Nginx等安装，没有则手动安装，并在`安全`板块放行`1313`端口。

或者登录SSH终端root根目录后，运行Git、Nginx命令，看是否有help提示，若没有则运行下列安装命令：

```bash
yum install git
yum install nginx
```

## 安装Hugo

CentOS安装hugo参考[fedorainfracloud网站](https://copr.fedorainfracloud.org/coprs/daftaupe/hugo/ )

#### 在实例根目录添加epel repo

```bash
vim /etc/yum.repos.d/hugo.repo
```

内容如下：

```bash
[daftaupe-hugo]
name=Copr repo for hugo owned by daftaupe
baseurl=https://copr-be.cloud.fedoraproject.org/results/daftaupe/hugo/epel-7-$basearch/
type=rpm-md
skip\_if\_unavailable=True
gpgcheck=1
gpgkey=https://copr-be.cloud.fedoraproject.org/results/daftaupe/hugo/pubkey.gpg
repo_gpgcheck=0
enabled=1
enabled_metadata=1
```

`:wq`保存退出，接下来安装hugo目录及文件。

```bash
yum -y install hugo
```

#### 执行hugo version测试

```bash
[root@izbp111**u1z ~]# hugo version
Hugo Static Site Generator v0.54.0 linux/amd64 BuildDate: 2019-02-22T08:11:04Z
```
表示安装成功

这里要说明一下：在CentOS 7中，firewalld防火墙被引入来替代iptables。个人觉得, firewalld更适合于工作站而不是服务器环境，因此需要先关闭firewalld服务。

#### 关闭firewalld

```bash
systemctl stop firewalld
systemctl mask firewalld
```

#### 重新启用firewalld

如果不适应iptables，可以重新启用firewalld

```bash
[root@izbp111**u1z ~]# systemctl stop iptables
[root@izbp111**u1z ~]# systemctl disable iptables
Removed symlink /etc/systemd/system/basic.target.wants/iptables.service.
[root@izbp111**u1z ~]# systemctl unmask firewalld
Removed symlink /etc/systemd/system/firewalld.service.
[root@izbp111**u1z ~]# systemctl enable firewalld
[root@izbp111**u1z ~]# systemctl start firewalld
[root@izbp111**u1z ~]# systemctl status firewalld
```
#### 使用iptables服务

```bash
#开放443、1313端口(HTTPS)
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 1313 -j ACCEPT
#检查内存防火墙设置
iptables --list
#保存上述规则
service iptables save
#如果没有问题，先备份原来的防火墙文件
cp /etc/sysconfig/iptables /etc/sysconfig/iptables.20180724
#保存内存防火墙设置到文件
service iptables save > /etc/sysconfig/iptables
#开启服务
systemctl restart iptables.service
```


进入quickstart目录，修改hugo网站配置

```bash
cd quickstart
vim config.toml
```

修改其中baseUrl：

```bash
baseURL = "http://yourip:1313"
```
保存

查看hugo端口占用情况

```bash
ps -ef | grep hugo
```

杀死被占用端口

```bash
kill -9 {PID}
```

## 安装caddy
到[caddy官网下载界面](https://caddyserver.com/download)定制你的下载项

```bash
CADDY_TELEMETRY=on curl https://getcaddy.com | bash -s personal dns,docker,hook.service,http.cache,http.filebrowser,http.git,http.locale,http.minify,http.proxyprotocol
# 获得 80 / 443 端口访问权限
setcap 'cap_net_bind_service=+ep' /usr/local/bin/caddy
mkdir -p /var/www/{website-name,repo}
```
