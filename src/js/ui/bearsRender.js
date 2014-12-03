var doT = require('dot');
var logger = require('../logger');
var to = require('../reactiveSources/to');

var BearsRenderer = function(global, reactive, navigation)
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

		navigation.showSection('games');
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

		navigation.showSection('signIn');
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

	this.Schedule = function(action)
	{
		$('#btnSignin').on('click',function(e){

			event.preventDefault();
			event.stopPropagation();
			var error = [];

			var gameDate = null;
			var bearUsername = $(document.getElementById('bearUsername')).val();
			var bearAvatarId = $(document.getElementById('bearAvatarId')).val();
			

			// if(date.length===0 || hour.length===0)
			// 	error.push("Date cannot be null !");

			// if(gameName.length===0)
			// 	error.push("Game's name cannot be null !");

			// if(gameLocation.length===0) 
			// 	error.push("Game's location cannot be null !");

			// if(isNaN(gameNbPlayers))
			// 	error.push("Game's players cannot be null !");

			action( bearUsername, bearAvatarId);

		}); 
	};
 
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