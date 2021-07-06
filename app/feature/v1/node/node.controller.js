import * as nodeServices from '../../../services/node';
import * as err from '../../../libs/error';

// CREATE
export async function create(req, res) {
  const data = req.body;
  let nodeCreated = await nodeServices.create(data);
  res.ok({ node: nodeCreated });
}

// GET
export async function getById(req, res) {
  const { nodeId } = req.params;
  if (!nodeId) {
    return res.badRequest(err.id_empty('node'));
  }
  const nodeObj = await nodeServices.findById({ _id: nodeId  });
  if (!nodeObj) return res.badRequest(err.id_wrong('node'));
  return res.ok({ node: nodeObj });
}

export async function getByCountry(req, res) {
  const { offset, limit } = req.query;
  const nodeCount = await nodeServices.countAll();
  const nodeObj = await nodeServices.getByCountry({ total: nodeCount, offset: offset, limit: limit,  });
  nodeObj.docs.forEach((e, idx) => {
    e.rank = parseInt(offset) + idx + 1;
  });
  return res.ok({ node: nodeObj });
}

export async function getByOneDay(req, res) {
  const nodeObj = await nodeServices.getByOneDay();
  return res.ok({ node: nodeObj });
}

export async function getByStake(req, res) {
  const { offset, limit } = req.query;
  const obj = await nodeServices.getTotalStake();
  const nodeCount = obj[0].total;
  const nodeObj = await nodeServices.getByStake({ total: nodeCount, offset: offset, limit: limit,  });
  return res.ok({ node: nodeObj });
}


// // UPDATE
export async function updateById(req, res) {
  const { nodeId } = req.params;
  const data = req.body;
  const result = await nodeServices.updateById({ _id: nodeId, data: data });
  res.ok({ node: result });
}
