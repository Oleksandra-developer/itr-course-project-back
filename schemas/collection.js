const { Schema, model } = require("mongoose");
const {collectionTheme} = require('../constants')

const collectionSchema = new Schema({
 title: {
  type: String,
  required: [true, "Title required"]
 },
 description: {
    type: String,
    required: [true, "Description required"]
 },
 coll_theme: {
  type: String,
  enum: collectionTheme,
  required: [true, "Theme required"]
 },
 cover_url: {
    type: String,   
 },
 owner: {
  type: Schema.Types.ObjectId,
  ref: "user"
   },
// userId: {
//   type: Schema.Types.ObjectId,
//   required: true,
//   ref: 'user'
// },

},
{ versionKey: false, timestamps: true }

)


const Collection = model("collection", collectionSchema);

module.exports = Collection;