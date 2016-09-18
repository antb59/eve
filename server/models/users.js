var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    deviceToken: String
});

userSchema.methods.setPassword = function(password){
    console.log("User Set Password : " + password);
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET);
};

userSchema.methods.setDeviceToken = function(deviceToken){
    console.log("User Set DeviceToken : " + password);
    this.deviceToken = deviceToken;
};

mongoose.model('User', userSchema);
