const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Music Practice Log API',
        description: 'A simple API to manage practice sessions for musicians.'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);