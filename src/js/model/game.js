
var game = function(id, version, name, ownerId, date, location, players, nbPlayers, maxPlayers){
	if (!id) throw 'id is undefined';
	//to do add check interface

	var _id = id;
	var _ownerId = ownerId;
	var _version = version;
	var _name = name;
	var _date = date;
	var _location = location;
	var _players = players;
	var _nbPlayers = nbPlayers;
	var _maxPlayers = maxPlayers;

	var _joinGame = function(ajaxRepository) {
		return ajaxRepository.joinGame({
	      	"id":_id,
	      	"version" : _version
      	});
	};

	var _abandonGame = function	(ajaxRepository) {
		return ajaxRepository.abandonGame({
	      	"id":_id,
	      	"version" : _version
      	});
	};

	var _cancelGame = function(ajaxRepository) {

		//todo check that the userid is the one who owns the game

		return ajaxRepository.cancelGame({
	      	"id":_id,
	      	"version" : _version
	      });
	};

	var _existsIn = function(games)
	{
		return games[_id]!== undefined ;
	};

	var _hasId = function(id){
		return _id == id;
	};

	var _addTo = function(games)
	{
		games["game" + _id] = this;
	};



	return {
		joinGame : _joinGame,
		abandonGame : _abandonGame,
		cancelGame : _cancelGame,
		existsIn : _existsIn,
		hasId : _hasId,
		addTo : _addTo
	};

};

module.exports = game; 