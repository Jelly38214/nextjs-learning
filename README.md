pages 文件夹下面，每一个文件都对应着一个路由(除了\_app.js, \_document.js), 比如 `index.js` 对应根路径

如果需要多级路由，比如/day/subday, 就在 pages 下面新建一个 day 文件夹，再在 day 文件夹下新建`subday.js`文件即可

Next 的路由体系：pages 下面的路径表示路由路径

获取数据：

- 在页面中获取
- 在 app 中获取

Next.js Note:

- Polyfills `fetch()` on both the client and server. You don't need to import it.
- `getStaticProps`, `getStaticPaths` won't be included in the JS bundle for the browser. Besides, The API Route code also will not be part of your client bundel.

### [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

Next.js has built-in support for loading environment . variables from `.env.local` into `process.env`

In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`.

Various env file for various environment:

- .env for all environments
- .env.development for development environment
- .env.production for production environment
- .env.test for testing environment(NODE_ENV is set to 'test', though you usually don't need to do this manually as testing tools will address it for you.)
- .env.local always overrides the defaults set(this file should be added to `.gitignore`, as it is where secrets can be stored.)

### [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)

The preview mode works on both `getServeSideProps` and `getStaticProps` as well as `API Routes`.

API Routes will have access to `preview` and `previewData` under the request object.

```js
export default function myApiRoute(req, res) {
  const isPreview = req.preview;
  const previewData = req.previewData;
}
```
[See What is show!](http://localhost:3000/api/preview?secret=ORANGE&slug=/previewmode&count=1)


### [Automatic Staic Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

Pages have absence of `getServerSideProps`,`getInitialProps` will be considered as SSG page.

Caverats
  - Optimization will be turned off in pages without SSG when you have a custom App with `getInitialProps`. (For SSG Page, will it be turned off as well?)
  - For pages that are prerendered, its `ctx.req` is undefined.
  - During prerendering, the router's `query` object will be empty, but dynamic routes page's not the same.

### Custom Server

A custom server will remove important performance optimizations, like serverless functions and Automatic Static Optimization.

### Custom App

> Next.js use App component to initialize pages.

Adding a custom `getInitialProps` in your `App` will disable Automatic Static Optimization in pages with SSG.

Custom App currently does not support Next.js Data Fetching methods like `getStaticProps`,`getServerSideProps`.

### Costom Error Page

Next.js provides both 404 and 500 error page by default.

When you create both 404.js and _error.js page for customizing error page, Next.js will use 404.js first for 404, and _error.js for the rest of error.

But when you create only _error.js， this file will handle all of errors including 404 instead of Next.js's 404 page.

### Custom Document

A custom Document commonly used to augment your applications `<html>`and`<body>` tags.

> Custom Document is only rendered in the server, event handler like `onClick` won't work.

Building Blocks:

- Html: html
- Head：将囊括的标签放置到 head tag， 目前不清 jkkk 楚跟 next/head 有什么区别
- Main: 你的 App 组件挂载点，next 用<div id="__next">来包裹 App
- NextScript: Next 生产的 chunk 的加载脚本，一些 script tag

推荐结构组成部分顺序：

```jsx
<Html>
  <Head />
  <body>
    <Main />
    <NextScript />
  </body>
</Html>
```

其中组成部分顺序如果发生变化或者添加其他组件或者标签，会造成一些奇怪的问题：

- `<NextScript />`放在`<Main />`的前面

  - Q: React Uncaught Error: Target container is not a DOM element
  - A: 原因简单， 就是 next 的启动脚本初始化时找不到挂载点，因为 script 的位置在 Main 前面，先执行啦

- 用 div 标签或者其他标签，将整个组成部分包裹起来

  - 表现：全部内容，包裹 Main, NextScript 等内容，放置到 div 内，然后该 div 会被放置到 body 标签内

  - Q: 报错 -- Warning: next-head-count is missing. https://err.sh/next.js/next-head-count-missing
  - A: 根据 Nextjs 的源码：head-manager.ts L43, 首先 Next 会去获取`第一个head标签`，然后在这个标签内查找一个`name="next-head-count"的meta`，找不到就这个报错。因为所有的内容都被包裹起来放置到 body 内，此时这个特殊的 meta，存在路径为 `body -> head -> meta`，不是在第一个 head 内，所以 Next 报错

- 用其他标签替换 body 标签，比如 div

  - 表现：该 div 会包含你的 App 组件和 next 的 scripts，然后被放置到 body 标签下

- 在 body 标签外添加 metadata tag(title, style, base, link, meta, script, noscript)以及 head 标签

  - 表现：这些 metadata tag 会被`后置`到 head 标签内。如果添加的是 head 标签，那么该 head 内的 metadata 标签同样会被`后置`到 head 标签(等同多个 head 标签内容合并放到一个 head 标签下)，而非 metadata 标签的，则会被`前置`到 body 标签内

- 在 body 标签外添加`非metadata tag`(div, span, h1~等展示性的标签)

  - 表现：这些标签会被`前置`到 body 标签内

- 在 body 标签外添加`next/head`组件

  - 表现：该组件及其子自己等全部内容，全部不渲染到页面上

- 在`document/head`或者`next/head`内添加, 字符串/数字/undefined/null 等非 metadata 标签
  - 表现：报错 -- Warning: next-head-count is missing

NOTE:

- [getStaticProps details](https://nextjs.org/learn/basics/data-fetching/getstaticprops-details)
- [getStaticPaths details](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details)
- Pages that begin with `[` and end with `]` are dynamic routes in Next.js
