import mongoose from "mongoose";

const LandsatSchema = new mongoose.Schema({
  _id: String,
  type: String,
  bbox: [Number],
  geometry: Object,

  properties:{
    collection: String,
    datetime: String,
    'eo:sun_azimuth': Number,
    'eo:sun_elevation': Number,
    'eo:cloud_cover': Number,
    'eo:row':String,
    'eo:column': String,
    'landsat:product_id': String,
    'landsat:scene_id': String,
    'landsat:processing_level': String,
    'landsat:tier': String,
    'landsat:revision': String,
    'eo:espg': Number
  },

  assets: Object,
  
  links: Array

})

const Landsat = mongoose.model('landsat', LandsatSchema, 'landsat' );

export default Landsat