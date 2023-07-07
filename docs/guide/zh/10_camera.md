# 摄影机

在`ThingJS`引擎中，默认提供了摄影机对象`app.camera`，以及它的默认控制方式。摄影机就相当于手机上的摄像头，随着摄影机的位置`position`、拍摄点`target`的变化，对场景进行取景，之后渲染到屏幕上。摄影机提供了设置视角、飞行、模式，以及控制方式等多种功能。

## 视角
通过摄影机的`position`、`target`属性，或这`lookAt`方法来设置摄影机看点和角度：
```javascript
// 设置摄像机位置
app.camera.position = [0, 20, 20];

// 设置摄像机看点
app.camera.target = [-30, 10, 0];

// 或通过lookAt设置看点
app.camera.lookAt([-30, 10, 0]);
```

摄影机提供的`fit`方法，可以根据对象的大小，自动计算一个最佳看点，并设置到这个看点上：
```javascript
app.camera.fit(obj);
```

## 飞行
摄影机提供的`flyTo`方法，可以飞到一个位置和看点上，通过`duration`设置飞行时间，飞行完成后调用`onComplete`方法。
```javascript
app.camera.flyTo({
    position: [2, 5, 6],
    target: [0, 0, 0],
    duration: 1000,
    onComplete: function () {
        console.log("fly complete");
    }
});
```

## 模式
摄影机支持透视模式`Perspective`和正交模式`Orthographic`，默认使用透视模式。
* 在透视模式下，物体随摄影机的距离近大远小，更接近真实世界；
* 在正交模式下，物体的大小和摄影机距离无关，其大小保持不变；

可通过摄影机的`setProjectionType`来设置两种模式，枚举`ProjectionType`包含两种模式，`duration`参数可以控制切换模式的过渡时间：
```javascript
// 设置为正交投影（切换时间2秒）, .Perspective为透视投影
app.camera.setProjectionType(THING.ProjectionType.Orthographic, 2000);
```

摄影机还提供了几种视图的切换（正、顶、侧视图），一般可以配合正交模式，枚举`ViewModeType`中，提供多种视图模式：
```javascript
// 设置顶视图
app.camera.viewMode = THING.ViewModeType.Top;
```

## 控制
摄影机对象通过其挂接的控制组件，来进行控制，可以通过`camera`的属性来访问，比如：
```javascript
camera.enable = true; // 打开/关闭控制操作
camera.enableRotate = true; // 打开/关闭旋转
camera.enablePan = true; // 打开/关闭平移
camera.enableZoom = true; // 打开/关闭缩放
camera.rotateSpeed = 1; // 获取/设置旋转速度
camera.panSpeed = 1; // 获取/设置平移速度
camera.zoomSpeed = 1; // 获取/设置缩放速度
```
可以通过重写摄影机控制组件，来实现一个你自己的摄影机控制方式。更多控制可以参考API手册。

## 其他参数
摄影机还提供了`near`近裁剪面距离，`far`远裁剪面距离，视场角`fov`，视口宽高比`aspect`等属性的设置：
```javascript
// 设置 near 和 far 之间的距离尽可能小，过大可能会引起'撕面'
camera.near = 0.1;
camera.far = 1000;

camera.fov = 45;
```
以及世界坐标和屏幕坐标的相互转换`worldToScreen`、`screenToWorld`等，更多可参考API中摄影机的部分

## 多摄影机

`ThingJS`引擎除了一个默认摄影机，还支持多摄影机，只需要新建多个摄影机，并设置它们的视口位置即可：
```javascript
// 增加一个摄影机
var cam01 = new THING.Camera();
cam01.enableViewport = true;
cam01.viewport = [0, 15, 128, 128];	// left, top, width, height

// 再增加一个摄影机
var cam02 = new THING.Camera();
cam02.enableViewport = true;
cam02.viewport = [0, 256, 128, 128];
```	

