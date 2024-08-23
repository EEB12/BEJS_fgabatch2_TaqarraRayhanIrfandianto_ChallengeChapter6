var express = require('express');
var router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  getUserInfo
} = require('../../../../controllers/user.controller')


const {
 login
  
} = require('../../../../controllers/auth.controller')

var AUTH_MIDDLEWARE= require('../../../../middlewares/auth.middlewares')

/* GET home page. */
router.get('/',AUTH_MIDDLEWARE, getUsers)
router.get('/list/:id', getUserById)
router.post('/', createUser)
router.get('/info', AUTH_MIDDLEWARE,getUserInfo)


router.post('/login', login)
module.exports = router;
