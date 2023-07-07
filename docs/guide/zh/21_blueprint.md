# 蓝图

`ThingJS`的蓝图是一种可视化的开发方式，用户通过拖拽、连接、配置节点的操作，来创建对象并控制它们的行为和交互，从而降低了引擎的使用门槛。

![Blueprint](./images/blueprint.png "Blueprint")

**蓝图特点**：蓝图具有强复用性和低耦合性，只要按照标准编写一个蓝图节点，无论这个节点是使用`ThingJS`的`API`还是其他功能，都可以整合到任何一个蓝图中去，与其他蓝图节点协作。

**蓝图组成**：蓝图由节点`node` 和 连线`connection`组成，节点包括一些输入`inputs`和输出`outputs`的连接点与其他节点相连。

**节点分类**：蓝图节点大体上可以分为 事件节点、动作节点、对象节点、流程控制节点、综合节点（预制件、子图等）。

## 蓝图CLI

通过CLI下载蓝图测试工具：
```bash
> thing create my-blueprint
```
然后选择 `Common` 类型下的 `Dev Base` 选项创建蓝图测试工具。

切换目录并安装依赖后即可进入开发调试：
```bash
> cd my-blueprint
> npm i
> npm run dev
```
`nodes`目录下编写自定义蓝图节点，`src`目录下编写前端页面和交互逻辑，开发调试过程中会自动将`nodes`目录的代码编译打包到`dist`对应的目录中。




## 加载蓝图

如果需要在`ThingJS`项目中加载蓝图，可以使用`app.load()`方法。加载后得到一个蓝图对象`blueprint`，调用`run()`来运行。
```javascript
let asset = await app.load("/blueprints/bp01.json");
let blueprint = asset.blueprints[0];
```

可以对蓝图进行变量的设置，或触发蓝图中的事件
```javascript
// 设置变量
blueprint.setVar('power', 100);

// 触发蓝图中的事件
blueprint.triggerEvent('click', {...});
```

## 开发节点

如果想对蓝图进行扩展，可以通过自定义蓝图节点的方式，将你需要的功能封装到一个蓝图节点中，然后在蓝图中进行调用。

自定义蓝图节点，首先要继承蓝图节点类`THING.BLUEPRINT.BaseNode`，配置`config`中的`inputs`，`outputs`等属性，并实现`onExecute()`方法
```javascript
class MyNode extends THING.BLUEPRINT.BaseNode {
  // 节点配置信息
  static config = {
    // 蓝图节点的名称
    name: '点击事件',

    // 输入连接点
    inputs: [
      {
        name: '开始',
        type: 'exec',
      },
    ],

    // 输出连接点
    outputs: [
      {
        name: '下一步',
        type: 'callback',
      } 
    ]
  }

  // 蓝图节点执行时调用
  onExecute(data, inputs) {
  }

  // 蓝图节点停止时调用（一般是蓝图停止时）
  onStop() {
  }
}
```

在定义蓝图节点后，无论是在蓝图编辑环境下，还是在蓝图运行时，当使用自定义节点时，都需要对其进行注册。
```javascript
THING.BLUEPRINT.Utils.registerNode(MyNode);
```

*待补充……*


