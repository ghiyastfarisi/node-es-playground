const { log } = console
const es = require('../elasticsearch/index')

/**
 * delete document.
 * @param {indexName} indexName index name.
 * @returns {value} The sum of the two numbers.
 */
const deleteDocument = async indexName => {
  try {
    return await es.client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      }
    })
  } catch (err) {
    log(`[ERROR] ${err}`)

    return 0
  }
}

/**
 * bulk index.
 * @param {dataToBeIndexed} dataToBeIndexed data to be indexed.
 * @returns {value} The sum of the two numbers.
 */
const bulkIndex = async dataToBeIndexed => {
  try {
    const created = await es.client.bulk({
      body: dataToBeIndexed
    })

    log(`[LOG] item indexed: ${created.items.length}`)

    return created.items.length
  } catch (err) {
    log(`[ERROR] ${err}`)

    return 0
  }
}

module.exports = {
  deleteDocument,
  bulkIndex
}
