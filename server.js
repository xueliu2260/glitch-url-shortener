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
  var size = Date.now();
    console.log(getUri);
  if(validateUrl(getUri)){
    collection.insertOne({"_id":size, "url": getUri});
    response.status(200).json({_id:size, url:getUri});
  }else{
    response.status(500).json({error:"This url is not valid."});
  }
  

});

function validateUrl(requesturl) {
  
  // http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
  // jQuery :troll:
  var urlRegex = new RegExp([
    /(?:(?:(https?|ftp):)?\/\/)/      // protocol
    ,/(?:([^:\n\r]+):([^@\n\r]+)@)?/  // user:pass
    ,/(?:(?:www\.)?([^\/\n\r]+))/     // domain
    ,/(\/[^?\n\r]+)?/                 // request
    ,/(\?[^#\n\r]*)?/                 // query
    ,/(#?[^\n\r]*)?/                  // anchor
  ].map(function(r) {return r.source}).join(''));
  
  return urlRegex.test(requesturl);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
