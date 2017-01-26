var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')


router.get('/:action', function(req, res, next){

  var action = req.params.action
  if(action == 'currentuser'){
    //check the currentuser
    if(req.session == null){
      res.json({
        confirmation: 'success',
        user: null
      })
      return
    }

    if(req.session.token == null){
      res.json({
        confirmation: 'success',
        user: null
      })
      return
    }
      // Verify Token
      jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decoded){

      if(err){
        res.json({
          confirmation: 'fail',
          message: 'Access Denied'
        })
        return
      }
      controllers.profile
      .findById(decoded.id, false)
      .then(function(result){
        res.json({
          confirmation: 'success',
          user: result
        })
        return
      })
      .catch(function(error){
        res.json({
          confirmation: 'fail',
          message: error
        })
        return
      })
    })
  }

  if(action == 'logout'){
    req.session.reset()
    res.json({
      confirmation: 'success',
      user: null
    })

  }



})

router.post('/:action', function(req, res, next){

  var action = req.params.action
  if (action == 'register'){
    //check the currentuser
    controllers.profile
    .create(req.body, false)
    .then(function(result){

      var token = jwt.sign({id: result.id}, process.env.TOKEN_SECRET, {expiresIn: 4000})
      req.session.token = token


      res.json({
        confirmation: 'success',
        user: result,
        token: token
      })

    })
    .catch(function(err){
      res.json({
        confirmation: 'Fail',
        message: err
      })
    })
  }

  if(action == 'login'){
    controllers.profile
    .find({email: req.body.email}, true)
    .then(function(results){
      if(results.length == 0){
        throw new Error('User not found')
        return
      }

      var profile = results[0]
      //check password
      var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
      if(isPasswordCorrect == false){
        throw new Error('Wrong Password')
        return
      }
      var token = jwt.sign({id: profile._id}, process.env.TOKEN_SECRET, {expiresIn: 4000})
      req.session.token = token

      res.json({
        confirmation: 'success',
        user: profile.summary()
      })
      return

    })
    .catch(function(err){
      res.json({
        confirmation: 'Fail',
        message: err.message
      })
    })

  }



})



module.exports = router
