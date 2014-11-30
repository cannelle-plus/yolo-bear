var Game = require('../model/game');
var logger = require('log4js').getLogger();
var uuid = require('node-uuid');
var to = require('./to');


var repository = function(reactive, ajax, socket) 
{
	if (!reactive)
		throw "reactive is not instanciated";

	if (!ajax)
		throw "ajax is not instanciated";

	var _observable = reactive.observable;
	

	var publish = {
		gameAdded : function(id, ownerid, ownerUsername, name,  version, date, location, players, nbPlayers, maxPlayers ){
			reactive.publish('serverGameAdded', {
				"id" : id,
				"name" : name,
				"ownerid" : ownerid,
				"ownerUsername" : ownerUsername,
				"version" : version,
				"date" : date,
				"location" : location,
				"players" : players,
				"nbPlayers" : nbPlayers,
				"maxPlayers" : maxPlayers
			});
		},

		playerAddedToGame : function(id, username){
			logger.debug(id + ' ' + username);
			reactive.publish("serverPlayerAddedToGame", {
				'id' :id,
				'username' : username
			});
		},

		playerRemovedFromGame : function(id, username, reason){
			logger.debug(id + ' ' + username);
			reactive.publish("serverPlayerRemovedFromGame", {
				'id' :id,
				'username' : username,
				'reason' : reason
			});
		},

		CurrentBearReceived : function(bearId, bearUsername, socialId, avatarId, hasSignedIn){
			logger.debug(bearId + ' ' + bearUsername);
			reactive.publish("serverCurrentBearReceived", {
				'bearId' : bearId,
				'bearUsername' : bearUsername,
				'socialId' : socialId,
				'avatarId' : avatarId,
				'hasSignedIn' : hasSignedIn
			});
		},

		
	} ;
	
	var _getCurrentBear = function(){
		return ajax.getCurrentBear().then(function(data) {
			logger.debug('resolving current Bear' + data);

			publish.CurrentBearReceived(
					data.bearId,
					data.bearUsername,
					data.socialId,
					data.avatarId,
					data.hasSignedIn);
		});
		//what to do if it fails, should we handle it , event to be Scheduled , name to be found? 
	};

	var _getGamesList = function(){
		return ajax.getGamesList().then(function(data) {
			logger.debug('resolving getGamesList' + data);
			for(var i=0 ; i< data.gamesList.length;i++)
			{ 
				var g = data.gamesList[i];
				publish.gameAdded(g.id,
						g.ownerId,
						g.ownerUserName,
						g.name,
						g.version,
						g.startDate,
						g.location,
						g.players.split(","),
						g.nbPlayers,
						g.maxPlayers);
		
			}
		});
	};

	var index =0;

	var _joinGame = function(cmd) {
		ajax.joinGame(cmd);
	};

	var _abandonGame = function	(cmd) {
		ajax.abandonGame(cmd);
	};

	var _cancelGame = function(cmd) {
		ajax.cancelGame(cmd);
	};

	var _scheduleGame = function(cmd){
		ajax.ScheduleGame(cmd);
	};

	var _signIn = function(cmd){
		ajax.signIn(cmd);	
	};


	// { Id: '6b766657-05f0-4eea-f92d-22ac305e24c2',
	//   Version: 0,
	//   MetaData:
	//    { CorrelationId: '71e043d8-610c-43c3-b3ca-432abf878cb4',
	//      UserId: '311ca2bb-81dd-4b50-fadf-e45cdf287745',
	//      UserName: 'bond' },
	//   PayLoad:
	//    { Case: 'GameScheduled',
	//      Fields: [ 'test', '007', '2014-10-24 18:00', 'Playsoccer', '4' ] } }
	// { host: 'localhost',
	//   port: '8081',
	//   path: '/game/6b766657-05f0-4eea-f92d-22ac305e24c2',
	//   method: 'POST',
	//   headers: { 'Content-Type': 'application/json', 'Content-Length': 283 } }
	//transforms an event as before to an event yolo can understand
	socket.subscribeTo('GameScheduled', function(evtSocket){
		
		publish.gameAdded(evtSocket.Id,
			evtSocket.MetaData.UserId,
			evtSocket.MetaData.UserName,
			evtSocket.PayLoad.Fields[0],
			evtSocket.Version,	
			evtSocket.PayLoad.Fields[2],
			evtSocket.PayLoad.Fields[3],
			[evtSocket.MetaData.UserName],
			1,
			evtSocket.PayLoad.Fields[4]);
	});

	socket.subscribeTo('GameJoined', function(evtSocket){

		publish.playerAddedToGame(
			evtSocket.Id,
			evtSocket.MetaData.UserName
			);
		
	});

	socket.subscribeTo('GameAbandonned', function(evtSocket){

		publish.playerRemovedFromGame(
			evtSocket.Id,
			evtSocket.MetaData.UserName,
			evtSocket.PayLoad.Fields[0]
			);
		
	});

	_observable('gameJoined').subscribe(to(_joinGame));
	_observable('gameAbandonned').subscribe(to(_abandonGame));
	_observable('gameScheduled').subscribe(to(_scheduleGame));
	_observable('gameCancelled').subscribe(to(_cancelGame));
	_observable('hasSignedIn').subscribe(to(_signIn));

	return {
		getGamesList : _getGamesList,
		getCurrentBear : _getCurrentBear
	};
};

module.exports = repository;