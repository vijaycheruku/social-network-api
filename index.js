const express = require("express");
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect("mongodb://localhost/networkapi",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.listen(PORT);

console.log('Running at Port '+PORT);
