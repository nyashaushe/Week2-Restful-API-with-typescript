import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API',
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API routes and controllers
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
