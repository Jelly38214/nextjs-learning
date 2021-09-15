/**
 * Html, Head, Main and NextScript are required for the page to be properly rendered.
 * A custom Document is commonly used to augment your applications <html> and <body>
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // ctx object is equivalent to the one received in `getInitialProps`, with one addition -- renderPage: Function
  static async getInitialProps(ctx) {
    console.log("Document Start getInitialProps", Object.keys(ctx));
    const initialProps = await Document.getInitialProps(ctx);
    console.log("After Document.getInitialProps execution", Object.keys(initialProps));
    return { ...initialProps, name: "Jelly" }; // {html: string, head: ReactElement[], styles:[]}
  }

  render() {
    console.log("Document start Render:", Object.keys(this.props.__NEXT_DATA__.props.pageProps));
    return (
      <Html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-V43PDGE028"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5KHHST5');
            `,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V43PDGE028');`,
            }}
          ></script>
        </Head>
        <body>
          {/* Will not pass name to Main */}
          <Main name={this.props.name} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
