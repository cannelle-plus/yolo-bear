var logger = require('../logger');

module.exports = function(action){
	return 	{
		onNext : function (x) { 
			logger.debug('executing :' + action);	
			try {
				action(x); 
		    }
	        catch(e) {
	           logger.error(e);
	        }
		},
		onError : function (e) { console.log(' error: ' + e.message); },
		onCompleted : function () { console.log('completed'); }
	};			
};