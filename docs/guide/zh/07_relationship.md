# 对象关系

在`ThingJS`引擎中，对象和对象之间最常用的是父子关系（或叫属于关系），此外还可以创建各种自定义关系。

## 创建关系
可以通过`new THING.Relationship`来创建自定义关系，需要制定关系类型`type`、关系的源对象`source`和目标对象`target`（源和目标可以是多个对象），关系还可指定标签`tags`和自定义属性`userData`，下面是几个创建关系的例子：
```javascript
// 创建关系
let rls = new THING.Relationship({
    type: "control",
    name: "control01",
    source: obj1,
    target: obj2,
});

// 创建关系，更多参数
let rls2 = new THING.Relationship({
    type: "control",
    name: "control02",
    source: obj1,
    target: [obj2, obj3]
    // queryDirection: THING.RelationshipDirection.Out // 默认Out
});

// 创建多对象关系
let rls3 = new THING.Relationship({
    type: "group",
    source: [obj1, obj2, obj3]
});
```

创建关系后，可以通过`obj.relationships`来访问到对象关系：
```javascript
let rls = obj.relationships[0];
console.log(rls.type+", "+rls.source+", "+rls.target);
```

## 查询关系
可以通过`app.queryRelationships()`在所有对象的关系中进行查询：
```javascript
let rls = app.queryRelationships({
    "type": "control"
});
```
或者通过`obj.relationship.query()`在这个对象的关系范围中进行查询：
```javascript
let objs = obj.relationship.query({
    "type": "control"
});

let objs = [];
objs = obj.relationship.queryByType("control");
objs = obj.relationship.queryByName("control01");
```

## 删除关系
通过关系的`destroy`接口可以删除关系，当关系的相关对象被销毁时，也会同步删除相关的关系：
```javascript
let rls = app.queryRelationships({
    "type": "control"
});
rls.forEach(r => {
    r.destroy();
})
```

