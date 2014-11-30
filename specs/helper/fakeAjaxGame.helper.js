var uuid = require('node-uuid');
var logger = require('log4js').getLogger();

var fakeAjaxGame = function(gameDataSource){

	//implement default fakeData here if gameDataSource is undefined

	return function(window) {
		
		var document= window.document;
		var $ = window.jQuery;

		var _getBear = function(){
			var bear= { 
				bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
				socialId : '24567789',
				avatarId : 23,
				hasSignedIn : false
			};
			
			var $deferred = $.Deferred();

			setTimeout(function(){
					$deferred.resolve(bear);
				}, 50);
			
			return $deferred.promise();

		};

		var _getGamesList = function(){
			var gamesList= { gamesList : [{
					id : '4a82199e-7c30-4a95-b194-6d40127fbb89',
					version : 1,
					name : "test",
					ownerId : 1,
					ownerUserName : "julien",
					startDate : "10/01/2014 10:00",
					location : "playSoccer",
					players : "julien,aziz",
					nbPlayers : 2,
					maxPlayers : 8
				},
				{
					id : 'd70efb73-8c6c-4106-97dd-7503bbf7f5fd',
					version : 1,
					name : "Joga Bonito",
					ownerId : 1,
					ownerUserName : "julien",
					startDate : "10/01/2014 19:00",
					location : "playSoccer",
					players : "julien,aziz",
					nbPlayers : 7,
					maxPlayers : 8
				}		 
				]
			};
			logger.debug('getGamesList');
			var $deferred = $.Deferred();

			setTimeout(function(){
					$deferred.resolve(gamesList);
				}, 50);
			
			return $deferred.promise();

		};

		var _joinGame = function(gameId) {

			var $deferred = $.Deferred();
			
			setTimeout(function(){
					var o = { response :'OK'};
					
					$deferred.resolve(o);
				}, 50);
			
			return $deferred.promise();
		};

		var _abandonGame = function	(gameId) {
			var $deferred = $.Deferred();
			
			setTimeout(function(){
					var o = { response :'OK'};
					$deferred.resolve(o);
				}, 50);
			
			return $deferred.promise();
		};

		var _cancelGame = function(gameId) {
			var $deferred = $.Deferred();
			
			setTimeout(function(){
					var o = { response :'OK'};
					$deferred.resolve(o);
				}, 50);
			
			return $deferred.promise();
		};

		var _ScheduleGame = function(gameName,gameLocation,gameDate,gameNbPlayers){
			var $deferred = $.Deferred();
			
			setTimeout(function(){
					var o = { response :'OK'};
					$deferred.resolve(o);
				}, 50);
			
			return $deferred.promise();
		};

		return {
			getGamesList : _getGamesList,
			joinGame : _joinGame,
			abandonGame : _abandonGame,
			cancelGame : _cancelGame,
			ScheduleGame : _ScheduleGame
		};
	};

};
 
module.exports = fakeAjaxGame;