import Debug from "debug";
import { Router } from "express";
import { ValidationError } from "./errors/validation-error";
import { EmailGuesser } from "./EmailGuesser";
import { GuessEmail } from "./GuessEmail.model";

const debug: Debug.IDebugger = Debug("EmailGuesser:route");

const router: Router = Router();

router.post("/", function (req, res, next) {
  const guessEmail = new GuessEmail(req.body);

  const { error } = guessEmail.validate();
  if (error) {
    const { message } = error.details[0];

    debug(message, req.body);
    throw new ValidationError(message);
  }

  const email = EmailGuesser.guessEmail(guessEmail);

  res.status(200).send({ email });
});

export const guessEmail: Router = router;
