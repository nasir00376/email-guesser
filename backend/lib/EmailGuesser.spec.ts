// const { User } = require("../../../models/user");

import { EmailGuesser } from "./EmailGuesser";
import { GuessEmail } from "./GuessEmail.model";

const data = {
  "Jane Doe": "jdoe@babbel.com",
  "Jay Arun": "jayarun@linkedin.com",
  "David Stein": "davidstein@google.com",
};

describe("EmailGuesser", () => {
  describe("EmailGuesser.generateDomainLookup", () => {
    it("should return a valid domain lookup object", () => {
      const data = {
        "Jane Doe": "jdoe@babbel.com",
        "Jay Arun": "jayarun@linkedin.com",
        "David Stein": "davidstein@google.com",
      };
      const domainLookup = EmailGuesser.generateDomainLookup(data);

      expect(domainLookup).toBeDefined();
      expect(domainLookup).toMatchObject({
        "babbel.com": "initial",
        "linkedin.com": "full",
        "google.com": "full",
      });
    });
  });

  describe("EmailGuesser.guessEmail", () => {
    it("should guess an email when a valid fullname and domain is provided", () => {
      const payload: GuessEmail = new GuessEmail({
        fullname: "Vanessa Boom",
        domain: "babbel.com",
      });
      const email = EmailGuesser.guessEmail(payload);

      expect(payload).toBeDefined();
      expect(email).toBeDefined();
      expect(email).toEqual("vboom@babbel.com");
    });

    it("should throw exception when an email derivation is impossible", () => {
      const payload: GuessEmail = new GuessEmail({
        fullname: "Vanessa Boom",
        domain: "facebook.com",
      });

      expect(() => EmailGuesser.guessEmail(payload)).toThrow();
      expect(() => EmailGuesser.guessEmail(payload)).toThrow(Error);
    });
  });
});
