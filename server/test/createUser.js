const validUsers = require("../data/validUsers.json");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { user } = require("../src/models");
chai.use(chaiHttp);
chai.should();

const assert = chai.assert;
const expect = chai.expect;

let randomValidUser;
let usedEmail;
let usedCpf;
let cpfs = [];

describe("Create users - Endpoints", () => {
  describe("POST /api/users", () => {

    beforeEach(() => {
      randomValidUser = validUsers[Math.floor(Math.random() * validUsers.length)]
      cpfs.push(randomValidUser.cpf)
    })

    after(async () => {
      await user.destroy({
        where: {
          cpf: cpfs,
        },
      });

    });

    it("Should return user created - 201", async () => {
      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      assert.isFalse(res.error);
      assert.isNotEmpty(res.body);
      res.should.be.a("object");
      res.should.have.status(201);

      usedEmail = randomValidUser.email
      usedCpf = randomValidUser.cpf

      expect(res.body).to.have.all.keys(
        "id",
        "nome",
        "email",
        "registro_academico",
        "cpf",
        "createdAt",
        "updatedAt"
      );
      expect(res.body).to.include(randomValidUser);
      assert.isNotNull(res.body.id);
    });

    it("Should return that user email is already in use - 409", async () => {
      delete randomValidUser.email;
      randomValidUser.email = usedEmail;

      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(409);
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'Já existe uma conta vinculada com esse email')
    });

    it("Should return that user cpf is already in use - 409", async () => {
      delete randomValidUser.cpf
      randomValidUser.cpf = usedCpf;

      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(409);
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'Já existe uma conta vinculada com esse cpf')
    });

    it("Should return unreported mandatory field nome - 400", async () => {
      delete randomValidUser.nome

      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(400);
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'Preencha o nome')
    });

    it("Should return invalid mandatory field email - 400", async () => {
      delete randomValidUser.email
      randomValidUser.email = 'email.br' // Not allowed email.

      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(400);
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'Email inválido')
    });



    it("Should return invalid mandatory field cpf - 400", async () => {
      delete randomValidUser.cpf
      randomValidUser.cpf = '1212' // Not allowed cpf.

      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(400);
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'CPF inválido')
      expect(res.body.message).to.satisfy(function(m){
        return m === 'CPF inválido' || m === 'Preencha com seu CPF'
      })
    });

    it("Should return invalid or unreported mandatory field registro_academico - 400", async () => {
      delete randomValidUser.registro_academico
      let res = await chai
        .request("http://localhost:3000")
        .post("/api/users")
        .send(randomValidUser);

      res.body.should.be.a('object')
      res.should.have.status(400)
      expect(res.body).to.include.keys('error', 'message', 'status', 'path');
      assert.equal(res.body.message, 'Registro acadêmico inválido')

    })




  });
});
