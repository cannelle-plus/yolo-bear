var Session = require("../session");

var Socket = function(reactive) {

	var _socket = io.connect('http://localhost');

	_socket.emit('login', Session.current());

	this.subscribeTo = function(channel, action) {
		_socket.on(channel, action);
	};
	// socket.on('news', function (data) {
	//    console.log(data);
	//    socket.emit('my other event', { my: 'data' });
	//  });	  

};

module.exports = Socket;