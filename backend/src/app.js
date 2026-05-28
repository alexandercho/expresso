const express = require('express');

const corsMiddleware = require('#middleware/cors-middleware');
const errorHandlerMiddleware = require('#middleware/error-handler-middleware');
const notFoundMiddleware = require('#middleware/not-found-middleware');
const routes = require('#routes');

const app = express();

app.use(corsMiddleware);
app.use(express.json({ limit: '256mb' }));

app.use(routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
