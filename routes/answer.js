const express = require('express');
const { submitAnswer, getAllAnswers } = require('../controllers/answers');

const router = express.Router();

router.post('/:id', submitAnswer);
// router.get('/', getAllAnswers);

module.exports = router;