var Rx = require("rx");
var logger = require('../logger');
var uuid = require('node-uuid');


var Reactive = function(aggType) {
	var _aggChannel = "evt." + aggType + ".";

	var _subject = new Rx.Subject();

	var _publish= function(evtType, data){
		
		var msg = {
			'idMessage' : uuid.v1(),
			'eventType' : evtType,
			'payLoad' : data
		};

			
		logger.debug('published :' + _aggChannel + evtType );  
		logger.debug('published :' + JSON.stringify(msg));
		
		setTimeout(function(){
			_subject.onNext(msg);
		},0);
	};

	var cold = Rx.Observable.create(function(observer){
			_subject.subscribe(
				function(x) { observer.onNext(x); },
				function(err) { console.log(err); },
				function() { console.log('Completed'); });
		});

	var hot = cold.publish();	

	hot.connect();
	

	var _observable = function(evtTypes){
		
		if (Object.prototype.toString.call(evtTypes) === '[object Array]' ) {
			return hot.where(function(x,idx,obs){
				return evtTypes.indexOf(x.eventType) > -1 ;
				});	
		}
		
		return hot.where(function(x,idx,obs){
				return x.eventType== evtTypes ;
		});
	};
	
	return {
		publish : _publish,
		observable : _observable,
	};
};


module.exports = Reactive;	



