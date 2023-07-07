# 参数化

参数化对象，是根据输入参数自动构建的三维对象，如：点、线、面、体等。

## 点
给定一批点坐标，生成一批点，可以通过`size`来控制点大小：
```javascript
//创建点
const points = new THING.Points({
    points: [[10, 0, 0], [10, 0, 10], [0, 0, 10], [0, 0, 0]],
});

//点的大小
points.size = [1.5, 5];
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
    points: [[0, 0, 0], [20, 0, 0], [20, 0, 20], [0, 0, 20]],
    selfPlaneHoles: [[[5, 5], [14, 3], [14, 7], [6, 7]]],
    position: [0, 0, 0],
    style: { color: '#00FFB3' }
});
```

## 几何体

可以创建如：立方体、球体、圆柱体、胶囊等几等何体：
```javascript
// 创建立方体、球
let box = new THING.Box(1, 2, 3);
let sphere = new THING.Sphere(0.5);

// 创建立方体，更多参数
let box = new THING.Box({
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
new THING.Sphere({radius: 0.5, position: [12, 0, 0], style: { color: "#FF00FF" }});
new THING.Cylinder({radiusTop: 0, position: [0, 0, 0], style: { color: "#FFA300" }});
new THING.Circle({position: [4, 0, 0], style: { color: "#0000FF" }});
new THING.Capsule({position: [8, 0, 0], style: { color: "#00FFFF" }});
new THING.Torus({position: [-4, 0, 0], style: { color: "#FFFF00" }});
```

还可以通过`ExtrudeShape`，指定一个形状和高度，来挤出一个体积的造型：
```javascript
// 创建高度为 2 米的挤出体
const shape = new THING.ExtrudeShape({
    points: [
        [0, 0.1, 0],
        [4, 0.1, 0],
        [4, 0.1, 10],
        [0, 0.1, 10],
    ],
    height: 2
});
```

## 粒子
粒子系统`ParticleSystem`是一个三维对象，由多组粒子发射器`ParticleEmitter`组成，粒子系统为场景提供各种特殊效果，如：烟气、喷淋、雨雪，或一些特殊效果：
```javascript
// 创建粒子
let particleSystem = new THING.ParticleSystem({
    name: 'particle-001',
    position: [30, 50, 0]
});

// 设置参数
const emitter = particleSystem.groups[0].emitters[0];
emitter.setAttribute('Position', { value: [0, 0, -50] });
emitter.setAttribute('Acceleration', { value: [0, -10, 0] });
emitter.setAttribute('Velocity', { value: [0, 25, 0], spread: [10, 7.5, 10] });
emitter.setAttribute('ListColor', { value: [[1, 1, 1], [1, 0, 0]] });
emitter.setAttribute('ListSize', { value: [2, 1] });
emitter.setAttribute('ListOpacity', { value: [1, 0.1] });
emitter.setAttribute('ParticleCount', 200);
```

```javascript
// 通过json创建粒子
let particleSystem = new THING.ParticleSystem({
    name: "par01",
    url: "./particles"
});
```

