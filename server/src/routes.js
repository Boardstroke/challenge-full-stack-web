const {index} = require( './controllers/UserControllers')

module.exports = (app) => {
  app.get('/api/index', index)
}