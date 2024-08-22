const { readFile, writeFile } = require('../utils/handler');

exports.createQuestions = (req, res) => {
    const { userId, userName, questions } = req.body;

    if (questions.some(q => q.answers.length < 2)) {
        return res.status(400).send('Minimum answers to a question must be 2');
    }

    const data = readFile();


    let user = data.users.find(u => u.userId === userId);

    if (!user) {

        user = {
            userId,
            userName,
            questionnairesCreated: 1,
            totalQuestionsAdded: questions.length
        };
        console.log(`Adding new user: ${JSON.stringify(user)}`);
        data.users.push(user);
    } else {

        user.questionnairesCreated += 1;
        user.totalQuestionsAdded += questions.length;
        console.log(`Updated user: ${JSON.stringify(user)}`);
    }

    const questionnaire = {
        id: data.questionnaires.length + 1,
        userId,
        userName,
        questions,
        createdBy: userName
    };

    data.questionnaires.push(questionnaire);

    writeFile(data);

    res.status(201).send(questionnaire);
};

exports.getQuestions = (req, res) => {
    const data = readFile();
    const questionnaire = data.questionnaires.filter(q => q.userId === parseInt(req.params.userId));
    if (questionnaire.length === 0) {
        return res.status(404).send('No questions available')
    }
    res.send(questionnaire);
};

exports.allQuestionnaire = (req, res) => {
    const data = readFile();
    res.status(200).send(data.questionnaires);
};