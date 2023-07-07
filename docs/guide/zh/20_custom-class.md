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

## 应用举例

用户可根据具体行业中业务的需要，自定义一批类型。比如常用的：园区、建筑、楼层类：

```javascript
// 园区类
class Campus extends THING.Object3D {
    get isCampus() { return true; }
    // 其他具体方法
    // ...
}

// 建筑类
class Building extends THING.Object3D {
    get isBuilding() { return true; }
}

// 楼层类
class Floor extends THING.Object3D {
    get isFloor() { return true; }
}

// 注册类型
THING.Utils.registerClass('Campus', Campus);
THING.Utils.registerClass('Building', Building);
THING.Utils.registerClass('Floor', Floor);
```

再对这些类型的对象，实现一些层级的控制方式（可参考文档的层级控制部分）：

```javascript
// 园区层级控制
class CampusControl extends THING.BaseLevelControl {
    // 写具体的控制方式...
    onEnter(params) {
    }
    onUpdate() {
    }
}

// 建筑层级控制
class BuildingControl extends THING.BaseLevelControl {
}

// 楼层层级控制
class FloorControl extends THING.BaseLevelControl {
}

// 注册层级控制方式
app.level.register(".Campus", new CampusControl());
app.level.register(".Building", new BuildingControl());
app.level.register(".Floor", new FloorControl());
```

这样，即形成了一个简单的行业扩展类库，在项目中可直接引用这个库文件，或作为插件的方式加载。当切换到相应对象的层级后，就可以实现对这些对象的控制方式。

可参考：[simple_campus.js](../../scripts/simple_campus.js "campus")


