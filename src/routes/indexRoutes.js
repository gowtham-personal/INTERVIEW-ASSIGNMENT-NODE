const express = require("express");
let app = express();
const router = express.Router();

router.get("/", function(req, res, next) {
  res.json({ success: true, version: 1.0 });
});

module.exports = router;
