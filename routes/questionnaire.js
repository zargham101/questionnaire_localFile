const express = require('express');
const { createQuestions, getQuestions, allQuestionnaire } = require('../controllers/questionnaire');

const router = express.Router();

router.post('/create', createQuestions);
router.get('/:userId', getQuestions);
router.get('/', allQuestionnaire);

module.exports = router;