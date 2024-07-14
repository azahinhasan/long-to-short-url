const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: [true, "Please enter value"],
  },
  short_url: {
    type: String,
  },
  short_url_full_info: {
    type: String,
  },
});

module.exports = mongoose.model("urls", URLSchema);
