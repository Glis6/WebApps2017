var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

let Drawing = mongoose.model('Drawing');

router.param('drawing', function (req, res, next, id) {
  Drawing.findById(id).exec(function (err, drawing) {
    if (err) {
      return next(err);
    }
    if (!drawing) {
      return next(new Error('not found ' + id));
    }
    req.drawing = drawing;
    return next();
  });
});

router.get('/API/drawings/:drawing', function (req, res) {
  res.json(req.drawing);
});

router.get('/API/drawings/', function (req, res, next) {
  Drawing.find(function (err, drawings) {
    if (err) return next(err);
    res.json(drawings);
  });
});

router.post('/API/drawings/create', function (req, res, next) {
  let drawing = new Drawing({
    name: req.body.name,
    author: req.body.author,
    canvas: req.body.canvas,
    rating: req.body.rating
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(drawing);
  });
});

router.post('/API/drawings/:drawing/upvote/add', function (req, res, next) {
  let drawing = req.drawing;
  drawing.rating.upVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/upvote/remove', function (req, res, next) {
  let drawing = req.drawing;
  drawing.rating.upVotes = drawing.rating.upVotes.filter(function (vote) {
    return vote.userId != req.body.userId;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
})
;

router.post('/API/drawings/:drawing/downvote/add', function (req, res, next) {
  let drawing = req.drawing;
  drawing.rating.downVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/downvote/remove', function (req, res, next) {
  let drawing = req.drawing;
  drawing.rating.downVotes = drawing.rating.downVotes.filter(function (vote) {
    return vote.userId != req.body.userId;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

module.exports = router;
