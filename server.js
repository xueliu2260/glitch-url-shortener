// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  
  response.sendFile(__dirname + '/views/index.html');
  
});
var getUri;
app.get("/new/*", function (request, response) {
  getUri = request.params[0];
  response.sendStatus(200);
});


var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var test = require('assert');
// // Connection URL. This is where your mongodb server is running.

// //(Focus on This Variable)
var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)

// // Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
  console.log('Connection established to ', url);

  // Create a collection
  var collection = db.collection('url-shortener-database');
  // Insert the docs
  var size = Math.random(100).toString();
  collection.insertOne({getUri: {$exists : false}}, {$set: {size: getUri}});

  }
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
