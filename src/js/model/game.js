var logger = require('../logger');

// Removes an element from an array.
// String value: the value to search and remove.
// return: an array with the removed element; false otherwise.
Array.prototype.remove = function(value) {
	var idx = this.indexOf(value);
	if (idx != -1) {
	    return this.splice(idx, 1); // The second parameter is the number of elements to remove.
	}
	return false;
};

var game = function(apply, id, version, name, ownerId, ownerUsername, date, location, players, nbPlayers, maxPlayers){
	if (!id) throw 'id is undefined';
	//to do add check interface

	var _apply = apply;
	var _id = id;
	var _ownerId = ownerId;
	var _ownerUsername = ownerUsername;
	var _version = version;
	var _name = name;
	var _date = date;
	var _location = location;
	var _players = players;
	var _nbPlayers = nbPlayers;
	var _maxPlayers = maxPlayers;
	
	this.joinGame = function(username) {
		
		if (_players.indexOf(username)>-1)
		{
			_apply('gameNotJoined', {
				"id" : id,
		    	"reason" : "player cannot join a game, he's already part of."
	      	}, true);
	      	return ;
		}

		_nbPlayers += 1;
		_players.push(username);
		_version +=1;

		_apply('gameJoined', {
	      	"id":_id,
	      	"version" : _version,
	    	"username" : username,
	    	"nbPlayers" : _nbPlayers
      	});

      	
	};

	this.addPlayerToGame = function(username) {
		
		logger.debug('_addPlayerToGame');
		if(_players.indexOf(username)==-1)
		{
			_nbPlayers += 1;
			_players.push(username);			
			_version += 1;
			

			_apply('playerAddedToGame', {
		      	"id":_id,
		      	"username" : username,
		    	"nbPlayers" : _nbPlayers
      		});

      		
		}
	};

	this.removePlayerFromGame = function(username, reason) {
		logger.debug('_removePlayerFromGame');
		logger.debug(_players);
		if(_players.indexOf(username)>-1)
		{
			_players.remove(username);			
			_nbPlayers -= 1;
			_version +=1;
			

			_apply('playerRemovedFromGame', {
		      	"id":_id,
		      	"username" : username,
		    	"nbPlayers" : _nbPlayers
      		});

      		
		}

	};

	this.abandonGame = function	(username) {

		if (_players.indexOf(username)==-1)
		{
			_apply('gameNotAbandonned', {
				"id" : id,
		    	"reason" : "player cannot abandon a game, he's not part of."
	      	});
	      	return ;
		}

		
		if (_players.indexOf(username)>-1)
		{
			_nbPlayers -= 1;
			_players.remove(username);
			_version +=1; 

			_apply('gameAbandonned',{
		      	"id":_id,
		      	"version" : _version,
		      	"username" : username, 
		      	"nbPlayers" : _nbPlayers
	      	});
		}
	};

	this.viewDetail = function(){
		_apply('gameViewed',{
	      		id : _id,
				ownerId : _ownerId,
				ownerUsername : _ownerUsername,
				version : _version,
				name : _name,
				date : _date,
				location : _location,
				players : _players,
				nbPlayers : _nbPlayers,
				maxPlayers : _maxPlayers
	      });	
	};

	this.existsIn = function(games)
	{
		return games[_id]!== undefined ;
	};

	this.hasId = function(id){
		// logger.debug(_id + '=' + id);
		return _id == id;
	};

	this.addTo = function(games)
	{
		games["game" + _id] = this;

	};


};

module.exports = game; 