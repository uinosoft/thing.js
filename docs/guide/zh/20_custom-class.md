# 自定义类

你可以通过继承`ThingJS`提供的很多类型，如：`Entity`、`Object3D`、`Component`等等，来实现自己的扩展。

## 定义类型
```javascript
// 自定义类型
class MyCar extends Entity {
    constructor(param) {
        this.speed = param;
        console.log("MyCar create!");
    }
}
```
定义后，可以直接使用：
```javascript
let car = new MyCar(100);
```

如果在 **场景文件** 中包含了自定义类型`MyCar`，则需要你在场景加载前，对这个类进行注册，这样在读取场景文件时，会自动进行实例化：
```javascript
// 注册自定义类型
THING.Utils.registerClass("MyCar", MyCar);

// 加载场景时，场景文件中的MyCar类型会被自动实例化
app.load(url);
```

注册类型后，也可以通过`app.create`方法创建类型：
```javascript
let line = app.create({
    type: "MyCar", 
    position: [0,0,0],
    style: {
        opacity: 0.5,
        color: "0xFF0000"
    }
})
```

