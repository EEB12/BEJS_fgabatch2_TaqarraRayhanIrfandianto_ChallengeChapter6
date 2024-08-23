
const express = require("express");
const router = express.Router();
const { resolveRefs } = require('json-refs');
const USER_ROUTER = require("./user");
const ACCOUNT_ROUTER = require("./account");
const AUTH_ROUTER = require("./auth");
const TRANSACTION_ROUTER = require("./transaction");
const swaggerUI=require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path');
const swaggerDocument =YAML.load(path.resolve(__dirname, '../../../docs/swagger.yaml'))

  
  
router.use("/user", USER_ROUTER);
router.use("/auth", AUTH_ROUTER);
router.use("/account", ACCOUNT_ROUTER);
router.use("/transaction", TRANSACTION_ROUTER);

router.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))
module.exports = router;