# 界面

这里的界面是指将对象以图标、顶牌、文字标签等方式进行展示的界面。

## 标记

标记`Marker`提供了一个图标对象，经常用于场景中对象头顶的提示牌、告警牌等，标记可以跟随对象运动，也可以单独绘制、点击，并进行一些缩放等效果动画：
```javascript
let box = new THING.Box(2,2,2);

// 创建标记并设置一些参数信息
const marker = new THING.Marker({
    name: 'Marker01',
    localPosition: [0, box.boundingBox.size[1] / 2, 0],
    parent: box,
    style: {
        image: new THING.ImageTexture('./alarm_build.png')
    },
    pivot: [0.5, 0],
    scale: [1, 1, 1]
})

// 设置标记缩放动画, 在scale [1, 1, 1] 与[2, 2, 2] 之前插值切换
marker.scaleTo([2, 2, 2], {
    duration: 2000,
    loopType: THING.LoopType.PingPong,
});
```

## 标签

标签`Label`，是一种封装了文本能力的对象，有2D或3D两种绘制方式：`Sprite`或`Plane`，默认是以2D方式绘制：
```javascript
// 2D文字标签
let label = new THING.Label({
    fontText: '文字标签 ',
    fontSize: 25,
    position: [0, 2, 0],
    renderType: THING.RenderType.Plane
});
```
标签支持富文本方式，可以提供HTML作为参数：
```javascript
let richLabel = new THING.Label({           // 填充的文字标签
    fontText: `
    <p>文字1
        <span style="color: #E36C09;">文字2</span>
        <span style="font-size: 20px;">文字3
        <span style="font-size: 30px; color: #974806;">文字4</span>
        </span>
    </p>`,
    fontColor: 'orange',
    richText: true,
    position: [0, 2, 0]
});
```

下面代码为对象添加一个标签，标签会顶在Box上面：
```javascript
let box = new THING.Box(2,2,2);
let label = new THING.Label({
    parent: box,
    localPosition: [0, box.boundingBox.size[1], 0],
    fontText: 'Box_01',
    fontSize: 26,
    fontColor: "#FF0000"
});
```

## 页面元素
可以直接给对象增加一个`CSS2DComponent` 或`CSS3DComponent`组件，通过 DOM 元素来设置一个页面元素的头顶牌效果：
```html
  <div id="board1" style="width: 100px; height: 100px; background: red; position: absolute; left: -100px;">
    CSS2D
  </div>
  <div id="board2" style="width: 100px; height: 100px; background: green; position: absolute; left: -100px">
    CSS3D
  </div>
```
```javascript
let box = new THING.Box(2,2,2);

// 2D页面元素
box.addComponent(THING.DOM.CSS2DComponent, 'sign1');
box.sign1.domElement = document.getElementById('board1');
box.sign1.offset = [0, 3, 0];

// 3D页面元素
box.addComponent(THING.DOM.CSS3DComponent, 'sign2');
box.sign2.domElement = document.getElementById('board2');
box.sign2.pivot = [0.5, -0.5];
box.sign2.renderType = THING.RenderType.Plane;
```

## 页面视图
下面代码可创建一个内嵌页面的三维对象：
```javascript
// 内嵌页面
var webView = new THING.WebView({
    position: [0, 2, 0],
    renderType: THING.RenderType.Plane,
    url: 'https://www.thingjs.com',
    scale: [19.20, 10.8, 1],
    domWidth: 1920,
    domHeight: 1080,
});
```

