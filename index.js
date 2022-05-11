require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const logger = require('morgan');
const rootRoute = require('./routes');
const port = process.env.PORT || 3000

const app = express();

//db connection
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
  res.send("hello from server");
})

app.listen(port, () => {
  console.log(`running server on ${port}`);
})



//middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator())
app.use('/api', rootRoute);


//error global
app.use((err, req, res, next) => {
  console.log("in error")
  if (! err) {
      return next();
  }
  res.status(500);
  console.log(err)
  res.send(err);
});