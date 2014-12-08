var logger = require('../logger');
var to = require('../reactiveSources/to');
var Bear = require('../model/bear');
// var uuid = require('node-uuid');

var BearsRender = require("../ui/bearsRender.js");
var BearRepository = require("../reactiveSources/bearRepository");


var bearsViewModel = function(window, navigation, reactive, ajax){

	if (!window)
		throw "window is not instanciated";

	if (!reactive)
		throw "reactive is not instanciated";

	if (!ajax)
		throw "ajax is not instanciated";

	var _publish = reactive.publish;
	var _observable = reactive.observable;

	var repository = new BearRepository(reactive, ajax);	
	var bearsRender = new BearsRender(window, reactive, navigation);
	var _bear = null;
	var $ = window.jQuery;

	//-------------------------------------------------
	//perform actions on the domain and publish events
	//-------------------------------------------------
	this.SignIn= function(bearName, bearAvatarId){
		if (!_bear)
			throw "bear cannot be null";
		
		_bear.signIn(bearName, bearAvatarId);
		_bear.publish();	
	};

	//-------------------------------------------------
	//subscribing to UI events  to trigger domain actions
	//-------------------------------------------------
	bearsRender.SignIn(this.SignIn);


	//-------------------------------------------------
	// listenning to domain events to perform action on the domain
	//-------------------------------------------------	
	_observable('serverCurrentBearReceived').subscribe(to(function (evt){
		var x = evt.payLoad;
		_bear = new Bear(_publish, x.bearId, x.tokenId, x.bearUsername, x.socialId, x.avatarId, x.hasSignedIn);
		_bear.publish();
    }));


    //-------------------------------------------------
    // initialisation of the view model
    //-------------------------------------------------
	repository.getCurrentBear();  
};

module.exports = bearsViewModel;