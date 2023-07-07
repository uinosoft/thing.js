# 入门

## 初始化
使用`ThingJS`引擎，首先要创建一个`App`实例，`App`是引擎中的主要入口，提供了资源加载、对象管理、对象查询、事件注册等等各种功能，一般只需要创建一个：

```javascript
const app = new THING.App();
```

`ThingJS`使用页面上标签为`div3d`的元素，作为默认的渲染区域，`ThingJS`将会在这个`div`内创建`WebGL`以及一些需要的页面元素。下面是一个完整的页面例子：
```html
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>ThingJS</title>
        <meta charset="utf-8" />
        <script src="./thing.js"></script>
    </head>

    <body style="margin: 0; padding: 0">
        <div id="div3d"></div>
    </body>
    
    <script type="module">
        const app = new THING.App();
    </script>
</html>
```
> 注意：请在页面元素`div3d`初始化后，再创建`App`

如果需要手动指定元素的标签，可以使用`container`参数：
```javascript
const app = new THING.App({
    container: document.getElementById('div3d')
});
```
## Hello World
在初始化`App`时，可以传入一个`url`参数，`url`可以是一个包含了场景信息的 [gltf](https://www.khronos.org/gltf/) 文件，或一个`ThingJS`场景格式的`JSON`文件，这样就可以加载一个场景：
```javascript
const app = new THING.App({
    url: "./assets/scene/scene.gltf",
    onComplete: function(ev) {
        console.log(ev); // 加载完成后回调
    }
});
```

在初始化`App`后，创建一个立方体盒子，并在更新事件中让这个`Box`旋转：
```javascript
// 创建一个宽、高、深为1、2、3的盒子
let box = new THING.Box(1, 2, 3);

// 场景更新事件
app.on('update', function(deltaTime) {
    if (box != null)
        box.rotateY(0.1);
});
```

关于`App`的更多功能请参考后续文档和API手册。


