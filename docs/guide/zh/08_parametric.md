# 参数化

参数化对象，是根据输入参数自动构建的三维对象，如：点、线、面、体等。

## 点
给定一批点坐标，生成一批点，可以通过`size`来控制点大小：
```javascript
// 创建点
const points = new THING.Points({
    points: [[10, 0, 0], [10, 0, 10], [0, 0, 10], [0, 0, 0]],
});

// 设置点的大小
points.size = 10;
// 更改点的颜色
points.style.color = "#FF0000";
```

## 线
线的类型分为像素线`PixelLine`，粗线`FatLine`，管线`PolygonLine`、导航线`RouteLine`等，传入坐标，自动生成线和拐角。
```javascript
const points = [[10, 0, 0], [10, 0, 10], [0, 0, 10], [0, 0, 0]];

// 创建像素线
let pixelLine = new THING.PixelLine({
    selfPoints: points,
    closure: true // 以闭环方式创建
});

// 创建粗线
let fatLine = new THING.FatLine({
    selfPoints: points,
    width: 5,
    position: [0, 3, 0]
});

// 创建管线
let polygonLine = new THING.PolygonLine({
    selfPoints: points,
    position: [0, 6, 0],
    closure: true
});

// 创建导航线
let routeLine = new THING.RouteLine({
    selfPoints: points,
    position: [0, 9, 0],
    closure: true
});
```


## 面
面的类型分为简单的矩形平面`Plane`和平面区域`PlaneRegion`，可以在`PlaneRegion`上指定一个镂空的区域进行挖洞。

创建矩形平面：
```javascript
let plane = new THING.Plane(1000, 1000);
```

创建平面区域：
```javascript
const plane2 = new THING.PlaneRegion({
    points: [[0, 0, 0], [20, 0, 0], [20, 0, 20], [0, 0, 20]],// 顶点位置坐标
    selfPlaneHoles: [[[5, 5], [14, 3], [14, 7], [6, 7]]],// 洞平面位置坐标
    position: [0, 0, 0],
    style: { color: '#00FFB3' }
});
```

## 几何体

可以创建如：立方体、球体、圆柱体、胶囊等几等何体：
```javascript
// 创建立方体
let box = new THING.Box(1, 2, 3);
// 创建球
let sphere = new THING.Sphere(0.5);

// 创建立方体，多参数形式
let box1 = new THING.Box({
    width: 3,
    height: 2,
    depth: 1,
    position: [-5, 0, 0],
    style: {
        color: "#FF0000"
    }
});
```

```javascript
// 更多几何体
new THING.Sphere({radius: 0.5, position: [12, 0, 0], style: { color: "#FF00FF" }});// 球
new THING.Cylinder({radiusTop: 0, position: [0, 0, 0], style: { color: "#FFA300" }});// 圆柱
new THING.Circle({position: [4, 0, 0], style: { color: "#0000FF" }});// 圆形
new THING.Capsule({position: [8, 0, 0], style: { color: "#00FFFF" }});// 胶囊
new THING.Torus({position: [-4, 0, 0], style: { color: "#FFFF00" }});// 圆环体
```

还可以通过`ExtrudeShape`，指定一个形状和高度，来挤出一个体积的造型：
```javascript
// 创建高度为 2 米的挤出体
const shape = new THING.ExtrudeShape({
    points: [
        [0, 0.1, 0],
        [4, 0.1, 0],
        [8, 0.1, 5],
        [4, 0.1, 10],
        [0, 0.1, 10],
    ],
    height: 2
});
```

## 粒子
粒子系统`ParticleSystem`是一个三维对象，由多组粒子发射器`ParticleEmitter`组成，粒子系统为场景提供各种特殊效果，如：烟气、喷淋、雨雪，或一些特殊效果。

在以下示例中，演示了如何从头创建一个粒子系统：

```javascript
// 首先创建一个粒子系统实例
const particleSystem = new THING.ParticleSystem({
    name: 'particle-001',
    position: [30, 50, 0]
});

// 如果不传json数据，则ParticleSystem中默认包含一个ParticleGroup，ParticleGroup内默认包含一个ParticleEmitter
// 所以后续代码无需创建ParticleGroup与ParticleEmitter，直接获取即可

// 获取粒子组
const group = particleSystem.groups[0];
// 设置粒子组属性
group.setAttribute('MaxParticleCount', 200); // 设置最大粒子数（必须），一般来说应该是所包含的发射器粒子数的总和

// 获取粒子组中的粒子发射器
const emitter = group.emitters[0];
// 设置粒子发射器属性
emitter.setAttribute('ParticleCount', 200); // 设置最大粒子数（必须）
emitter.setAttribute('Position', { value: [0, 0, -50] }); // 粒子发射器的位置
emitter.setAttribute('Acceleration', { value: [0, -10, 0] }); // 粒子的加速度
emitter.setAttribute('Velocity', { value: [0, 25, 0], spread: [10, 7.5, 10] }); // 粒子的初始速度
emitter.setAttribute('ListColor', { value: [[1, 1, 1], [1, 0, 0]] }); // 粒子的颜色渐变列表
emitter.setAttribute('ListSize', { value: [2, 1] }); // 粒子的尺寸变化列表
emitter.setAttribute('ListOpacity', { value: [1, 0.1] }); // 粒子的透明度变化列表
```

也可以在粒子编辑器中编辑粒子，通过导出的json数据创建粒子系统实例：

```javascript
const particleSystem = new THING.ParticleSystem({
    name: "particle-002",
    url: "./particles/index.json" // 粒子文件路径
});
```

更多设置和使用方式参考：

* [ParticleSystem](https://wiki.uino.com/book/thingjs-api20/c956ea8a58916eb78460cd0d378d5881.html)
* [ParticleGroup](https://wiki.uino.com/book/thingjs-api20/63157f229ffd9d245dbe0fad.html)
* [ParticleEmitter](https://wiki.uino.com/book/thingjs-api20/631572679ffd9d245dbe0f98.html)

以上这些三维对象都可以通过app.create方式创建，需要指定好对象类型。
```javascript
// 创建点
app.create({
    type: 'Points',
    points: [[10, 0, 0], [10, 0, 10], [0, 0, 10], [0, 0, 0]],
    size: 10,
    style: {
        color: "#FF0000"
    }
});
// 创建像素线
app.create({
    type: 'PixelLine',
    selfPoints: [[10, 0, 0], [10, 0, 10], [0, 0, 10], [0, 0, 0]],
    closure: true // 以闭环方式创建
});
```
其他物体创建方式参考：
* [app.create](https://wiki.uino.com/book/thingjs-api20/4f90b3849989d7464763b1453294497b.html#create(param)%20%E2%86%92%20{THING.BaseObject}.html)

