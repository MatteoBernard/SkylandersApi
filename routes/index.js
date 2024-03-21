var express = require('express');
var router = express.Router();

const data = require('../dataUtils');

const skylandersData = data.skylandersData;
const elementsData = data.elementsData;
const gamesData = data.gamesData;
const figuresData = data.figuresData;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SkylandersApi' });
});

router.get('/skylanders', (req, res) => {
  try {
    res.json(skylandersData);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/skylanders/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const skylander = skylandersData.find(skylander => skylander.id === id);

  if (!skylander) {
    res.status(404).send('Skylander not found');
    return;
  }

  res.json(skylander);
});

router.get('/skylandersByName/:name', async (req, res) => {
  const encodedName = req.params.name;
  const decodedName = encodedName.replace(/_/g, ' ');

  const skylander = skylandersData.find(skylander => skylander.name.toLowerCase() === decodedName.toLowerCase());

  if (!skylander) {
    res.status(404).send('Skylander not found');
    return;
  }

  res.json(skylander);
});

router.get('/skylandersFromSpyrosAdventure', async (req, res) => {
  const skylandersFromSpyrosAdventure = skylandersData.filter(skylander => skylander.release === "Skylanders: Spyro's Adventure");

  if (skylandersFromSpyrosAdventure.length === 0) {
    res.status(404).send('No Skylanders found from Spyro\'s Adventure');
    return;
  }

  res.json(skylandersFromSpyrosAdventure);
});

router.get('/skylandersFromSuperChargers', async (req, res) => {
  const skylandersFromSuperChargers = skylandersData.filter(skylander => skylander.release === "Skylanders: SuperChargers");

  if (skylandersFromSuperChargers.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: SuperChargers');
    return;
  }

  res.json(skylandersFromSuperChargers);
});

router.get('/skylandersFromImaginators', async (req, res) => {
  const skylandersFromImaginators = skylandersData.filter(skylander => skylander.release === "Skylanders: Imaginators");

  if (skylandersFromImaginators.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Imaginators');
    return;
  }

  res.json(skylandersFromImaginators);
});

router.get('/skylandersFromGiants', async (req, res) => {
  const skylandersFromGiants = skylandersData.filter(skylander => skylander.release === "Skylanders: Giants");

  if (skylandersFromGiants.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Giants');
    return;
  }

  res.json(skylandersFromGiants);
});

router.get('/skylandersFromSwapForce', async (req, res) => {
  const skylandersFromSwapForce = skylandersData.filter(skylander => skylander.release === "Skylanders: Swap Force");

  if (skylandersFromSwapForce.length === 0) {
    res.status(404).send('No Skylanders found from Skylanders: Swap Force');
    return;
  }

  res.json(skylandersFromSwapForce);
});

router.get('/skylandersByElement/:element', async (req, res) => {
  const elementValue = req.params.element;

  const skylandersByElement = skylandersData.filter(skylander => skylander.element === elementValue);

  if (skylandersByElement.length === 0) {
    res.status(404).send('No Skylanders found with the specified element');
    return;
  }

  res.json(skylandersByElement);
});

router.get('/elements', (req, res) => {
  try {
    res.json(elementsData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/elements/:name', (req, res) => {
  const encodedName = req.params.name;
  const decodedName = encodedName.replace(/_/g, ' ');

  const element = elementsData.find(element => element.name.toLowerCase() === decodedName.toLowerCase());

  if (!element) {
    res.status(404).send('Element not found');
    return;
  }

  res.json(element);
});

router.get('/games', (req, res) => {
  try {
    res.json(gamesData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/games/:name', (req, res) => {
  const name = req.params.name;
  const game = gamesData.find(game => game.name.toLowerCase() === name.toLowerCase());

  if (!game) {
    res.status(404).send('Game not found');
    return;
  }

  res.json(game);
});

router.get('/games/release/:release', (req, res) => {
  const release = req.params.release;
  const filteredGames = gamesData.filter(game => game.release.toLowerCase() === release.toLowerCase());

  if (filteredGames.length === 0) {
    res.status(404).send('No games found for the specified release');
    return;
  }

  res.json(filteredGames);
});

router.get('/figures', (req, res) => {
  res.json(figuresData);
});

router.get('/figures/variants', (req, res) => {
  const variants = figuresData.filter(figure => figure.isVariant);
  res.json(variants);
});

router.get('/figures/type/:type', (req, res) => {
  const type = req.params.type;
  const filteredFigures = figuresData.filter(figure => figure.type === type);
  res.json(filteredFigures);
});

router.get('/figures/name/:skylandersName', (req, res) => {
  const skylandersName = req.params.skylandersName;
  const filteredFigures = figuresData.filter(figure => figure.name.includes(skylandersName));
  res.json(filteredFigures);
});

router.get('/figures/name/:skylandersName/count', (req, res) => {
  const skylandersName = req.params.skylandersName;
  const filteredFigures = figuresData.filter(figure => figure.name.includes(skylandersName));
  const count = filteredFigures.length;
  res.json({ count });
});

router.get('/figures/name/:skylandersName/variants', (req, res) => {
  const skylandersName = req.params.skylandersName;
  const filteredVariants = figuresData.filter(figure => figure.name.includes(skylandersName) && figure.isVariant);
  res.json(filteredVariants);
});

router.get('/figures/game/:game/', (req, res) => {
  const game = req.params.game;
  const filteredVariants = figuresData.filter(figure => figure.game === game);
  res.json(filteredVariants);
});

router.get('/figures/game/:game/variants', (req, res) => {
  const game = req.params.game;
  const filteredFigures = figuresData.filter(figure => figure.game === game && figure.isVariant === true);
  res.json(filteredFigures);
});

router.get('/figures/game/:game/type/:type', (req, res) => {
  const game = req.params.game;
  const type = req.params.type;
  const filteredFigures = figuresData.filter(figure => figure.game === game && figure.type === type);
  res.json(filteredFigures);
});

module.exports = router;
