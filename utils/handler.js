const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, "../data/data.json");

exports.readFile = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { users: [], questionnaires: [], answers: [] }
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
};

exports.writeFile = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
};