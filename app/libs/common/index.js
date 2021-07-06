import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
export const myJoiObjectId = JoiObjectId(Joi)

export function syncMiddleware (callback) {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next)
  }
}

export const intersection = (val, from, end) => {
    if (val >= from && val <= end) return true;
    return false;
  };