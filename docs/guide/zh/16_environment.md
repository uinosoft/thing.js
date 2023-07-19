# 环境

引擎支持对背景、天空、环境图、灯光、后期效果等进行设置。

## 背景和天空

可以通过`app.background`属性，来设置背景颜色或天空盒：

```javascript
// 设置背景颜色
app.background = "#0000FF";
```

直接设置图片作为背景：
```javascript
app.background = "./images/bluesky/posx.jpg";
```

设置天空盒作为背景，需要指定6个图片文件的地址：
```javascript
const baseURL = "./images/bluesky/";
const cubeMap = new THING.CubeTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);
app.background = cubeMap;
```
更多创建CubeTexture方式请参考:
* [THING.CubeTexture](https://wiki.uino.com/book/thingjs-api20/62e8f92a0745a6a37a6388df.html)

直接设置`app.background`为`null`即可清空背景：
```javascript
app.background = null;
```

## 环境图
环境图常被用于实现材质的各种反射效果，例如玻璃、水面、金属等，引擎提供了默认的环境图，也可以通过`app.envMap`或对象的`obj.style.envMap`属性来设环境图：
```javascript
// 全局环境图设置
app.envMap = cubeMap;

// 对象样式的环境图设置
obj.style.envMap = cubeMap;
```

直接设置`app.envMap`为`null`即可清空环境图：
```javascript
// 关闭全局环境贴图
app.envMap = null;
// 关闭单个物体的环境贴图
obj.style.envMap = null;
```

## 雾
用于模拟室外环境中的雾或雾气，可以通过`app.camera.fog`设置雾的效果：
```javascript
// 开启雾的效果
app.camera.fog.enable = true;
// 设置雾的远平面距离
app.camera.fog.far = 300;
// 设置雾的颜色
app.camera.fog.color = 'white';
```

## 灯光

`ThingJS`引擎在场景中默认提供了 环境光 和 一个主光源，可以通过`app.scene.ambientLight` 和 `app.scene.mainLight` 来访问：
```javascript
// 获取场景默认环境光
const ambientLight = app.scene.ambientLight;
// 获取场景默认直射光
const mainLight = app.scene.mainLight;
```

可以通过灯光的颜色`color`属性、强度`intensity`属性、阴影`castShadow`属性等对灯光进行调整，注意在使用阴影前需要一些物体来反映阴影效果：
```javascript
// 生成地面
const plane = new THING.Plane(100, 100);
// 生成两个box
const box1 = new THING.Box({
    position: [0,5,0]
});
const box2 = new THING.Box({
    position: [3,5,0],
    style: {
        color: 'blue'
    }
});

// 设置环境光的颜色
ambientLight.color = [0.8, 0.8, 1.0];
// 设置直射光的光照强度
mainLight.intensity = 0.5;
// 设置直射光的水平方向角度
mainLight.adapter.horzAngle = 80;
// 设置直射光的垂直方向角度
mainLight.adapter.vertAngle = 30;

// 直射光开启阴影
mainLight.castShadow = true;
// 设置阴影效果品质
mainLight.shadowQuality = THING.ShadowQualityType.High;
```

可以创建更多光源，目前支持`AmbientLight`，`DirectionalLight`，`HemisphereLight`，`SpotLight`等几种灯光
```javascript
// 创建朝向地面的聚光灯
const spotLight = new THING.SpotLight({
    rotation: [-90, 0, 0],
    position: [0, 10, 0],
    castShadow: true,
});

// 设置环境贴图提供的环境光照：
app.scene.envMapLightIntensity = 0;
```

## 后处理

后处理`Post-Processing`是指在渲染之后，对最终渲染的结果进行后期加工的过程，用于实现各种特殊效果。ThingJS中后期特效包括`全屏后期特效`与`逐物体后期特效`。

可以通过`camera.postEffect`来设置全屏后处理效果：

```javascript
// 获取当前的后期参数
const config = app.camera.postEffect;

// 设置后期参数
app.camera.postEffect = config;

// 修改后期设置示例
app.camera.postEffect.colorCorrection.gamma = 1.5; // 设置颜色矫正后期中的gamma值
app.camera.postEffect.chromaticAberration.enable = true; // 开启色偏特效

```

关于全屏后期特效，更多设置选项参考[摄像机后期效果组件类文档](https://wiki.uino.com/book/thingjs-api20/b82c53ce76e253b5715669e631d664ab.html)。

另外，`ThingJS`还支持特定物体的发光、勾边等逐物体后期特效。逐物体特效虽然支持物体设置各自的开关与强度值，但其余参数例如发光阈值、发光半径、总开关等等，需要通过`camera.effect`来进行全局设置：

```javascript
// 在物体的style.effect上支持设置逐物体特效glow，强度为1
object.style.effect.glow = 1;

// 通过camera.effect来对这些逐物体特效的整体效果做一些调节
app.camera.effect.glow.enable = true; // 总开关，如果为false，那么场景中所有物体的glow效果都会失效
app.camera.effect.glow.strength = 3.5; // 全局特效强度，实际特效强度 = 物体特效强度 * 全局特效强度
app.camera.effect.glow.threshold = 0.1; // glow特效的阈值
```

关于逐物体后期特效，更多设置选项参考：

* [摄像机逐物体特效管理的组件类](https://wiki.uino.com/book/thingjs-api20/052f51dced987af9556c2f233982743f.html) 
* [逐物体特效列表](https://wiki.uino.com/book/thingjs-api20/63169ef99ffd9d245dbe13da.html#StyleEffectResult)

