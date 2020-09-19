let express = require("express");
const router = express.Router();
let {
  getForwardGecoding,
  getRevereseGeoCoding
} = require("../controllers/geoCodingController");

router.get("/forward", getForwardGecoding);
router.get("/reverse", getRevereseGeoCoding);

module.exports = router;
