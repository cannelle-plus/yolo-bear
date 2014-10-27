var googleLogin = require("./google.js");
var facebookLogin = require("./facebook.js");
var Reactive = require("./reactiveSources/reactive.js");
var navigation = require('./ui/navigation');
var Session = require("./session");
var gamesViewModel = require("./viewmodel/gamesViewModel.js");
var logger = require('./logger');


var fakeSocket = require("../jsTap/fakeSocket");

var app = (function(global){

	logger.setLevel('ERROR');

	return function(ajax, socket) {

		if (!ajax) throw 'ajax is not defined';
		if (!socket) throw 'socket is not defined';

		var reactive = new Reactive("games");

		//gentil hack
		if (!socket.subscribeTo)
			socket = new socket(reactive);

		var games = new gamesViewModel(global, reactive, Session.current(), ajax, socket);
		
				
		// socket();

		navigation();
		var google = new googleLogin();
		var facebook = new facebookLogin();

	};

})(window || this);



module.exports = app;