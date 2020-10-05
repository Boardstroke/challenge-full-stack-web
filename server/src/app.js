const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(logger('tiny'))

app.get('/', (req,res) => {
  res.send("hello world")
})

app.listen(3000, () => console.log('Porta 3000'))