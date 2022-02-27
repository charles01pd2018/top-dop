import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head >
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" href="/static/fonts/ABeeZee-Regular.ttf" as="font" crossOrigin="" /> 
          <link rel="preload" href="/static/fonts/AmaticSC-Bold.ttf" as="font" crossOrigin="" /> 
        </Head>
        <body className='loading'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;