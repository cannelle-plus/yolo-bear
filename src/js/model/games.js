var Game = require('../model/game');

var games = function(ajaxRepository){

	if (!ajaxRepository) throw 'repository is undefined for games';

	var _ajaxRepository = ajaxRepository;
	var _games= {};


	var _add = function(game)
	{
		if (!game.existsIn(_games))
			game.addTo(_games);	
	};

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

	var _joinGame = function(id) {
		
		var game = _findFirstOrDefault(_isGameForId(id));

		if (!game) throw 'game not found';

		// game to join is found , we therefore make the ajax call to perform the action
		return game.joinGame(_ajaxRepository);

	};

	var _abandonGame = function(id) {
		
		var game = _findFirstOrDefault(_isGameForId(id));

		if (!game) throw 'game not found';

		// game to join is found , we therefore make the ajax call to perform the action
		return game.abandonGame(_ajaxRepository);
	};

	var _cancelGame = function(id) {
		
		var game = _findFirstOrDefault(_isGameForId(id));

		if (!game) throw 'game not found';

		//todo add assert ownerid is the user doing this cancellation

		// game to join is found , we therefore make the ajax call to perform the action
		return game.cancelGameGame(_ajaxRepository);
	};


	var _createGame = function(gameName,gameLocation,date, hour, gameNbPlayers){

		var error = null;

		if(date.length===0 || hour.length===0)
				error = "Date cannot be null !";

		if(gameName.length===0)
			error = "Game's name cannot be null !";

		if(gameLocation.length===0)
			error = "Game's location cannot be null !";

		if(isNaN(gameNbPlayers))
			error = "Game's players cannot be null !";

		var gameDate = date +' '+hour;

		if (error) {
			var deferred = $.Deferred();
			setTimeout(function(){ deferred.reject(error);}, 5);
			return deferred.promise();
		}
		
		return _ajaxRepository.createGame({
				name:gameName, 
	      		location: gameLocation, 
	      		startDate : gameDate,
	      		nbPlayersRequired : gameNbPlayers 
	    });

	    //should we add the game as it is to the _games list and display it on the screen,
	    // we could wait for the server just to get some further details if need is.
	};

	return {
		add : _add,
		createGame : _createGame,
		joinGame : _joinGame,
		abandonGame :_abandonGame,
		cancelGame : _cancelGame
	};
};

module.exports = games;