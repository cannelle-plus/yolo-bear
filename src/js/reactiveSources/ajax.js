var ajax = function(){


	var _getCurrentBear = function(){
		return $.ajax({
    	    type: "GET",
      		url: "api/bear/profile",
      		contentType: 'application/json'
		});
	};

	var _signIn = function(cmd){
		return $.ajax({
	      type: "POST",
	      url: "/api/bear/signIn",	
	      data: JSON.stringify(cmd),
	      contentType: 'application/json'
		});
	};

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

	var _ScheduleGame = function(cmd){
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
		ScheduleGame : _ScheduleGame,
		getCurrentBear : _getCurrentBear,
		signIn : _signIn
	};
};

module.exports = ajax;