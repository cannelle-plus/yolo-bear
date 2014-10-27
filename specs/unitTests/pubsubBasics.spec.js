// var should = require('chai').should();
// // var foo = 'bar';
// var PubSub = require("pubsub-js");
// var Rx = require("Rx");
// // var Emitter = require("../../js/reactive/emitter");


// //to be repalced by the node uuid module as soon as possible
// function generateUUID(){
//     var d = new Date().getTime();
//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = (d + Math.random()*16)%16 | 0;
//         d = Math.floor(d/16);
//         return (c=='x' ? r : (r&0x7|0x8)).toString(16);
//     });
//     return uuid;
// }

// describe("Subscribers ", function() {

// 	it("should react to events they subscribed for", function(done) {
// 		var msgtoSend = { toto : "tata" };

// 		// create a function to assert to topics
// 		var mySubscriber = function( channel, data ){
// 			channel.should.equal('MY TOPIC');
// 		    data.should.have.property('toto');
// 		    done();
// 		};
		
// 		// add the function to the list of subscribers for a particular topic
// 		// we're keeping the returned token, in order to be able to unsubscribe
// 		// from the topic later on
// 		var token = PubSub.subscribe( 'MY TOPIC', mySubscriber );

// 		// publish a topic asyncronously
// 		PubSub.publish( 'MY TOPIC', msgtoSend );

// 	});
// });




// describe("Topics are defined by aggregate ", function() {

// 	it("and subscriber should react to everything", function(done) {
// 		var msgtoSend = { toto : "tata" };

// 		var viewModel = function(publish, observable)
// 		{

// 			var agg1  = new Aggregate(publish, observable);
// 			var agg2  = new Aggregate(publish, observable);
// 			var dataSource = [agg1, agg2];

// 			this.doSomethingOnTheUI = function(){
// 				var evts = agg1.doAction();
// 			};
// 		};

// 		var Aggregate = function(publish, observable){

// 			var aggregateType= 'aggregateRootType';
// 			var _observable = observable.whereAggregate(aggregateType);
// 			var _publish=publish(aggregateType);

// 			var _id = generateUUID();

// 			_observable.where(function(x, idx,obs){
// 						return x.payLoad.id != _id; })
// 					  .subscribe(
// 			            function (x) { 
// 			            	// console.log('Observer _id= ' + _id); 
// 			            	// console.log('Observer : onNext: ' + JSON.stringify(x)); 

// 				    		x.should.have.property('aggregateType');
// 				    		x.should.have.property('eventType');
// 				    		x.should.have.property('payLoad');
// 				    		x.payLoad.should.have.property('toto');
// 				    		x.payLoad.should.have.property('id');
// 				    		_id.should.not.equals(x.payLoad.id);
// 				    		done();		  	
// 			            },
// 			            function (e) { console.log('Observer : onError: ' + e.message); },
// 			            function () { console.log('Observer : onCompleted'); });
					  

// 			this.doAction = function(){
// 				_publish('actionDone', { "id": _id, "toto" : "tata" });
// 			};
// 		};

				
// 		// add the function to the list of subscribers for a particular topic
// 		// we're keeping the returned token, in order to be able to unsubscribe
// 		// from the topic later on
// 		var publish = function(aggType)
// 		{
// 			var channel= "evt." + aggType + ".";
// 			return function(evtType, msg){
// 				// console.log('published' + JSON.stringify(msg));
// 				PubSub.publish( channel + evtType, msg );
// 			};
// 		};

// 		var pubsubObservable = (function(){
			
// 			var observable = Rx.Observable.create(function(observer){

// 				PubSub.subscribe('evt', function(channel,data){
					
// 					var slices = channel.split('.');
// 					// console.log('received aggregateType:'  + slices[1] + ' eventType:'  + slices[2] + ' data:'  + JSON.stringify( data) ) ;
// 					if (slices.length===3)
// 					observer.onNext({
// 						aggregateType :  slices[1],
// 						eventType : slices[2],
// 						payLoad : data
// 					});
// 				} );

// 				// observer.onNext(42);		
// 			}).publish();


// 			observable.whereAggregate = function(aggregateType){
// 				// console.log('whereAggregate ' + aggregateType);
// 				var obsAggregate =  observable.where(function(x, idx,obs){
// 					return x.aggregateType== aggregateType;
// 				});

// 				obsAggregate.whereEvent = function(evtType){
// 					console.log('evtType ' + evtType);
// 					var o =  observable.where(function(x, idx,obs){
// 						return x.eventType== evtType;
// 					});
// 					o.subscribeTo= function(action) {
// 						o.subscribe(
// 								function (x) { action(x); },
// 			        			function (e) { console.log(evtType + ' : onError: ' + e.message); },
// 			        			function () { console.log(evtType + ' : onCompleted'); });
// 					};
// 					return o;

// 				};

// 				return obsAggregate;
// 			};

 
// 			return observable;

// 		})();

// 		// publish a topic asyncronously
// 		var vm = new viewModel(publish, pubsubObservable);

// 		pubsubObservable.connect();

// 		vm.doSomethingOnTheUI();



// 	});
// });
