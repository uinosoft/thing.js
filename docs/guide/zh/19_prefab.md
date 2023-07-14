# 预制件

预制件`Prefab`是一个预先制定好的资源，是具有一定属性、行为、效果的对象模板，目的是用于生成对象（实例化对象），下面是预制件的使用方式：

```javascript
const url = "./models/car.json";

// 创建预制件实例
const obj = new THING.Entity({url});
await obj.waitForComplete();

// 调用预制件提供的方法
obj.doSomeMethod();
```

可通过CLI创建一个预制件包：
```bash
> thing create my-prefab
```
然后选择 `Resource` 类型下的 `Prefab` 选项创建预制件模版。

切换目录并安装依赖后即可进入开发调试
```bash
> cd my-prefab
> npm run dev
```
在`src`目录下编写预制件代码，开发调试过程中会自动将`src`目录的代码编译打包到`dist`目录下，`dist`目录中的预制件即可通过`ThingJS`正常加载。

> 注意：`src`下可以创建多个预制件目录，对应`dist`目录也会编译成多份预制件资源。

编写时，可以通过默认提供的`index.html`页面来进行测试，导出按钮可以保存当前预制件。


