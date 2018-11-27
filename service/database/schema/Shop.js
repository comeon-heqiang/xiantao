const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const ShopSchema = new Schema({});
mongoose.model("Shop", ShopSchema)
