var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-in', async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var userExist = await userModel.findOne({email: email, password: password});

  res.json(userExist);
});

router.post('/sign-up', async function(req, res, next) {
  var userName = req.body.userName;
  var email = req.body.email;
  var password = req.body.password;
  var userSaved;

  var userExist = await userModel.findOne({email: email});
  if(userExist == null){
    var newUser = new userModel({
      userName: userName,
      email: email,
      password: password,
    });
    userSaved = await newUser.save();
  } else {
    userSaved = null;
  }

  res.json(userSaved);
});

module.exports = router;
