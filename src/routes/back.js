var express = require('express');
var userConnection = require('../db/userConnection');
var memoConnection = require('../db/memoConnection' )
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    userConnection.getAllUser(function (data) {
        res.render('back',{users:data});
    })
})
router.get('/users', function(req, res, next) {
   userConnection.getAllUser(function (data) {
       res.json(data);
   })
})

router.post('/memo', function (req,res,next) {
  if (req.query.id) {
    memoConnection.updateMemo(req.query.id, req.query.title, req.query.content, function (data) {
      res.json(data);
    });
  } else {
    memoConnection.addMemo(req.query.userId, req.query.key, req.query.title, req.query.content, function (data) {
      res.json(data);
    });
  }
})

router.delete('/memo', function (req,res,next) {
  memoConnection.addMemo(req.query.id, function (data) {
    res.json(data);
  });
})


router.get('/memo', function (req,res,next) {
  if (req.query.id) {
    memoConnection.getMemoById(req.query.id, function (data) {
      res.json(data);
    });
  } else {
    memoConnection.getMemo(req.query.userId, req.query.key, req.query.content, function (data) {
      res.json(data);
    });
  }
})

router.get('/memos', function (req,res,next) {
  memoConnection.getAllMemo(req.query.userId, function (data) {
    res.json(data);
  });
})

router.get('/search', function (req,res,next) {
  memoConnection.searchMemo(req.query.userId, req.query.title, function (data) {
    res.json(data);
  });
})

router.get('/keys', function (req,res,next) {
  memoConnection.getAllKey(req.query.userId, function (data) {
    res.json(data);
  });
})

module.exports = router;
