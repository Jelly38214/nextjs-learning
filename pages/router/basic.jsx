import React, { useEffect } from "react";

export default function FrontEndBrowserBasic() {
  /**
   * Hash 方式
   * hash值的变化不会导致浏览器刷新且会触发hashchange事件
   * 浏览器的前进后退也能对其控制与更改
   */
  useEffect(() => {
    class HashRouter {
      routers; // 存储不同hash值对应的回调

      constructor() {
        this.routers = {};
        window.addEventListener("hashchange", this.load.bind(this), false);
      }

      // 注册每一个视图
      register(hash, callback = () => {}) {
        this.routers[hash] = callback;
      }

      // 注册首页
      registerIndex(callback = () => {}) {
        this.routers["index"] = callback;
      }

      registerNotFound(callback = () => {}) {
        this.routers["404"] = callback;
      }

      registerError(callback = () => {}) {
        this.routers["error"] = callback;
      }

      load() {
        let hash = location.hash.slice(1),
          handler;

        if (!hash) {
          handler = this.routers["index"];
        } else if (!this.routers.hasOwnProperty(hash)) {
          handler = this.routers["404"] || (() => {});
        } else {
          handler = this.routers[hash];
        }

        try {
          handler.apply(this);
        } catch (error) {
          console.error(error);
          (this.routers["error"] || (() => {})).call(this, error);
        }
      }
    }

    let router = new HashRouter();
    let container = document.getElementById("hash-container");

    router.registerIndex(() => (container.innerHTML = "首页"));

    router.register("/page1", () => (container.innerHTML = "page1"));
    router.register("/page2", () => (container.innerHTML = "page2"));
    router.register("/page3", () => (container.innerHTML = "page3"));
    router.register("/page5", () => {
      throw new Error("page5 Error");
    });

    router.registerNotFound(() => (container.innerHTML = "404"));
    router.registerError(() => (container.innerHTML = "throw an error."));

    router.load(); // 加载首屏内容
  }, []);

  /**
   * History 方式
   */
  useEffect(() => {
    class HistoryRouter {
      constructor() {
        this.routers = {};
        this.listenLink();
        this.listenPopState();
      }

      listenPopState() {
        window.addEventListener(
          "popstate",
          (event) => {
            this.dealPathHandler(event.state?.path ?? "");
          },
          false
        );
      }

      listenLink() {
        window.addEventListener(
          "click",
          (event) => {
            const target = event.target;

            if (
              target.tagName.toLowerCase() === "a" &&
              target.getAttribute("href") !== "#"
            ) {
              event.preventDefault();
              this.assign(target.getAttribute("href")); // 暂时不处理http的情况
            }
          },
          false
        );
      }

      load() {
        this.dealPathHandler(location.pathname);
      }

      register(path, callback = () => {}) {
        this.routers[path] = callback;
      }

      registerIndex(callback = () => {}) {
        this.routers["/"] = callback;
      }

      registerNotFound(callback = () => {}) {
        this.routers["404"] = callback;
      }

      registerError(callback = () => {}) {
        this.routers["error"] = callback;
      }

      assign(path) {
        history.pushState({ path }, null, path);
        this.dealPathHandler(path); // 必须要有这个
      }
      replace(path) {
        history.replaceState({ path }, null, path);
        this.dealPathHandler(path);
      }
      dealPathHandler(path) {
        let handler;
        if (!this.routers.hasOwnProperty(path)) {
          handler = this.routers["404"] || (() => {});
        } else {
          handler = this.routers[path];
        }

        try {
          handler.call(this);
        } catch (error) {
          console.error(error);
          (this.routers["error"] || (() => {})).call(this, error);
        }
      }
    }

    const router = new HistoryRouter();
    const container = document.getElementById("history-container");

    router.registerIndex(() => (container.innerHTML = "首页"));
    router.registerNotFound(() => (container.innerHTML = "404"));
    router.registerError(
      (error) => ((container.innerHTML = "throw an error:"), +error.message)
    );

    router.register("/page1", () => (container.innerHTML = "page1"));
    router.register("/page2", () => (container.innerHTML = "page2"));
    router.register("/page3", () => (container.innerHTML = "page3"));
    router.register("/page4", () => {
      throw new Error("page4 Error");
    });

    document.getElementById("btn").onclick = () => router.assign("/page2");
    router.load();
  }, []);

  return (
    <>
      <h2>
        前端路由基本原理{" "}
        <a
          target="_blank"
          href="https://juejin.cn/post/6844903890278694919#sdf"
        >
          参考
        </a>
      </h2>
      <ol>
        <li>
          监听浏览器url的变化: hashchange 函数, location.hash获取当前hash值
        </li>
        <li>改变url且不让浏览器刷新: 通过a标签锚点的方式改变hash</li>
      </ol>

      <section>
        <h3>Hash 方式</h3>
        <ol>
          <li>
            监听 hashchange 函数, hashchange event对象包含着完整的oldURL,
            newURL; location.hash获取当前hash值
          </li>
          <li> 通过a标签锚点的方式改变hash</li>
        </ol>
        <div id="nav">
          <a href="#">首页</a>
          <a href="#/page1">page1</a>
          <a href="#/page2">page2</a>
          <a href="#/page3">page3</a>
          <a href="#/page4">page4</a>
          <a href="#/page5">page5Error</a>
        </div>
        <div id="hash-container"></div>
      </section>

      <section>
        <h3>History 方式</h3>
        <p>页面url的改变由下面四种方式引起(手动在地址栏输入不考虑)</p>
        <ul>
          <li>点击浏览器的前进后退按钮</li>
          <li>点击a标签</li>
          <li>通过JS调用history.pushState/replaceState方法</li>
        </ul>
        <p>
          history前进后退的方法: history.go(number), history.back(),
          history.forward()
        </p>
        <p>HTML5的规范中,新增几个API</p>
        <ol>
          <li>
            history.pushState(
            {JSON.stringify({ state: "object", title: "null", url: "string" })}
            ); // 添加新的状态到历史状态栈
          </li>
          <li>
            history.replaceState(
            {JSON.stringify({ state: "object", title: "null", url: "string" })}
            ); // 用新的状态代替当前状态
          </li>
          <li>history.state; // 返回当前状态对象</li>
        </ol>
        <p>
          history.pushState, history.replaceState可以改变url且不刷新页面.
          <strong>
            但仅仅调用这两个方法是不会触发popstate事件,只有在浏览器的前进后退按钮被点击或者调用history.go/back/forward时才会触发popstate事件
          </strong>
        </p>
        <div>
          <a href="/page1">page1</a>
          <a href="/page2">page2</a>
          <a href="/page3">page3</a>
          <a href="/page4">page4</a>
          <a href="/page5">page5</a>
          <button id="btn">page2</button>
        </div>
        <div id="history-container"></div>
      </section>
    </>
  );
}
