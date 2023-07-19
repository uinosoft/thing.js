# 对象动画

如果`Entity`的资源中包含动画，可以用`playAnimation`方法来播放动画：
```javascript
obj = new THING.Entity({
    url: './models/spaceman.gltf'
});

// 指定名称播放动画
obj.playAnimation({
    name: "walk",
    loopType: THING.LoopType.Repeat
});
```

动画完成后的回调
```javascript
obj.playAnimation({
    name: "walk",
    onComplete: function() {
        console.log("animation complete");
    }
});
```

停止动画播放
```javascript
// 停止某个动画
obj.stopAnimation(animName);

// 停止所有动画
obj.stopAllAnimations();
```

可以通过`animations`属性来获取动画信息：
```javascript
let anim = obj.animations[0];
let duration = anim.duration;
let speed = anim.speed;
let state = anim.state;
```
> 注意：如果需要获取物体动画的信息，要在物体加载完成后才能获取

```javascript
// 打印物体所包含动画的名称
obj = new THING.Entity({
    url: './models/spaceman.gltf'
    onComplete: function(ev) {
        let obj = ev.object;
        let animName = obj.animations[0].name;
        console.log(animName);

        obj.playAnimation({name: animName})
    }
});
```

