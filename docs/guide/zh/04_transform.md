# 空间属性

三维对象`Object3D`的子类都会提供位置、旋转、缩放等空间属性，你可以通过设置一个值，或设置一个变化过程，来改变对象的空间属性。

## 设置属性
通过设置值来立即改变对象的空间属性：
```javascript
// 设置位置
obj.position = [0, 10, 0];

// 设置旋转
obj.rotate([0, 1, 0], 45); // 沿Y轴旋转45度
obj.rotateOnAxis([0, 0, 1], 45); // 沿给定轴旋转45度
obj.rotateY(45); // 沿Y轴旋转
obj.rotation = [45, 0, 0];

// 设置缩放
obj.scale = [1, 2, 1]; // 沿y轴缩放2倍
```
`ThingJS`中，通常使用三个元素数组来代表一个三维坐标`[0, 10, 0]`，一个数值代表角度`45`，或三个元素的数组代表三个轴的旋转角度`[45, 0, 0]`。

## 位置移动
可以通过`moveTo`方法，让对象移动到某个位置：
```javascript
// 设置移动
obj.moveTo([10, 0, 0]);

// 移动参数
obj.moveTo([10, 0, 0], {
    loopType: THING.LoopType.PingPong,
    duration: 2000 // 2秒
});

// 完成回調
obj.moveTo([10, 0, 0], {
    loopType: THING.LoopType.PingPong,
    duration: 2000,
    onComplete: function() {
        console.log("move complete");
    }
});
```

或`movePath`方法，让对象沿指定的路径移动，路径是一个三维点数组：
```javascript
obj.movePath({
    path: [[10, 0, 0], [10, 0, 10], [0, 0, 0]],
    loopType: THING.LoopType.PingPong,
    duration: 2000,
    loop: true, // 路径点按照首尾相接闭环移动
    onComplete: function() {
        console.log("movePath complete");
    }    
});
```

## 旋转动画
可以通过`rotateTo`方法，让对象旋转到一个指定角度，可以用于动画效果：
```javascript
// 旋转到某个角度
obj.rotateTo([0, 90, 0]);

// 旋转到某个角度，如果需要完成时可回调
obj.rotateTo([0, 90, 0], {
    duration: 2000,
    onComplete: function() {
        console.log("rotateTo complete");
    }    
});

// 旋转到某个角度，以PingPong的方式循环，每次时间2秒
obj.rotateTo([0, 90, 0], {
    loopType: THING.LoopType.PingPong,
    duration: 2000
});
```

## 缩放动画
可以通过`scaleTo`方法，让对象缩放到一个指定大小，可以用于动画效果：
```javascript
// 缩放到2倍
obj.scaleTo([2, 2, 2]);

// 缩放到2倍，以PingPong的方式循环，循环10次，每次时间2秒
obj.scaleTo([2, 2, 2], {
    loopType: THING.LoopType.PingPong,
    loop: 10,
    duration: 2000
});
```

## 坐标转换
对象的世界坐标和相对坐标的转换：
```javascript
// 世界坐标
let pos = obj.position;

// 相对父亲坐标
let local = obj.localPosition;

// 相对坐标转世界坐标
let pos = obj.localToWorld([10, 0, 0]);

// 世界坐标转相对坐标
let local = obj.worldToLocal(pos);
```
对象的世界坐标和自身坐标的转换：
```javascript
// 自身坐标转世界坐标
let pos2 = obj.selfToWorld([10, 0, 0]);

// 世界坐标转自身坐标
let selfPos = obj.worldToSelf(pos2);
```

## 轴心点
对象轴心点，主要用于旋转和缩放操作，可以理解为是对象自身坐标系的原点，比如旋转一个立方体，那么旋转就是围绕其轴心点进行。
```javascript
// 设置对象轴心点
obj.pivot = [0.5, 0.5, 0.5];

// 绘制物体的轴心点
obj.helper.axes = true;
```

## 包围盒
包围盒是对象的一个边界，分为轴对齐包围盒`boundingBox`（不带旋转），有向包围盒`orientedBox`（带旋转的包围盒），后者更贴近物体：
```javascript
// 轴对齐包围盒
const boundingBox = obj.boundingBox;
let center = boundingBox.center // 对象的中心
let size = boundingBox.size; // 对象的大小

// 有向包围盒
const orientedBox = box.orientedBox;
let angles = orientedBox.angles; // 角度
```
显示包围盒：
```javascript
obj.helper.boundingBox.visible = true;
```

