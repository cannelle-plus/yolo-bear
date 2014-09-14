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
		return $.ajax({
	      type: "POST",
	      url: "/game/joinGame",
	      data: {game:gameId}
		});
	};

	var _abandonGame = function	(gameId) {
		return $.ajax({
	      type: "POST",
	      url: "/game/abandonGame",
	      data: {game:gameId}
		});
	};

	var _cancelGame = function(gameId) {
		return $.ajax({
	      type: "POST",
	      url: "/game/cancelGame",
	      data: {game:gameId}
		});
	};

	var _createGame = function(gameName,gameLocation,gameDate,gameNbPlayers){
		return $.ajax({
	      type: "POST",
	      url: "/game/createGame",
	      data: {gameName:gameName, 
	      		gameLocation: gameLocation, 
	      		gameDate : gameDate,
	      		nbPlayersRequired : gameNbPlayers
	      	}
		});
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