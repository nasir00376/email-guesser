import Debug from "debug";
import STATIC_DATA from '../data.json';

import { DomainLookup, GuessEmail } from "./GuessEmail.model";

const debug: Debug.IDebugger = Debug("EmailGuesser:guess");

export class EmailGuesser {
  /**
   * Guess email observing domain from domain lookup
   *
   * @example
   * // returns jayarun@linkedin.com
   * EmailGuesser.guessEmail({"fullname" : "Jay Arun", "domain": "linkedin.com"})
   *
   * @param {object} {} GuessEmail
   * @returns {string} jayarun@linkedin.com
   */
  static guessEmail({ fullname, domain }: GuessEmail): string {
    const domainLookup = EmailGuesser.generateDomainLookup(STATIC_DATA);
    const format = domainLookup[domain];

    if (!format) throw new Error("There is no domain registered");

    debug(`${domain} format is ${format}`, JSON.stringify(domainLookup));

    let [firstname, lastname] = fullname.split(" ");

    firstname = firstname.toLocaleLowerCase();
    lastname = lastname?.toLocaleLowerCase();

    const username = [firstname, lastname];

    if (format === "initial") {
      username[0] = firstname[0];
    }

    return [username.join(""), domain].join("@");
  }

  /**
   * Generate email format for specific domain.
   *
   * @example
   * // returns {"linkedin.com": "full"}
   * GuessEmailModel.generateDomainLookup({"Jay Arun": "jayarun@linkedin.com"})
   *
   * @param {string} data Record<string, string>
   * @return {object} DomainLookup.
   */
  static generateDomainLookup(data: Record<string, string>): DomainLookup {
    const lookup: DomainLookup = {};

    for (const [fullname, email] of Object.entries(data)) {
      const [username, domain] = email.split("@");

      lookup[domain] =
        fullname.replace(/\s+/g, "").length === username.length
          ? "full"
          : "initial";
    }

    return lookup;
  }
}
