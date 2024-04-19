const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/p");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);