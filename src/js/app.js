var gamesViewModel = require("./gamesViewModel.js");
var googleLogin = require("./google.js");
var facebookLogin = require("./facebook.js");

var app = function(ajaxRepo) {

	var google = new googleLogin();
	var facebook = new facebookLogin();
	var games = new gamesViewModel(ajaxRepo);
	
};

module.exports = app;