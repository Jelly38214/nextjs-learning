/**
 * This App component is the top-level component which will be common across all the different pages.
 * You CANNOT import global CSS anywhere else but _app.js
 * The reason that global CSS can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.
 */
import "../styles/global.css";

/**
 * @description Measuring performance
 * @param {*} metrics 
 */
export function  reportWebVitals(metrics) {
  console.log(metrics)
}

export default function App({ Component, pageProps }) {
  console.log('Custom App Start.')
  return <Component {...pageProps} />;
}
