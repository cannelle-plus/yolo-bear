var logger = require('../logger');
var Games = require('../model/games');
// var uuid = require('node-uuid');

var GamesRender = require("../ui/gamesRender.js");
var Repository = require("../reactiveSources/repository");


var gamesViewModel = function(global, reactive, session, ajax, socket){

	if (!global)
		throw "global is not instanciated";

	if (!reactive)
		throw "reactive is not instanciated";

	if (!session)
		throw "session is not instanciated";

	if (!ajax)
		throw "ajax is not instanciated";

	if (!socket)
		throw "ajax is not instanciated";

	
	var _publish = reactive.publish;
	var to = reactive.to;
	var _observable = reactive.observable;

	var repository = new Repository(reactive, ajax, socket);	
	var gamesRender = new GamesRender(global, reactive);
	var _games = new Games(_publish);
	var $ = global.jQuery;

	//-------------------------------------------------
	//perform actions on the domain and publish events
	//-------------------------------------------------
	this.Join= function(id){
		_games.joinGame(id,session.username);
		_games.publish();
	};

	this.Abandon= function(id){
		_games.abandonGame(id,session.username);
		_games.publish();	
	};

	this.Schedule = function(name,location, date, nbPlayers){
		_games.scheduleGame( session.username,session.userId, name,location,date, nbPlayers);
		_games.publish();
	};

	this.ViewDetail = function(id) {
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
		_games.add(x);	
		_games.publish();
    }));

    _observable('serverPlayerAddedToGame').subscribe(to(function (x){
		_games.addPlayerToGame(x.payLoad.id, x.payLoad.username);	
		_games.publish();
    }));

    _observable('serverPlayerRemovedFromGame').subscribe(to(function (x){
		_games.removePlayerFromGame(x.payLoad.id, x.payLoad.username, x.payLoad.reason);	
		_games.publish();
    }));


    //-------------------------------------------------
    // initialisation of the view model
    //-------------------------------------------------
	repository.getGamesList();  
};

module.exports = gamesViewModel;