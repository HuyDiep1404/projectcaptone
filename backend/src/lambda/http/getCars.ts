import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getUserId } from '../utils';
import { getAllCars } from '../../helpers/cars'

// CAR: Get all CAR items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    
    const userId = getUserId(event)
    const cars = await getAllCars(userId)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        items: cars
      })
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
)
