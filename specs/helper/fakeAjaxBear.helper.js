var uuid = require('node-uuid');
var logger = require('log4js').getLogger();

var FakeAjaxBear = function(bearDataSource) {

	//implement default fakeData here if bearDataSource is undefined
	if (!bearDataSource)
		bearDataSource = [{
			bearId: '4a82199e-7c30-4a66-b194-6d40127fbb89',
			userId: '12345678-34567-67',
			bearUsername: "jason",
			socialId: '24567789',
			avatarId: 23,
			hasSignedIn: true
		}];

	return function(window) {

		var document = window.document;
		var $ = window.jQuery;

		this.getCurrentBear = function() {

			var $deferred = $.Deferred();

			setTimeout(function() {
				$deferred.resolve(bearDataSource[0]);
			}, 50);

			return $deferred.promise();

		};

		this.signIn = function(cmd) {

			var $deferred = $.Deferred();

			setTimeout(function() {
				var o = {
					response: 'OK'
				};

				$deferred.resolve(o);
			}, 50);

			return $deferred.promise();
		};



	};
};

module.exports = FakeAjaxBear;