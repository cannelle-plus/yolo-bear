

var ajaxRepository = function() {
	var _gamesList = function(){
		var deferred = $.Deferred();

		$.ajax({
    	    type: "GET",
      		url: "/gamesList",
      		contentType: 'application/json'
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
	      data: JSON.stringify(o),
	      contentType: 'application/json'
		});
	};

	var _abandonGame = function	(o) {
		return $.ajax({
	      type: "POST",
	      url: "/game/abandonGame",
	      data: JSON.stringify(o),
	      contentType: 'application/json'
		});
	};

	var _cancelGame = function(o) {
		return $.ajax({
	      type: "POST",
	      url: "/game/cancelGame",
	      data: JSON.stringify(o),
	      contentType: 'application/json'
		});
	};

	var _createGame = function(o){
		return $.ajax({
	      type: "POST",
	      url: "/game/createGame",
	      data: JSON.stringify(o),
	      contentType: 'application/json'
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