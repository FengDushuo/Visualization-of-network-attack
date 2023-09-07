# Visualization-of-network-attack
Visualization of network attack

# Datasets
CIC-IDS-2017

# requirement
python 3.0 or above  
mysql 8.0  


**网络流量数据可视化系统**

**使用手册**

目录

[目录 1](#_Toc1816)

[文 件 修 订 记 录 2](#_Toc24485)

[1. 总体功能描述 3](#_Toc26767)

[2. 运行环境 4](#_Toc25423)

[3. 系统编译环境 5](#系统编译环境)

[4. 系统配置说明 7](#系统配置说明)

[5. 系统运行说明 10](#系统运行说明)

[6. 系统操作说明 11](#系统操作说明)

[6.1. 注册登录操作 11](#注册登录操作)

[6.2. 找回密码操作 13](#找回密码操作)

[6.3. 网络攻击数据显示 16](#网络攻击数据显示)

[6.4. 上传数据操作 18](#上传数据操作)

[6.5. 操作流程示意图 22](#操作流程示意图)

[7. 系统后台监测 23](#系统后台监测)

[8. 部分功能支持说明 24](#部分功能支持说明)

[8.1. 数据可视化 24](#数据可视化)

[8.2. 找回密码 24](#找回密码)

[9. 系统数据库说明 26](#系统数据库说明)

[10. 配置脚本文件 27](#配置脚本文件)

[10.1. 数据库配置文件 27](#数据库配置文件)

[10.2. 邮箱配置文件 28](#邮箱配置文件)

# 文 件 修 订 记 录

| **版本号** | **生成日期** | **作者** | **修订内容** |
|------------|--------------|----------|--------------|
| V1.0       | 04-10        | 冯读硕   | 初始版本     |
|            |              |          |              |
|            |              |          |              |
|            |              |          |              |


# 

# 总体功能描述

系统采用Python 的全栈式Web 框架和异步网络库Tornado进行开发，配合HTML，Javascript，CSS等实现系统的Web框架、HTTP客户端和服务器端。

系统主要实现基于数据可视化技术的网络流量数据分析功能。系统分为服务器后端和用户前端两个部分。服务器后端可以搭建在windows或Linux平台上。用户可以从Web前端注册并登录到该系统中，从而进行数据可视化分析、数据上传分析等操作。

# 运行环境

**硬件要求**

| 类 别    | 基本要求                                                            |
|----------|---------------------------------------------------------------------|
| 服务器端 | CPU 2G 内存2G以上；硬盘剩余空间不低于50G                            |
| 客户端   | 手机或电脑1G内存及以上；硬盘空间10G及以上；需要有摄像头设备的支持。 |

**软件要求：**

| 类别     | 名 称      | 基本环境                            |
|----------|------------|-------------------------------------|
| 服务器端 | 操作系统   | 支持Windows8及以上；Linux5.19及以上 |
|          | 数据库软件 | 支持 MySQL8.0.27                    |
| 客户端   | 操作系统   | Android/Windows8及以上              |
|          | 其它软件   | Chrome浏览器；IE浏览器              |

# 系统编译环境

本系统开发期间编译平台的操作系统为Windows 10 家庭中文版。硬件配置为：

![media/7a2ff3cac07024db6844b2b8d9fe1c54.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/7a2ff3cac07024db6844b2b8d9fe1c54.png)

本系统使用Visual Studio Code进行开发，需要使用相同软件进行开发编译。

编译环境如下所示：

![media/571c8e8698a9cfd7ac3a59671b54fedc.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/571c8e8698a9cfd7ac3a59671b54fedc.png)

本系统使用的编程语言是python，版本是3.6.8。必需的Python程序库包括：tornado，opencv-python，matplotlib，PIL，pymysql，hashlib，csv，numpy等。编译本系统需要对应版本的Python和相应的库函数。

本系统使用的数据库版本为MySQL8.0.27，正常运行本系统需要对应版本的mysql。

本系统前端部分需要浏览器适配，编译开发阶段测试用的浏览器为Google Chrome，版本号为106.0.5249.119。

入口函数：

![media/3a446a71e97467db1b3594f95acad14e.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/3a446a71e97467db1b3594f95acad14e.png)

编译运行成功画面：

![media/25f53d2539bb6656812dd7e164750693.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/25f53d2539bb6656812dd7e164750693.png)

# 系统配置说明

将系统源码放到Windows或Linux服务器平台上。配置好Python环境，安装相应的Python库，打开对应的端口号，配置相应的MySQL数据库，并根据实际情况进行其他配置。

由于Tornado提供了自己的httpserver，因此运行和部署它与其他PythonWeb框架有点不同。不是配置一个wsgi容器来查找应用程序，而是编写一个 main() 启动服务器的函数。

![media/6048af01eeae8f00489523b3d91cc457.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/6048af01eeae8f00489523b3d91cc457.png)

配置操作系统或进程管理器以运行此程序以启动服务器。

由于python 的GIL（全局解释器锁），需要运行多个python进程以充分利用多CPU机器。通常，最好每个CPU运行一个进程。

supervisord是用Python实现的一款很是实用的进程管理工具。使用supervisor守护进程，自动重启网站。

supervisor配置文件中添加：

```
[program:tornado-8000]
command=python /var/www/main.py --port=8000
directory=/var/www
user=www-data
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/tornado.log
loglevel=info

[program:tornado-8001]
command=python /var/www/main.py --port=8001
directory=/var/www
user=www-data
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/tornado.log
loglevel=info 
```


对于更复杂的部署，建议独立启动进程，并让每个进程侦听不同的端口。当每个进程使用不同的端口时，通常需要一个外部负载均衡器（如nginx）向外部访问者提供一个地址。下面给出一个nginx的配置文件，nginx和tornado服务器在同一台机器上运行，四台tornado服务器在端口8000-8003上运行：

```
user nginx;
worker_processes 1;

error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
}

http {
    # Enumerate all the Tornado servers here
    upstream frontends {
        server 127.0.0.1:8000;
        server 127.0.0.1:8001;
        server 127.0.0.1:8002;
        server 127.0.0.1:8003;
    }

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log;

    keepalive_timeout 65;
    proxy_read_timeout 200;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    gzip on;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_types text/plain text/html text/css text/xml
               application/x-javascript application/xml
               application/atom+xml text/javascript;

    # Only retry if there was a communication error, not a timeout
    # on the Tornado server (to avoid propagating "queries of death"
    # to all frontends)
    proxy_next_upstream error;

    server {
        listen 80;

        # Allow file uploads
        client_max_body_size 50M;

        location ^~ /static/ {
            root /var/www;
            if ($query_string) {
                expires max;
            }
        }
        location = /favicon.ico {
            rewrite (.*) /static/favicon.ico;
        }
        location = /robots.txt {
            rewrite (.*) /static/robots.txt;
        }

        location / {
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_pass http://frontends;
        }
    }
} 
```

静态文件已经在程序中指定了路径：

![media/542d9739c43c4b9972194c8fdff7070e.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/542d9739c43c4b9972194c8fdff7070e.png)

# 系统运行说明

在部署好服务器端之后，就可以运行服务器端程序，启动服务器。

服务器端运行成功效果如图所示：

![media/b7a661ae33e06461ba5d82c79e3fffa7.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/b7a661ae33e06461ba5d82c79e3fffa7.png)

此时服务器已经启动，端口号为8000。运行服务器本地登录可以访问http://127.0.0.1:8000，  
内网登录可以访问http://内网IP:8000， 
外网登录可以访问http://外网IP:8000。  

访问登录界面如下所示：

![media/af13e304ac2462336cc4ac794cb2b6b8.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/af13e304ac2462336cc4ac794cb2b6b8.png)

# 系统操作说明

## 注册登录操作

系统服务器端运行成功之后，用户即可正常访问前端页面并执行相应操作。

本系统的功能操作需要在用户登录的情况下进行，因此用户可以选择注册账号或是使用已有账号进行登录。注册登录部分的操作说明详见下文。

注：用户可以选择使用PC或是移动端设备登录系统进行相关操作，访问时注意保持联网，以保证功能正常运行。

首先对于首次使用的用户，注册账号需要在首页点击注册按钮：

![media/9f4e78faeba15a272cff0c1843a770f8.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/9f4e78faeba15a272cff0c1843a770f8.png)

即可进入注册页面，需要用户提供用户名，邮箱，密码和密码确认等信息：

![media/3ca50d9e3011d39fc36d1eaedc09d261.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/3ca50d9e3011d39fc36d1eaedc09d261.png)

输入对应信息后，即可点击注册按钮，完成注册。

![media/0a4bdc684756b60fd45cd67bbee84fca.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/0a4bdc684756b60fd45cd67bbee84fca.png)

若注册不成功，会有对应的提示，此时根据提示进行相关修改即可。

![media/415b50c91a4f59f8841be8186111a345.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/415b50c91a4f59f8841be8186111a345.png)

![media/a2c2d2af7096e8375cc79fd3125717aa.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/a2c2d2af7096e8375cc79fd3125717aa.png)

注册成功的返回信息：

![media/98a2c47348f78081f54b686a44f34f05.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/98a2c47348f78081f54b686a44f34f05.png)

此时用户已经注册成功，即可返回登录（对于已经有帐号的用户，可直接执行这一步）。

![media/e2f21a09fc9c9a180ff34fda58a4b690.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/e2f21a09fc9c9a180ff34fda58a4b690.png)

## 找回密码操作

对于忘记账号密码的用户，系统提供找回密码功能，如下点击忘记密码按钮。

![media/ffcff3fe712910d937483d57eb7ef6d0.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/ffcff3fe712910d937483d57eb7ef6d0.png)

此时进入找回密码页面，根据要求输入用户名和邮箱，并点击确定按钮发送找回密码邮件。

![media/b353f4e285b6d03ade4eb28ed703fc21.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/b353f4e285b6d03ade4eb28ed703fc21.png)

邮件发送过程中出现如下提示，可稍等几秒钟。

![media/b3b2ac86310622d34ffce483fd8a7725.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/b3b2ac86310622d34ffce483fd8a7725.png)

邮件发送成功状态提示信息如图：

![media/fc48431741a900d09634aad39a188362.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/fc48431741a900d09634aad39a188362.png)

此时检查邮箱中是否收到密码重置的邮件。

![media/93b6ff39425eb8edcd3e4c608d236b80.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/93b6ff39425eb8edcd3e4c608d236b80.png)

点击密码重置链接，进入密码重置页面：

![media/d0bfa99bd0c09faca564682927b09dab.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/d0bfa99bd0c09faca564682927b09dab.png)

输入对应的用户名，邮箱和密码，进行密码重置：

![media/ddc1c6b685869a002bb2b3d0ed4229f0.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/ddc1c6b685869a002bb2b3d0ed4229f0.png)

若遇到错误提示，请按照提示修改对应信息。

![media/0c9e3f3692b59e47585487b751751aaf.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/0c9e3f3692b59e47585487b751751aaf.png)

密码重置成功。

![media/e9c297f8153aa6b659f4860269c36334.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/e9c297f8153aa6b659f4860269c36334.png)

使用重置的新密码进行登录，成功登录。

![media/daa8024d3845a29aecc79f8a2b51144d.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/daa8024d3845a29aecc79f8a2b51144d.png)

登录之后进入主页面，如下所示：

![media/944f4fdf6a92a7e747d5e0689af9a529.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/944f4fdf6a92a7e747d5e0689af9a529.png)

## 网络攻击数据显示

用户可根据需求查看网络流量数据，数据来源于CIC-IDS-2017数据集，针对这一经典网络攻击数据集进行数据可视化分析操作。

![media/1ab470f61520a5bc5109face22b35aa6.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/1ab470f61520a5bc5109face22b35aa6.png)

进入网络攻击数据显示模块。

![media/f4097de36dc79733007657d0b676d558.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/f4097de36dc79733007657d0b676d558.png)

根据需要执行不同数据的可视化操作。

（1）攻击类型统计（饼状图和柱状图）

![media/8c07ddc4a6f9d8f39b5146d540956264.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/8c07ddc4a6f9d8f39b5146d540956264.png)

1.  攻击源IP和目的IP（力导向图）

![media/2d69d274e8328fde49910cac7e23e882.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/2d69d274e8328fde49910cac7e23e882.png)

1.  时间戳对其他，根据数据集中的特征标签来命名坐标轴（折线图）

![media/fd6c374eb3d045050e6f731607f16650.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/fd6c374eb3d045050e6f731607f16650.png)

1.  其他对其他，根据数据集中的特征标签来命名坐标轴（折线图）

![media/205b8f2badf0251cf21e500bbfdbb7b0.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/205b8f2badf0251cf21e500bbfdbb7b0.png)

## 上传数据操作

针对用户上传的网络流量数据进行可视化分析。

![media/3a6415cd691293b5124bb81832fc3c19.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/3a6415cd691293b5124bb81832fc3c19.png)

上传数据页面如下所示：

![media/ba5d735e0fcd77314de8eb2c6ef0448f.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/ba5d735e0fcd77314de8eb2c6ef0448f.png)

点击“Choose File”按钮选择文件上传：

![media/12dbaf560a5590b66ca6dcf3f6f1e442.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/12dbaf560a5590b66ca6dcf3f6f1e442.png)

![media/3646e3fb1a74e91083c8a42ad1a4353e.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/3646e3fb1a74e91083c8a42ad1a4353e.png)

等待上传。

![media/dc348b949abcdecbaa3dcaaad5e76101.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/dc348b949abcdecbaa3dcaaad5e76101.png)

上传成功。

![media/d562ccd5549e366a055905a8becb07ca.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/d562ccd5549e366a055905a8becb07ca.png)

点击“查看图表”按钮查看图表。

![media/2b1b9e1f5c0140f9ba511409bca31979.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/2b1b9e1f5c0140f9ba511409bca31979.png)

选择对应标签进行可视化。

![media/d27406cc9ae71e431cc8acb82fdecd0a.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/d27406cc9ae71e431cc8acb82fdecd0a.png)

选择单列标签进行可视化，点击确定。

![media/7dca74e5a4117d4a7fda048e63ce06c3.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/7dca74e5a4117d4a7fda048e63ce06c3.png)

获取单列标签对应的可视化图表。

![media/077cd5ca2f7e3aa74bffd99bd6c426f0.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/077cd5ca2f7e3aa74bffd99bd6c426f0.png)

选择双列标签进行可视化，点击确定。

![media/0f9353a56e5d219f5eb3c6dc36e08453.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/0f9353a56e5d219f5eb3c6dc36e08453.png)

获取双列标签对应的可视化图表。

![media/4aae325d20fe16613e82fe92653c3fce.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/4aae325d20fe16613e82fe92653c3fce.png)

## 操作流程示意图![media/4cced74dee31116e0011e8c793649a4c.emf](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/4cced74dee31116e0011e8c793649a4c.emf)

# 系统后台监测

系统后台运行成功提示：

![media/5fbdc925860ac394b0446e52cbc039b8.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/5fbdc925860ac394b0446e52cbc039b8.png)

进入登录界面：

![media/f843b33e607bb7a463321c651d6d6390.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/f843b33e607bb7a463321c651d6d6390.png)

登录：

![media/e155d8cee77570f61ac341cd86914a08.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/e155d8cee77570f61ac341cd86914a08.png)

进行数据可视化查看：

![media/94396830e0f211c4d32bb73ac4969a17.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/94396830e0f211c4d32bb73ac4969a17.png)

上传文件进行数据可视化操作：

![media/60b8feafd2376ae38ffce584206c0d77.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/60b8feafd2376ae38ffce584206c0d77.png)

# 部分功能支持说明

## 数据可视化

在实现PC端数据可视化功能时使用的可视化基础是D3.js，服务器端选用Python的Tornado框架，数据库选用MySQL8.0。

（1）D3.js

D3.js是一个可以通过数据来操作文档的JavaScript库。D3.js可以通过使用HTML、SVG和CSS实现数据可视化。D3.js严格遵循Web标准，使其能够方便地与现代主流浏览器兼容，避免对某些框架的依赖。项目中需要一些特殊的图表，如IP、数据库拓扑等，它可以帮助快速实现这些图表效果。D3.js测试了当下主流的各个浏览器，其大部分组件可以在旧的浏览器运行。

（2）Tornado

Tornado是非阻塞式的轻量级的Web服务器，使用Python编写。其非阻塞的方式和对epoll的运用使其速度比较快。Tornado可以解决高并发，每秒可以处理数以千计的连接，超过了很多主流的Web框架，因此Tornado对于实时Web服务来说是一个较为理想的Web框架。

## 找回密码

本系统中找回密码功能主要使用邮件验证的方式。用户向服务器提交重置密码的请求，服务器会向用户的邮箱发送重置密码邮件，用户点击重置链接即可重置账号密码。重置密码的邮箱配置需要对应修改为管理员的配置。

![media/83b21adc8dbfb30ecbc94cd75a5bb86d.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/83b21adc8dbfb30ecbc94cd75a5bb86d.png)

重置密码邮箱配置的对应函数：

![media/a34d6396dc04fd2f5f0f8caa8ce6e8b6.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/a34d6396dc04fd2f5f0f8caa8ce6e8b6.png)

# 系统数据库说明

数据库使用的是mysql8.0.27，如下：

![media/aae179c836aaf213a4dd33065d8cd0b1.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/aae179c836aaf213a4dd33065d8cd0b1.png)

创建一个数据库login_db 对应于注册登录的用户login_db数据库：

![media/19cd65796da40b43a2773b0f96c3e3ee.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/19cd65796da40b43a2773b0f96c3e3ee.png)

users数据表中字段详情：

![media/c135bc81164117a3935ed676ee0e570a.png](https://github.com/FengDushuo/Visualization-of-network-attack/tree/master/media/c135bc81164117a3935ed676ee0e570a.png)

# 配置脚本文件

## 数据库配置文件
```
import pymysql
mysqluser="root"
mysqlpassword="19971130"
logindatabase="login_db"
imagedatabase="faceimage"
hostsrc="localhost"
conn = pymysql.connect(host=hostsrc,port=3306,user=mysqluser,password="19971130",charset='utf8')
cursor = conn.cursor()
createloginsql="CREATE DATABASE IF NOT EXISTS "+logindatabase
createfaceimgsql="CREATE DATABASE IF NOT EXISTS "+imagedatabase
cursor.execute(createfaceimgsql)
cursor.execute(createloginsql)
logconnect = pymysql.connect(    #连接数据库服务器
    user=mysqluser,              #本地mysql用户名
    password="19971130",          #本地MySQL密码
    host=hostsrc,
    port=3306,
    db=logindatabase,
    charset="utf8"
)
imagconnect = pymysql.connect(    #连接数据库服务器
    user=mysqluser,
    password="19971130",
    host=hostsrc,
    port=3306,
    db=imagedatabase,
    charset="utf8"
)
loginconnect = imagconnect               #连接数据库服务器        
loginconn = loginconnect.cursor()        #创建操作游标
loginconn.execute("create table IF NOT EXISTS students(id int(11),stuname varchar(20),stuid varchar(20)PRIMARY KEY,imagedata MEDIUMBLOB)")
loginconnect = logconnect                #连接数据库服务器   
loginconn = loginconnect.cursor()        #创建操作游标
loginconn.execute("CREATE TABLE IF NOT EXISTS users (id int(11) PRIMARY KEY ,username VARCHAR(20),password VARCHAR(40),email VARCHAR(40))")
```

## 邮箱配置文件
```
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from email.header import Header
my_sendername = ""       # 发件人账号名 例如“fengdushuo”
my_sender=""    # 发件人邮箱账号 例如“1224556@163.com”
my_pass = ""            # 发件人邮箱密码 例如“123456”
mail_host = ""         # SMTP服务器 例如“stmp.163.com”
def send_email(message,subject,to_address):
    ret=True
    try:
        msg=MIMEText(message,'html','utf-8')
        msg['From']=formataddr([my_sendername,my_sender])   # 括号里的对应发件人邮箱昵称、发件人邮箱账号
        msg['To']=formataddr(to_address)                   # 括号里的对应收件人邮箱昵称、收件人邮箱账号
        msg['Subject']= Header(subject, 'utf-8').encode()  # 邮件的主题
 
        server=smtplib.SMTP_SSL("smtp.163.com", 465)        # 发件人邮箱中的SMTP服务器，端口是25
        server.login(my_sender, my_pass)                   # 括号中对应的是发件人邮箱账号、邮箱密码
        server.sendmail(my_sender,[to_address[1],"***"],msg.as_string())       # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
        server.quit()  # 关闭连接
    except smtplib.SMTPException as e: 
        print(e)
        ret=False
    return ret
# 测试sendemail 
# token="khsadlkhdkajdhkajsdbanmdbadabhdjasdhsmnj"
# message ="""<h1>找回密码</h1>点击下面的链接重置密码<a href="http://127.0.0.1:8000/modify?token="""+token+"""">http://127.0.0.1:8000/modify?token="""+token
# ret=send_email(message,"修改密码",["fengdushuo","1369162653@qq.com"])
# if ret:
#     print("邮件发送成功")
# else:
#     print("邮件发送失败")
```
