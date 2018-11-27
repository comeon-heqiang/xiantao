const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let contactSchema = new Schema({
  contactId: {
    type: ObjectId
  },
  name: String,
  tel: Number,
  address: String,
  content: String
})
mongoose.model("contact", contactSchema);
