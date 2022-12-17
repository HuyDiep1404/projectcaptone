/**
 * Fields in a request to update a single CAR item.
 */
export interface UpdateCarRequest {
  name: string
  dueDate: string
  done: boolean
}