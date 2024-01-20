const express = require("express");
const router = express.Router();

const { login, dashbord } = require("../controllers/main");

router.route("/dashboard").get(dashbord);
router.route("/login").post(login);

module.exports = router;
