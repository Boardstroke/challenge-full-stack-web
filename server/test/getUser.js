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

let users = [];
let ids = [];
describe("Get users - Endpoints", () => {
  before(async () => {
    for (let i = 0; i < 3; i++) {
      const validUser = validUsers[generateRandomNumber()];
      const newUser = await user.create(validUser);
      ids.push(newUser.id);
      users.push(validUser);
    }
  });

  after(async () => {
    await user.destroy({
      where: {
        id: ids,
      },
    });
  });

  it("Should return all user in the database -- 200", async () => {
    const res = await chai.request("http://localhost:3000").get("/api/users");
    res.body.should.be.a("array");
    res.should.have.status(200);
    expect(res.body).containSubset(users);
  });

  it("Should return user with the id equal ID -- 200", async () => {
    const res = await chai
      .request("http://localhost:3000")
      .get(`/api/users/${ids[0]}`);
    res.body.should.be.a("object");
    expect(res.body).to.include.keys(
      "id",
      "nome",
      "email",
      "cpf",
      "registro_academico"
    );
    expect(res.body).to.deep.include(users.filter((u) => u.id === ids[0]));
    res.should.have.status(200);
  });

  it("Should return user not found -- 404", async () => {
    const res = await chai.request("http://localhost:3000").get(`/api/users/999`);
    res.should.have.status(404);
  });

  it("Should return id not valid -- 500", async () => {
    const res = await chai
      .request("http://localhost:3000")
      .get(`/api/users/id_invalido`);
    res.should.have.status(400);
    assert.equal(
      res.body.message,
      "id inválido, id precisa ser um inteiro positivo"
    );
  });
});
