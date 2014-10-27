

var logger = (function(window){
	var log4js = require('log4js');
	log4js.loadAppender('console');
		
	return log4js.getLogger();

	// {   appenders: [ { type: "console" }  ],   replaceConsole: true }
})(this);


module.exports = logger;