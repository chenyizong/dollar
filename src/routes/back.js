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
//参数参见memoConnection.js中function参数

//新增memo post
router.post('/memo', function (req,res,next) {
  if (req.query.id) {
    memoConnection.updateMemo(req.body.id, req.body.title, req.body.content, function (data) {
      res.json(data);
    });
  } else {
    memoConnection.addMemo(req.body.userId, req.body.key, req.body.title, req.body.content, function (data) {
      res.json(data);
    });
  }
})
//删除memo delete
router.delete('/memo', function (req,res,next) {
  memoConnection.addMemo(req.query.id, function (data) {
    res.json(data);
  });
})

//获取memo get (如果id不为空，根据id查询，负责根据userId,key查询）
router.get('/memo', function (req,res,next) {
  if (req.query.id) {
    memoConnection.getMemoById(req.query.id, function (data) {
      res.json(data);
    });
  } else {
    memoConnection.getMemo(req.query.userId, req.query.key, function (data) {
      res.json(data);
    });
  }
})

//获取所有memo get
router.get('/memos', function (req,res,next) {
  memoConnection.getAllMemo(req.query.userId, function (data) {
    res.json(data);
  });
})

//搜索memo get
router.get('/search', function (req,res,next) {
  memoConnection.searchMemo(req.query.userId, req.query.title, function (data) {
    res.json(data);
  });
})

//获取所有的key get
router.get('/keys', function (req,res,next) {
  memoConnection.getAllKey(req.query.userId, function (data) {
    res.json(data);
  });
})

module.exports = router;
