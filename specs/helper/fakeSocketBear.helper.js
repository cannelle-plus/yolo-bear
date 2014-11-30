var uuid = require('node-uuid');
var to = require('../../src/js/reactiveSources/to');

// { Id: '6b766657-05f0-4eea-f92d-22ac305e24c2',
//   Version: 0,
//   MetaData:
//    { CorrelationId: '71e043d8-610c-43c3-b3ca-432abf878cb4',
//      UserId: '311ca2bb-81dd-4b50-fadf-e45cdf287745',
//      UserName: 'bond' },
//   PayLoad:
//    { Case: 'ScheduleGame',
//      Fields: [ 'test', '007', '2014-10-24 18:00', 'Playsoccer', '4' ] } }
// { host: 'localhost',
//   port: '8081',
//   path: '/game/6b766657-05f0-4eea-f92d-22ac305e24c2',
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json', 'Content-Length': 283 } }

var createEvent = function(aggregateId,correlationId, userId, userName, evtType, evt)
{
	return 	{ 
		Id: aggregateId,
  		Version: 0,
		MetaData: { 
			CorrelationId: correlationId,
		    UserId: userId,
		    UserName: userName
		},
  		PayLoad: { 
  			Case: evtType,
     		Fields: evt
     	}
 	 };
};

var FakeSocketBear = function(r) {
	
	var fn = function(reactive)
	{



		// var _ScheduleGameScheduled = function(gameId) {
			
		// 	var aggregateId = uuid.v1();
		// 	var correlationId = uuid.v1();
		// 	var userId = uuid.v1();
		// 	var userName = "bond";
		// 	var evtType = "GameScheduled";
		// 	var evt = [ 'testNewGamePooping up', '007', '2014-10-24 18:00', 'Playsoccer', '4' ] ;
			

		// 	return createEvent(aggregateId,correlationId, userId, userName, evtType, evt);

		// };



		this.subscribeTo = function(channel, action){
			switch(channel)
			{
				case "GameJoined" :
					reactive.observable("emitFakeSocketGameJoined").subscribe(to( function(evt){
						action(_ScheduleGameJoined(evt.payLoad.id));
					})); 
				break;
				case "GameScheduled" :
					reactive.observable("emitFakeSocketGameScheduled").subscribe(to( function(evt){
						action(_ScheduleGameScheduled(evt.payLoad.id));
					})); 
				break;
				case "GameAbandonned" :
					reactive.observable("emitFakeSocketGameAbandonned").subscribe(to( function(evt){
						action(_ScheduleGameAbandonned(evt.payLoad.id,evt.payLoad.username));
					})); 
				break;

			}

		};
	};

	if (r)
		return new fn(r);
	else
		return fn;

};

module.exports = FakeSocketBear;