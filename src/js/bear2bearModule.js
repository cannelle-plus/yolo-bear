var reactive = require("./reactiveSources/reactive");

var bear2bearModule = function(aggType, ViewModel) {
	return function(Ajax, Socket) {

		var reactiveModule = reactive(aggType);

		this.observable = function(evtType) {
			return reactiveModule.observable(evtType);
		};

		this.publish = function(evtType, data) {
			reactiveModule.publish(evtType, data);
		};

		this.addToWindow = function(window, currentBear) {
			var ajax = new Ajax(window);

			if (currentBear) {
				var socket = new Socket(reactiveModule, currentBear);
				return new ViewModel(window, reactiveModule, ajax, socket, currentBear);
			}
			else {
				return new ViewModel(window, reactiveModule, ajax);
			}

		};
	};



};



module.exports = bear2bearModule;