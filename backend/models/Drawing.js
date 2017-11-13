let mongoose = require('mongoose');

let DrawingSchema = new mongoose.Schema({
  name: String,
  author: String,
  canvas: String
});

mongoose.model('Drawing', DrawingSchema);
