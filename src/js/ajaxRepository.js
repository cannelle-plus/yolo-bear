

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

	var _joinGame = function(o) {
		return $.ajax({
	      type: "POST",
	      url: "/game/joinGame",
	      data: o
		});
	};

	var _abandonGame = function	(o) {
		return $.ajax({
	      type: "POST",
	      url: "/game/abandonGame",
	      data: o
		});
	};

	var _cancelGame = function(o) {
		return $.ajax({
	      type: "POST",
	      url: "/game/cancelGame",
	      data: o
		});
	};

	var _createGame = function(o){
		return $.ajax({
	      type: "POST",
	      url: "/game/createGame",
	      data: o
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