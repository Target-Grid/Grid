const mongoose = require("mongoose");
const validator = require("validator");

const usersch = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Email is Invalid");
      }
    },
  },
});

module.exports = mongoose.model("user", usersch);
