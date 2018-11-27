const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let RegionSchema = new Schema({
  ID: String,
  NAME: String,
  IMAGE: String,
  TYPE: Number,
  SORT: Number
})
mongoose.model('Region', RegionSchema);
