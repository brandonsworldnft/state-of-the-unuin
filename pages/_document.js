import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" href="/fonts/DrukCond.otf" as="font" crossOrigin="" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
