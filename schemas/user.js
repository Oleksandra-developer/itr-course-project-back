const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name required"]
      },
  email: {
    type: String,
    required: [true, "Email required"]
     },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  status: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
 
token: {
  type: String,
  default: null,
},

})

userSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;