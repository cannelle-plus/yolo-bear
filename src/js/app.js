var SignedBear = require("./model/signedBear");
var GamesViewModel = require("./viewmodel/gamesViewModel");
var BearsViewModel = require("./viewmodel/bearsViewModel");
var to = require('./reactiveSources/to');

var navigation = require('./ui/navigation');
var Session = require("./session");
var bear2bearModule = require("./bear2bearModule");
var logger = require('./logger');

var app = function(window) {

	var _self= this;
	var _currentBear;

	navigation();

	var _ajaxGame , _socketGame ,__ajaxBear, _socketBear;


	this.withGames = function(ajax, socket) {
		_ajaxGame = ajax;
		_socketGame = socket;

		return _self;
	};

	this.withBear = function(ajax, socket) {
		_ajaxBear = ajax;
		_socketBear = socket;

		return _self;
	};

	this.start = function() {
		
		var BearModule = bear2bearModule("bear", BearsViewModel);
		var GameModule = bear2bearModule("game", GamesViewModel);

		//creating module
		var _bearModule = new BearModule(_ajaxBear, _socketBear);
		var _gameModule = new GameModule(_ajaxGame, _socketGame);
		
		//start the bear vm
		var _bearVm = _bearModule.addToWindow(window);

		_bearModule.observable(['signedIn', 'hasSignedIn'])
			.subscribe(to(function(evt) {
				
				_currentBear = new SignedBear( evt.bearId,evt.bearUsername);

				//starting the other vms
				var _gameVm = _gameModule.addToWindow(window, _currentBear);
				_gameVm.getGames();
			}));
	};

};

module.exports = app;