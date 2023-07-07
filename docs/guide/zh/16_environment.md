# 环境

引擎支持对背景、天空、环境图、灯光、后期效果等进行设置。

## 背景和天空

可以通过`app.background`属性，来设置背景颜色或天空盒：

```javascript
// 设置背景颜色
app.background = "#0000FF";
```

设置天空盒，需要指定6个图片文件的地址：
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

更简单的方法是直接指定一个路径，但需要确保路径里面包含和上面文件名相同的6个图片文件，引擎内部会自动按上面的文件名去加载这些图片：
```javascript
app.background = baseURL;
```

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
app.envMap = null;
obj.style.envMap = null;
```

另外，可以通过`app.camera.fog`可以设置雾的效果：
```javascript
app.camera.fog.enable = true;
app.camera.fog.far = 300;
app.camera.fog.color = 'white';
```

## 灯光

`ThingJS`引擎在场景中默认提供了 环境光 和 一个主光源，可以通过`app.scene.ambientLight` 和 `app.scene.mainLight` 来访问：
```javascript
// 场景默认的 环境光 和 直射光
const ambientLight = app.scene.ambientLight;
const mainLight = app.scene.mainLight;
```

可以通过灯光的颜色`color`属性、强度`intensity`属性、阴影`castShadow`属性等对灯光进行调整：
```javascript
// 修改默认灯光的参数
ambientLight.color = [0.8, 0.8, 1.0];
mainLight.intensity = 0.5;
mainLight.adapter.horzAngle = 80;

// 直射光可以支持开启阴影
mainLight.castShadow = true;
mainLight.shadowQuality = THING.ShadowQualityType.High;
```

可以创建更多光源，目前支持`AmbientLight`，`DirectionalLight`，`HemisphereLight`，`SpotLight`等几种灯光
```javascript
// 创建聚光灯
const spotLight = new THING.SpotLight();
spotLight.position = [0, 1, 0];

// 设置环境贴图提供的环境光照：
app.scene.envMapLightIntensity = 0;
```

## 后处理

后处理`Post-Processing`是指在渲染之后，对最终渲染的结果进行后期加工的过程，用于实现各种特殊效果。可以通过`camera.postEffect`来设置后处理效果：

```javascript
// 获取当前的后期参数
const config = app.camera.postEffect;

// 设置后期参数
app.camera.postEffect = config;

// 修改后期设置示例
app.camera.postEffect.colorCorrection.gamma = 1.5;
app.camera.postEffect.chromaticAberration.enable = true;

// 物体的style.effect上还支持设置一些逐物体特效
object.style.effect.glow = 1;

// 逐物体特效，可以通过相机的effects接口进行一些整体参数控制
app.camera.effect.glow.strength = 3.5;
app.camera.effect.glow.threshold = 0.1;
```

