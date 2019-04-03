require('dotenv').config()
const { init } = require('./app/elasticsearch/init')
const http = require('http')
const { log } = console
const routes = require('./app/routes')
const packageJson = require('./package')
port = process.env.PORT || packageJson.port
name = packageJson.name
version = packageJson.version
init()
http.createServer(routes.app).listen(port, () => {
  log(`\n${name}::${port} - v${version}`)
})
