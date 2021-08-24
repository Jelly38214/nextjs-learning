/**
 * This App component is the top-level component which will be common across all the different pages.
 * You CANNOT import global CSS anywhere else but _app.js
 * The reason that global CSS can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.
 */
import "../styles/global.css";
import App from "next/app";

/**
 * @description Measuring performance
 * @param {*} metrics
 */
export function reportWebVitals(metrics) {
  console.log(metrics);
}

// Component表示当前页面
// pageProps默认空对象, 可以预加载数据进行填充
export default function MyApp({ Component, pageProps }) {
  console.log("App Start Render");
  return <Component {...pageProps} />;
}

// Disable the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
// Must call App.getInitialProps(appContext) inside `getInitialProps` and merge the returned object into return value.
// Not support `getStaticProps` and `getServerSideProps`
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  console.log("App Start getInitialProps", Object.keys(appContext));
  const appProps = await App.getInitialProps(appContext); // {pageProps: {}}
  console.log('after App.getInitialProps')
  appProps.pageProps.time = Math.floor(Math.random() * 10)

  return { ...appProps };
};
