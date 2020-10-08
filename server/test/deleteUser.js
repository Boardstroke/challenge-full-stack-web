const validUsers = require("../data/validUsers.json");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { user } = require("../src/models");

chai.use(chaiHttp);
chai.should();

const generateRandomNumber = () =>
  Math.floor(Math.random() * validUsers.length);

describe("Delete users - Endpoints", () => {
  describe("DELETE /api/users/", () => {
    it("Should delete all users -- 204", async () => {
      // TODO
    });

    it("Should return no users found -- 404", async () => {
      // TODO
    });
  });

  describe("DELETE /api/users/(:id)", () => {
    let validUser;
    let id;
    before(async () => {
      validUser = validUsers[generateRandomNumber()]

      let newUser = await user.create(validUser);
      id = newUser.id;
    });
    after(async () => {
      await user.destroy({
        where: { id : id}
      })
    });

    it("Should delete user by id -- 204", async () => {
      let res = await chai.request("http://localhost:3000").del(`/api/users/${id}`);
      res.should.have.status(204);
    });

    it("Should return no user found with this id -- 404", async () => {
      let res = await chai.request("http://localhost:3000").del(`/api/users/999`)
      res.should.have.status(404);
    });

    it("Should return invalid id -- 400", async () => {
      // TODO
    });
  });
});
