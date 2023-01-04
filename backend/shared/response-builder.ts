import express from "express";

export class ResponseBuilder {
  public static ok<T>(bodyObject: T, res: express.Response): void {
    res.status(200).send(bodyObject);
  }
}
