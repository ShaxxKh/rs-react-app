import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>{'Vite -> Next.js'}</title>
        <meta property="og:title" content="Vite -> Next.js" key="title" />
        <link rel="icon" href="/react.svg" sizes="any" />
      </Head>
      <body className="root">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
