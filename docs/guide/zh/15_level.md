# 层级

`ThingJS`引擎中的层级是指：当前场景所处的空间位置。如：园区层级、建筑层级、房间层级、设备层级等。层级相当于一个用来展示和控制对象的舞台，你可以为一类对象或一个对象设置特定的展示和控制方式，这样，当进入这个层级后，就可以使用这种特定的方式，来显示和控制这个层级的对象了。

> 注意：层级是根据对象之间的父子关系逐级进入或退出的

## 层级切换

在加载场景之后，可以通过`app.level.change()`切换层级，需要指定要切换的层级对象：
```javascript
app.level.change(obj);
```

层级切换可能是异步的，如果需要等待层级切换完成，可以通过下面的异步方式等待：
```javascript
// await 的方式，等待层级切换完成
await app.level.change(obj); 

// 或 then 的方式，等待层级切换完成后回调
app.level.change(obj).then((ev) => {
    console.log(ev);
})
```

如果需要为层级控制设置参数，可以在`app.level.change()`中指定`params`，会自动传入层级控制的代码：
```javascript
// 此处仅为举例，具体参数和层级控制方式相关
let params = {
    selectColor: "#FF00FF", // 选中物体时候的沟边颜色
    flyTime: 2000 // 切换层级后飞行时间
}
app.level.change(obj, params);
```

在场景加载完成后，可以使用加载场景的根对象作为初始层级，比如：
```javascript
app.on('load', function(ev) {
    if (ev.object)
        app.level.change(ev.object);
})
```

层级的其他一些接口和属性：
```javascript
// 后退层级
await app.level.back();

// 退出层级
await app.level.quit();

// 当前层级对象
app.level.current;

// 上一个层级的对象
app.level.prev;
```

## 层级控制

在切换到某个层级之后，需要实现一个层级的控制方式，用来展示和控制这个层级的对象。你可以通过继承`BaseLevelControl`类，来实现这个控制方式，并通过`app.level.register()`对其进行注册：

```javascript
// 建筑层级控制
class BuildingControl extends THING.BaseLevelControl {
    // 构造，params为new时候传入的参数
    constructor(params) {
        this.selectColor = params["selectColor"];
        // 常用成员：
        // this.app、this.current（当前层级控制的对象）;
    }
    // 进入层级，飞行、显示隐藏、选择等，params为change时传入的参数
    onEnter(params) {
    }
    // 离开层级，恢复
    onLeave() {
    }
    // 层级更新事件
    onUpdate() {
    }
}

// 注册层级控制，
// 当层级切换到 符合筛选条件的对象 时候，进入对应的层级控制方式
app.level.register(".Building", new BuildingControl({selectColor: "#FF00FF"}));
```

## 层级事件
除了自定义层级的控制方式，引擎还支持注册层级进入和退出的事件，从而可以在层级进入或退出时，进行一些操作：
```javascript
app.on(THING.EventType.EnterLevel, '.Building', (e)=>{}, 'levelTag');
app.on(THING.EventType.LeaveLevel, '.Building', (e)=>{}, 'levelTag');

// 如果需要对事件进行更细的区分，可以使用如下事件：
// THING.EventType.BeforeEnterLevel, THING.EventType.AfterEnterLevel,
// THING.EventType.BeforeLeaveLevel, THING.EventType.AfterLeaveLevel,
```

