const routes= require('../controllers/expense');
const express = require('express');
const router = express.Router();

router.get('/get-expense', routes.getExpense);

module.exports = router;