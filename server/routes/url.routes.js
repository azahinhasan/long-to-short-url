const urlCtrl = require("../controllers/url.controller");
const express = require("express");
const router = express.Router();

router.route("/").post(urlCtrl.createURL);

module.exports = router;
