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
    let validUser1 = validUsers[generateRandomNumber()];
    let validUser2 = validUsers[generateRandomNumber()];
    let id1;
    let id2;

    before(async () => {
      id1 = (await user.create(validUser1)).id;
      id2 = (await user.create(validUser2)).id;
    });
    after(async () => {
      await user.destroy({ where: { id: id1 } });
      await user.destroy({ where: { id: id2 } });
    });

    it("Should update 'nome' of user(:id), with (Nome Valido) -- 204", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id1}`)
        .send({ nome: "Nome valido" });

      res.should.have.status(204);
    });

    it("Should update 'email' of user(:id), with (email@valido.com) -- 204", async () => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id1}`)
        .send({ email: "email@valido.com" });

      res.should.have.status(204);
    });

    it("Should return error when try to update 'cpf' -- 400", async() => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id1}`)
        .send({ cpf: "006.874.947-48" });

      res.should.have.status(400);
      assert.equal(res.body.message, 'Não é possivel modificar o campo cpf')
    })

    it("Should return error when try to update 'registro_academico' -- 400", async() => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id1}`)
        .send({ registro_academico: "teste.pdf" });

      res.should.have.status(400);
      assert.equal(res.body.message, 'Não é possivel modificar o campo registro academico')
    })

    it("Should return that user email is already in use -- 409", async() => {
      const res = await chai
        .request("http://localhost:3000")
        .patch(`/api/users/${id1}`)
        .send({ email: validUser2.email });

      res.should.have.status(409);
      assert.equal(res.body.message, 'Já existe uma conta vinculada com esse email')
    })

  });
});
