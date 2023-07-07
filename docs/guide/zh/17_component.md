# 组件

`ThingJS`引擎的组件`Component`是一种对象功能的扩展方式，所有继承自`BaseObject`类的对象，都可以通过添加组件的方式进行扩展。组件包括 `onStart`、`onUpdate` 等生命周期方法，在组件内可以访问到常用的全局变量，并可以将当前组件的成员导出到对象身上。

## 组件类
开发一个组件，需要继承`Component`类，下面是一个组件类的例子：
```javascript
// 对象组件
class MyRotator extends THING.Component {
    // 创建时回调
    onAwake(param) {
        this.speed = param['speed'];
        // 常用成员：
        // this.app、this.camera、this.object;
    }
    // 启动时回调
    onStart() {
        this.object.style.color = "0xFF0000";
    }
    // 更新回调，如果不需要更新，为了提升性能应该把本方法删掉
    onUpdate(deltaTime) {
        this.object.rotateY(this.speed * deltaTime);
    }
}

// 创建一个物体
let obj = new THING.Entity({
    url: "./models/car.gltf"
});

// 添加组件
obj.addComponent(MyRotator, 'rotator');
obj.rotator.speed = 100;
```

## 生命周期

在组件中，可以实现下列的生命周期方法的回调。

![Component](./images/compnent.png "Component")


其他生命周期方法如：`onLoad` 物体加载资源后的回调，`onAppQuit` 应用退出时候的回调等。

> 注意：如果某生命回调方法里没有代码实现，则尽量不要声明这个方法，否则会造成性能浪费，如下：
```javascript
class MyComp extends THING.Component {
    // 虽然没有代码实现，但onUpdate仍然会在每次更新时被调用，
    // 这造成性能浪费，所以应该删除这些“空”方法
    // onUpdate() {
    // }
}
```
## 添加组件
给对象添加组件`addComponent`的几种重载方法。当指定组件名字时，对象身上即可包含这个名字的组件成员：
```javascript
let rotator = obj.addComponent(MyRotator);

obj.addComponent(MyRotator, 'rotator');
obj.rotator.speed = 100;

obj.addComponent(MyRotator, { speed: 10 });
obj.addComponent(MyRotator, 'rotator', { speed: 10 });

let rotator = new MyRotator();
obj.addComponent(rotator, 'rotator');
```

## 获取组件
通过 对象成员`obj.components` 或 `getComponent`，可以获取对象的组件：
```javascript
rotator = obj.getComponentByName('rotator');
rotator = obj.getComponentByType(MyRotator);

let comp = obj.components['rotator'];
```

## 禁用删除
通过组件的`enable`属性可以禁用或启用组件，当组件被禁用后，会调用组件的`onDisable`，同时`onUpdate` 也不会再被调用，当启用组件后，会调用组件的`onEnable`方法。
```javascript
obj.rotator.enable = false; // 禁用组件，调onDisable
obj.rotator.enable = true;  // 启用组件，调onEnable
```
可以通过 `removeComponent` 删除组件：
```javascript
obj.removeComponent('rotator');
```

## 常用成员
组件中的常用成员，如`this.app`、`this.camera`等，其中 `this.object` 为组件所挂接的物体：
```javascript
class MyComp extends THING.Component {
    onStart() {
      console.log(this.app);
      console.log(this.camera);
      console.log(this.object);
      // ......
    }
}
```

## 导出成员
下面的写法，可以将组件的`speed`属性和`setColor`方法暴露到对象身上使用：
```javascript
class MyComp extends THING.Component {
    // 需要导出的属性
    static exportProperties = [
        'speed'
    ]
    // 需要导出的方法
    static exportFunctions = [
        'setColor'
    ]

    speed = 10;
    setColor(value) {
        this.object.style.color = value;
    }
}

const box = new THING.Box();
box.addComponent(MyComp);

box.speed = 50; // 直接访问成员
box.setColor(THING.Math.randomColor()); // 直接调用方法
```

