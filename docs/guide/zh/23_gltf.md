# GLTF场景

## 格式
`ThingJS`支持`gltf`文件作为场景数据，当`gltf`文件中，包含有对象信息时，`ThingJS`会自动将这些对象初始化：
```javascript
{
    "nodes" : [
        {
            "name" : "Building01",        
            "children" : [0，1，2],
            "extras" : {
                "type" : "Building",
                "tags" : "Building"
            }
        }
    ]
}
```
从上面的`gltf`中可以看到，当`node`下的`extras`字段，包含`type`属性时，则`ThingJS`会认为这个`node`是一个对象，并会按照`type`属性的类型进行初始化（前提是已经注册了这个类型）。其他还有`tags`等属性也会被对象初始化。

在`gltf`扩展中，还可以增加`TJS_render_settings`扩展，用来增加后期效果的设置，这样在加载`gltf`场景时，会自动加载这些渲染设置：
```javascript
{
    "extensionsUsed": ["TJS_render_settings"],
    "extensions": {
        "TJS_render_settings": {
            "environment": {},
            "lights": {},
            "postEffects": {}
        }
    }
}
```

> 注意：上述格式可以手动在`gltf`中进行修改，但更方便的做法是，使用`ThingJS`提供的导出插件（见下文）。

## 导出插件

在建模软件`Blender`中，你可以直接修改物体的**自定义属性**，来设置`type`、`tags`等属性，然后导出`gltf`到`ThingJS`中使用。也可以直接使用`ThingJS` 提供一个免费的`Blender`插件，更方便地进行设置，并在`Blender`里进行预览：

