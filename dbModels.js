const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let db = {}

let ImageSchema = new Schema({
  url: String,
  tags: [String]
});


let BoardSchema = new Schema({
  name: String,
  images: [ImageSchema]
});
db['Board'] = mongoose.model('Board', BoardSchema);

module.exports = db;