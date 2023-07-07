# 动作

动作`Action`是对一个执行操作的封装，通过`BaseAction`的子类来实现。多个动作可以组合调用，有些动作是异步的，需要等待完成，动作也可以进行延时执行。

## 执行动作
通过`actionManager`的`run`方法，可以执行一段动作JSON数据，下面例子是一个包含多个动作的队列：
```javascript
app.actionManager.run([
    {
        "type": "CameraFlyto", // 摄影机飞行
        "params": {
            "duration": 2000		// 飞行时间2秒
        }
    }, {
        "type": "CreateObject", // 创建对象
        "params": {
            "type": "Box",
            "name": "obj01"
        },
        "endDelay": 2000	// 等待2秒后执行下一个
    },  {
        "type": "CreateObject", // 创建对象
        "params": {
            "type": "Entity",
            "url": "xxx.gltf",
            "name": "obj02"
        },
        "waitForComplete": true
    }, {
        "type": "ObjectSetColor", // 设置物体颜色
        "target": "obj01",		// 物体名称
        "params": {
            "color": "#FF0000" // 颜色值
        },
        "delay": 2000	// 等待2秒后执行这个
    }
]);
```

## 自定义动作
可以通过继承`BaseAction`类型，来实现一个自定义动作：
```javascript
class MyAction extend BaseAction {
    onRun() {}
    onStop() {}
    onEnable(value) {}
}
```

需要调用`actionManager`的`register`方法来注册一个具体的动作实例：
```javascript
app.actionManager.register('MyAction', new MyAction());
```

