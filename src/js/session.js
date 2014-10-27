var uuid = require('node-uuid');

var Session = (function(){

	var username = "bond";
	var userId = uuid.v1();

	var _current = {
			username : "bond",
  		 	userId : uuid.v1()
  		 }; 

	return {
		current : function() { return _current; }
	};

})();

module.exports = Session;