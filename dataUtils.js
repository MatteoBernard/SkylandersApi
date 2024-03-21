
const fs = require('fs');
const path = require("path");
const skylandersJsonPath = path.join(__dirname, './public/skylanders.json');
const elementsJsonPath = path.join(__dirname, './public/elements.json');
const gamesJsonPath = path.join(__dirname, './public/games.json');
const figuresJsonPath = path.join(__dirname, './public/figures.json');

function getSkylandersData() {
    try {
        const data = fs.readFileSync(skylandersJsonPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

function getElementsData() {
    try {
        const data = fs.readFileSync(elementsJsonPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

function getGamesData() {
    try {
        const data = fs.readFileSync(gamesJsonPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

function getFiguresData() {
    try {
        const data = fs.readFileSync(figuresJsonPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

module.exports.skylandersData = getSkylandersData();
module.exports.elementsData = getElementsData();
module.exports.gamesData = getGamesData();
module.exports.figuresData = getFiguresData();