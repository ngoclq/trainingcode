import express from 'express';

import {
  validatorBody,
  validatorParams,
  validatorQuery
} from '../../../libs/validator';

import { getListSchema } from '../../../libs/baseSchema';
import { syncMiddleware } from '../../../libs/common';

import * as cityController from './controller';
import * as cityValidation from './validation';

const router = express.Router();

/**
* @swagger
* tags:
*   name: City
*   description: City management
*/

/**
* @swagger
* /api/v1/cities:
*   post:
*     summary: Create City
*     description: Create new City
*     tags: [City]
*     requestBody:
*       required: true
*       description: Post City data to create
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CityPostParam'
*     responses:
*       200:
*         description: City data object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/City'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.post(
  '',
  syncMiddleware(validatorBody(cityValidation.createSchema)),
  syncMiddleware(cityController.create)
);


/**
* @swagger
* /api/v1/cities/by-city?offset={offset}&limit={limit}:
*   get:
*     summary: Get node by city
*     description: Return JSON object data - number of node by city 
*     tags: [City]
*     parameters:
*     - $ref: '#/components/parameters/offsetQuery'
*     - $ref: '#/components/parameters/limitQuery'
*     responses:
*       200:
*         description: object of node
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NodeByCityPaging'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.get(
  '/by-city',
  syncMiddleware(validatorQuery(getListSchema)),
  syncMiddleware(cityController.getByCity)
);

/**
* @swagger
* /api/v1/cities/{cityId}:
*   put:
*     summary: Update City
*     description: Update new City
*     tags: [City]
*     security:
*     - bearerAuth: []
*     parameters:
*     - $ref: '#/components/parameters/cityUpdateParam'
*     requestBody:
*       required: true
*       description: Post City data to update
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CityUpdateParam'
*     responses:
*       200:
*         description: City data object updated
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.put(
  '/:cityId',
  syncMiddleware(validatorParams(cityValidation.cityIdSchema)),
  syncMiddleware(validatorBody(cityValidation.updateSchema)),
  syncMiddleware(cityController.updateById)
);

export default router;
