const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Skylanders API',
            version: '1.0.0',
            description: 'Skylanders API Documentation',
            contact: {
                name: "Bernard Matteo",
                url: "https://matteobernard.github.io/portfolio/",
                email: "bernard.matteo.travail@gmail.com"
            }
        },
        servers: [
            {
                url: 'http://https://ill-lime-threads.cyclic.app//',
                description: 'Skylanders API server'
            },
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
