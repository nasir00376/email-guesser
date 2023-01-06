import app from "../../index";
import request from "supertest";

describe("/api/guess-email", () => {
  describe("POST /", () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.

    let fullname: string;
    let domain: string;

    const exec = async () => {
      return await request(app)
        .post("/api/guess-email")
        .send({ fullname, domain });
    };

    beforeEach(() => {
      fullname = "Vanessa Boom";
      domain = "babbel.com";
    });

    it("should accept a valid email guesser request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it("should guess an email with valid request", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("email", "vboom@babbel.com");
    });

    it("should reject an invalid request with 422 status", async () => {
      fullname = "";
      const res = await exec();

      expect(res.status).toBe(422);
    });

    it("should reject request with error message", async () => {
      fullname = "";
      const res = await exec();

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });

    it("should reject request if derivation is not possible with 400 status", async () => {
      domain = "abc";
      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });
});
