let mongoose = require('mongoose');

let Vote = new mongoose.Schema({
  userId: String,
  timestamp: Date
});

let Rating = new mongoose.Schema({
  upVotes: [Vote],
  downVotes: [Vote]
});

let Drawing = new mongoose.Schema({
  name: String,
  author: String,
  canvas: String,
  rating: Rating
});

mongoose.model('Drawing', Drawing);
