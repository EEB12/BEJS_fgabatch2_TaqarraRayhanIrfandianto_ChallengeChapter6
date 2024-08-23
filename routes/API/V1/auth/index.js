var express = require('express');
var router = express.Router();
const {
   
    createUser,
    
  } = require('../../../../controllers/user.controller')
const {
    login,
     authenticate
   } = require('../../../../controllers/auth.controller')
   


router.post('/login', login)
router.post('/register',createUser)
router.get('/', authenticate)
module.exports = router;