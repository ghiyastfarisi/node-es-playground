const express = require('express')
const app = express()
const handler = require('../handler')

app.get('/search', handler.search)

module.exports = {
  app
}