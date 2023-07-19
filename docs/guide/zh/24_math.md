# 数学

`ThingJS`引擎尽量降低3D专业概念的使用，会在接口中尽量减少数学相关的内容。这里列举一些和数学相关的一些常用概念：
* 三维向量：可以直接使用数组`[x, y, z]`；
* 四元数：可以直接使用数组`[x, y, z, w]`；
* 颜色值：使用`#FF0000`或数组`[r, g, b]`（需要注意的是`rgb`取值范围是0~1之间），也可以使用`'red'`, `'green'`等内置颜色的字符串；
* 时间：单位一般为毫秒`ms`，如：`2000ms`为2秒。

`ThingJS`引擎数学相关的方法都在`THING.Math`名字空间下，其中一些常用的方法举例：
```javascript
// 向量相加
let v3 = THING.Math.addVector(v1, v2);

// 向量相减少
let v3 = THING.Math.subVector(v1, v2);

// 向量长度
let len = THING.Math.getVectorLength(v);

// 计算向量差值
let len = THING.Math.lerpVector(start, end, alpha);

// 计算距离
let dis = THING.Math.getDistance(v1, v2);

// 判断向量相等
let dis = THING.Math.equalsVector(v1, v2);

// 随机三维点
THING.Math.randomVector([-20, -20, -20], [20, 20, 20]);

// 随机数组中的元素
THING.Math.randomFromArray(['red', 'green', 'orange', 'yellow', 'gray']);

// 随机对象中的元素，比如随机一个枚举中的枚举值
THING.Math.randomFromObject(THING.ViewModeType);
```
更多方法参见`THING.Math`的文档。

