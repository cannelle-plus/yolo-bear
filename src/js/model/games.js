var Game = require('../model/game');

var games = function(){

	var _games= {};

	var _contains = function(game)
	{
		return game.existsIn(_games);
	};

	var _add = function(game)
	{
		game.addTo(_games);
	};

	var _findFirstOrDefault =function(predicate)
	{
		for (var game in _games) if (predicate(_games[game])) return _games[game];
		return null;
	};

	var _createGame = function(ajaxCall,gameName,gameLocation,date, hour,gameNbPlayers){

		var error = null;

		if(date.length===0 || hour.length===0)
				error = "Date cannot be null !";

		if(gameName.length===0)
			error = "Game's name cannot be null !";

		if(gameLocation.length===0)
			error = "Game's location cannot be null !";

		if(isNaN(gameNbPlayers))
			error = "Game's players cannot be null !";

		var gameDate= date +' '+hour;

		if (error) {
			var deferred = $.Deferred();
			setTimeout(function(){ deferred.reject(error);}, 5);
			return deferred.promise();
		}
		
		return ajaxCall({
				gameName:gameName, 
	      		gameLocation: gameLocation, 
	      		gameDate : gameDate,
	      		nbPlayersRequired : gameNbPlayers
	    });
	};

	return {
		contains : _contains,
		findFirstOrDefault : _findFirstOrDefault,
		add : _add,
		createGame : _createGame
	};
};

module.exports = games;