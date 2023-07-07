# 事件

引擎提供的事件系统，可以通过`app.on()`来注册全局事件，也可以通过`obj.on()`来注册某个对象的事件，还能给一个选择器内的所有对象注册事件。


## 全局事件
通过`app.on()`来注册全局事件，下面例子包括鼠标事件、键盘事件、场景加载事件、更新事件、窗口尺寸事件等。事件类型可以从`THING.EventType`枚举中找到，常用的事件，也可以直接使用字符串（不区分大小写）。

鼠标和键盘事件：
```javascript
// 绑定click事件
app.on('click', function(ev) {
    ev.object.style.color = 'red';
});

// 绑定click事件，带事件名字：'myevent'
app.on('dblclick', function(ev) {
    ev.object.style.color = 'red';
}, 'myevent');

// 按名字解除事件
app.off('dblclick', 'myevent');

// 解除全部click事件
app.off('dblclick');

// 键盘按下事件
app.on('keydown', function (ev) {
    console.log(ev.code);
});
```

场景加载事件：
```javascript
// 场景加载完成事件
app.on('load', function(ev) {
    console.log(ev);
});

// 当需监听符合某些筛选条件对象的load事件
app.on('load', '.Campus', function(ev) {
    console.log(ev);
});
```

更新事件：
```javascript
app.on('update', function(deltaTime) {
    console.log(deltaTime);
})
```

窗口变化事件：
```javascript
app.on('resize', function(width, height) {
    console.log(`size changed(width: ${width}, height: ${height})`);
});
```

## 对象事件
通过`obj.on()`来注册对象的事件，常用的有更新事件`update`，鼠标事件`click`、`mouseenter`等：

```javascript
// 旋转立方体
box.on('update', function(ev) {
    ev.object.rotateY(0.5);
});
// 停止旋转
box.off('update');
```
> 注意，由于性能问题，如果不需要更新事件`update`，尽量不去注册，并且应移除不需要的`update`事件

```javascript
// 鼠标滑入物体事件
box.on('mouseenter', function(ev) {
    ev.object.style.outlineColor = 'red';
});
// 鼠标滑出物体事件
box.on('mouseleave', function(ev) {
    ev.object.style.outlineColor = null;
});

// 点击物体切换颜色
let tag = true;
box.on('click', function (ev) {
    ev.object.style.color = tag ? 'red' : 'green';
    tag = !tag;
});
```

## 事件管理
通过`pauseEvent`暂停某个事件，`resumeEvent`来恢复某个事件，可以指定事件的`tag`来指定针对那个事件。
```javascript
app.pauseEvent(THING.EventType.EnterLevel, '.Floor', eventTag);
app.resumeEvent(THING.EventType.LeaveLevel, '.Floor', eventTag);
```

可以通过`off`来停止某个事件。
```javascript
box.off('update');
```

可以通过`once`来注册一次性事件，此事件只会被触发一次，触发后会被自动注销。
```javascript
app.once('click', '*', function(ev) {
    console.log(ev);
});
```

可以通过`trigger`来触发一个事件：
```javascript
app.on('myEvent', function(ev) {
    console.log(ev);
});
app.trigger('myEvent', { result: true });
```


