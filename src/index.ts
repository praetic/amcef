import http from 'http'
import app from './app'
import config from 'config'
import './db/models'

const serverConfig = config.get('server')
const port = serverConfig.port

const httpServer = http.createServer(app)
httpServer.listen(port, () => {
  console.info(`HTTP Server running on port ${port}`)
})
