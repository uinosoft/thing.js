# Bundle包

`bundle`包，是指一个包含`bundle.json`文件的文件夹，里面包含一个或多个资源文件，`bundle.json`指定了包的类型，以及入口文件，从`ThingJS 1.0`开始，多数资源都是以`bundle`包的方式存储，可以通过`loadBundle接口`来加载。

加载场景包：
```javascript
var bundle = app.loadBundle('./campus2/scene-bundle');
bundle.waitForComplete().then(() => {
    const campus = bundle.campus;
    // const campus = bundle.campuses[0];
});
```

加载效果模板包：
```javascript
// 第一个参数url
// 第二个参数为可选参数: { apply: true, root: app.query('.Campus')[0] }
// 如果第二个参数传入{ apply: false }, 即只加载bundle中的文件, 那么可以使用bundle中提供的apply方法
var bundle = app.loadBundle('./bundles/scene-bundle/theme');

bundle.waitForComplete().then(() => {
    // 存放效果模板文件的数据
    console.log(bundle.theme);
    
    // 将bundle中的效果应用到root上, root的值默认是app.query('.Campus')[0]
    // bundle.apply(root);
});
```

加载城市包：
```javascript
var bundle = app.loadBundle("../bundle/demo");
bundle.waitForComplete().then(() => {
  console.log(bundle.map);
});
```

加载标记包：
```javascript
var bundle = app.loadBundle('.libs/test/atm', { object: host });
bundle.waitForComplete().then(() => {
    // 给物体挂接标记
    let car = app.query('#car01')[0];
    bundle.addForObject(car);
});
```

加载大屏/图表包：
```javascript
const bundle = THING.Utils.loadBundle('./大屏-未命名大屏', {
    container: '#example' // 挂载节点
  }
)

// 等待场景加载完成
await bundle.waitForComplete();

// ui实例
console.log(bundle.ui);
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
