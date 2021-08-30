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

When you create both 404.js and \_error.js page for customizing error page, Next.js will use 404.js first for 404, and \_error.js for the rest of error.

But when you create only \_error.js， this file will handle all of errors including 404 instead of Next.js's 404 page.

### Custom Document

A custom Document commonly used to augment your applications `<html>`and`<body>` tags.

> Custom Document is only rendered in the server, event handler like `onClick` won't work.

Building Blocks:

- Html: html
- Head：将囊括的标签放置到 head tag， 目前不清楚跟 next/head 有什么区别
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

[SSG with data 的触发](https://nextjs.org/learn/basics/data-fetching/with-data):
In Next.js, when you export a `page component`, you can also export an async function called `getStaticProps`, if you do this, then

- getStaticProps runs at build time in productions
- inside the function, you can fetch external data and send it as props to the page.
- Note: In development mode, `getStaticProps` runs on each request instead.

```js
  export default function Home(props) {...}
  export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc,
    const data = ...

    // The value of the `props` key will be passed to the `Home` component.
    return {
      props: ...
    }
  }
```

[Server-side Rendering](https://nextjs.org/learn/basics/data-fetching/request-time):
To use Server-side Rendering, you need to export `getServerSideProps` instead of `getStaticProps` from your page.

```js
  export async function getServerSideProps(context) {
    // fetch data
    return {
      props: ...
    }
  }
```

[Static Generation without Data + Fetch Data on the Client-Side](https://nextjs.org/learn/basics/data-fetching/request-time)

> Pages that begin with `[` and end with `]` are dynamic routes in Next.js
> [Dynamic Route SSG](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data):

- getStaticPats execute firstly which returns an array of possible values
- getStaticProps which fetches necessary data

`fallback: false`意思是,但 path 没有在 getStaticPaths 定义,将匹配 404 页面
`fallback: true`,找不到页面时,Next.js 会在第一次访问时提供一个 fallback 版本的页面, 之后的访问 Next.js 则能正常提供正确的页面(In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.)
`fallback: 'blocking'`时, 将会为这个未知路径进行预渲染,触发 getStaticProps,并缓存下生成好的页面

[API Routes](https://nextjs.org/learn/basics/api-routes/api-routes-details)
不要在`getStaticProps`,`getStaticPaths`里请求 API Routes, 而是直接在它们内部去获取数据(database, redis)
因为 getStaticProps, getStaticPaths 只在服务端运行

[Preview Mode]()

[Custom APP](https://nextjs.org/docs/advanced-features/custom-app)
App Component is used to initialize pages.


[Context Object](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object)
- AppTree
- pathname - current route. That is the path of the page in `/pages`
- query - Query string section of URL parsed as an object
- asPath - String of the actual path(including the query) shown in the browser
- req - HTTP request object(server only)
- res - HTTP response object(server only)
- err - Error object if any error is encountered during the rendering.

> `getInitialProps`既可以在服务端运行,也可以在客户端运行
不用文件的getInitialProps接收到的参数也不一样

_document的getInitialProps(ctx & {renderPage})

_app的getInitialProps({AppTree, Component, router, ctx})

Page不推荐使用getInitialProps方法, 推荐使用getStaticProps, getServerSideProps

[notFound in getStaticProps, getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching)
在getStaticProps返回{notFound: true}会导航到404页面

[Reading File](https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd)
Since Next.js compiles your code into a separate directory, you can't use `__dirname`, 
as the path it will return will be different from the pages directory.
Instead you can use `process.cwd()` which gives you the directory where Next.js is being executed.

getStaticProps必须要返回一个Object,包含:
- props?: object
- revalidate?: boolean|number
- notFound?: boolean
- redirect?: {destination: string; permanent?: boolean; statusCode?: number}

getServerSideProps必须要返回一个Object,包含:
- props?: object
- notFound?: boolean
- redirect?: {destination: string; permanent?: boolean; statusCode?: number}


一个Page Component,要么使用`挂在组件上`的getInitialProps, 要么export async getStaticProps/getStaticPaths, 要么export async getServerSideProps
不能混合使用三者


根据测试,由于getInitialProps方法在client和server端都能运行,因此不能写node相关代码
getServerSideProps则可以写node相关代码

一旦一个页面使用了getInitialProps或者getServerSideProps, 每次切换该页面,_app的getInitialProps都会触发

> 整个Next.js请求流程
1. 首先_app.js的getInitialProps会执行
  - 在里面,必须执行await App.getInitialProps(appContext), 这里其实是去执行当前页面的getInitialProps.如果页面没有getInitialProps,那么返回{pageProps: {}}.如果有,则执行,并直接赋值给pageProps
  - 得到来自页面返回的数据,并放回到pageProps字段下, 返回一个对象{pageProps: {props: object}}
  - 如果页面没有getInitialProps ,但有getServerSideProps/getStaticProps, 则执行它们,返回{props: object}
2. App Component 开始执行, 它接收两个参数,一个是Component, 它是当前页面对应的组件; 一个是pageProps,是来自第一步得到的结果(Object.assign(pageProps, props), 页面组件的结果优先级高),用于传递给Component,当作Component的props, 用法<Component {...pageProps.props}>
3. 当前页面得到了来自App给予的props,开始渲染
4. _document.js拿到来自App Component, 开始渲染整个页面,并生成html文件

需要注意一点,只要一个页面组件,使用了getInitialProps或者getServerSideProps, 不管是刷新,还是页面通过next/link等路由方式跳转,这个页面一定会触发_app.js的getInitialProps

总结: 页面的getInitialProps/getServerSideProps一定是在_app.js的getInitialProps里面被触发执行,然后根据需要组成需要的数据对象:{pageProps: {props: object}}并返回,然后在_app.js的App Component使用组成好的数据完成整个组件树的渲染

NOTE:

- [getStaticProps details](https://nextjs.org/learn/basics/data-fetching/getstaticprops-details)
- [getStaticPaths details](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details)
- Pages that begin with `[` and end with `]` are dynamic routes in Next.js
- [Context Object](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object)
