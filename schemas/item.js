const { Schema, model } = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
 title: {
  type: String,
  required: [true, "Title required"]
},
tags: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  likes: {
    type: Number,
  },
collection: {
 type: Schema.Types.ObjectId,
 ref: "collection",
 required: true,
 },
  
}, 
{ versionKey: false, timestamps: true })

const Item = model("item", itemSchema);

module.exports =Item;