const express = require('express');
const questions = require('./routes/questionnaire');
const answers = require('./routes/answer');

const app = express();

app.use(express.json());


app.use('/questions', questions);

app.use('/answers', answers);

app.listen(3000, () => console.log('Server running on port 3000'));