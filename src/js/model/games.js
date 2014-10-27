var Game = require('../model/game');
var uuid = require('node-uuid');
var logger = require('../logger');


var games = function(pubsub){

	var _evtsUncommitted = [];
	var _pubsub = pubsub;

	var _games= {};

	var _findFirstOrDefault =function(predicate)
	{
		for (var game in _games) if (predicate(_games[game])) return _games[game];
		return null;
	};

	var _isGameForId = function(id) {
		return function(g) { 
			if (!g) return false;
			if (!g.hasId) return false;
			return g.hasId(id); 
		};
	};

	this.apply = function(evtType, payLoad, local)
	{
		_evtsUncommitted.push({
			"evtType" : evtType,
			"payLoad" : payLoad
		});
	};

	this.publish = function(publish){
		
		var returnValue = [];
		//copy the event to save
		var evtsToCommit =  _evtsUncommitted ;
		//reset the current events
		_evtsUncommitted = [];

		for (var i = evtsToCommit.length - 1; i >= 0; i--) {
	    	_pubsub(evtsToCommit[0].evtType,evtsToCommit[0].payLoad);
		}
	};

	this.add = function(msg)
	{
		var d= msg.payLoad; 
		var game = new Game(this.apply,
						d.id,
						d.version,
						d.name,
						d.ownerId,
						d.ownerUserName,
						d.startDate,
						d.location,
						d.players,
						d.nbPlayers,
						d.maxPlayers);

		if (!game.existsIn(_games))
		{
			game.addTo(_games);	
			this.apply('gameAdded',  d); 
		}
	};

	

	this.joinGame = function(id, username) {
		
		var game = _findFirstOrDefault(_isGameForId(id));

		if (game) {
			game.joinGame(username);
		}
		
	};

	this.addPlayerToGame = function(id, username) {
		logger.debug("_addPlayerToGame" + id + " " + username);
		var game = _findFirstOrDefault(_isGameForId(id));

		if (game) {
			game.addPlayerToGame(username);
		}
		
		
	};

	this.removePlayerFromGame = function(id, username, reason) {
		logger.debug("_removePlayerFromGame" + id + " " + username + " " + reason);
		var game = _findFirstOrDefault(_isGameForId(id));

		if (game) {
			game.removePlayerFromGame(username, reason);
		}
		
	};

	this.abandonGame = function(id,username) {
		
		var game = _findFirstOrDefault(_isGameForId(id));

		if (game){
			game.abandonGame(username);
		}
		
	};

	this.viewDetail = function(id) {
		
		//todo add assert ownerid is the user doing this cancellation
		var game = _findFirstOrDefault(_isGameForId(id));

		if (game) {
			game.viewDetail();
		}
	};


	this.scheduleGame = function(userName, userId, gameName,gameLocation,date, gameNbPlayers){

		var error = [];

		var id= uuid.v1();

		var g = new Game(
						this.apply,
						id,
						1,
						gameName,
						userId,
						userName,
						date,
						gameLocation,
						[userName],
						1,
						gameNbPlayers);
		
		g.addTo(_games);	

		this.apply ('gameScheduled',  {
				"id" : id, 
				name : gameName, 
				ownerId : userId,
				ownerUserName : userName,
				startDate : date,
	      		location: gameLocation, 
	      		players : [userName],
	      		nbPlayers : 1,
	      		maxPlayers : gameNbPlayers 
	    });

	};

};

module.exports = games;