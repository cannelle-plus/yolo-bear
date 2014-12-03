var SignedBear = require("./model/signedBear");
var GamesViewModel = require("./viewmodel/gamesViewModel");
var BearsViewModel = require("./viewmodel/bearsViewModel");
var to = require('./reactiveSources/to');

var Navigation = require('./ui/navigation');
var Session = require("./session");
var bear2bearModule = require("./bear2bearModule");
var logger = require('./logger');

var app = function(window) {

	var _self= this;
	var _currentBear;

	var navigation = new Navigation(window.jQuery);

	var _ajaxGame , _socketGame ,__ajaxBear, _socketBear;


	this.withGames = function(Ajax, Socket) {
		_AjaxGame = Ajax;
		_SocketGame = Socket;

		return _self;
	};

	this.withBear = function(Ajax, Socket) {
		_AjaxBear = Ajax;
		_SocketBear = Socket;

		return _self;
	};

	this.start = function() {
		
		var BearModule = bear2bearModule("bear", BearsViewModel);
		var GameModule = bear2bearModule("game", GamesViewModel);

		//creating module
		var _bearModule = new BearModule(_AjaxBear);
		var _gameModule = new GameModule(_AjaxGame, _SocketGame);
		
		//start the bear vm
		var _bearVm = _bearModule.addToWindow(window,navigation);

		_bearModule.observable(['signedIn', 'hasSignedIn'])
			.subscribe(to(function(evt) {
				
				_currentBear = new SignedBear( evt.bearId, evt.tokenId, evt.bearUsername);

				//starting the other vms
				var _gameVm = _gameModule.addToWindow(window,navigation, _currentBear);
				_gameVm.getGames();
			}));
	};

};

module.exports = app;