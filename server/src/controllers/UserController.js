const { user } = require("../models");

const standardError = {
  message: "Algo deu errado no servidor",
  error: "Internal Server Error",
  status: 500,
};

module.exports = {
  index: async (req, res) => {
    try {
      const users = await user.findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(standardError);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(id) || !Number.isInteger(parseInt(id)) || parseInt(id) < 0) {
        let err = new Error();
        err.name = "Validation Error";
        err.message = "id inválido, id precisa ser um inteiro positivo";
        err.status = 400;
        err.path = "id";

        throw err;
      } else {
        const userById = await user.findOne({
          where: { id: id },
        });
        if (userById) {
          res.status(200).send(userById);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      }
    } catch (err) {
      switch (err.name) {
        case "Validation Error":
          res.status(400).send(err);
          break;
        default:
          res.status(500).send(standardError);
      }
    }
  },

  create: async (req, res) => {
    try {
      if (req.body === {}) {
        throw new Error("Preencha os campos obrigatórios");
      }
      const newUser = await user.create(req.body);
      res.status(201).send(newUser);
    } catch (err) {
      switch (err.name) {
        case "SequelizeUniqueConstraintError":
          res.status(409).send(
            err.errors.map((e) => ({
              message: `Já existe uma conta vinculada com esse ${e.path}`,
              status: 409,
              error: e.type,
              path: e.path,
            }))[0]
          );
          break;
        case "SequelizeValidationError":
          console.log(err);
          res.status(400).send(
            err.errors.map((e) => ({
              message: e.message,
              status: 400,
              error: e.type,
              path: e.path,
            }))[0]
          );
          break;

        default:
          res.status(500).send(standardError);
          break;
      }
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      if (isNaN(id) || !Number.isInteger(parseInt(id)) || parseInt(id) < 0) {
        let err = new Error();
        err.name = "Validation Error";
        err.message = "id inválido, id precisa ser um inteiro positivo";
        err.status = 400;
        err.path = "id";
        throw err;
      }
      const deletedUser = await user.destroy({
        where: {
          id: id,
        },
      });
      if (deletedUser) {
        res.sendStatus(204);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      switch (err.name) {
        case "Validation Error":
          res.status(400).send(err);
          break;
        default:
          res.status(500).send(standardError);
      }
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try{
      let userToUpdate =  await user.findOne({
          where: { id: id },
        });
      for(const key in req.body){
        userToUpdate[key] = req.body[key]
      }
      await userToUpdate.save({ fields: ['nome', 'email']});
      res.sendStatus(204)
    } catch(err){
      console.log(err)
      res.status(500).send(JSON.stringify(err))
    }
  }
};
