import fastify, { FastifyInstance } from 'fastify'
import { AiBotRoutes } from '../routes/aiBot'
import { RoutesRobo } from '../routes/robo'
import websocket from '@fastify/websocket'

const app: FastifyInstance = fastify()

app.register(AiBotRoutes)
app.register(RoutesRobo)
app.register(websocket)

app.get('/', async () => {
  return 'Ai Bot 🤖🤖'
})

app.register(async function () {
  app.get(
    '/socket',
    { websocket: true },
    (socket /* WebSocket */ /* FastifyRequest */) => {
      socket.on('message', () => {
        // message.toString() === 'hi from client'
        socket.send('hi from server')
      })
    },
  )
})

app
  .listen({
    port: 8080,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Server Api rodando')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
