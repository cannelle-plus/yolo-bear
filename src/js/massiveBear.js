var Ajax = require("./reactiveSources/ajax");
var Socket = require("./reactiveSources/socket.js");

var app = require("./app");


$(document).ready(function(){
	
	var yolo = new app(new Ajax(), new Socket());	
  
});


(function(global){
	
	$(document).ready(function(){
		var yolo = new app(new Ajax(), new Socket());			
		
		});

})(window || this);