import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateCar } from '../../helpers/cars'
import { UpdateCarRequest } from '../../requests/UpdateCarRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const carId = event.pathParameters.carId
    const updatedCar: UpdateCarRequest = JSON.parse(event.body)
    // CAR: Update a CAR item with the provided id using values in the "updatedCar" object
    let userId = getUserId(event)
    let updatedCarItem = await updateCar(carId, userId, updatedCar);

    return {
      statusCode: 200,
      body: JSON.stringify({
        updatedCarItem
      })
    };
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )