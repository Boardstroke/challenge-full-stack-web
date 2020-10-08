const { user } = require("../src/models");
const validUsers = require("../data/validUsers.json");
const chai = require("chai");
const chaiSubset = require("chai-subset");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiSubset);
chai.should();

const generateRandomNumber = () =>
  Math.floor(Math.random() * validUsers.length);

describe("Update users - Endpoints", () => {
  describe("PATCH /api/users/(:id)", () => {
    let id;
    let validUser = validUsers[generateRandomNumber()];

    before(async () => {
      id = (await user.create(validUser)).id;
    });
    after(async () => {
      await user.destroy({ where: { id: id } });
    });

    it("Should update 'nome' of user(:id), with (Nome Valido) -- 204", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id}`)
        .send({ nome: "Nome valido" });

      res.should.have.status(204);
    });

    it("Should update 'email' of user(:id), with (email@valido.com) -- 204", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id}`)
        .send({ email: "email@valido.com" });

      res.should.have.status(204);
    });
  });
});
