module.exports = {
  development: {
    database: "desafio_grupo_a_development",
    user: "matheus",
    password: "secret",
    options: {
      dialect: "postgres",
      host: "localhost",
    },
  },
  test: {
    database: "desafio_grupo_a_test",
    user: "matheus",
    password: "secret",
    options: {
      dialect: "postgres",
      host: "localhost",
    },
  },
  production: {
    database: "desafio_grupo_a",
    user: "matheus",
    password: "secret",
    options: {
      dialect: "postgres",
      host: "localhost",
    },
  }
};
