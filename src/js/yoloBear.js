var fakeAjax = require("../jsTap/fakeAjax");
var fakeSocket = require("../jsTap/fakeSocket");
var logger = require('./logger');
var Ajax = require("./reactiveSources/ajax");
var Socket = require("./reactiveSources/socket.js");

var app = require("./app");



(function(global){
	
	$(document).ready(function(){

		
		var yolo = new app(fakeAjax(global),fakeSocket());	
	  
	});

})(window || this);
