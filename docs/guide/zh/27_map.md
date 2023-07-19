# 地图

地图是`ThingJS`的一个扩展库，包括加载地图瓦片，地形以及地图上的点线面要素等功能，适用于需要基于地理信息数据进行三维可视化展示的场景。

> 注意：地图扩展库，需要使用`ThingJS`专业版。

## 安装
地图扩展库的下载地址：[thing.earth.min.js](https://cdn.uino.cn/thingjs-cli/thing.earth.min.js "earth")

引入地图包，引入后会新增`THING.EARTH`的命名空间，之后初始化地图示例`Map`

```html
<script src="./libs/thing.min.js"></script>
<script src="./libs/thing.earth.min.js"></script>
<script>
  const app = new THING.App();

  // 初始化地图对象
  const map = new THING.EARTH.Map();
</script>
```

## 图层
图层(Layer)是GIS中最基本的组织单位，用于展示不同类型的地理数据。引入图层的概念主要是为了方便管理地图场景中的地理对象。THING.EARTH中常用的图层有瓦片图层(TileLayer),要素图层(FeatureLayer),3dtile图层(Tile3dLayer),栅格图层(ImageLayer)等。

```javascript
// 创建一个瓦片图层 url为高德地图卫星影像的瓦片服务地址
var tileLayer = new THING.EARTH.TileLayer({
  name: "tileLayer1",
  url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
});

// 添加到地图
map.addLayer(tileLayer);

// 基于一个点的geojson文件创建一个FeatureLayer
var featureLayer = new THING.EARTH.FeatureLayer({
  name: 'tileLayer1',
  url: '../data/pointData.geojson',
  geoObjectType:'GeoPoint',
  style:{
    pointType:THING.EARTH.SymbolType.Vector,
    size:2,
    color:[1,0,0],
    vectorType:THING.EARTH.VectorType.Circle
  }
});
// 添加到地图
map.addLayer(featureLayer);
```

## 事件
与其他ThingJS中的对象类似，可以给地图对象注册事件：
```javascript
// 给地图添加点击事件
map.on(THING.EventType.Click, (ev) => {
  // 获取鼠标点击处的经纬度
  var coordinates = ev.coordinates;
  console.log(coordinates);

  // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
  var worldPos = THING.EARTH.Utils.convertLonlatToWorld(lonlat, 0);
  console.log(worldPos);
});
```

## 摄影机
地图上摄影机飞行：
```javascript
app.camera.earthFlyTo({
  lonlat: [116.495724, 39.977478],
  height: 200,
  duration: 3000,
  onComplete: () => {
    console.log("flyComplete");
  },
});
```

## 更多内容

请参考`UINO`文档中的 [地图文档](https://wiki.uino.com/book/thingjs-api20/624004eac78b0a6607ed973eeff77b75.html "地图文档")


