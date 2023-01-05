const Joi = require("joi");

export type EmailFormat = "initial" | "full";
export type DomainLookup = Record<string, EmailFormat>;

export interface GuessEmailRequestBody {
  fullname: string;
  domain: string;
}

export class GuessEmail {
  public fullname: string;
  public domain: string;

  /**
   * Guess email request.
   *
   * @param {string} fullname User full name.
   * @param {string} domain Company domain.
   */
  constructor({ fullname, domain }: GuessEmailRequestBody) {
    this.fullname = fullname;
    this.domain = domain;
  }

  /**
   * Execute validator on self.
   *
   * @param {function} callback A synchronous callback with error, value args.
   * @return {void}
   */
  validate() {
    const schema = Joi.object().keys({
      fullname: Joi.string().max(255).required(),
      domain: Joi.string().max(255).required(),
    });

    return schema.validate(this);
  }
}
