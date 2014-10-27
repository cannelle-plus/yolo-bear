var ajax = function(){

	var _getGamesList = function(){
		return $.ajax({
    	    type: "GET",
      		url: "/gamesList",
      		contentType: 'application/json'
		});
	};

	var _joinGame = function(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/game/joinGame",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _abandonGame = function	(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/game/abandonGame",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _cancelGame = function(cmd) {
		return $.ajax({
	      type: "POST",
	      url: "/game/cancelGame",
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

	var _createGame = function(cmd){
		return $.ajax({
	      type: "POST",
	      url: "/game/scheduleGame",
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