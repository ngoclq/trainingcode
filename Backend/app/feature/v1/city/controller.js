import * as cityServices from '../../../services/city';
import * as err from '../../../libs/error';

// CREATE
export async function create(req, res) {
  const data = req.body;
  let nodeCreated = await cityServices.create(data);
  res.ok({ node: nodeCreated });
}

export async function getByCity(req, res) {
  const { offset, limit } = req.query;
  const nodeCount = await cityServices.countAll();
  const nodeObj = await cityServices.getByCity({ total: nodeCount, offset: offset, limit: limit,  });
  nodeObj.docs.forEach((e, idx) => {
    e.rank = parseInt(offset) + idx + 1;
  });
  return res.ok({ node: nodeObj });
}

// // UPDATE
export async function updateById(req, res) {
  const { cityId } = req.params;
  const data = req.body;
  const result = await cityServices.updateById({ _id: cityId, data: data });
  res.ok({ node: result });
}
