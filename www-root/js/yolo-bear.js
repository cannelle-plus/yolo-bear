(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\projects\\yolo-bear\\src\\jsTap\\fakeRepository.js":[function(require,module,exports){
var fakeAjaxRepository = function() {
	
	var _gamesList = function(){
		var gamesList= { gamesList : [{
				gameId :1,
				gameName : "test",
				gameDate : "10/01/2014 10:00",
				gameLocation : "playSoccer",
				players : "julien, yoann",
				nbPlayers : 2,
				maxPlayers : 8
			}]
		};

		var deferred = $.Deferred();

		setTimeout(function(){
			deferred.resolve(gamesList);
		}, 50);
		
		return deferred.promise();
	};

	var _joinGame = function(gameId) {
		return $.ajax({
	      type: "POST",
	      url: "/game/joinGame",
	      data: {game:gameId}
		});
	};

	var _abandonGame = function	(gameId) {
		return $.ajax({
	      type: "POST",
	      url: "/game/abandonGame",
	      data: {game:gameId}
		});
	};

	var _cancelGame = function(gameId) {
		return $.ajax({
	      type: "POST",
	      url: "/game/cancelGame",
	      data: {game:gameId}
		});
	};

	var _createGame = function(gameName,gameLocation,gameDate,gameNbPlayers){
		return $.ajax({
	      type: "POST",
	      url: "/game/createGame",
	      data: {gameName:gameName, 
	      		gameLocation: gameLocation, 
	      		gameDate : gameDate,
	      		nbPlayersRequired : gameNbPlayers
	      	}
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

module.exports = fakeAjaxRepository;
},{}],"D:\\projects\\yolo-bear\\src\\js\\facebook.js":[function(require,module,exports){
var facebook = function(){


	// This is called with the results from from FB.getLoginStatus().
	function statusChangeCallback(response) {
		console.log('statusChangeCallback');
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			testAPI();
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into this app.';
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into Facebook.';
		}
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	}

	window.fbAsyncInit = function() {
	FB.init({
		appId      : '1459051784370371',
		cookie     : true,  // enable cookies to allow the server to access 
												// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.1' // use version 2.1
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

	};

	// Load the SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	function testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Successful login for: ' + response.name);
			document.getElementById('status').innerHTML =
				'Thanks for logging in, ' + response.name + '!';
		});
		window.location.href='http://localhost/CannellePlus/';
	}
};

module.exports = facebook;
},{}],"D:\\projects\\yolo-bear\\src\\js\\gamesViewModel.js":[function(require,module,exports){
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

	// Navigation
	$('a[data-target]').on('click',function(e){
		doNothing(e);
		var id = '#' + $(this).attr('data-target'),
				tX = -100 * $(id).index();
		$('#main > section').css('-webkit-transform','translateX( ' + tX + '%)');
	});
	
	// Modal
	$('a[data-modal]').on('click',function(e){
		doNothing(e);
		if($(this).attr('data-modal') === 'open')
			$('.overlay').show();
		else	
			$('.overlay').hide();
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
},{}],"D:\\projects\\yolo-bear\\src\\js\\google.js":[function(require,module,exports){
var google = function(){


  (function() {
   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
   po.src = 'https://apis.google.com/js/client:plusone.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

  function signinCallback(authResult) {
    if (authResult.access_token) {
      // Autorisation reussie
      // Masquer le bouton de connexion maintenant que l'utilisateur est autorise, par exemple :
      document.getElementById('signinButton').setAttribute('style', 'display: none');
  		window.location.href='http://localhost/CannellePlus/';
    } 
    else if (authResult.error) {
      // Une erreur s'est produite.
      // Codes d'erreur possibles :
      //   "access_denied" - L'utilisateur a refuse l'acces a votre application
      //   "immediate_failed" - La connexion automatique de l'utilisateur a echoue
      // console.log('Une erreur s'est produite : ' + authResult['error']);
    }
  }

  function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
        access_token;

    // Executer une requete GET asynchrone.
    $.ajax({
      type: 'GET',
      url: revokeUrl,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(nullResponse) {
        // Effectuer une action maintenant que l'utilisateur est dissocie
        // La reponse est toujours non definie.
      },
      error: function(e) {
        // Gerer l'erreur
        // console.log(e);
        // Orienter eventuellement les utilisateurs vers une dissociation manuelle en cas d'echec
        // https://plus.google.com/apps
      }
    });
  }
  // Declenchement possible de la dissociation lorsque l'utilisateur clique sur un bouton
  $('#revokeButton').click(disconnectUser);
};

module.exports = google;
},{}],"D:\\projects\\yolo-bear\\src\\js\\main.js":[function(require,module,exports){



function doNothing(event){
	event.preventDefault();
	event.stopPropagation();
}

$(document).ready(function(){

	var ajaxRepository = require("../jsTap/fakeRepository");
	var gamesViewModel = require("./gamesViewModel.js");
	var googleLogin = require("./google.js");
	var facebookLogin = require("./facebook.js");
	
	var repository = new ajaxRepository();
	var games = new gamesViewModel(repository);
	var google = new googleLogin();
	var facebook = new facebookLogin();
  
});


},{"../jsTap/fakeRepository":"D:\\projects\\yolo-bear\\src\\jsTap\\fakeRepository.js","./facebook.js":"D:\\projects\\yolo-bear\\src\\js\\facebook.js","./gamesViewModel.js":"D:\\projects\\yolo-bear\\src\\js\\gamesViewModel.js","./google.js":"D:\\projects\\yolo-bear\\src\\js\\google.js"}]},{},["D:\\projects\\yolo-bear\\src\\js\\main.js"]);
