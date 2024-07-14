const URL = require("../models/url.model");

const createURL = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Created Successfully", data: "" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

module.exports = {
  createURL,
};
