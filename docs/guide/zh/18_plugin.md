# 插件

`ThingJS`引擎的插件`Plugin`是一种对系统功能的扩展方式。用户可以在插件中写自定义代码、使用组件、引用模型/图片等资源内容，实现对一个独立功能的封装和复用。比如：给 `ThingJS` 增加物理系统、寻路系统等。每个插件在`app`中一般只注册一个。

## 插件类
开发一个插件，需要继承`BasePlugin`类，下面是一个插件类的例子：
```javascript
// 插件
class MyPlugin extends THING.BasePlugin {
    constructor(params) {
      super()
      this.box = null;        
      // 常用成员：this.app、this.camera;
    }
    // 插件方法
    sayHello() {
      console.log("hello MyPlugin!");
    }    
    // 插件安装完成
    onInstall(options) {
        // 创建一个Box
        this.box = new THING.Box();

        // 注册需要的组件等
        this.box.addComponent(MyComponent, options);        
    }
    // 插件卸载完成
    onUninstall() {
      this.box.removeComponent(MyComponent);
      this.box.destroy();  
      this.box = null;    
    }

    // 系统初始化之前
    onBeforeInit() {
    }
    // 系统初始化完成
    onInited() {
    }
    // 场景加载之前
    onBeforeLoad() {
    }
    // 场景加载完成
    onLoaded() {
    }
    // 更新事件
    onUpdate() {
    }
}
```

可以通过`app.install()`来直接安装插件：
```javascript
// 安装插件
app.install(new MyPlugin({ speed: 10 }), "myPlugin");
// 已经安装的插件
const plugin = app.plugins['myPlugin'];
// 卸载插件
app.uninstall("myPlugin");
```
> 注意：但是更常见的加载插件的方式，是直接通过`app.loadPlugin()`加载插件文件，详见下面的文档。

## 插件CLI
可通过CLI创建一个插件工程：
```bash
> thing create my-plugin
```
然后选择 `Resource` 类型下的 `Plugin` 选项创建插件模版。

切换目录并安装依赖后即可进入开发调试：
```bash
> cd my-plugin
> npm run dev
```
在`src`目录下编写插件代码，开发调试过程中会自动将`src`目录的代码编译打包到`dist`目录下，`dist`目录中的插件即可通过`ThingJS`正常加载。
> 注：`src`下可以创建多个插件目录，对应`dist`目录也会编译成多份插件资源。


## 加载插件
引擎通过`app.loadPlugin()`方法来加载插件：
```javascript
let url = "./plugins/plug01/index.js";
let params = {};

// await 的方式，等待加载完成
let plugin = await app.loadPlugin(url, params);
plugin.sayHello();
```

## 导出成员
为了导出插件中的属性或方法，参考`jsdoc`中`@`关键字的写法，通过脚手架打包编译，导出插件属性。

* `@typedef {object} widget`，`typedef`代表自定义类型，`widget`是固定写法
* `@property {type} [xx=xx]`，可参考`@thing.js/property-panel`控件的配置项说明
* 方法只需写`@public`即可
* `jsdoc`中的类型也是可以复用，比如`@description、@type、@alias`等
  
举例：
```javascript
class Navigation extends THING.BasePlugin {
  
  constructor() {
    super()
        
    /**
     * @type {number}
     * @typedef {object} widget
     * @property {string} [name=速度]
     * @property {string} [type=slider]
     * @property {number} [min=0]
     * @property {number} [max=25]
     * @property {number} [step=1]
     */
    this.speed = 0.1

    // 是否循环
    this.loop = true

    // 路径
    this.path = []
  }
  
  /**
   * 移动
   * @public
   * @description 移动的描述
  */
  move() {
    this.box.movePath(this.path, {
      time: this.speed > 0.1 ? 1000 : 2000,
      times: this.loop ? Infinity : 1,
    })
  }
  
  onInstall(options) {
    this.box = new THING.Box();
    this.speed = props.speed || this.speed;
  }
}
```
这样的话，属性speed和方法move就被暴露出去，暴露出去的数据可以通过插件的实例上的`plugin.props`获取到。

## 导出类
很多时候我们的业务需要自定义一些类（例如机柜类、车类、人类等），然后将这些类交给各个应用自己去创建实例。

例如，一个自定义机柜类：
```javascript
// scripts/Cabinet.js
export default class Cabinet extends THING.Object3D {
  constructor() {
    super();
  }
  createRacks() {
    // ...
  }
  destroyRacks() {
    // ...
  }
}
```

在插件中导入自定义类：
```javascript
import Cabinet from 'scripts/Cabinet.js';
import Car from 'scripts/Car.js';
import Person from 'scripts/Person.js';

class MyPlugin extends Thing.BasePlugin {
  ...
}

// 导出自定义类
export { Cabinet, Car, Person }
```

加载插件后，使用插件中的类型：
```javascript
let plugin = await app.loadPlugin(url, params);
let cabinet = new plugin.exports.Cabinet();
cabinet.createRacks();
```

