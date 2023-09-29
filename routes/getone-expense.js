const routes= require('../controllers/expense');
const express = require('express');
const router = express.Router();

router.get('/getone/:id', routes.getOneExpense);

module.exports = router;