module.exports = (Sequelize, dataType) => {
  const User = Sequelize.define("user", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Preencha o nome" },
      },
    },

    email: {
      type: dataType.CITEXT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Preencha com o seu email" },
        isEmail: { msg: "Email inválido" },
      },
    },

    cpf: {
      type: dataType.STRING(14),
      unique: true,
      validate: {
        isCPF(value) {
          const cpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/i;
          if (!value.match(cpf)) {
            let err;
            if (value.length === 0) {
              err = new Error("Preencha com seu CPF");
            } else {
              err = new Error("CPF inválido");
            }
            err.name = "SequelizeValidationError";
            throw err;
          }
        },
      },
    },
    registro_academico: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Registro acadêmico inválido" },
      },
    },
  });

  return User;
};
