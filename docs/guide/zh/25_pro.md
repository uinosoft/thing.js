# 专业版

`ThingJS` 2.0 包含更多功能，以及可以使用`studio`网站的资源。

在当前工程下，安装依赖：
```bash
> npm install @thing.js/core --save	
```

## 安装

## Bundle
兼容1.0的`bundle`加载方法，需要在加载文件夹中确认包含`bundle.json`

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
