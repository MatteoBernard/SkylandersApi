# Skylanders API

Welcome to the Skylanders API, a simple API for accessing Skylanders figurine data.

You can access the API [here](https://ill-lime-threads.cyclic.app).

## Technologies

- Javascript / ExpressJS
- Hosted with GitHub / Cyclic
- pug / CSS
- JSON files

## Available Routes

### Get All Skylanders

**GET /skylanders**

This route returns all available Skylanders.

### Get a Skylander by ID

**GET /skylander/:id**

This route allows you to retrieve a Skylander by specifying its ID.

### Get a Skylander by Name

**GET /skylanderByName/:name**

This route allows you to retrieve a Skylander by specifying its name.

### **Get Skylanders from a Specific Game**

- **Skylanders: Spyro's Adventure**

**GET /skylandersFromSpyrosAdventure**

- **Skylanders: SuperChargers**

**GET /skylandersFromSuperChargers**

- **Skylanders: Imaginators**

**GET /skylandersFromImaginators**

- **Skylanders: Giants**

**GET /skylandersFromGiants**

- **Skylanders: Swap Force**

**GET /skylandersFromSwapForce**

### Get Skylanders by Element

**GET /skylandersByElement/:element**

This route allows you to retrieve Skylanders belonging to a specific element by specifying the element.

## Usage

To use these routes, you can make HTTP GET requests to the corresponding URLs using your favorite HTTP client (e.g., Postman, cURL, fetch API, etc.).

Example usage with cURL:

```bash
curl http://https://ill-lime-threads.cyclic.app/skylanders
````