var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
let jwt = require('express-jwt');

const Drawing = mongoose.model('Drawing');

const auth = jwt({secret: process.env.BACKEND_SECRET, userProperty: 'payload'});

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

router.param('comment', function (req, res, next, id) {
  const drawing = req.drawing;
  if(!drawing)
    return;
  const comments = drawing.comments.filter(function(comment) {
    return comment._id == id;
  });
  if(comments.length <= 0)
    return next(new Error('Not found ' + id));
  req.comment = comments[0];
  return next();
});

router.get('/API/drawings/:drawing', auth, function (req, res) {
  res.json(req.drawing);
});

router.delete('/API/drawings/:drawingId', auth, function (req, res, next) {
  Drawing.deleteOne({_id:  req.params.drawingId}, function (err) {
    if (err) return next(err);
    res.json({});
  });
});

router.get('/API/drawings/', function (req, res, next) {
  Drawing.find(function (err, drawings) {
    if (err) return next(err);
    res.json(drawings);
  });
});

router.get('/API/drawings/user/:user', auth, function (req, res, next) {
  Drawing.find({ author: req.params.user }, function (err, drawings) {
    if (err)
      return next(err);
    res.json(drawings);
  });
});

router.post('/API/drawings/create', auth, function (req, res, next) {
  const drawing = new Drawing({
    name: req.body.name,
    author: req.body.author,
    canvas: req.body.canvas,
    rating: [],
    comments: []
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

router.post('/API/drawings/:drawing/save', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.canvas = req.body.canvas;
  drawing.author = req.body.author;
  drawing.name = req.body.name;
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

/* RATING */

router.post('/API/drawings/:drawing/upvote/add', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.upVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post.rating.upVotes[post.rating.upVotes.length - 1]);
  });
});

router.post('/API/drawings/:drawing/upvote/remove', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.upVotes = drawing.rating.upVotes.filter(function (vote) {
    return vote.user != req.body.user;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
})
;

router.post('/API/drawings/:drawing/downvote/add', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.downVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/downvote/remove', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.downVotes = drawing.rating.downVotes.filter(function (vote) {
    return vote.user != req.body.user;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

/* COMMENTS */

router.post('/API/drawings/:drawing/comment/add', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.comments.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post.comments[post.comments.length - 1]);
  });
});

router.post('/API/drawings/:drawing/comment/remove', auth, function (req, res, next) {
  const drawing = req.drawing;
  drawing.comments = drawing.comments.filter(function (comment) {
    return comment.user != req.body.comment;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/comment/:comment/upvote/add', auth, function (req, res, next) {
  const drawing = req.drawing;
  const comment = req.comment;
  comment.rating.upVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/comment/:comment/downvote/add', auth, function (req, res, next) {
  const drawing = req.drawing;
  const comment = req.comment;
  comment.rating.downVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/comment/:comment/upvote/remove', auth, function (req, res, next) {
  const drawing = req.drawing;
  const comment = req.comment;
  comment.rating.upVotes = comment.rating.upVotes.filter(function (vote) {
    return vote.user != req.body.user;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/comment/:comment/downvote/remove', auth, function (req, res, next) {
  const drawing = req.drawing;
  const comment = req.comment;
  comment.rating.downVotes = comment.rating.downVotes.filter(function (vote) {
    return vote.user != req.body.user;
  });
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

module.exports = router;
