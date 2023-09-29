const routes= require('../controllers/expense');
const express = require('express');
const router = express.Router();

router.post('/add-expense', routes.addExpense);

module.exports = router;