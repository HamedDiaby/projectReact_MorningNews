var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var SHA256 = require('crypto-js/sha256');
var encBase64 = require('crypto-js/enc-base64');
var uid2 = require('uid2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-in', async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var userExist = await userModel.findOne({email: email});
  
  if(userExist){
    var hach = SHA256(password + userExist.salt).toString(encBase64);

    if(hach === userExist.password){
      res.json(userExist.token);
    } else {
      res.json(null);
    }
  } else {
    res.json(null);
  }

});

router.post('/sign-up', async function(req, res, next) {
  var userName = req.body.userName;
  var email = req.body.email;
  var token = uid2(32);
  var password = req.body.password;
  var salt = uid2(32);
  var userSaved;

  var userExist = await userModel.findOne({email: email});
  if(userExist == null){
    var newUser = new userModel({
      userName: userName,
      token : token,
      salt: salt,
      email: email,
      password: SHA256(password + salt).toString(encBase64),
    });
    userSaved = await newUser.save();
  } else {
    userSaved = null;
  }

  res.json(userSaved.token);
});

module.exports = router;
