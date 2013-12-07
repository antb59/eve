var querystring = require('querystring'),
    mongoose = require('mongoose'),
    user = require('./../models/users');

exports.list = function(callback) {
    var users;
    user.find({}, function(err, users) {
        if (err) {
            console.log('Error during user.find : ' + err);
            callback(err);
        }
        else {
            console.log("users: " + users);
            callback(err, users);
        }
    });
}

exports.findByUsername = function(pUsername, callback) {
    user.findOne({ username : pUsername},function(err,userFound){
        if(err) {
            console.log('Error during user.findByUsername : ' + err);
            callback(err); 
        }
        else {
            if(!userFound){
                console.log('No user ' + pUsername + ' found');
                callback(err, userFound);
            }
            callback(err, userFound);
        }
    });
}

exports.findById = function(pId, callback) {
    user.findOne({ _id : pId},function(err,userFound){
        if(err) {
            console.log('Error during user.findById : ' + err);
            callback(err); 
        }
        else {
            if(!userFound){
                console.log('No user with ' + pId + ' found');
                callback(err, userFound);
            }
            callback(err, userFound);
        }
    });
}

exports.login = function(pUsername, pPassword, callback) {
    user.findOne({ username : pUsername},function(err,userFound){
        if(err) {
            console.log('Error during user.findByUsername : ' + err);
            callback(err); 
        }
        else {
            if(!userFound){
                console.log('Login Failed - ' + pUsername);
                callback('Login Failed');
            }
            else {
                if (userFound.password == pPassword) {
                    callback(null, userFound);    
                }
                else {
                    console.log('Login Failed - ' + pUsername);
                    callback('Login Failed');    
                }    
            }
        }
    });
}

exports.save = function(pUsername, pPassword, callback) {
    var newUser = new user({username: pUsername, password: pPassword});
    newUser.save(function(err, newUser) {
        if (err) {
            console.log('Error during user.save : ' + err);
            callback(err);
        }
        else {
            callback(err,newUser);            
        }
    });
}

exports.delete = function(pId, callback) {
    user.findByIdAndRemove(pId,function(err, deletedUser) {
        if (err) {
            console.log('Error during user.delete : ' + err);
            callback(err);
        }
        else {
            callback(err,deletedUser);            
        }
    });
}