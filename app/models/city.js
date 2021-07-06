import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

// const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const City = new Schema({
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
  city: {
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

City.index({ city: 1 });
City.plugin(timestamps);
City.plugin(mongoosePaginate);

export default mongoose.model('City', City);
