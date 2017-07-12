var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  ad_title: String,
  ad_description: String,
  image_url: String,
  // image_binary: {data: Buffer, contentType: String},
  ad_category: String,
  ad_field10: String,
  ad_field11: String,
  ad_location: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('tbl_ads', ProductSchema);
