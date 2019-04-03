const { log } = console
const es = require('../elasticsearch')

const search = async (req, res, next) => {
  const start = new Date().getTime()
  try {
    const mustQuery = [],
      sortQuery = [{'_id': 'desc'}]
    let { q,
      page,
      limit
    } = req.query
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 5
    }
    if (q) {
      const queryStringQuery = `${q}*`
      mustQuery.push({
        query_string: {
          default_operator: 'OR',
          default_field: 'name',
          query: queryStringQuery
        }
      })
    }
    const hit = await es.client.search({
      index: es.config.index,
      type: es.config.type,
      body: {
        from: ((page - 1) * limit),
        size: limit,
        query: {
          bool: {
            must: mustQuery
          }
        },
        sort: sortQuery
      }
    })
    const data = hit.hits.hits.map(result => result._source)
    const output = {
      header: {
        duration: (new Date().getTime() - start)
      },
      body: {
        total: hit.hits.total,
        data: data
      }
    }
    res.json(output)
  } catch (err) {
    log(`[ERROR]`, err)
    next(err)
  }
}

module.exports = {
  search
}