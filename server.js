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

app.get("/:str", function (request, response) {
  console.log(request.params.str);
  response.sendStatus(200);
});

app.post("/:str", function (request, response) {
  console.log(request.params.str);
  response.sendStatus(200);
});


// var mongodb = require('mongodb');

// //We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;
// var test = require('assert');
// // // Connection URL. This is where your mongodb server is running.

// // //(Focus on This Variable)
// var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// // //(Focus on This Variable)

// // // Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
// if (err) {
//   console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//   console.log('Connection established to ', url);

// var docs = [{
//       title : "this is my title", author : "bob", posted : new Date() ,
//       pageViews : 5, tags : [ "fun" , "good" , "fun" ], other : { foo : 5 },
//       comments : [
//         { author :"joe", text : "this is cool" }, { author :"sam", text : "this is bad" }
//       ]}];

//   // Create a collection
//   var collection = db.collection('aggregation_each_example');
//   // Insert the docs
//   collection.insertMany(docs, {w: 1}, function(err, result) {

//     // Execute aggregate, notice the pipeline is expressed as an Array
//     var cursor = collection.aggregate([
//         { $project : {
//           author : 1,
//           tags : 1
//         }},
//         { $unwind : "$tags" },
//         { $group : {
//           _id : {tags : "$tags"},
//           authors : { $addToSet : "$author" }
//         }}
//       ], { cursor: { batchSize: 1 } });

//     // Get all the aggregation results
//     cursor.each(function(err, docs) {
//       test.equal(null, err);

//       if(docs == null) {
//         db.close();
//       }
//       console.log(docs);
//     });
//   });
// }
//});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
