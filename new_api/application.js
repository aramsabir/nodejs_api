const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');


var app = express();
var http = require('http').Server(app);
const db = require('./confDB/mongo.js');

mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true });

var corsSettings = {
    origin: true,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
}

app.use(cors(corsSettings))
app.use(useragent.express());

app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));



app.use("/public", express.static(path.join( '/public')))

app.use(express.static(__dirname));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
  });
  
var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});