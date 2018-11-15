var mongoose = require('mongoose');

// Schema
var AddressEmbedded = mongoose.Schema({
	streetaddress: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
        required: true,
        trim: true
	},
	country: {
		type: String,
		required: true,
		trim: true
	},
	zipcode: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = AddressEmbedded;