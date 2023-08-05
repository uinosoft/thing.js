# ThingJS

`ThingJS` is a web3d engine designed to help developers build "Digital Twin Visualization" applications more efficiently. Its goal is to achieve higher performance, richer visual effects, better scalability and easy-to-use.

# Install
<!-- install -->

## CDN
Global Build:
```javascript
<script src="https://cdn.uino.cn/thingjs/thing.min.js"></script>
<script>
    const app = new THING.App();
</script>
```

## NPM 
To install `ThingJS` cli, use:
```bash
> npm install @uinosoft/thing-cli -g
```
Then you can create `ThingJS` project, use:
```bash
> thing create project-name
```

# Usage
By default, `ThingJS` uses an element with `div3d` tag as the 3d rendering area.
```html
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>ThingJS</title>
        <meta charset="utf-8" />
        <script src="./labs/thing.min.js"></script>
    </head>

    <body style="margin: 0; padding: 0">
        <div id="div3d"></div>
    </body>
    
    <script type="module">
        const app = new THING.App({
            url: "./scenes/uino.gltf"
        });
    </script>
</html>
```

# License 

`ThingJS` engine is released under the [BSD](https://github.com/UINOSOFT/thingjs/blob/40f5a60d5e3e5f44a9013de036a1e064323409c6/LICENSE) license. 
