

var bear = function(pubsub, bearId, tokenId, bearUsername, socialId, avatarId, hasSignedIn){

	var _evtsUncommitted = [];
	var _pubsub = pubsub;

	var _bearId = bearId;
	var _tokenId = tokenId;
	var _bearUsername = bearUsername;
	var _socialId = socialId;
	var _avatarId = avatarId;
	var _hasSignedIn = hasSignedIn;

	var _apply = function(evtType, payLoad, local)
	{
		_evtsUncommitted.push({
			"evtType" : evtType,
			"payLoad" : payLoad
		});
	};

	this.publish = function(publish){
		
		var returnValue = [];
		//copy the event to save
		var evtsToCommit =  _evtsUncommitted ;
		//reset the current events
		_evtsUncommitted = [];

		for (var i = evtsToCommit.length - 1; i >= 0; i--) {
	    	_pubsub(evtsToCommit[0].evtType,evtsToCommit[0].payLoad);
		}
	};

	this.signIn = function(bearName, bearAvatarId){
		_bearUsername = bearName;
		_avatarId = bearAvatarId;
		_hasSignedIn = true;

		_apply('hasSignedIn', {
	      	"bearId" : _bearId, 
	      	"tokenId" : _tokenId,
			"bearUsername" : _bearUsername, 
			'socialId' : _socialId, 
			'avatarId' : _avatarId
      	});
	};

	if (_hasSignedIn)  
		_apply ('signedIn',  {
				"bearId" : _bearId, 
				"tokenId" : _tokenId,
				"bearUsername" : _bearUsername, 
				'socialId' : _socialId, 
				'avatarId' : _avatarId
	    	});	
	else 
		_apply ('notSignedIn',  {
				"bearId" : _bearId, 
				'socialId' : _socialId, 
	    	});	
};

module.exports = bear;