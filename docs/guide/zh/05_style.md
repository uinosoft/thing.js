# 对象效果

## 显示隐藏
对象可以通过`visible`属性或`setVisible`接口，来设置显示隐藏状态，区别是`setVisible`接口可以**控制**是否传递这个显示隐藏状态给孩子：

```javascript
// 设置【自己】和【子对象】的显示隐藏状态，并修改visible值
obj.visible = value;

// 如果cascade参数为true，则设置【自己】和【子对象】的显示隐藏状态，并修改visible值
// 如果cascade参数为false，则仅设置【自己】的显示隐藏状态，并修改visible值，不影响【子对象】
obj.setVisible(value, cascade=true);

// setVisible接口支持回调，如下例子代码，隐藏除了名字为car01的其他对象
obj.setVisible(false, (obj)=> {
    if (obj.name == "car01")
        return false;
});
```

对象的`inherit.visible`属性可以设置这个对象是否跟随父亲的显示隐藏状态：
```javascript
// 是否继承父对象的显示隐藏状态，true, false, 更多参考枚举：THING.InheritType
obj.inherit.visible = false;
```

下面举几个例子，其中假设`building`对象包含多个`floor`对象：

```javascript
// 例子1：隐藏【自己】和【子对象】，并修改visible值为false
obj.visible = false;

// 例子2：只隐藏【自己】不隐藏子对象：
obj.setVisible(false, false);

// 例子3：建筑在显示状态时，先隐藏建筑，再显示某层中的一个对象，只显示这个对象
obj.inherit.visible = false;
building.visible = false;

// 例子4：隐藏父亲，打印孩子visible状态；
building.visible = false;
console.log(floor.visible); // 打印false
```
除了`visible`设置，还可以通过激活状态`active`来达到控制显示隐藏的效果，和`visible`属性不同的是，`active`属性不会修改子对象的显示隐藏状态，所以`active`可以用于 **需要保持子对象显示隐藏状态** 的情况，且`active`的性能更好（因为不会遍历孩子）：

```javascript
// 设置【自己】的激活状态，但不修改【子对象】的激活状态，false时，【子对象】会被隐藏
obj.active = false;
```

## 效果样式

对象可以通过`style`属性或`setStyle`接口，来设置样式：

```javascript
// 设置对象样式，设置【自己】和【子对象】的样式
obj.style = value;

// 如果cascade参数为true，则设置【自己】和【子对象】的样式
// 如果cascade参数为false，则仅设置【自己】的样式，不影响【子对象】
obj.setStyle(value, cascade=true);
```

对象的`inherit.style`属性可以设置这个对象是否跟随父亲的样式变化：
```javascript
// 是否继承父对象的样式，true, false, 更多参考枚举：THING.InheritType
obj.inherit.style = false;
```

下面设置`style`的例子代码：

```javascript
// 例子：
obj.style.color = '#ff0000'; // 修改颜色
obj.style.opacity = 0.5; // 修改透明度
// obj.style.image = 'images/some.png'; // 修改图片
obj.style.image = new THING.ImageTexture('images/some.png');
obj.style = {
    "color": "#FF0000",
    "outlineColor": "#0000FF"
}; // 多参数样式
```

对象淡入、淡出效果的，可以通过调用`fadeIn`、`fadeOut`实现：
```javascript
// 淡入
object.fadeIn({
    loop: 2, // 2 次，如果是true则是循环
    duration: 2000
});
// 淡出
object.fadeOut({
    duration: 2000
});
```

```javascript
// 开启批量渲染
app.query('*').makeInstancedDrawing();
```


