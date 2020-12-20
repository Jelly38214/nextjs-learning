pages 文件夹下面，每一个文件都对应着一个路由(除了\_app.js, \_document.js), 比如 `index.js` 对应根路径

如果需要多级路由，比如/day/subday, 就在 pages 下面新建一个 day 文件夹，再在 day 文件夹下新建`subday.js`文件即可

Next 的路由体系：pages 下面的路径表示路由路径

获取数据：

- 在页面中获取
- 在 app 中获取

Next.js Note:
  - Polyfills `fetch()` on both the client and server. You don't need to import it.
  - `getStaticProps`, `getStaticPaths` won't be included in the JS bundle for the browser. Besides, The API Route code also will not be part of your client bundel.



NOTE:
  - [getStaticProps details](https://nextjs.org/learn/basics/data-fetching/getstaticprops-details)
  - [getStaticPaths details](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details)
  - Pages that begin with `[` and end with `]` are dynamic routes in Next.js
