var fakeAjaxRepository = function() {
	
	var _gamesList = function(){
		var gamesList= { gamesList : [{
				gameId :1,
				gameName : "test",
				gameDate : "10/01/2014 10:00",
				gameLocation : "playSoccer",
				players : "julien, yoann",
				nbPlayers : 2,
				maxPlayers : 8
			}]
		};

		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve(gamesList);
		}, 50);
		
		return deferred.promise();
	};

	var _joinGame = function(gameId) {
		
		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve("OK");
		}, 50);
		
		return deferred.promise();
	};

	var _abandonGame = function	(gameId) {
		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve("OK");
		}, 50);
		
		return deferred.promise();
	};

	var _cancelGame = function(gameId) {
		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve("OK");
		}, 50);
		
		return deferred.promise();
	};

	var _createGame = function(gameName,gameLocation,gameDate,gameNbPlayers){
		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve("OK");
		}, 50);
		
		return deferred.promise();
	};

	return {
		gamesList : _gamesList,
		joinGame : _joinGame,
		abandonGame : _abandonGame,
		cancelGame : _cancelGame,
		createGame : _createGame
	};
};

module.exports = fakeAjaxRepository;