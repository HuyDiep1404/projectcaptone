import { CarsAccess } from './carsAcess'
import { AttachmentUtils } from './attachmentUtils';
import { CarItem } from '../models/CarItem'
import { CarUpdate } from '../models/CarUpdate'
import { CreateCarRequest } from '../requests/CreateCarRequest'
import { UpdateCarRequest } from '../requests/UpdateCarRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as AWS from 'aws-sdk'

// CAR: Implement businessLogic

const logger = createLogger('Cars business logic')

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
  
  const bucketName = process.env.ATTACHMENT_S3_BUCKET
  const urlExpiration = process.env.SIGNED_URL_EXPIRATION
  
  // CAR: Implement businessLogic
  const carAccess = new CarsAccess();
  const attachmentUtils = new AttachmentUtils();
  export async function getAllCars(userId: string): Promise<CarItem[]> {
    return carAccess.getAllCars(userId);
  }
  
  export async function createCar(userId: string, createCarRequest: CreateCarRequest): Promise<CarItem> {
  
    const itemId = uuid.v4()
  
    return await carAccess.createCar({
      carId: itemId,
      userId: userId,
      name: createCarRequest.name,
      dueDate: createCarRequest.dueDate,
      createdAt: new Date().toISOString(),
      done: false
    })
  }
  
  export async function updateCar(carId: string, userId: string, updateCarRequest: UpdateCarRequest): Promise<CarUpdate> {
    return await carAccess.updateCar(carId, userId, {
      name: updateCarRequest.name,
      dueDate: updateCarRequest.dueDate,
      done: updateCarRequest.done
    })
  }
  
  export async function deleteCar(carId: string, userId: string) {
    await carAccess.deleteCar(carId, userId)
  }
  
  export async function createAttachmentPresignedUrl (carId: string, userId: string) {
    logger.info('create attachment presigned url')
    const imageId = uuid.v4()
    const url = `https://${bucketName}.s3.amazonaws.com/${imageId}`
    await attachmentUtils.updateAttachmentUrl(carId, userId, url)
    return getUploadUrl(imageId)
  }
  
  function getUploadUrl(imageId: string) {
    logger.info('get upload url')
    logger.info('urlExpiration:', urlExpiration)
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: Number(urlExpiration)
    })
  }