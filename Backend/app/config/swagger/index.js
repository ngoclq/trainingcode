import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { omit } from 'lodash';

// import Store from '../../models/store';
import Node from '../../models/node';
import City from '../../models/city';
// import Referral from '../../models/referral';

// import Transaction from '../../models/transaction';
// import Mining from '../../models/mining';

const m2s = require('mongoose-to-swagger'); 

// const swStore = m2s(Store);
const swNode = m2s(Node);
const swCity = m2s(City);
// const swReferral = m2s(Referral);
// const swTransaction = m2s(Transaction);
// const swMining = m2s(Mining);

// --------------------------
// let swStorePostParam = Object.assign({}, omit(swStore.properties, ['_id', 'createdAt', 'updatedAt']) );
// let swStoreUpdateParam = Object.assign({}, omit(swStore.properties, ['_id', 'createdAt', 'updatedAt']) );
// --------------------------
let swNodePostParam = Object.assign({}, omit(swNode.properties, ['_id', 'createdAt', 'updatedAt']) );
let swNodeUpdateParam = Object.assign({}, omit(swNode.properties, ['_id', 'createdAt', 'updatedAt']) );

let swCityPostParam = Object.assign({}, omit(swCity.properties, ['_id', 'createdAt', 'updatedAt']) );
let swCityUpdateParam = Object.assign({}, omit(swCity.properties, ['_id', 'createdAt', 'updatedAt']) );

// --------------------------
const paging = {
  totalDocs: { type: 'number' },
  offset: { type: 'number' },
  limit: { type: 'number' },
  page: { type: 'number' },
  totalPages: { type: 'number' },
  pagingCounter: { type: 'number' },
  hasPrevPage: { type: 'boolean' },
  hasNextPage: { type: 'boolean' },
  prevPage: { type: 'number' },
  nextPage: { type: 'number' }
}

const getPagingRes = (key, scheme) => {
  let properties = {};
  properties[key] = {
    type: 'object',
    properties: Object.assign({}, {
      docs: {
        type: 'array',
        items: {
          type: 'object',
          properties: scheme
        }
      }
    }, paging)
  }
  return {
    type: 'object',
    properties:
    {
      data: {
        type: 'object',
        properties: properties
      },
      status: { type: 'string', example: 'success' }
    }
  }
};

// ////////////////////////////////////////
module.exports = function(app) {
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",

      info: {
        title: 'blockchain api',
        version: 'V1.0',
        description: 'blockchain api.<br>'
      },

      components: {

        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        },

        parameters: {
          offsetQuery: {
            in: 'query',
            name: 'offset',
            required: false,
            allowReserved: true,
            allowEmptyValue: true,
            description: 'Offset. The number of items to skip before starting to collect the result set',
            schema: {
              type: 'integer',
              min: 0
            },
            example: '0'
          },
          limitQuery: {
            in: 'query',
            name: 'limit',
            required: false,
            allowReserved: true,
            allowEmptyValue: true,
            description: 'Limit. The numbers of items to return',
            schema: {
              type: 'integer',
              min: 1,
              maximum: 100
            },
            example: 10
          },
          optionQuery: {
            in: 'query',
            name: 'options',
            required: false,
            allowReserved: true,
            allowEmptyValue: true,
            description: "Options. Name list of one or multiple models that we want to populate date to current result. </br> Example: if current model has field blockId and farmId, string could be 'block, farm' if we want to populate both, or 'block' if we want to populate just one",
            type: 'string'
          },
          seedQuery: {
            in: 'query',
            name: 'seedId',
            required: false,
            allowReserved: true,
            allowEmptyValue: true,
            description: "seed id",
            type: 'string'
          },
          // -------------------
          nodeParam: {
            in: 'path',
            name: 'nodeId',
            required: true,
            allowReserved: true,
            description: 'Node id',
            schema: {
              type: 'string'
            }
          },
          cityUpdateParam: {
            in: 'path',
            name: 'cityId',
            required: true,
            allowReserved: true,
            description: 'City id',
            schema: {
              type: 'string'
            }
          }
        },

        responses: {
          UnauthorizedError: { description: 'Access token is missing or invalid' }
        },

        schemas: {
          // -----------
          NodePaging: getPagingRes('nodes', swNode.properties),
          Node: { type: 'object', properties: swNode.properties },
          NodePostParam: { type: 'object', properties: swNodePostParam },
          NodeUpdateParam: { type: 'object', properties: swNodeUpdateParam },
          NodeByCountryPaging: getPagingRes('nodes', Object.assign({}, {
              country: {type: 'string'},
              nodes: {type: 'number'},
              percentOfTotal: {type: 'number'},
              rank: {type: 'number'}
            }
          )),
          NodeByStakePaging: getPagingRes('nodes', Object.assign({}, swNode.properties, {
              percentOfTotal: {type: 'number'}
            }
          )),
          NodeByOneDayPaging: getPagingRes('nodes', Object.assign({}, {
              stake: {type: 'number'},
              rewards: {type: 'number'},
              mining: {type: 'number'},
              usedFee: {type: 'number'},
              online: {type: 'number'},
              joined: {type: 'number'},
            }
          )),
          
          City: { type: 'object', properties: swCity.properties },
          CityPostParam: { type: 'object', properties: swCityPostParam },
          CityUpdateParam: { type: 'object', properties: swCityUpdateParam },
          NodeByCityPaging: getPagingRes('nodes', Object.assign({}, {
              city: {type: 'string'},
              nodes: {type: 'number'},
              percentOfTotal: {type: 'number'},
              rank: {type: 'number'}
            }
          )),
        }
      }
    },

    apis: ['app/feature/**/*route.js']

  };

  const swaggerSpec = swaggerJSDoc(options);
  app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const uiOptions = {
    swaggerUrl: '/api-docs.json'
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, uiOptions));
};
