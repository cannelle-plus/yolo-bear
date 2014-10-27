var doT = require('dot');
var logger = require('../logger');

var gamesRenderer = function(global, reactive)
{
	var window = global;
	var document= window.document;
	// logger.warn(docAbandonned;
	
	var $ = window.jQuery;
	var _publish = reactive.publish;
	var to = reactive.to;
	var _observable = reactive.observable;

	var gameTemplate = doT.template(document.getElementById('gamesListTemplate').innerHTML);

	//-------------------------------------------------
	// render html and modify the DOM
	//-------------------------------------------------
	var renderActionError  = function(error) {
		$(document.getElementById('textError')).text(error); 
	};  

	var renderGameAdded  = function(gameAdded) {
		var htmlRendered = gameTemplate(gameAdded.payLoad);
		$(document.getElementById('gamesListContainer')).append(htmlRendered); 

		_publish('uiGameAdded', gameAdded);		
	};  

	var renderGameScheduled  = function(gameScheduled) 	{
		var htmlRendered = gameTemplate(gameScheduled.payLoad);
		$(document.getElementById('gamesListContainer')).append(htmlRendered); 

		_publish('uiGameScheduled', gameScheduled);		
	};  

	var renderPlayerAddedToGame  = function(evt) {
		var game = evt.payLoad;
		var $id = 'id'+ game.id;
		var $game = $(document.getElementById($id)); 
		
		if ($game)
		{
			$game.find('.nbPlayers').html(game.nbPlayers);
			$game.find('.action').hide();

			_publish('uiGameUpdated', { 'id' : $id });	
		}
	}; 

	var renderPlayerRemovedFromGame = function(evt){
		var $id = 'id'+ evt.payLoad.id;
		var reason = evt.payLoad.reason;
		var $game = $(document.getElementById($id)); 

		if ($game)
		{
			$game.find('.action').hide();
			if(reason) renderActionError(reason);

			_publish('uiGameUpdated', { 'id' : $id });	
		}
	};

	var renderGameAbandonned  = function(evt) { 
		var game = evt.payLoad;
		var $id = 'id'+ game.id;
		var $game = $(document.getElementById($id)); 
		
		if ($game)
		{
			$game.find('.nbPlayers').html(game.nbPlayers);
			$game.find('.action').hide();

			_publish('uiGameUpdated', { 'id' : $id });	
		}
	}; 

	var renderGameNotAbandonned  = function(evt) {
		var $id = 'id'+ evt.payLoad.id;
		var reason = evt.payLoad.reason;
		var $game = $(document.getElementById($id)); 
		
		if ($game)
		{
			$game.find('.action').hide();
			renderActionError(reason);

			_publish('uiGameUpdated', { 'id' : $id });	
		}
	}; 

	var renderGameDetail = function(evt){
		var $id = 'id'+ evt.payLoad.id;
		//do soòething useful here
		// {
	 	// 		id = _id;
		// 		ownerId = _ownerId;
		// 		ownerUsername = _ownerUsername;
		// 		version = _version;
		// 		name = _name;
		// 		date = _date;
		// 		location = _location;
		// 		players = _players;
		// 		nbPlayers = _nbPlayers;
		// 		maxPlayers = _maxPlayers;
	 	//      }
		_publish('uiGameUpdated', { 'id' : $id });	
	};

	
	//-------------------------------------------------
	// listens to pubsub events to perform UI rendering
	//-------------------------------------------------
	_observable('gameAdded').subscribe(to(renderGameAdded));
	_observable('gameScheduled').subscribe(to(renderGameScheduled));
	_observable(['gameJoined','playerAddedToGame']).subscribe(to(renderPlayerAddedToGame));
	_observable(['gameNotJoined','playerRemovedFromGame']).subscribe(to(renderPlayerRemovedFromGame));
	_observable('gameAbandonned').subscribe(to(renderGameAbandonned));
	_observable('gameNotAbandonned').subscribe(to(renderGameNotAbandonned));
	_observable('gameViewed').subscribe(to(renderGameDetail));

	//-------------------------------------------------
	// lsitens to UI events to trigger domain action through the viewmodel
	//-------------------------------------------------
	var fromEventDo = function(action){
		return function(e) {
			doNothing(e);
			var id = e.target.attributes.data.value;
			
			action(id);
		};
	};

	this.Join = function(action) {
		$('#gamesListContainer').on('click','.actionJoin',fromEventDo(action));
	};

	this.Abandon = function(action) {
		$('#gamesListContainer').on('click','.actionAbandonGame',fromEventDo(action));
	};

	this.ViewDetail = function(action) {
		$('#gamesListContainer').on('click','[data-target=gameDetail]',fromEventDo(action));
	};

	this.Schedule = function(action)
	{
		$('#btnScheduleGame').on('click',function(e){

			// event.preventDefault();
			// event.stopPropagation();
			var error = [];

			var gameDate = null;
			var gameName = $(document.getElementById('gameName')).val();
			var gameLocation = $(document.getElementById('gameLocation')).val();
			var date = $(document.getElementById('gameDate')).val();
			var hour = $(document.getElementById('gameHour')).val();
			var gameNbPlayers = document.getElementById('nbPlayersRequired').value;

			if(date.length===0 || hour.length===0)
				error.push("Date cannot be null !");

			if(gameName.length===0)
				error.push("Game's name cannot be null !");

			if(gameLocation.length===0) 
				error.push("Game's location cannot be null !");

			if(isNaN(gameNbPlayers))
				error.push("Game's players cannot be null !");

			gameDate = date +' '+hour;

			if (error.length>0) {
				for(var i=0;i<error.length;i++)  alert(error[i]);
				return;
			}

			action( gameName,gameLocation,gameDate,gameNbPlayers);

		}); 
	};
 
 	//-------------------------------------------------
 	// general ui functions
 	//-------------------------------------------------
	$('#games .games').on('click','li',function(e){
		$(this).find('.action').show();
	});


	function doNothing(event){
		event.preventDefault();
		event.stopPropagation();
	}


	
};

module.exports = gamesRenderer;