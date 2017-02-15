const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MedAd');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

/*
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//   db.close();
// });
*/
