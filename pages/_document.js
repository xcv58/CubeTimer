import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html style={{ background: '#F5F5F5' }}>
        <Head>
          <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui' />
          <meta name='theme-color' content='#F5F5F5' />
          <link rel='manifest' href='static/manifest.json' />
          <link rel='stylesheet' type='text/css' href='/static/style.css' />
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
