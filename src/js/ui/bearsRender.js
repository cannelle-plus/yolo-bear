var doT = require('dot');
var logger = require('../logger');
var to = require('../reactiveSources/to');

var BearsRenderer = function(global, reactive)
{
	var window = global;
	var document= window.document;
	// logger.warn(docAbandonned;
	
	var $ = window.jQuery;
	var _publish = reactive.publish;
	var _observable = reactive.observable;

	//-------------------------------------------------
	// render html and modify the DOM
	//-------------------------------------------------
	var renderBear  = function(evt) {
		//render avatar username etc..
		// var $id = 'id'+ evt.payLoad.bearId;
		// var reason = evt.payLoad.reason;
		// var $game = $(document.getElementById($id)); 
		
		// if ($game)
		// {
		// 	$game.find('.action').hide();
		// 	renderActionError(reason);

		//do something to display the bear

		_publish('uiBearRenderer', {});	
		// }
	}; 

	var renderSignIn  = function(evt) {
		// var $id = 'id'+ evt.payLoad.bearId;
		// var reason = evt.payLoad.reason;
		// var $game = $(document.getElementById($id)); 
		
		// if ($game)
		// {
		// 	$game.find('.action').hide();
		// 	renderActionError(reason);

		//do something to display the bear

		_publish('uiSigninRendered', {});	
		// }
	}; 
	
	//-------------------------------------------------
	// listens to pubsub events to perform UI rendering
	//-------------------------------------------------
	_observable('signedIn').subscribe(to(renderBear));
	_observable('notSignedIn').subscribe(to(renderSignIn));

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

	// this.Join = function(action) {
	// 	$('#gamesListContainer').on('click','.actionJoin',fromEventDo(action));
	// };

	// this.Abandon = function(action) {
	// 	$('#gamesListContainer').on('click','.actionAbandonGame',fromEventDo(action));
	// };

	// this.ViewDetail = function(action) {
	// 	$('#gamesListContainer').on('click','[data-target=gameDetail]',fromEventDo(action));
	// };

	// this.Schedule = function(action)
	// {
	// 	$('#btnScheduleGame').on('click',function(e){

	// 		// event.preventDefault();
	// 		// event.stopPropagation();
	// 		var error = [];

	// 		var gameDate = null;
	// 		var gameName = $(document.getElementById('gameName')).val();
	// 		var gameLocation = $(document.getElementById('gameLocation')).val();
	// 		var date = $(document.getElementById('gameDate')).val();
	// 		var hour = $(document.getElementById('gameHour')).val();
	// 		var gameNbPlayers = document.getElementById('nbPlayersRequired').value;

	// 		if(date.length===0 || hour.length===0)
	// 			error.push("Date cannot be null !");

	// 		if(gameName.length===0)
	// 			error.push("Game's name cannot be null !");

	// 		if(gameLocation.length===0) 
	// 			error.push("Game's location cannot be null !");

	// 		if(isNaN(gameNbPlayers))
	// 			error.push("Game's players cannot be null !");

	// 		gameDate = date +' '+hour;

	// 		if (error.length>0) {
	// 			for(var i=0;i<error.length;i++)  alert(error[i]);
	// 			return;
	// 		}

	// 		action( gameName,gameLocation,gameDate,gameNbPlayers);

	// 	}); 
	// };
 
 	//-------------------------------------------------
 	// general ui functions
 	//-------------------------------------------------
	// $('#games .games').on('click','li',function(e){
	// 	$(this).find('.action').show();
	// });


	function doNothing(event){
		event.preventDefault();
		event.stopPropagation();
	}


	
};

module.exports = BearsRenderer;