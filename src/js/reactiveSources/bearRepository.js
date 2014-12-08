var Game = require('../model/game');
var logger = require('log4js').getLogger();
var uuid = require('node-uuid');
var to = require('./to');


var bearRepository = function(reactive, ajax) 
{
	if (!reactive)
		throw "reactive is not instanciated";

	if (!ajax)
		throw "ajax is not instanciated";

	var _observable = reactive.observable;
	

	var publish = {
		CurrentBearReceived : function(bearId, tokenId, bearUsername, socialId, avatarId, hasSignedIn){
			logger.debug('CurrentBearReceived' + bearId + ' ' + bearUsername + ' ' + tokenId);
			reactive.publish("serverCurrentBearReceived", {
				'bearId' : bearId,
				'tokenId' : tokenId,
				'bearUsername' : bearUsername,
				'socialId' : socialId,
				'avatarId' : avatarId,
				'hasSignedIn' : hasSignedIn
			});
		},

		
	} ;
	
	var _getCurrentBear = function(){
		return ajax.getCurrentBear().then(function(data) {
			logger.debug('resolving current Bear' + data);

			publish.CurrentBearReceived(
					data.bear.bearId,
					data.bear.userId,
					data.bear.bearUsername,
					data.bear.socialId,
					data.bear.avatarId,
					data.bear.hasSignedIn);
		});
		//what to do if it fails, should we handle it , event to be Scheduled , name to be found? 
	};


	var _signIn = function(cmd){
		ajax.signIn(cmd);	
	};

	_observable('hasSignedIn').subscribe(to(_signIn));

	return {
		getCurrentBear : _getCurrentBear,
		signIn : _signIn
	};
};

module.exports = bearRepository;