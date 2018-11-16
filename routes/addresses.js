var express = require('express');
var router = express.Router();

// Model
let Address = require('../models/address');
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
	res.render('add_address', {
	  title:'Add Address'
	});
});
  
// Add Submit POST Route
router.post('/add', function(req, res){

	/*const streetaddress = req.body.streetaddress;
  const city = req.body.city;
  const country = req.body.country;
	const zipcode = req.body.zipcode;
	console.log(req.body);*/

  req.checkBody('streetaddress','Street Address is required').notEmpty();
  req.checkBody('city','City is required').notEmpty();
  req.checkBody('country','Country is required').notEmpty();
  req.checkBody('zipcode','Zipcode is required').notEmpty();

    // Get Errors
	let errors = req.validationErrors();

	if(errors){
	  res.render('add_address', {
		title:'Add more address',
		errors:errors
	  });
	} else {
		var address = new Address();
				address.author = req.user.username;
	  		address.streetaddress = req.body.streetaddress;
	  		address.city = req.body.city;
	  		address.country = req.body.country;
	  		address.zipcode = req.body.zipcode; 
		

	  address.save(function(err){
		if(err){
		  console.log(err);
		} else {
		  req.flash('success','Address Added');
		  res.redirect('/');
		}
	  });
	}
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
	Address.findById(req.params.id, function(err, address){
	  if(address.author != req.user._id){
		req.flash('danger', 'Not Authorized');
		res.redirect('/');
	  }
	  res.render('edit_address', {
		title:'Edit Address',
		address:address
	  });
	});
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
	let address = {};
	address.streetaddress = req.body.streetaddress;
	address.author = req.body.author;
	address.city = req.body.city;
	address.country = req.body.country;
	address.zipcode = req.body.zipcode;
  
	let query = {_id:req.params.id}
  
	Address.update(query, address, function(err){
	  if(err){
		console.log(err);
		return;
	  } else {
		req.flash('success', 'Address Updated');
		res.redirect('/');
	  }
	});
});

// Delete 
router.delete('/:id', function(req, res){
	if(!req.user._id){
	  res.status(500).send();
	}
  
	let query = {_id:req.params.id}
  
	Address.findById(req.params.id, function(err, address){
	  if(address.author != req.user._id){
		res.status(500).send();
	  } else {
		Address.remove(query, function(err){
		  if(err){
			console.log(err);
		  }
		  res.send('Success');
		});
	  }
	});
});

// Get 
router.get('/:id', function(req, res){
	Address.findById(req.params.id, function(err, address){
	  User.findById(address.author, function(err, user){
		res.render('address', {
		  address:address,
		  author: user.username
		});
	  });
	});
});

// Access Control
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
	  return next();
	} else {
	  req.flash('danger', 'Please login');
	  res.redirect('/users/login');
	}
}


  /* Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});
*/

module.exports = router;