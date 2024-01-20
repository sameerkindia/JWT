const express = require("express");
const router = express.Router();

const authMiddlewere = require("../middleware/auth");

const { login, dashbord } = require("../controllers/main");

router.route("/dashboard").get(authMiddlewere, dashbord);
router.route("/login").post(login);

module.exports = router;
