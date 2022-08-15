var mongoose = require('mongoose');
var sha256   = require('sha256');
var randomstring = require("randomstring");
mongoose.Promise = global.Promise;
// define the schema for our user model
var authSchema = mongoose.Schema({
        token : { type: String},
        user : {type: mongoose.Schema.ObjectId, ref: 'User'},
        agent: String,
        date : {type: Date, default: Date.now}
});



// methods ======================
// generating a hash
authSchema.methods.generateHash = function(password) {
    return sha256(password);
};

// checking if password is valid
authSchema.methods.validPassword = function(password) {
    return sha256(password) === this.agent;
};

authSchema.methods.randomString = function(){
    return randomstring.generate(100);
    // console.log(str);
}

// create the model for users and expose it to our app
module.exports = mongoose.model('Auth', authSchema);