const { readFile, writeFile } = require('../utils/handler');

exports.submitAnswer = (req, res) => {
    const { userId, userName, answers: userAnswers } = req.body;
    const questionId = parseInt(req.params.id);

    const data = readFile();
    console.log('Data:', data);
    console.log('Question ID:', questionId);
    console.log('User Answers:', userAnswers);

    const questionnaire = data.questionnaires.find(q => q.id === questionId);
    if (!questionnaire) {
        return res.status(404).send('Questionnaire not found');
    }

    if (userAnswers.length !== questionnaire.questions.length) {
        return res.status(400).send('Answers do not match the number of questions');
    }

    let user = data.users.find(u => u.userId === userId);
    if (!user) {
        return res.status(404).send('User not found'); // Return an error if the user does not exist
    }

    if (!Array.isArray(user.answeredQuestions)) {
        user.answeredQuestions = [];
    }

    console.log('User before adding answers:', user);


    user.answeredQuestions.push({
        questionnaireId: questionnaire.id,
        questions: questionnaire.questions.map((q, index) => ({
            question: q.test,
            answer: userAnswers[index]
        })),
        answers: userAnswers
    });

    console.log('User after adding answers:', user);


    writeFile(data);
    res.status(200).send({
        message: "Answers submitted successfully",
        user
    });
};
