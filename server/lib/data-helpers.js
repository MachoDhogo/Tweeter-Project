"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(false);
    },

//creating array of tweets and handing it over to whoever calls it
    getTweets: function(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
          if(err) {
            return callback(err);
          }
          //send back to index.js as an array.  if error is null, then send tweets
          callback(null, tweets);
      })
    }
  };
}
