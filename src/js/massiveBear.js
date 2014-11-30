var Ajax = require("./reactiveSources/ajax");
var Socket = require("./reactiveSources/socket.js");

var App = require("./app");


$(document).ready(function(){

	var app = new App(window);	

    app.withGames(Ajax, Socket)
       .withBear(Ajax, Socket)
       .start();
  
});


