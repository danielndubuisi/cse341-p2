const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // Output file for Swagger JSON
const endpointsFiles = ['./server.js', './routes/**/*.js']; // Array of files containing your API endpoints
const doc = {
    info: {
        title: 'CSE341 Project2 API',
        description: 'Daniel Ndubuisi web services API documentation for CSE341 project2'
    },
    host: 'project2-cse341-ziaf.onrender.com', // API host
    schemes: ['https']
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // Your main application file
});
