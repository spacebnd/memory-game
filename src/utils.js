import { v4 as uuidv4 } from 'uuid'

export const generateCardItem = (name) => {
  return {
    id: uuidv4(),
    name: name,
  }
}
