const { log } = console
const es = require('./index')

const toBeIndex = [
  {
    id: 1,
    name: 'Pikachu',
    created: new Date(),
    power: {
      attack: 4000,
      hp: 1000,
      mp: 1000
    }
  },{
    id: 2,
    name: 'Bulbasaur',
    created: new Date(),
    power: {
      attack: 3200,
      hp: 2000,
      mp: 1200
    }
  },{
    id: 3,
    name: 'Charmander',
    created: new Date(),
    power: {
      attack: 3900,
      hp: 1500,
      mp: 2000
    }
  },{
    id: 4,
    name: 'Squirtle',
    created: new Date(),
    power: {
      attack: 3600,
      hp: 2800,
      mp: 1900
    }
  }
]

const init = async () => {
  log(`>> initiate elasticsearch seeding...`)
  log(`>> es.config: `, es.config)
  try {
    // check index
    const indexExists = await es.client.indices.exists({
      index: es.config.index
    })
    if (!indexExists) {
      log(`>> creating index...`)
      // create index
      await es.client.indices.create({
        index: es.config.index,
        body: {
          type: es.config.type
        }
      })
    }
    const elasticsearchMapping = []
    toBeIndex.forEach(element => {
      elasticsearchMapping.push({
        index: {
          _index: es.config.index,
          _type: es.config.type,
          _id: element.id
        }
      })
      elasticsearchMapping.push({
        id: element.id,
        name: element.name,
        created: element.created,
        power: {
          attack: element.power.attack,
          hit_point: element.power.hp,
          mana_point: element.power.mp
        }
      })
    })
    await es.bulkIndex(elasticsearchMapping)
  } catch (err) {
    throw err
  }
}

module.exports = {
  init
}