var ajaxRepository = function() {
	var _gamesList = function(){
		var deferred = $.Deferred();

		$.ajax({
    	    type: "GET",
      		url: "/gamesList",
		}).done(function(data) {
			deferred.resolve(JSON.parse(data));
		})
		  .fail(deferred.reject);

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

module.exports = ajaxRepository;