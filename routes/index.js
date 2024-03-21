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


/**
 * @swagger
 * tags:
 *   - name: Skylanders
 *     description: Operations related to Skylanders, including retrieving Skylanders, filtering by various criteria, and getting details of specific Skylanders.
 *   - name: Elements
 *     description: Operations related to elements in the Skylanders series, including retrieving all elements and details of specific elements.
 *   - name: Games
 *     description: Operations related to Skylanders games, including retrieving games, filtering by release year, and getting details of specific games.
 *   - name: Figures
 *     description: Operations related to Skylanders figures, including retrieving all figures, variants, and filtering by various criteria.
 * /skylanders:
 *   get:
 *     summary: Get All Skylanders
 *     description: Retrieve all available Skylanders.
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: A list of all available Skylanders.
 *       500:
 *         description: Internal Server Error.
 * /skylanders/{id}:
 *   get:
 *     summary: Get a Skylander by ID
 *     description: Retrieve a Skylander by specifying its ID.
 *     tags: [Skylanders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Skylander to retrieve.
 *     responses:
 *       200:
 *         description: The requested Skylander.
 *       404:
 *         description: Skylander not found.
 * /skylandersByName/{name}:
 *   get:
 *     summary: Get a Skylander by Name
 *     description: Retrieve a Skylander by specifying its name.
 *     tags: [Skylanders]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the Skylander to retrieve.
 *     responses:
 *       200:
 *         description: The requested Skylander.
 *       404:
 *         description: Skylander not found.
 * /skylandersFromSpyrosAdventure:
 *   get:
 *     summary: Get Skylanders from Skylanders Spyro's Adventure
 *     description: Retrieve Skylanders from the game "Skylanders Spyro's Adventure".
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: Skylanders from "Skylanders Spyro's Adventure".
 *       404:
 *         description: No Skylanders found from "Skylanders Spyro's Adventure".
 * /skylandersFromSuperChargers:
 *   get:
 *     summary: Get Skylanders from Skylanders SuperChargers
 *     description: Retrieve Skylanders from the game "Skylanders SuperChargers".
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: Skylanders from "Skylanders SuperChargers".
 *       404:
 *         description: No Skylanders found from "Skylanders SuperChargers".
 * /skylandersFromImaginators:
 *   get:
 *     summary: Get Skylanders from Skylanders Imaginators
 *     description: Retrieve Skylanders from the game "Skylanders Imaginators".
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: Skylanders from "Skylanders Imaginators".
 *       404:
 *         description: No Skylanders found from "Skylanders Imaginators".
 * /skylandersFromGiants:
 *   get:
 *     summary: Get Skylanders from Skylanders Giants
 *     description: Retrieve Skylanders from the game "Skylanders Giants".
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: Skylanders from "Skylanders Giants".
 *       404:
 *         description: No Skylanders found from "Skylanders Giants".
 * /skylandersFromSwapForce:
 *   get:
 *     summary: Get Skylanders from Skylanders Swap Force
 *     description: Retrieve Skylanders from the game "Skylanders Swap Force".
 *     tags: [Skylanders]
 *     responses:
 *       200:
 *         description: Skylanders from "Skylanders Swap Force".
 *       404:
 *         description: No Skylanders found from "Skylanders Swap Force".
 * /skylandersByElement/{element}:
 *   get:
 *     summary: Get Skylanders by Element
 *     description: Retrieve Skylanders by specifying the element.
 *     tags: [Skylanders]
 *     parameters:
 *       - in: path
 *         name: element
 *         required: true
 *         schema:
 *           type: string
 *         description: Element of the Skylanders to retrieve.
 *     responses:
 *       200:
 *         description: Skylanders with the specified element.
 *       404:
 *         description: No Skylanders found with the specified element.
 * /elements:
 *   get:
 *     summary: Get All Elements
 *     description: Retrieve all available elements in the Skylanders series.
 *     tags: [Elements]
 *     responses:
 *       200:
 *         description: A list of all available elements.
 *       500:
 *         description: Internal Server Error.
 * /elements/name/{elementName}:
 *   get:
 *     summary: Get Element by Name
 *     description: Retrieve an element by its name.
 *     tags: [Elements]
 *     parameters:
 *       - in: path
 *         name: elementName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the element to retrieve.
 *     responses:
 *       200:
 *         description: The element matching the specified name.
 *       404:
 *         description: Element not found.
 * /games:
 *   get:
 *     summary: Get All Games
 *     description: Retrieve all available Skylanders games.
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of all available games.
 *       500:
 *         description: Internal Server Error.
 * /games/{name}:
 *   get:
 *     summary: Get a Game by Name
 *     description: Retrieve a Game by specifying its name.
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the Game to retrieve.
 *     responses:
 *       200:
 *         description: The requested Game.
 *       404:
 *         description: Game not found.
 * /games/release/{release}:
 *   get:
 *     summary: Get Games by Release Year
 *     description: Retrieve Games released in a specific year.
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: release
 *         required: true
 *         schema:
 *           type: string
 *         description: Release year of the Games to retrieve.
 *     responses:
 *       200:
 *         description: A list of Games released in the specified year.
 *       404:
 *         description: No games found for the specified release year.
 * /figures:
 *   get:
 *     summary: Get All Figures
 *     description: Retrieve all available Skylanders figures.
 *     tags: [Figures]
 *     responses:
 *       200:
 *         description: A list of all available figures.
 *       500:
 *         description: Internal Server Error.
 * /figures/variants:
 *   get:
 *     summary: Get Variant Figures
 *     description: Retrieve variant Skylanders figures.
 *     tags: [Figures]
 *     responses:
 *       200:
 *         description: A list of variant figures.
 *       500:
 *         description: Internal Server Error.
 * /figures/type/{type}:
 *   get:
 *     summary: Get Figures by Type
 *     description: Retrieve Skylanders figures of a specific type.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of the figures to retrieve.
 *     responses:
 *       200:
 *         description: A list of figures of the specified type.
 *       500:
 *         description: Internal Server Error.
 * /figures/name/{skylandersName}:
 *   get:
 *     summary: Get Figures by Name
 *     description: Retrieve Skylanders figures by name.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: skylandersName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the figures to retrieve.
 *     responses:
 *       200:
 *         description: A list of figures matching the specified name.
 *       500:
 *         description: Internal Server Error.
 * /figures/name/{skylandersName}/count:
 *   get:
 *     summary: Count Figures by Name
 *     description: Count Skylanders figures by name.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: skylandersName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the figures to count.
 *     responses:
 *       200:
 *         description: The count of figures matching the specified name.
 *       500:
 *         description: Internal Server Error.
 * /figures/name/{skylandersName}/variants:
 *   get:
 *     summary: Get Variant Figures by Name
 *     description: Retrieve variant Skylanders figures by name.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: skylandersName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the figures to retrieve variants for.
 *     responses:
 *       200:
 *         description: A list of variant figures matching the specified name.
 *       500:
 *         description: Internal Server Error.
 * /figures/game/{game}:
 *   get:
 *     summary: Get Figures by Game
 *     description: Retrieve Skylanders figures by game.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the game to retrieve figures for.
 *     responses:
 *       200:
 *         description: A list of figures from the specified game.
 *       500:
 *         description: Internal Server Error.
 * /figures/game/{game}/variants:
 *   get:
 *     summary: Get Variant Figures by Game
 *     description: Retrieve variant Skylanders figures by game.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the game to retrieve variant figures for.
 *     responses:
 *       200:
 *         description: A list of variant figures from the specified game.
 *       500:
 *         description: Internal Server Error.
 * /figures/game/{game}/type/{type}:
 *   get:
 *     summary: Get Figures by Game and Type
 *     description: Retrieve Skylanders figures by game and type.
 *     tags: [Figures]
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the game to retrieve figures for.
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of the figures to retrieve.
 *     responses:
 *       200:
 *         description: A list of figures from the specified game and type.
 *       500:
 *         description: Internal Server Error.
 */
