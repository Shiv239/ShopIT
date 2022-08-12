/* AUTHOR: Tanvi Pruthi*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_id: String,
    user_email_id:String,
    user_password: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;