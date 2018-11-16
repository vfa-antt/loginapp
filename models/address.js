var mongoose = require('mongoose');

// Schema
var AddressEmbedded = mongoose.Schema({
	streetaddress: {
		type: String,
		required: true,
		
	},
	city: {
		type: String,
        required: true
    
	},
	country: {
		type: String,
		required: true,
		
	},
	zipcode: {
		type: String,
		required: true,
		
	},
	author:{
		type: String,
		required: true,
	  },
});

let Address = module.exports = mongoose.model('Address', AddressEmbedded);