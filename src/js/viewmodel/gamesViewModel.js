var logger = require('../logger');
var Games = require('../model/games');
var to = require('../reactiveSources/to');
// var uuid = require('node-uuid');

var GamesRender = require("../ui/gamesRender.js");
var Repository = require("../reactiveSources/repository");


var gamesViewModel = function(window, reactive,  ajax, socket, currentBear){

	if (!window)
		throw "window is not instanciated";

	if (!reactive)
		throw "reactive is not instanciated";

	if (!currentBear)
		throw "currentBear is not instanciated";

	if (!ajax)
		throw "ajax is not instanciated";

	if (!socket)
		throw "socket is not instanciated";

		
	var _publish = reactive.publish;
	var _observable = reactive.observable;

		

	var repository = new Repository(reactive, ajax, socket);	
	var gamesRender = new GamesRender(window, reactive);
	var _games = new Games(_publish);
	var $ = window.jQuery;

	//-------------------------------------------------
	//perform actions on the domain and publish events
	//-------------------------------------------------
	this.getGames= function(){
		logger.debug('viewmodel : getGames ');
		repository.getGamesList();  
	};

	this.Join= function(id){
		logger.debug('viewmodel : joinGame ' + id);
		_games.joinGame(id,currentBear.bearUsername);
		_games.publish();
	};

	this.Abandon= function(id){
		logger.debug('viewmodel : abandonGame ' + id);
		_games.abandonGame(id,currentBear.bearUsername);
		_games.publish();	
	};

	this.Schedule = function(name,location, date, nbPlayers){
		logger.debug('viewmodel : scheduleGame ' + name);
		_games.scheduleGame( currentBear.bearUsername,currentBear.bearId, name,location,date, nbPlayers);
		_games.publish();
	};

	this.ViewDetail = function(id) {
		logger.debug('viewmodel : viewDetails ' + id);
		_games.viewDetail(id);
		_games.publish();
	};

	//-------------------------------------------------
	//subscribing to UI events  to trigger domain actions
	//-------------------------------------------------
	gamesRender.Join(this.Join);
	gamesRender.Abandon(this.Abandon);
	gamesRender.Schedule(this.Schedule);
	gamesRender.ViewDetail(this.ViewDetail);

	//-------------------------------------------------
	// listenning to domain events to perform action on the domain
	//-------------------------------------------------	
	_observable('serverGameAdded').subscribe(to(function (x){
		logger.debug('viewmodel : subscription : serverGameAdded ');
		_games.add(x);	
		_games.publish();
    }));

    _observable('serverPlayerAddedToGame').subscribe(to(function (x){
    	logger.debug('viewmodel : subscription : serverPlayerAddedToGame ');
		_games.addPlayerToGame(x.payLoad.id, x.payLoad.username);	
		_games.publish();
    }));

    _observable('serverPlayerRemovedFromGame').subscribe(to(function (x){
    	logger.debug('viewmodel : subscription : serverPlayerRemovedFromGame ');
		_games.removePlayerFromGame(x.payLoad.id, x.payLoad.username, x.payLoad.reason);	
		_games.publish();
    }));


    
	
};

module.exports = gamesViewModel;