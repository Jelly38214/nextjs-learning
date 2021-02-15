
Next.js Note:
  - Polyfills `fetch()` on both the client and server. You don't need to import it.
  - `getStaticProps`, `getStaticPaths` won't be included in the JS bundle for the browser. Besides, The API Route code also will not be part of your client bundel.



NOTE:
  - [getStaticProps details](https://nextjs.org/learn/basics/data-fetching/getstaticprops-details)
  - [getStaticPaths details](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details)
  - Pages that begin with `[` and end with `]` are dynamic routes in Next.js