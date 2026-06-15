import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  apis: [path.join(__dirname, 'swaggerDocs.js')],
};

export const swaggerSpec = swaggerJSDoc(options);
