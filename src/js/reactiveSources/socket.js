

var Socket = function(reactive, currentBear) {

	var _socket = io.connect('http://localhost:8888');

	_socket.emit('login', currentBear.tokenId );

	this.subscribeTo = function(channel, action) {
		_socket.on(channel, action);
	};
	// socket.on('news', function (data) {
	//    console.log(data);
	//    socket.emit('my other event', { my: 'data' });
	//  });	  

};

module.exports = Socket;