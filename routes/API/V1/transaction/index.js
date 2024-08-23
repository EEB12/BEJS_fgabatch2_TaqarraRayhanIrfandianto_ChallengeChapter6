var express = require('express');
var router = express.Router();
const {
  getTransaction,getTransactionById,createTransaction
 
} = require('../../../../controllers/transaction.controller')

/* GET home page. */
router.get('/', getTransaction)
router.get('/:id', getTransactionById)
router.post('/', createTransaction)
module.exports = router;
