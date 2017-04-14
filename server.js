// const { createServer } = require('http')
// const { parse } = require('url')
// const handle = app.getRequestHandler()
// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true)
//     handle(req, res, parsedUrl)
//   }).listen(3000, err => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// })

const express = require('express')
const path = require('path')
const next = require('next')
const mobxReact = require('mobx-react')

mobxReact.useStaticRendering(true)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(_ => {
    const server = express()

    server.get('/cache.appcache', (req, res) => {
      if (dev) {
        res.sendFile(path.resolve('./static/dev.appcache'))
      } else {
        res.sendFile(path.resolve('./.next/cache.appcache'))
      }
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(3000, err => {
      if (err) throw err

      console.log('> App running on port 3000')
    })
  })
