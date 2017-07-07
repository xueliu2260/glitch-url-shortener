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
  var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var test = require('assert');
// // Connection URL. This is where your mongodb server is running.

// //(Focus on This Variable)
var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)
var collection;
MongoClient.connect(url, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
  console.log('Connection established to ', url);

  // Create a collection
  collection = db.collection('url-shortener-database');
  // Insert the docs
  

  }
})
app.get("/new/:shortcode", function (request, response) {
  var shortCode = parseInt(request.params.shortcode);
  //console.log("here");
  collection.findOne({ '_id' : shortCode }, function(err, docs) {
    if(err) if(err) throw err;
    if(docs == null) {
      response.status(404).json({error:"This url is not on the database."});
    }
    else {
      response.redirect(docs.url);
    }    
  });
});
app.get("/new/*", function (request, response) {
  getUri = request.params[0].toString();
  var size = Math.floor(Math.random() * 100);
    console.log(getUri);
  collection.insertOne({"_id":size, "url": getUri});

// // Use connect method to connect to the Server

  response.sendStatus(200);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
