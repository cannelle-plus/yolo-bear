
//it bear was to be changed more it should be cloned to another type of bear like signedBear for instance
var SignedBear = function(bearId, tokenId, bearUsername){

	var _bearId = bearId;
	var _tokenId = tokenId;
	var _bearUsername = bearUsername;
	
	this.bearId = _bearId;
	this.tokenId = _tokenId;
	this.bearUsername = _bearUsername;
	
};

module.exports = SignedBear;