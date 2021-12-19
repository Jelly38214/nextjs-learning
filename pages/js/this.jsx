import React from "react";

export default function ThisPointTo() {
  return (
    <>
      <h2>
        this的指向<a href="https://juejin.cn/post/6844903496253177863">参考</a>
      </h2>
      <ul>
        <li>E5中, 函数this永远指向最后调用它的那个对象</li>
        <li>
          箭头函数的this始终指向<strong>函数定义时所在作用域</strong>的this
        </li>
      </ul>

      {/* TODO: 补充例子说明 */}
      <p>
        箭头函数中没有this绑定,必须通过查找作用域链来决定this的值.
        如果箭头函数被非箭头函数包含,则this指向的是最近一层非箭头函数的this
      </p>
      <p>
        对于函数当回调函数的情况,可以简单看出调用者是其this指向,比如window.setTimeout,
        DOMElement.addEventListener
      </p>
      <p>对于构造函数,this指向它返回的对象</p>
    </>
  );
}
