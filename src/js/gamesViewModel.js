var Games = require('./model/games');
var Game = require('./model/game');

var gamesViewModel = function(repository){

	if (!repository)
		throw "repository is not instanciated";

	var _repository= repository;
	var _games = new Games();
	
	_repository.gamesList().done(function(data)
	{
		for(var i=0 ; i<data.gamesList.length;i++)
		{
			var d = data.gamesList[i];
			var g = new Game(d.gameId,
							d.version,
							d.gameName,
							d.gameDate,
							d.gameLocation,
							d.players,
							d.nbPlayers,
							d.maxPlayers);

			_games.add(g);
			// see with Julien to add templatng js here
		}
		
		var template = doT.template(document.getElementById('gamesListTemplate').innerHTML);
		var htmlRendered =template(data);
		$(document.getElementById('gamesListContainer')).html(htmlRendered); 

		// use event bubling instead 
		bindControls();
	});  

	var isGameForEvent = function(evt) {
		return function(g) { 
			if (!g) return false;
			if (!g.hasId) return false;
			return g.hasId(evt.target.attributes.data.value); 
		};
	};


	function bindControls()
	{
		$('.actionJoin').on('click',function(e){
			
			var game = _games.findFirstOrDefault(isGameForEvent(e));

			if (!game) throw 'game not found';

			game.joinGame(_repository.joinGame)
			    .done(function(data)
			{
				$(e.target).closest('.action').hide();
			});

		});

		$('.actionAbandonGame').on('click',function(e){
			
			var game = _games.findFirstOrDefault(isGameForEvent(e));

			if (!game) throw 'game not found';

			game.abandonGame(_repository.abandonGame)
				.done(function(data)
			{
				$(e.target).closest('.action').hide();
			});
		});

		$('.actionCancelGame').on('click',function(e){

			var game = _games.findFirstOrDefault(isGameForEvent(e));

			if (!game) throw 'game not found';

			game.cancelGame(_repository.cancelGame)
			    .done(function(data)
			{
				$(e.target).closest('.action').hide();
			});
		});

		var $btnActionCreateGame = $(document.getElementById('btnCreateGame'));
		$btnActionCreateGame.on('click',function(e){

			doNothing(e);

			var gameDate = null;
			var gameName = $(document.getElementById('gameName')).val();
			var gameLocation = $(document.getElementById('gameLocation')).val();
			var date = $(document.getElementById('gameDate')).val();
			var hour = $(document.getElementById('gameHour')).val();
			var gameNbPlayers = document.getElementById('nbPlayersRequired').value;

			_repository.createGame(gameName,gameLocation,gameDate,gameNbPlayers)
				  .done(function(data) {
						console.log('Match créé');
						//TODO YRE doit retourner le nouveau match, le match doit être insérer dans la page
					})
				  .fail(function(error){
				  	$(document.getElementById('textError')).text(error);
				  });

		}); 
	}
	
	// Action on game
	$('#games .games').on('click','li',function(e){
		$(this).find('.action').show();
	});
	$('#games .games').on('click','.action a',function(e){
		doNothing(e);
		$(this).closest('.action').hide();
	});
};

module.exports = gamesViewModel;