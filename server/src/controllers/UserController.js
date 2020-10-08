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
          where: { id: req.params.id },
        });
        if(userById){
          res.status(200).send(userById);
        }else{
          res.status(404).send({})
        }
      }
    } catch (err) {
      switch (err.name) {
        case "Validation Error":
          res.status(400).send(err);
          break;
        default:
          res.status(500).send(standardError);
          break;
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
};
