const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;
const opinionSchema = new Schema({
  opinionId: {
    type: objectId
  },
  message: String,
  tel: String,
  imgUrl: String,
  createData: {
    type: Date,
    default: Date.now()
  }
})
mongoose.model('opinion',opinionSchema);
