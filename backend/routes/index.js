var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

let Drawing = mongoose.model('Drawing');

/* GET API drawings. */
router.get('/API/drawings/', function (req, res, next) {
  Drawing.find(function(err, drawings) {
    if (err) {
      return next(err);
    }
    res.json(drawings);
  });
});

/* POST API drawings. */
router.post('/API/drawings/create', function (req, res, next) {
  let drawing = new Drawing({
    name: req.body.name,
    author: req.body.author,
    canvas: req.body.canvas
  });
  drawing.save(function(err, post) {
    if (err){ return next(err); }
    res.json(drawing);
  });
});

module.exports = router;
