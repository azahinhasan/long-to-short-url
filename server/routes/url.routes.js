const urlCtrl = require("../controllers/url.controller");
const express = require("express");
const router = express.Router();

router.route("/").post(urlCtrl.createURL);
router.route("/:short_url_code").get(urlCtrl.redirectToUrl);
module.exports = router;
