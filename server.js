var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose')

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.url);
dbConfig.checkConnection(mongoose);

require('./app/routes/product.routes.js')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(3000,  function() {
    console.log("Server is listening on port  3000");
});