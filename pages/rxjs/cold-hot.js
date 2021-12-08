import React from "react";

const code = `
        import {interval, Subject} from 'rxjs';
        const cold$ = interval(2000);
        const hot$ = new Subject(); cold$.subscribe(hot$);
        hot$.subscribe(function(x) {console.log("firstO:", x)})
        setTimeout(function() {hot$.subscribe((x) => console.log("TwoO:", x))},
        4000)
`;
export default function ColdHotObservable() {
  return (
    <>
      <h2>Turn Cold observable into hot observable</h2>
      <pre>{code}</pre>

      <p>
        Subject既是Observable,也是Observer. 因此,可以当中间人. 对cold
        observable来说,它是observer 对应订阅它的observer来说, 它observable
        当subject被订阅时,内部会调用subject.next,把从cold$拿到的数据,发送给订阅它的observer,从而实现多播
      </p>
    </>
  );
}
