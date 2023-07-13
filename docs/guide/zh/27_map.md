# 地图

地图是`ThingJS`的一个扩展库，包括。。。功能，用于。。。场景等
@huyang 补充一点定义的说明

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
@huyang 补充一点说明

```javascript
// 创建一个瓦片图层
var tileLayer = new THING.EARTH.TileLayer({
  name: "tileLayer1",
  url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
});

// 添加到地图
map.addLayer(tileLayer);
```

## 事件
地图注册点击事件：
```javascript
map.on("click", (ev) => {
  // 获取鼠标点击处的经纬度
  var lonlat = ev.coordinates;
  console.log(lonlat);

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

