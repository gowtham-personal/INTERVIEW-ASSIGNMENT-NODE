let express = require("express");
const router = express.Router();
let { getUserlogin, addUsers } = require("../controllers/UserController");

router.get("/login", getUserlogin);
router.post("/signup", addUsers);

module.exports = router;
