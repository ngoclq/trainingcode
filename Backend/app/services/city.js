import City from '../models/city';

// CREATE
export async function create(data) {
  const city = await City.create(data);
  return city;
}

// GET
export async function countAll() {
  return City.count();
}

export async function getByCity({ total = 1, offset = 0, limit = 10 }) {
  const options = {
    offset: parseInt(offset) ,
    limit: parseInt(limit) 
  };
  if (!total) {
    total = 1;
  }
  var myAggregate = City.aggregate([
    /*{
      $group: {
        "_id": "$city",
        "city": {"$last": "$city" },
        "nodes": { "$sum": 1 },
        "percentOfTotal": { "$sum": 1./total },
        "type": {"$last": "$type" },
      }
    },*/
    /*{
      $project: {
        _id: 0,
        city: 1,
        nodes: 1,
        percentOfTotal: 1,
        type: 1
      }
    },*/
    { 
      $sort: { nodes: -1 } 
    },
    {
      $match: { // tuong duong Condition trong sql        
        "city": /5/, // Tuong duong city like '%5%'
        $or: [ // Dieu kien Or trong sql
          {
            "type": /2/, // Tuong duong type like '%2%'
          },
          {
            "type": /5/, // Tuong duong type like '%5%'
          }
        ]
      }  
    }
  ]);
  const cities = await City.aggregatePaginate(myAggregate, options);
  return cities;
}

export async function findById({ _id }) {
  const cities = await City.findById(_id).lean();
  return cities;
}

// // UPDATE
export async function updateById({ _id, data }) {
  const cities = await City.findByIdAndUpdate(
    _id,
    data,
    { new: true, omitUndefined: true }
  ).lean();
  return cities;
}

