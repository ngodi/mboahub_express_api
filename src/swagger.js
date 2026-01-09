import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'MboaHub API',
    description: 'OpenAPi specification for MboaHub API',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./routes/*.ts'];

swaggerAutogen()(outputFile, endpointFiles, doc);
