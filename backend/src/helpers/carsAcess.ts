import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { CarItem } from '../models/CarItem'
import { CarUpdate } from '../models/CarUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('Cars data access')

// CAR: Implement the dataLayer logic
export class CarsAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly carsTable = process.env.CARS_TABLE,
    private readonly carCreatedIndex = process.env.CARS_CREATED_AT_INDEX
  ) {
  }

  async getAllCars(userId: string): Promise<CarItem[]> {
    logger.info('Getting all cars')

    const result = await this.docClient.query({
      TableName: this.carsTable,
      IndexName: this.carCreatedIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as CarItem[]
  }

  async createCar(carItem: CarItem): Promise<CarItem> {
    logger.info('Create new car')

    await this.docClient.put({
      TableName: this.carsTable,
      Item: carItem
    }).promise()

    return carItem
  }

  async updateCar(carId: String, userId: String, updateCarItem: CarUpdate): Promise<CarUpdate> {
    logger.info('Update car')

    await this.docClient.update({
      TableName: this.carsTable,
      Key: {
        carId: carId,
        userId: userId
      },
      UpdateExpression: "set #car_name = :name, dueDate = :dueDate, done = :done",
      ExpressionAttributeNames: {
        '#car_name': 'name',
      },
      ExpressionAttributeValues: {
        ":name": updateCarItem.name,
        ":dueDate": updateCarItem.dueDate,
        ":done": updateCarItem.done
      }
    }).promise()

    return updateCarItem
  }

  async deleteCar(carId: String, userId: String) {
    logger.info('Delete car')

    await this.docClient.delete({
      TableName: this.carsTable,
      Key: {
        carId: carId,
        userId: userId
      }
    }, (err) => {
      if (err) {
        throw new Error("")
      }
    }).promise()
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance')

    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}