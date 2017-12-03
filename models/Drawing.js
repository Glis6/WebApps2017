let mongoose = require('mongoose');

let Vote = new mongoose.Schema({
  user: String,
  timestamp: Date
});

let Rating = new mongoose.Schema({
  upVotes: [Vote],
  downVotes: [Vote]
});

let Comment = new mongoose.Schema({
  comment: [String],
  user: String,
  rating: Rating
});

let Drawing = new mongoose.Schema({
  name: String,
  author: String,
  canvas: String,
  rating: Rating,
  comments: [Comment]
});

mongoose.model('Drawing', Drawing);
