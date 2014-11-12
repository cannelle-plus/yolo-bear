var ajax = function(){

	var _getGamesList = function(){
		return $.ajax({
    	    type: "GET",
      		url: "api/game/list",
      		contentType: 'application/json'
		});
	};

	var _joinGame = function(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/api/game/join",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _abandonGame = function	(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/api/game/abandon",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _cancelGame = function(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/api/game/cancel",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _createGame = function(cmd){
		return $.ajax({
	      type: "POST",
	      url: "/api/game/schedule",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	return {
		getGamesList : _getGamesList,
		joinGame : _joinGame,
		abandonGame : _abandonGame,
		cancelGame : _cancelGame,
		createGame : _createGame
	};
};

module.exports = ajax;