var logger = require('./logger');

var appWindow = (function(){ 

	var _window = null;
	var _document = null;

	var _setWindow = function(w)
	{
		// logger.debug('setting _window');
		// logger.debug(w);
		_window = w;
	};

	var _getWindow = function() {
		// logger.debug('getting _window');
		// logger.debug(_window);
		return _window;
	};

	var _setDocument = function(d)
	{
		// logger.debug('setting _window');
		// logger.debug(w);
		_document = d;
	};

	var _getDocument = function() {
		// logger.debug('getting _window');
		// logger.debug(_window);
		return _document;
	};

	return {
		setWindow : _setWindow,
		getWindow : _getWindow,
		setDocument : _setDocument,
		getDocument : _getDocument
	};

})();


module.exports = appWindow;