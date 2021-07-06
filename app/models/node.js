import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

// const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const NodeSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  stake: {
    type: Number,
    required: false
  },
  rewards: {
    type: Number,
    required: false
  },
  mining: {
    type: Number,
    required: false
  },
  usedFee: {
    type: Number,
    required: false
  },
  online: {
    type: Number,
    required: false
  },
  createWallets: {
    type: Number,
    required: false
  },
  releasedCSE: {
    type: Number,
    required: false
  },
  remainingCSE: {
    type: Number,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  },
  // 0 = locked
  // 1  = active
  status: {
    type: Number,
    required: false
  },
  joinedAt: {
    type: Date,
    required: false,
    default: new Date()
  }
},
{
  toObject: { virtuals: true }, 
  toJSON: { virtuals: true }
});

NodeSchema.index({ country: 1 });
NodeSchema.plugin(timestamps);
NodeSchema.plugin(mongoosePaginate);

export default mongoose.model('Node', NodeSchema);
