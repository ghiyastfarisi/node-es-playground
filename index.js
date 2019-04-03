require('dotenv').config()
const http = require('http')
const { log } = console
const routes = require('./app/routes')
const packageJson = require('./package')
port = process.env.PORT || packageJson.port
name = packageJson.name
version = packageJson.version
const { init } = require('./app/elasticsearch/init')

init()
.catch(err => {
  log(err)
})

http.createServer(routes.app).listen(port, () => {
  log(`\n${name}::${port} - v${version}`)
})
