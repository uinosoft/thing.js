# 专业版

除了免费使用的基础版`basic`，`ThingJS`还提供专业版`pro`，`ThingJS`专业版和基础版的区别主要在：
* `ThingJS`专业版可以使用`UINO`网站提供的资源；
* `ThingJS`专业版可使用一些扩展功能，如：园区场景的对象和层级功能、地球城市功能、仿真效果等等扩展库；


## 安装
如果想使用`ThingJS`专业版，需要在`CLI`创建工程时，增加`--pro`参数

```bash
> thing create project-name --pro
```

## 登录
在使用`ThingJS`专业版时，首先需要登录，登录的`url`是一个授权过的服务器，登陆代码如下：
```javascript
// 下面地址是UINO内部测试服务器的登录地址
await THING.Utils.login('http://10.100.32.55:18081/auth/login');
```

授权服务器，是`UINO`统一的授权服务，可以通过：
* 下载服务器的安装包，解压运行，进行授权；
* 使用授权服务的`docker`镜像，启动镜像，进行授权；

具体方法，请参考授权服务器使用文档。

