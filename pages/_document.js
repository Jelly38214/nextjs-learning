/**
 * Html, Head, Main and NextScript are required for the page to be properly rendered.
 */
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    console.log('Custom Document Start getInitialProps')
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    console.log('Custom Document Start')
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;