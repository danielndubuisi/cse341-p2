const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // Output file for Swagger JSON
const endpointsFiles = ['./server.js', './routes/**/*.js']; // Array of files containing your API endpoints
const doc = {
    info: {
        title: 'My CSE341 API',
        description: 'CSE341 web services API documentation for Daniel Ndubuisi'
    },
    host: 'cse341-web-service-wq7m.onrender.com', // API host
    schemes: ['https']
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your main application file
});
