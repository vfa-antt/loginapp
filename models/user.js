var mongoose = require('mongoose');
var AddressEmbedded = require('./address');
var bcrypt = require('bcryptjs');


// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		index:true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	
});

const User = module.exports = mongoose.model('User', UserSchema);
/*
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}*/
// promise la gi su dung lam gi
// async await la 