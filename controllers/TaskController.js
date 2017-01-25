var Task = require('../models/Task')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

  find: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Task.find(params, function(err, tasks){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(tasks)
          return
        }
        var summaries = []
        tasks.forEach(function(task){
          summaries.push(task.summary())
        })
        resolve(summaries)
      })
    })
  },

  findById: function(id){
    return new Promise(function(resolve, reject){
      Task.findById(id, function(err, task){
        if(err){
          reject(err)
          return
        }
          resolve(task.summary())
      })
    })
  },

  create: function(params){
    return new Promise(function(resolve, reject){

      // var password = params.password
      // params['password'] = bcrypt.hashSync(password, 10)
      //

      Task.create(params, function(err, task){
        if(err){
          reject(err)
          return
        }
          resolve(task.summary())
      })
    })
  }
}
