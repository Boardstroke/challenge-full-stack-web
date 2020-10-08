const validUsers = require("../data/validUsers.json");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { user } = require("../src/models");

chai.use(chaiHttp);
chai.should();

describe("Delete users - Endpoints", () => {
  describe("DELETE /api/users/", () => {
    it("Should delete all users -- 204", async () => {
      // TODO
    });

    it("Should return no users found -- 404", async () => {
      // TODO
    })
  });


  describe("DELETE /api/users/(:id)", () => {
    it('Should delete user by id -- 204', async() => {
      // TODO
    });

    it("Should return no user found with this id -- 404", async() => {
      // TODO
    });

    it("Should return invalid id -- 400", async() => {
      // TODO
    })
  });

});
