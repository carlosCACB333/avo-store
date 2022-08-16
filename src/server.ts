import 'dotenv/config';
import './graphql';
import { apoloServerInit } from './graphql';
import express from 'express';
import http from 'http';
import { join } from 'path';
import { config } from './config';
import { router } from './router';
import { handleErrors } from './utils/errors';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

apoloServerInit(app, httpServer);

app.use('/static', express.static(join(__dirname, '../public')));
app.use(router);

app.use(handleErrors);

httpServer.listen(config.port, () => {
  console.log(`🚀  server ready at http://localhost:${config.port}`);
});
