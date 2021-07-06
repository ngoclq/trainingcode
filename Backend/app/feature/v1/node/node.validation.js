import Joi from 'joi'
import { myJoiObjectId } from '../../../libs/common'

export const nodeIdSchema = Joi.object().keys({
  nodeId: myJoiObjectId().required()
})

export const createSchema = Joi.object().keys({
  type: Joi.string()
    .min(1)
    .max(50)
    .required(),
  stake: Joi.number()
    .allow('')
    .min(0),
  rewards: Joi.number()
    .allow('')
    .min(0),
  mining: Joi.number()
    .allow('')
    .min(0),
  usedFee: Joi.number()
    .allow('')
    .min(0),
  online: Joi.number()
    .allow('')
    .min(0),
  createWallets: Joi.number()
    .allow('')
    .min(0),
  releasedCSE: Joi.number()
    .allow('')
    .min(0),
  remainingCSE: Joi.number()
    .allow('')
    .min(0),
  latitude: Joi.string()
    .allow(''),
  longitude: Joi.string()
    .allow(''),
  country: Joi.string()
    .min(1)
    .max(50),
  status: Joi.number().valid(0, 1).required(),
  joinedAt: Joi.date().iso()
})

export const updateSchema = Joi.object().keys({
  type: Joi.string()
    .min(1)
    .max(50)
    .required(),
  stake: Joi.number()
    .allow('')
    .min(0),
  rewards: Joi.number()
    .allow('')
    .min(0),
  mining: Joi.number()
    .allow('')
    .min(0),
  usedFee: Joi.number()
    .allow('')
    .min(0),
  online: Joi.number()
    .allow('')
    .min(0),
  createWallets: Joi.number()
    .allow('')
    .min(0),
  releasedCSE: Joi.number()
    .allow('')
    .min(0),
  remainingCSE: Joi.number()
    .allow('')
    .min(0),
  latitude: Joi.string()
    .allow(''),
  longitude: Joi.string()
    .allow(''),
  country: Joi.string()
    .min(1)
    .max(50),
  status: Joi.number().valid(0, 1).required(),
  joinedAt: Joi.date().iso()
})
