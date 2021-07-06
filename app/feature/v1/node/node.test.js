const supertest = require("supertest");
import  app from '../../../app.js';
const request = supertest(app); 

const dbHandler = require("../../../config/jest/db-handler.js");
const dbInit = require("../../../config/jest/init-data.js");

import Node from '../../../models/node';

let expectedUser = {};
let token = null;

const nodeObj = {
    "type": "string",
    "stake": 0,
    "rewards": 0,
    "mining": 0,
    "usedFee": 0,
    "online": 0,
    "createWallets": 0,
    "releasedCSE": 0,
    "remainingCSE": 0,
    "country": "string",
    "latitude": "string",
    "longitude": "string",
    "status": 0,
    "joinedAt": "2020-11-04T10:47:00.775Z"
};

beforeAll(async (done) => {
//   expectedUser = await dbInit.createUser();
//   token = await dbInit.signIn();
  done();
});

afterAll(async (done) => {
  await dbHandler.closeDatabase();
  done();
});

test("Create node", async () => {
  const response = await request
    .post(`/api/v1/nodes`)
    .send(nodeObj);
  const resGet = await Node.findOne({});
  expect(response.status).toBe(200);
  expect(resGet).not.toBe(undefined);
  expect(resGet).toHaveProperty("type", nodeObj.type);
});
