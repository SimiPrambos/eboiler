import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import lumie from 'lumie'

import logger from '@lib/logger'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

lumie.load(app, {
  preURL: "/",
  verbose: true,
  ignore: ["*.spec"],
  controllers_path: path.join(__dirname, "controllers")
})

const { HOST, PORT } = process.env
const server = app.listen(PORT || 3000, HOST || "127.0.0.1")

process.on('unhandledRejection', (reason, p) =>
  // TODO close server or notify to another service ex. sentry
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () => {
  const { address, port } = server.address()
  logger.info(`Server listening at http://${address}:${port}`)
})
