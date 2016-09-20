var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require('util');

module.exports.register = function(req, res) {
    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            if (req.body.deviceToken && (req.body.deviceToken != '')) {
                console.log("DEVICE TOKEN : " + req.body.deviceToken);
                user.setDeviceToken(req.body.deviceToken);
                user.save();
            }     
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(200).json({"error" : "Login failed"});
        }
    })(req, res);

};