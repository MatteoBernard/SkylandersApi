var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();
var port = 3001;




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




const fs = require('fs');
const skylandersJsonPath = path.join(__dirname, './public/skylanders.json');
const elementsJsonPath = path.join(__dirname, './public/elements.json');
const gamesJsonPath = path.join(__dirname, './public/games.json');

function getSkylandersJson() {
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

const skylandersData = getSkylandersJson();
const elementsData = getElementsData();
const gamesData = getGamesData();

app.get('/', (req, res) => {
  res.json({ message: "Welcome to SkylandersApi" });
});

app.get('/skylanders', (req, res) => {
  try {
    res.json(skylandersData);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/skylanders/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const skylander = skylandersData.find(skylander => skylander.id === id);

  if (!skylander) {
    res.status(404).send('Skylander not found');
    return;
  }

  res.json(skylander);
});

app.get('/skylandersByName/:name', async (req, res) => {
  const encodedName = req.params.name;
  const decodedName = encodedName.replace(/_/g, ' ');

  const skylander = skylandersData.find(skylander => skylander.name.toLowerCase() === decodedName.toLowerCase());

  if (!skylander) {
    res.status(404).send('Skylander not found');
    return;
  }

  res.json(skylander);
});

app.get('/skylandersFromSpyrosAdventure', async (req, res) => {
  const skylandersFromSpyrosAdventure = skylandersData.filter(skylander => skylander.release === "Skylanders: Spyro's Adventure");

  if (skylandersFromSpyrosAdventure.length === 0) {
    res.status(404).send('No Skylanders found from Spyro\'s Adventure');
    return;
  }

  res.json(skylandersFromSpyrosAdventure);
});

app.get('/skylandersFromSuperChargers', async (req, res) => {
  const skylandersFromSuperChargers = skylandersData.filter(skylander => skylander.release === "Skylanders: SuperChargers");

  if (skylandersFromSuperChargers.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: SuperChargers');
    return;
  }

  res.json(skylandersFromSuperChargers);
});

app.get('/skylandersFromImaginators', async (req, res) => {
  const skylandersFromImaginators = skylandersData.filter(skylander => skylander.release === "Skylanders: Imaginators");

  if (skylandersFromImaginators.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Imaginators');
    return;
  }

  res.json(skylandersFromImaginators);
});

app.get('/skylandersFromGiants', async (req, res) => {
  const skylandersFromGiants = skylandersData.filter(skylander => skylander.release === "Skylanders: Giants");

  if (skylandersFromGiants.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Giants');
    return;
  }

  res.json(skylandersFromGiants);
});

app.get('/skylandersFromSwapForce', async (req, res) => {
  const skylandersFromSwapForce = skylandersData.filter(skylander => skylander.release === "Skylanders: Swap Force");

  if (skylandersFromSwapForce.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Swap Force');
    return;
  }

  res.json(skylandersFromSwapForce);
});

app.get('/skylandersByElement/:element', async (req, res) => {
  const elementValue = req.params.element;

  const skylandersByElement = skylandersData.filter(skylander => skylander.element === elementValue);

  if (skylandersByElement.length === 0) {
    res.status(404).send('No Skylanders found with the specified element');
    return;
  }

  res.json(skylandersByElement);
});

app.get('/elements', (req, res) => {
  try {
    res.json(elementsData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/elements/:name', (req, res) => {
  const encodedName = req.params.name;
  const decodedName = encodedName.replace(/_/g, ' ');

  const element = elementsData.find(element => element.name.toLowerCase() === decodedName.toLowerCase());

  if (!element) {
    res.status(404).send('Element not found');
    return;
  }

  res.json(element);
});

app.get('/games', (req, res) => {
  try {
    res.json(gamesData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/games/:name', (req, res) => {
  const name = req.params.name;
  const game = gamesData.find(game => game.name.toLowerCase() === name.toLowerCase());

  if (!game) {
    res.status(404).send('Game not found');
    return;
  }

  res.json(game);
});

app.get('/games/release/:release', (req, res) => {
  const release = req.params.release;
  const filteredGames = gamesData.filter(game => game.release.toLowerCase() === release.toLowerCase());

  if (filteredGames.length === 0) {
    res.status(404).send('No games found for the specified release');
    return;
  }

  res.json(filteredGames);
});


app.listen(port, () => {
  console.log(`Server stated on port ${port}`);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
