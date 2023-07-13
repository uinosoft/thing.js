# 园区

园区是由一栋或多栋建筑和周边环境组成的区域，建筑中包含多个多个楼层，多个房间。

## 对象类型
为了达到操作园区、建筑等对象功能和使用层级的目的，用户可根据业务需要，自定义一些类型，比如的：园区、建筑、楼层类：

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

注册这些对象类型后，当读取园区的场景文件或`gltf`文件时，`ThingJS`会根据数据中的对象类型，自动对注册过的类型进行初始化，创建出`Campus`、`Building`、`Floor`等类型。

## 层级控制
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

这样，即形成了一个简单的园区扩展类库，当切换到相应的对象层级后，就可以实现对这些对象的控制方式，在项目中可直接引用这个库文件。

上述的代码示例，可参考：[sample_campus.js](./scripts/sample_campus.js "campus")

## 扩展库

`ThingJS`专业版可以使用`UINO`提供的园区对象和层级功能扩展库，下载地址：[thing.campus.min.js](https://cdn.uino.cn/thingjs-cli/thing.campus.min.js "campus")

@xuheng 补充……


