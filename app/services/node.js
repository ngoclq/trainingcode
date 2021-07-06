import Node from '../models/node';

// CREATE
export async function create(data) {
  const node = await Node.create(data);
  return node;
}

// GET
export async function countAll() {
  return Node.count();
}

export async function getByCountry({ total = 1, offset = 0, limit = 10 }) {
  const options = {
    offset: parseInt(offset) ,
    limit: parseInt(limit) 
  };
  if (!total) {
    total = 1;
  }
  var myAggregate = Node.aggregate([
    {
      $group: {
        "_id": "$country",
        "country": {"$last": "$country" },
        "nodes": { "$sum": 1 },
        "percentOfTotal": { "$sum": 1./total }
      }
    },
    {
      $project: {
        _id: 0,
        country: 1,
        nodes: 1,
        percentOfTotal: 1
      }
    },
    { 
      $sort: { nodes: -1 } 
    }
  ]);
  const nodes = await Node.aggregatePaginate(myAggregate, options);
  return nodes;
}

export async function getByOneDay() {
  let date = new Date((new Date()).getTime() - 240*60*60*1000);
  const statistics = await Node.aggregate([
    {
      $match: { joinedAt: {
          $gt : date
        }
      }
    },
    {
      $group: {
        "_id": null,
        "stake": { "$sum": "$stake" },
        "rewards": { "$sum": "$rewards" },
        "mining": { "$sum": "$mining" },
        "usedFee": { "$sum": "$usedFee" },
        "online": { "$sum": "$online" },
        "joined": { "$sum": 1 }
      }
    },
    {
      $project: {
        _id: 0,
        stake: 1,
        rewards: 1,
        mining: 1,
        usedFee: 1,
        online: 1,
        joined: 1
      }
    }
  ]);
  return statistics;
}

export async function getTotalStake() {
  const node = await Node.aggregate([
    {
      $group: {
        "_id": null,
        "total": { "$sum": "$stake" }
      }
    },
    {
      $project: {
        _id: 0,
        total: 1
      }
    }
  ]);
  return node;
}

export async function getByStake({ total = 1, offset = 0, limit = 10 }) {
  const options = {
    offset: parseInt(offset) ,
    limit: parseInt(limit) 
  };
  if (!total) {
    total = 1;
  }
  var myAggregate = Node.aggregate([
    {
      $addFields: {
        percentOfTotal: { $multiply: [ "$stake", 1/total ] } 
      }
    },
    { 
      $sort: { stake: -1 } 
    }
  ]);
  const nodes = await Node.aggregatePaginate(myAggregate, options);
  return nodes;
}

export async function findById({ _id }) {
  const node = await Node.findById(_id).lean();
  return node;
}

// // UPDATE
export async function updateById({ _id, data }) {
  const node = await Node.findByIdAndUpdate(
    _id,
    data,
    { new: true, omitUndefined: true }
  ).lean();
  return node;
}

