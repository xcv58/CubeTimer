import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui' />
          <meta name='theme-color' content='#FFF' />
          <link rel='manifest' href='static/manifest.json' />
          <title>Rubik's Cube Timer</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
