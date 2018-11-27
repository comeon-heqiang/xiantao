const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySubSchema = new Schema({
  ID: String,
  CATEGORY_ID: String,
  SUB_NAME: String,
  SORT: Number
})
mongoose.model("CategorySub", CategorySubSchema);
