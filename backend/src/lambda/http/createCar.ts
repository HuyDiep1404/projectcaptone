import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateCarRequest } from '../../requests/CreateCarRequest'
import { createCar } from '../../helpers/cars'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newCar: CreateCarRequest = JSON.parse(event.body)
    let userId = getUserId(event)
    const { carId, name, dueDate, createdAt, done } = await createCar(userId, newCar)
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: { carId, name, dueDate, createdAt, done }
      })
    };
  }
)

handler.use(
  cors({
    credentials: true
  })
)