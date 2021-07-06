import express from 'express';

import {
  validatorBody,
  validatorParams,
  validatorQuery
} from '../../../libs/validator';

import { getListSchema } from '../../../libs/baseSchema';
import { syncMiddleware } from '../../../libs/common';

import * as nodeController from './node.controller';
import * as nodeValidation from './node.validation';

const router = express.Router();

/**
* @swagger
* tags:
*   name: Node
*   description: Node management
*/

/**
* @swagger
* /api/v1/nodes:
*   post:
*     summary: Create Node
*     description: Create new Node
*     tags: [Node]
*     requestBody:
*       required: true
*       description: Post Node data to create
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/NodePostParam'
*     responses:
*       200:
*         description: Node data object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Node'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.post(
  '',
  syncMiddleware(validatorBody(nodeValidation.createSchema)),
  syncMiddleware(nodeController.create)
);


/**
* @swagger
* /api/v1/nodes/by-country?offset={offset}&limit={limit}:
*   get:
*     summary: Get node by country
*     description: Return JSON object data - number of node by country 
*     tags: [Node]
*     parameters:
*     - $ref: '#/components/parameters/offsetQuery'
*     - $ref: '#/components/parameters/limitQuery'
*     responses:
*       200:
*         description: object of node
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NodeByCountryPaging'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.get(
  '/by-country',
  syncMiddleware(validatorQuery(getListSchema)),
  syncMiddleware(nodeController.getByCountry)
);

/**
* @swagger
* /api/v1/nodes/by-stake?offset={offset}&limit={limit}:
*   get:
*     summary: Get node by Stake
*     description: Return JSON object data - number of node by Stake 
*     tags: [Node]
*     parameters:
*     - $ref: '#/components/parameters/offsetQuery'
*     - $ref: '#/components/parameters/limitQuery'
*     responses:
*       200:
*         description: object of node
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NodeByStakePaging'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.get(
  '/by-stake',
  syncMiddleware(validatorQuery(getListSchema)),
  syncMiddleware(nodeController.getByStake)
);


/**
* @swagger
* /api/v1/nodes/by-one-day:
*   get:
*     summary: Get node by one day
*     description: Return JSON object data - number of node by one day 
*     tags: [Node]
*     responses:
*       200:
*         description: object of node
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NodeByOneDayPaging'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.get(
  '/by-one-day',
  syncMiddleware(validatorQuery(getListSchema)),
  syncMiddleware(nodeController.getByOneDay)
);


/**
* @swagger
* /api/v1/nodes/{nodeId}:
*   get:
*     summary: Get node by nodeId
*     description: Return JSON object data of node
*     tags: [Node]
*     parameters:
*     - $ref: '#/components/parameters/nodeParam'
*     responses:
*       200:
*         description: object of node
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Node'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.get(
  '/:nodeId',
  syncMiddleware(validatorParams(nodeValidation.nodeIdSchema)),
  syncMiddleware(validatorQuery(getListSchema)),
  syncMiddleware(nodeController.getById)
);


/**
* @swagger
* /api/v1/nodes/{nodeId}:
*   put:
*     summary: Update Node
*     description: Update new Node
*     tags: [Node]
*     security:
*     - bearerAuth: []
*     parameters:
*     - $ref: '#/components/parameters/nodeParam'
*     requestBody:
*       required: true
*       description: Post Node data to update
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/NodeUpdateParam'
*     responses:
*       200:
*         description: Node data object updated
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router.put(
  '/:nodeId',
  syncMiddleware(validatorParams(nodeValidation.nodeIdSchema)),
  syncMiddleware(validatorBody(nodeValidation.updateSchema)),
  syncMiddleware(nodeController.updateById)
);

export default router;
