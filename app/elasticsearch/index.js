require('dotenv').config()
const ENV = process.env.NODE_ENV
const elasticsearch = require('elasticsearch')
const config = require('./config.json')[ENV]
const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI
})

module.exports = {
  client,
  config
}
