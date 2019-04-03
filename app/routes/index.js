const app = require('express').express()
const handler = require('../handler')

app.get('/search', handler.search)

module.exports = {
  app
}