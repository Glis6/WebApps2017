let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  emailAddress: {type: String, lowercase: true, unique: true},
  name: String,
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 30);
  return jwt.sign({
    _id: this._id,
    emailAddress: this.emailAddress,
    expiration: parseInt(expiration.getTime() / 1000)
  }, process.env.BACKEND_SECRET);
};

mongoose.model('User', UserSchema);
