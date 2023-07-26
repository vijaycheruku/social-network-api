const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/networkapi",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);


module.exports = mongoose.connection;