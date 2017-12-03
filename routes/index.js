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

/* RATING */

router.post('/API/drawings/:drawing/upvote/add', function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.upVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post.rating.upVotes[post.rating.upVotes.length - 1]);
  });
});

router.post('/API/drawings/:drawing/upvote/remove', function (req, res, next) {
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

router.post('/API/drawings/:drawing/downvote/add', function (req, res, next) {
  const drawing = req.drawing;
  drawing.rating.downVotes.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/downvote/remove', function (req, res, next) {
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

router.post('/API/drawings/:drawing/comment/add', function (req, res, next) {
  const drawing = req.drawing;
  drawing.comments.push(req.body);
  drawing.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(req.body);
  });
});

router.post('/API/drawings/:drawing/comment/remove', function (req, res, next) {
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

router.post('/API/drawings/:drawing/comment/:comment/upvote/add', function (req, res, next) {
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

router.post('/API/drawings/:drawing/comment/:comment/downvote/add', function (req, res, next) {
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

router.post('/API/drawings/:drawing/comment/:comment/upvote/remove', function (req, res, next) {
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

router.post('/API/drawings/:drawing/comment/:comment/downvote/remove', function (req, res, next) {
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
