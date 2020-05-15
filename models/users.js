var mongoose = require('./bdd');

var userSchema = mongoose.Schema({
    userName: String,
    email: String,
    token: String,
    salt: String,
    password: String,
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;