import { FastifyInstance } from 'fastify'
import axios from 'axios'
export async function AiBotRoutes(app: FastifyInstance) {
  app.get('/aibot/ligar', async (request, reply) => {
    try {
      const response = await axios.get('http://192.168.3.110/aibot/ligar')
      console.log(response.data)
      return reply.code(200).send(response.data)
    } catch (error) {
      return reply.code(400).send(error)
      console.log(error)
    }
  })
  app.get('/aibot/desligar', async (request, reply) => {
    try {
      const response = await axios.get('http://192.168.3.110/aibot/desligar')
      console.log(response.data)
      return reply.code(200).send(response.data)
    } catch (error) {
      return reply.code(400).send(error)
      console.log(error)
    }
  })
}
