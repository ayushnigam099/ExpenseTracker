const routes= require('../controllers/expense');
const express = require('express');
const router = express.Router();

router.delete('/delete-expense/:id', routes.deleteExpense);

module.exports = router;