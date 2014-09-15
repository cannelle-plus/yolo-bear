


function doNothing(event){
	event.preventDefault();
	event.stopPropagation();
}

$(document).ready(function(){

	var fakeRepository = require("../jsTap/fakeRepository");

	var app = require("./app");
	var ajaxRepository = require("./ajaxRepository");
	
	var repository = new fakeRepository();
	var yolo = new app(repository);
	
  
});

