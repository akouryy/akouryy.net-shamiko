import { Head, Html, Main, NextScript } from 'next/document'
import type { JSX } from 'react'

export default function MyDocument(): JSX.Element {
  return (
    <Html lang='ja'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
