var Games = require('./model/games');
var Game = require('./model/game');

var gamesViewModel = function(repository){

	if (!repository)
		throw "repository is not instanciated";

	var _repository= repository;
	var _games = new Games(_repository);
	
	_repository.gamesList().done(function(data)
	{
		for(var i=0 ; i<data.gamesList.length;i++)
		{
			var d = data.gamesList[i];
			var g = new Game(d.id,
							d.version,
							d.name,
							d.ownerId,
							d.ownerUserName,
							d.startDate,
							d.location,
							d.players,
							d.nbPlayers,
							d.maxPlayers);

			_games.add(g);
			// see with Julien to add templatng js here
		}
		
		var template = doT.template(document.getElementById('gamesListTemplate').innerHTML);
		var htmlRendered =template(data);
		$(document.getElementById('gamesListContainer')).html(htmlRendered); 

	});  

	
	$('#gamesListContainer').on('click','.actionJoin', function(e){

		_games.joinGame(e.target.attributes.data.value)
		    .done(function(data)
		{
			$(e.target).closest('.action').hide();
		})
		    .fail(function(error){
	    	$(document.getElementById('textError')).text(error); 
		    $(e.target).closest('.action').hide();	
		    });

	});

	$('#gamesListContainer').on('click','.actionAbandonGame',function(e){
			
		_games.abandonGame(e.target.attributes.data.value)
		    .done(function(data)
		{
			$(e.target).closest('.action').hide();
		});
	});
  
	$('#gamesListContainer').on('click','.actionCancelGame',function(e){

		_games.cancelGame(e.target.attributes.data.value)
		    .done(function(data)
		{
			$(e.target).closest('.action').hide();
		});
	}); 

	var $btnActionCreateGame = $(document.getElementById('btnCreateGame'));
	$btnActionCreateGame.on('click',function(e){

		event.preventDefault();
		event.stopPropagation();

		var gameDate = null;
		var gameName = $(document.getElementById('gameName')).val();
		var gameLocation = $(document.getElementById('gameLocation')).val();
		var date = $(document.getElementById('gameDate')).val();
		var hour = $(document.getElementById('gameHour')).val();
		var gameNbPlayers = document.getElementById('nbPlayersRequired').value;

		_games.createGame(gameName,gameLocation,date, hour,gameNbPlayers)
			  .done(function(data) {
					console.log('Match créé');
					$("#createGame").hide();
					//TODO YRE doit retourner le nouveau match, le match doit être insérer dans la page
				})
			  .fail(function(error){
			  	$(document.getElementById('textError')).text(error);
			  });

	}); 
	
	 
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