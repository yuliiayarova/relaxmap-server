import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Relax Map API',
    version: '1.0.0',
    description: 'API documentation for Relax Map project',
  },
  servers: [
    {
      url: 'https://relaxmap-server-a8mo.onrender.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:4000',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
