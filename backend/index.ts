import Debug from 'debug';

import express from 'express';
import "express-async-errors";

import { json, urlencoded } from 'body-parser';
// import { routes } from './routes';

import { NotFoundError } from './shared/errors';
import { errorHandler } from './shared/middlewares/error-handlers';


const debug: Debug.IDebugger = Debug('EmailGuesser:app');

const PORT = parseInt(<string>process.env.PORT) || 5454;
const app: express.Application = express();

// Middle wares

app.use(json());
app.use(urlencoded({ extended: false }));

// routes(app);

app.all('*', async () => {
  throw new NotFoundError('Route not found.')
});

app.use(errorHandler)


const server = app.listen(PORT, () => debug(`Server is listening on ${PORT}`));

export default server;