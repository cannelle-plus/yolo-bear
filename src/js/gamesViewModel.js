var gamesViewModel = function(repository){

	if (!repository)
		throw "repository is not instanciated";

	var _repository= repository;

	_repository.gamesList().done(function(data)
	{
		var template = doT.template(document.getElementById('gamesListTemplate').innerHTML);
		var htmlRendered =template(data);
		$(document.getElementById('gamesListContainer')).html(htmlRendered); 
		bindControls();
	});  


	function bindControls()
	{
		$('.actionJoin').on('click',function(e){
			var gameId = e.target.attributes.data.value;
			_repository.joinGame(gameId)
			          .done(function(data)
			{
				$(e.target).closest('.action').hide();
			});
		});

		$('.actionAbandonGame').on('click',function(e){
			var gameId = e.target.attributes.data.value;
			_repository.abandonGame(gameId)
					  .done(function(data)
			{
				$(e.target).closest('.action').hide();
			});
		});

		$('.actionCancelGame').on('click',function(e){
			var gameId = e.target.attributes.data.value;
			_repository.cancelGame(gameId)
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
			var error = null;

			if(date.length===0 || hour.length===0)
				error = "Date cannot be null !";


			if(gameName.length===0)
				error = "Game's name cannot be null !";

			if(gameLocation.length===0)
				error = "Game's location cannot be null !";

			if(isNaN(gameNbPlayers))
				error = "Game's players cannot be null !";

			if(error)
			{
				$(document.getElementById('textError')).text(error);
				return;
			}

			gameDate= date +' '+hour;

			_repository.createGame(gameName,gameLocation,gameDate,gameNbPlayers)
					  .done(function(data)
			{
				console.log('Match créé');
				//TODO YRE doit retourner le nouveau match, le match doit être insérer dans la page
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