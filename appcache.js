const fs = require('fs')

const stats = JSON.parse(fs.readFileSync('.next/build-stats.json'))

const files = Object.entries(stats).map(([ file, { hash } ]) => {
  return `/_next/${hash}/${file}`
})

const HEAD = [
  'CACHE MANIFEST',
  '/',
  '/static/style.css'
]
const TAIL = [
  '',
  'NETWORK:',
  '*'
]

fs.writeFile('.next/cache.appcache', [ ...HEAD, ...files, ...TAIL ].join('\n'), (err) => {
  if (err) throw err
})
