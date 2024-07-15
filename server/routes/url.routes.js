const urlCtrl = require("../controllers/url.controller");
const express = require("express");
const router = express.Router();

router.route("/api/url").post(urlCtrl.createURL);
router.route("/api/url/:id").delete(urlCtrl.deleteUrl);
router.route("/:id").get(urlCtrl.redirectToUrl);
module.exports = router;
