const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require("../config/config");
const db = {}

const sequelize = new Sequelize(config.database, config.user, config.password, config.options)

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db