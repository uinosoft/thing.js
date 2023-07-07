# 安装

## 通过 CDN 使用

全局引入使用
```javascript
<script src="https://cdn.uino.cn/thingjs-cli/thing.js"></script>
<script type="module">
    const app = new THING.App();
</script>
```

ESModule 方式使用
```javascript
<script type="module">
    import { App, Component } from 'https://cdn.uino.cn/thingjs-cli/thing.esm.js';
    const app = new App();
</script>
```

Import maps 方式使用
```javascript
<script type="importmap">
{
    "imports": { "@thing.js/core": "https://cdn.uino.cn/thingjs-cli/thing.esm.js"}
}
</script>
<script type="module">
    import { App, Component } from '@thing.js/core';
    const app = new App();
</script>
```

## 通过 NPM 安装

在当前工程下，安装依赖：
```bash
> npm install @thing.js/core --save	
```

引入全部模块：
```javascript
import * as THING from '@thing.js/core';
```

按需引入模块：
```javascript
import { App, Component } from '@thing.js/core';
```

## 通过 CLI 安装

全局安装
```bash
> npm install @thing.js/cli -g
```

使用`thing create`创建项目，提供常用的 `Simple`、`Vue`、`React` 等模板。
```bash
> thing create project-name
```
![CLI使用示例](./images/cli.gif)

> 注意，上面的安装中，如果在`Windows PowerShell`下，需要增加引号：`'@thing.js/cli'`

