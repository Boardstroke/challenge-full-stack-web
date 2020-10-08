const {create, index, getById, destroy, update} = require( './controllers/UserController')

module.exports = (app) => {
  app.route('/api/users')
    .post(create)
    .get(index)

  app.route('/api/users/:id')
    .get(getById)
    .delete(destroy)
    .patch(update)
}