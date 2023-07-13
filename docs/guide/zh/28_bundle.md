# Bundle包

`bundle`包，是指一个包含`bundle.json`文件的文件夹，里面包含一个或多个资源文件，`ThingJS 1.0`的资源，多数是以`bundle`包的方式存储，可以通过`loadBundle接口`来加载。

加载场景包：
```javascript
var bundle = app.loadBundle('./campus2/scene-bundle');
bundle.waitForComplete().then((ev)=>{
    const campus = bundle.campuses[0];
});
```

加载插件包：
```javascript
const bundle = app.loadBundle('./plugins/xxx', { object: box });
bundle.waitForComplete().then((ev) => {
	console.log(bundle);
	bundle.plugin.printPosition();
});
```

加载效果模板包：
```javascript
var bundle = app.loadBundle('./bundles/scene-bundle/theme');
bundle.waitForComplete().then((ev) => {
	console.log(bundle.theme);
});
```

加载城市包：
```javascript
var bundle = app.loadBundle("../bundle/demo");
bundle.waitForComplete().then((ev) => {
  console.log(bundle.map);
});
```

加载标记包：
```javascript
var bundle = app.loadBundle('.libs/test/atm', { object: host });
bundle.waitForComplete().then((ev) => {
});
```

加载大屏/图表包：
```javascript
const bundle = THING.Utils.loadBundle('./大屏-未命名大屏', {
    container: '#example' // 挂载节点
  }
)
await bundle.waitForComplete() // 等待场景加载完成
console.log(bundle.ui) // ui实例
```

加载拓扑包：
```javascript
const bundle = THING.Utils.loadBundle(url, {
    container: '#example'
  }
);
await bundle.waitForComplete();
const graph = bundle.topo;
console.log(graph.nodes);
```
