---
  title: 'Nodejs'
  date: '2022-02-15'
---

### 模块循环引用问题

两个模块相互引用,不会造成死循环.
当一个模块加载一个还未完成执行完的模块时, 也会返回它的 exports 对象(此时该 exports 对象可能还没有挂载所有的属性).
一个模块文件,它的 exports 对象初始化为一个空对象{}

模块 a

```js
console.log("a starting");
exports.done = false;
const b = require("./b");

console.log("in a, b.done=%j", b.done);
exports.done = true;
console.log("a done");
```

模块 b

```js
console.log("b starting");
exports.done = false;
const a = require("./a");

console.log("in b, a.done = %j", a.done);
exports.done = true;
console.log("b done");
```

入口

```js
console.log("main starting");
const a = require("./a");
const b = require("./b");

console.log("in main, a.done=%j, b.done=%j", a.done, b.done);
```

程序输出

```js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done=true, b.done=true
```

- https://cnodejs.org/topic/567104f61d2912ce2a35aa88
