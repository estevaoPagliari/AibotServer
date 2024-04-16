import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function RoutesRobo(app: FastifyInstance) {
  app.get('/robo', async (request, reply) => {
    try {
      const robo = await prisma.robo.findMany()
      return reply.code(200).send(robo)
    } catch (error) {
      return reply.code(500).send({ message: 'Erro ao buscar Lista de Robo' })
    }
  })

  app.post('/robo/:macaddress', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        macaddress: z.string(),
      })
      const { macaddress } = paramsSchema.parse(request.params)
      const robo = await prisma.robo.findUnique({
        where: {
          macaddress,
        },
      })
      if (!robo) {
        return reply.code(404).send({ message: 'Robô não encontrado' })
      }
      return reply.code(200).send(robo)
    } catch (error) {
      return reply.code(500).send({ message: 'Erro ao buscar Lista de Robo' })
    }
  })

  app.post('/robo', async (request, reply) => {
    try {
      const bodySchema = z.object({
        macaddress: z.string(),
        name: z.string(),
        status: z.boolean(),
        ip: z.string(),
        rede: z.boolean(),
      })

      const { macaddress, name, status, ip, rede } = bodySchema.parse(
        request.body,
      )

      const robo = await prisma.robo.create({
        data: {
          macaddress,
          name,
          status,
          ip,
          rede,
        },
      })
      return reply.code(200).send(robo)
    } catch (error) {
      return reply.code(500).send({ message: 'Erro ao Criar Robo' })
    }
  })

  app.patch('/robo/ip/:macaddress', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        macaddress: z.string(),
      })
      const { macaddress } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        ip: z.string(),
      })
      const { ip } = bodySchema.parse(request.body)

      const robo = await prisma.robo.updateMany({
        where: {
          macaddress,
        },
        data: {
          ip,
        },
      })

      return reply.code(200).send({ message: 'Sucesso', robo })
    } catch (error) {
      return reply.code(500).send(error)
    }
  })
}
