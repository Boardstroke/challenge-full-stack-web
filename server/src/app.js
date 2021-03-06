const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const insertUsers = require('./config/insertUsers');

const routes = require('./routes');
const {sequelize} = require('./models');

const app = express();

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(logger('tiny'))

app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  next();
});

routes(app);

sequelize.sync({force: true}).then(() => {
  app.listen(3000);
  if(process.env.NODE_ENV === 'development'){
    insertUsers()
  }
})