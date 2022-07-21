const mongoose = require("mongoose");
const validator = require("validator");

const prsch = new mongoose.Schema({
  s_id: {
    type: String,
    required: true,
  },
  pr_name: {
    type: String,
    required: [true, "Please enter valid name"],
  },

  img:{
    type:String,
    required:true,
  },

});

module.exports = mongoose.model("product", prsch);
