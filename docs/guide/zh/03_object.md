# 对象基础

在`ThingJS`中，对象`Object`是引擎提供的基本控制单元。对象具有唯一的标识，能被单独创建、销毁、查询，具有属性、方法、事件，能与其他对象建立关系。

对象的基类是`BaseObject`，可以通过 **继承** 或 **组合** 的方式对其进行扩展，如：
* 三维对象类`Object3D`提供了空间变换和渲染功能；
* 物体类`Entity`是最常用的类型，提供了模型或预制件的功能；
* 三维空间类`Space3D`提供了空间计算功能；

你可以继承这些类型，来进行扩展。你也可以通过`Component`，给对象增加组件，进行扩展。

在`ThingJS`中，**孪生体** 的是基于对象实现的（`BaseObject`子类）。当一个对象的`id`属性被设置具体值，并且和真实世界中的对象`id`有对应关系，则成可以认为这个对象是一个孪生体。

## 对象属性
对象的基础属性，名称`name`、编号`id`和唯一标识`uuid`。可以通过`app.query`来查询这些属性，其中`name`和`id`属性在场景中可以重复。`uuid`为不可重复属性，可以作为持久化的唯一标识：
```javascript
// 名称
obj.name = "car01";
// 编号
obj.id = "001";
// 唯一标识
console.log(obj.uuid); // "5811f0ecf97811ed9a4fc0b5d78a0456";
```

对象类型存储在`type`属性中，内部类型如`Entity`、`Object3D`，或扩展类型如`Building`、`Room`，或自定义类型`Cabinet`等。
```javascript
let type = obj.type;
console.log( type );
```

对象标签`tags`，可以存储多个字符串作为对象的标签，可以根据标签来查询：
```javascript
obj.tags = ["Vehicle", "Truck"];
```

对象的用户数据，可以通过`userData`存储自定义数据：
```javascript
obj.userData = {
    "品牌": "UINO",
    "编号": "M001",
    "重量": 100,
}

let dat = obj.userData["品牌"];
```

## 创建物体

对象的基类`BaseObject`类型不能直接创建，一般使用其子类，如：Entity。

物体或叫实体`Entity`，是一个具有可见外观的三维对象，比如：设备、车辆等。在创建`Entity`时，构造方法中可以直接传入一个`url`来进行初始化，`url`可以是一个`gltf`的模型文件，或一个预制件文件的路径。参数中可以设置位置、旋转等空间参数，    还可以通过`onComplete`回调来等待加载完成：

```javascript
// 资源url，可以是一个gltf文件，或一个资源包的路径
const url = "./models/car.gltf";

// 创建物体，根据给定URL的资源物体，路径为模型或预制件
let obj = new THING.Entity({
    url,
    position: [2, 0, 0],
    rotation: [0, 45, 0],
    onComplete: function() {
        // 加载资源完成的回调
        console.log("object created");
    }
});
```

或者通过`obj.waitForComplete`方法等待`Entity`加载完成：
```javascript
// 创建物体，await等待完成
let obj = new THING.Entity({url});
await obj.waitForComplete();
console.log(obj.name);

// 或者使用then
obj.waitForComplete().then(function() {
    console.log(obj.name);
});
```

## 创建空间

**三维空间** `Space3D`是具有一定体积的三维对象，可进行空间计算，不具有可见外观，但可渲染其边界。其他对象可以包含空间对象，空间对象也包含其他对象，比如建筑内可以包含一个空间对象作为某种特殊用途的区域。

```javascript
// 创建立方体空间
let space = new THING.Space3D({
    position: [0, 0, 0],
    size: [10, 20, 30]
});
```

多个空间对象组合成一个空间对象
```javascript
space.add(space01);
space.add(space02);
space.add(space03);
space.children; // 子空间就在children中
```

空间计算：包含、相交、相离
```javascript
// 包含计算，返回bool，默认传递孩子
space.contains(obj, cascade = true);

// 相交计算，返回bool
space.intersects(obj, cascade = true);

// 相离计算，返回bool
space.disjoint(obj, cascade = true);
```

空间可视化，将空间渲染出来
```javascript
space.showBounding(true);
```

## 父子对象
对象可能具有父对象`obj.parent`或子对象`obj.children`，他们一般是由加载场景时自动创建的，也可以在运行时改变。

访问父对象、子对象属性：
```javascript
// 子对象
obj.children

// 父对象
obj.parent

// 父对象数组（包括父亲和父亲的父亲）
obj.parents

// 兄弟对象数组（有共同父亲的对象）
obj.brothers
```

可以使用`add`、`remove`接口来添加或移除父子关系
```javascript
obj.add(childObj);
obj.remove(childObj);
```

可以通过`traverse`来遍历所有子对象：
```javascript
obj.traverse((child) => {
    console.log(child);
})
```

父对象和子对象`parents`和`children`等都是选择集类型，当需要寻找单个对象时，可以使用`find`接口进行搜索，找到立即返回，比`query`接口更高效：
```javascript
obj.children.find('#001');
obj.parents.find('.Floor');
```

## 克隆和销毁

可通过`clone`方法，来复制一个对象，复制过程会连同对象本身的组件、属性、子对象等一起复制：
```javascript
// 克隆 对象
let cloneObj = obj.clone();
```

可以直接调用对象的销毁，或通过`App`查询对象并进行销毁。销毁一个对象，会包括他身上的组件、子对象等一起销毁。同时，对象所使用的相关资源，也会通过引用计数的方式被销毁（没有用到的资源会被自动销毁）。

```javascript
// 销毁
obj.destroy();
obj = null;

// 先查询到对象，再销毁
app.query('car01').destroy();
```

## 更多功能

对象还有具有如：查询`query`，组件`components`，效果`style`，空间变换`position`，关系`relationships`，事件`events`等更多功能，请参考对象相关文档。

