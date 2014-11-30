var FakeAjaxGame = require("../../specs/helper/fakeAjaxGame.helper");
var FakeAjaxBear = require("../../specs/helper/fakeAjaxBear.helper");
var FakeSocketGame = require("../../specs/helper/fakeSocketGame.helper");
var FakeSocketBear = require("../../specs/helper/fakeSocketBear.helper");

var App = require("./app");


	
$(document).ready(function(){

	var app = new App(window);	

    app.withGames(FakeAjaxGame(), FakeSocketGame)
       .withBear(FakeAjaxBear(), FakeSocketBear)
       .start();
  
});


