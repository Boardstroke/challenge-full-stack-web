const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');
const {sequelize} = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(logger('tiny'))

routes(app);

sequelize.sync({alter: true}).then(() => {
  app.listen(3000);
})