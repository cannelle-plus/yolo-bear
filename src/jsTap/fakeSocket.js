var uuid = require('node-uuid');

// { Id: '6b766657-05f0-4eea-f92d-22ac305e24c2',
//   Version: 0,
//   MetaData:
//    { CorrelationId: '71e043d8-610c-43c3-b3ca-432abf878cb4',
//      UserId: '311ca2bb-81dd-4b50-fadf-e45cdf287745',
//      UserName: 'bond' },
//   PayLoad:
//    { Case: 'CreateGame',
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
}

var FakeSocket = function(r) {
	
	var fn = function(reactive)
	{

		var to = reactive.to;

		var _createGameJoined = function(gameId){
			var aggregateId = gameId;
			var correlationId = uuid.v1();
			var userId = uuid.v1();
			var userName = "bond";
			var evtType = "GameJoined";
			var evt = [ ] ;
			var evt= createEvent(aggregateId,correlationId, userId, userName, evtType, evt);

			return evt;

		};


		var _createGameCreated = function(gameId) {
			
			var aggregateId = uuid.v1();
			var correlationId = uuid.v1();
			var userId = uuid.v1();
			var userName = "bond";
			var evtType = "GameCreated";
			var evt = [ 'testNewGamePooping up', '007', '2014-10-24 18:00', 'Playsoccer', '4' ] ;
			var evt= createEvent(aggregateId,correlationId, userId, userName, evtType, evt);

			return evt;

		};

		var _createGameAbandonned = function(gameId, username) {
			var aggregateId = gameId;
			var correlationId = uuid.v1();
			var userId = uuid.v1();
			var userName = username;
			var evtType = "GameAbandonned";
			var evt = [ '' ] ;
			var evt= createEvent(aggregateId,correlationId, userId, userName, evtType, evt);

			return evt;
		};


		var _createGameCancelled = function(gameId) {
			var aggregateId = uuid.v1();
			var correlationId = uuid.v1();
			var userId = uuid.v1();
			var userName = "bond";
			var evtType = "GameCancelled";
			var evt = [ ] ;
			var evt= createEvent(aggregateId,correlationId, userId, userName, evtType, evt);

			return evt;
		};


		this.subscribeTo = function(channel, action){
			switch(channel)
			{
				case "GameJoined" :
					reactive.observable("emitFakeSocketGameJoined").subscribe(to( function(evt){
						action(_createGameJoined(evt.payLoad.id));
					})); 
				break;
				case "GameCreated" :
					reactive.observable("emitFakeSocketGameCreated").subscribe(to( function(evt){
						action(_createGameCreated(evt.payLoad.id));
					})); 
				break;
				case "GameAbandonned" :
					reactive.observable("emitFakeSocketGameAbandonned").subscribe(to( function(evt){
						action(_createGameAbandonned(evt.payLoad.id,evt.payLoad.username));
					})); 
				break;

			}

		}
	}

	if (r)
		return new fn(r);
	else
		return fn;

};

module.exports = FakeSocket;