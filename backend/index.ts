import Debug from "debug";

import express from "express";
import "express-async-errors";

import { json, urlencoded } from "body-parser";

import { NotFoundError } from "./lib/errors";
import { errorHandler } from "./lib/middlewares/error-handlers";
import { guessEmail } from "./lib/GuessEmail";

const debug: Debug.IDebugger = Debug("EmailGuesser:app");

const PORT = parseInt(<string>process.env.PORT) || 5454;
const app: express.Application = express();

// Middle wares

app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api/guess-email", guessEmail);

app.all("*", async () => {
  throw new NotFoundError("Route not found.");
});

app.use(errorHandler);

app.listen(PORT, () => debug(`Server is listening on ${PORT}`));

export default app;

// process.on("SIGINT", () => {
//   console.log("Exiting already in use");
//   process.exit();
// });

// process.on("exit", () => {
//   console.log("exiting...");
//   process.exit();
// });

// export default server;
