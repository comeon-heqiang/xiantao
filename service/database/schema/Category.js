const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  id: String,
  name: String,
  image: String,
  sort: Number,
  isShow:Boolean
})
mongoose.model("Category", CategorySchema);
