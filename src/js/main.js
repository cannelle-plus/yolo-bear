


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

