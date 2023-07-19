# 查询

`ThingJS`引擎通过`query`接口，来提供对象的查询功能，可以通过`app.query()`进行全局对象查询，也可以通过`obj.query()`来对这个对象的孩子范围内，进行局部查询：

## 全局查询

全局查询是对场景中所有对象的范围内进行查询，`app.query`接口提供了多种接口查询对象的方式：
```javascript
// 按名字查，查询名字为 car01 的对象
app.queryByName('car01');

// 按id查，查询id为 100 的对象
app.queryById('100'); 

// 按类型查，查询类型为 Building 的对象
app.queryByType('Building');

// 按标签查，查询带有 Building 或 BuildingElement 标签的对象
app.queryByTags('Building | BuildingElement');

// 按标自定义属性查，userData中， 包含 '物体类型' 名称的对象
app.queryByUserData('物体类型');

// 按标自定义属性查，userData中， 包含 '物体类型' 名称，并且属性值为 '叉车' 的对象
app.queryByUserData('物体类型=叉车');

// 按照正则表达式查
const exp = new RegExp("car");
app.queryByRegExp(exp);
```

有些情况下，查询条件可能是由单个字符串组成的参数，所以`query`还提供了使用单个字符串做查询条件的方式：
```javascript
app.query('car01'); // 按名称
app.query('#100'); // 按id
app.query('tags:or(Building | BuildingElement)'); // 按tags
app.query('.Building'); // 按类型查
app.query('[levelNumber]'); // 按属性查
app.query('[userData/物体类型=叉车]'); // 按用户自定义属性查

// 查询所有
app.query('*');
```

`query`接口返回值可以再次调用`query`，进行多条件查询：
```javascript
app.query('.Entity').query('[userData/品牌=IBM]');
```

## 局部查询

局部查询是指在某个对象孩子范围内的查询，通过`obj.query`接口实现，接口的方式类似`app.query`，下面举一些例子，其中假设`building`是一个建筑对象：
```javascript
// 子对象查询，查询自定义属性中包含 '物体类型' 的子对象
obj.query('[userData/物体类型]');

// 选取建筑内的所有房间
building.query('.Room');

// 选取建筑内的所有物体
building.query('*');

// 选择建筑中大于2层的楼层
building.query('[levelNumber>2]');

// 选取建筑一层中的所有品牌为ABC的物体
building.floors[0].query('[userData/品牌=ABC]');
```

查询时，如果希望忽略某对象，可以设置对象的`queryable`属性：
```javascript
obj.queryable = false;
```

## 选择器

选择器`Selector`用来存储一批对象集合，`query`的查询结果会返回一个选择器，也可以直接创建一个`Selector`。选择器可以像数组一样访问，提供对象的批量注册事件、属性的批量设置等操作。

选择器的对象访问，类似数组的方式：
```javascript
// 获取第一个元素
let obj = app.query('.Entity')[0];

// 循环选择器对象
let objs = app.query('.Entity');
for (let i = 0; i < objs.length; i ++) {
    console.log(objs[i]);
}
objs.forEach(function(obj) {
    console.log(obj.name);
});
```

对选择器中的所有对象，进行批量操作：
```javascript
app.query('car01').on('click', function(e) {
    console.log(e.object);
});
app.query('car01').visible = false;
app.query('car01').style.color = "#FF0000";
```

```javascript
// 查询结果操作
let result = app.query('car01').add('car02');
app.query('car03').add( result );
app.query('.Entity').remove('car04');
```

```javascript
// 自己创建选择器
let sel = new Selector();
sel.push(obj);
```

选择器还支持以动态查询的方式进行处理：

```javascript
// 以动态查询的方式，收集 Box 类型的对象集合
let result = app.query('.Box', { dynamic: true });

// 创建子对象
let box1 = new THING.Box({
    position: [0, 3, 0],
});

let box2 = new THING.Box({
    position: [0, -3, 0],
});

// 当最后一个对象创建完毕后，输出对象集合信息
box2.on(THING.EventType.Create, function () {
    console.log(result);
});
```

