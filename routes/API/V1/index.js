
const express = require("express");
const router = express.Router();
const { resolveRefs } = require('json-refs');

const ACCOUNT_ROUTER = require("./account");

router.use("/images", ACCOUNT_ROUTER);

module.exports = router;