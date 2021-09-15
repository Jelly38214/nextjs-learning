/**
 * This App component is the top-level component which will be common across all the different pages.
 * You CANNOT import global CSS anywhere else but _app.js
 * The reason that global CSS can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.
 */
import "../styles/global.css";
import App, { AppContext } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../store";

/**
 * @description Measuring performance
 * @param {*} metrics
 */
// export function reportWebVitals(metrics) {
//   console.log(metrics);
// }

// Component表示当前页面
// pageProps默认空对象, 可以预加载数据进行填充
export default function MyApp({ Component, pageProps, randomTimeInApp }) {
  // 来自MyApp.getInitialProps的返回对象里的pageProps会和页面组件的getServerSideProps/getStaticProp返回的对象的props做合并
  // props的优先级更高
  // pageProps = Object.assign(pageProps, props)
  console.log("App Start Render", pageProps, randomTimeInApp);
  const { initialReduxState } = pageProps;

  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

// Disable the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
// Must call App.getInitialProps(appContext) inside `getInitialProps` and merge the returned object into return value.
// Not support `getStaticProps` and `getServerSideProps`

// 跳转到拥有getStaticProps的页面,不会触发这个函数,因为这个页面的数据在build时就已经获取到,并被缓存下来
// 跳转到该页面时,直接把缓存好的数据给页面渲染即可
MyApp.getInitialProps = async (appContext) => {
  console.log("xxxxxxxxx", appContext.ctx.req.headers);
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  console.log("App getInitialProps Start", Object.keys(appContext));
  await sleep(); // 模拟请求耗时

  // 如果页面没有getInitialProps方法则返回{pageProps: {}}
  // 如果页面有getServerSideProps,则在App getInitialProps执行完毕后去执行getServerSideProps, 得到的结果,再赋予到pageProps
  const appProps = await App.getInitialProps(appContext);
  console.log("App getInitialProps End", appProps);

  return { ...appProps, randomTimeInApp: Date.now() }; // Next.js会merge这个对象, 再添加其他一些属性,一并挂到MyApp的this.props
};

function sleep() {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
}
