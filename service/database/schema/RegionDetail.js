const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegionDetail = new Schema({
  ID: String,
  subID: String,
  title: String, //标题
  hits: 0, //点击数
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: { //更新时间
    type: Date,
    default: Date.now()
  },
  content: String
})
mongoose.model("RegionDetail", RegionDetail)
