# 场景

`ThingJS`的场景是具有一定关系的对象所组成的集合，场景一般由场景搭建工具 或 三维建模工具 生成。

`ThingJS`具有一个根对象`app.root`，所有对象都在这个根对象下，组成一个树状结构。可以通过对象的`add`、`remove`方法，给这个场景树增加或移除对象。

## 加载场景

可以通过`app.load()`的方法来加载场景：
```javascript
// 文件路径
const url = "./scenes/simple.json";

// await 的方式，等待加载完成
let asset = await app.load(url);
console.log( asset.root );

// 或 then 的方式，等待加载完成后回调
app.load(url).then((ev) => {
    console.log(ev.root); // ev.object是根节点
})；
```

在`app.load()`方法中，除了`url`必选参数外，还可以设置更多的参数，如：指定加载到哪个根对象`parent`、加载时是否忽略某些内容`ignore`等等。

```javascript
app.load(url, {
    // 加载到这个对象下
    parent: parentObj,
    // 忽略效果
    ignore: "rendersettings",
});
```

也可以通过`loadGLTF`来加载包含场景信息的`gltf`文件：
```javascript
await app.loadGLTF("./scenes/uino.gltf");
```

## 加载事件
除了在`then`方法外，也可以在参数`onComplete`中进行指定加载完成的回调。加载进度`onProgress`、加载错误`onError`的回调方法等，也可以在参数中进行指定。

```javascript
app.load(url, {
    // 场景加载完成回调
    onComplete: (ev) => {
        console.log(ev.object);
    },
    // 场景加载进度回调
    onProgress: (num) => {
        console.log(num);
    },
    // 场景加载错误回调
    onError: (ev) => {
        console.log(ev);
    }	
});
```

也可以通过注册`app`的`load`事件，在代码的其他地方来响应场景加载完成的事件：
```javascript
// 场景加载完成事件
app.on('load', function(ev) {
    console.log(ev);
});

// 只监听符合筛选条件的对象加载事件
app.on('load', '.Campus', function(ev) {
    console.log(ev);
});
```

