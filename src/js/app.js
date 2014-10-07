var gamesViewModel = require("./gamesViewModel.js");
var googleLogin = require("./google.js");
var facebookLogin = require("./facebook.js");
var uiGames = require("./ui/ui.games.js");
var socket = require("./socket.js");

var app = function(ajaxRepo) {

	var google = new googleLogin();
	var facebook = new facebookLogin();
	var games = new gamesViewModel(ajaxRepo);
	var ui = new uiGames();
	socket();
	
};

module.exports = app;