let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const userRoute = require('../server/routes/user.routes.js');
const createError = require('http-errors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true}));
app.use('/users', userRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => { console.log('Successful connection to port '+port)});

app.use((req, res, next) => { next(createError(404)) });

app.use(function (error, req, res, next){
  console.error(error.message);
  if(!error.statusCode) error.statusCode = 500;
  res.status(error.statusCode).send(error.message);
});
