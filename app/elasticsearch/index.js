require('dotenv').config()
const { log } = console
const ENV = process.env.NODE_ENV
const elasticsearch = require('elasticsearch')
const config = require('./config.json')[ENV]
const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI
})
/**
 * delete document.
 * @param {String} indexName index name.
 * @returns {Object} The sum of the two numbers.
 */
const deleteDocument = async indexName => {
  try {
    return await client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      }
    })
  } catch (err) {
    log(`[ERROR] ${err}`)

    throw err
  }
}
/**
 * bulk index.
 * @param {Array} dataToBeIndexed array of object data to be indexed.
 * @returns {Number} number of indexed data.
 */
const bulkIndex = async dataToBeIndexed => {
  try {
    const created = await client.bulk({
      body: dataToBeIndexed
    })

    log(`[LOG] item indexed: ${created.items.length}`)

    return created.items.length
  } catch (err) {
    log(`[ERROR] ${err}`)

    throw err
  }
}
module.exports = {
  deleteDocument,
  bulkIndex,
  client,
  config
}
