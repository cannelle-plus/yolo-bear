
var Reactive = require('../../src/js/reactiveSources/reactive');
var logger = require('../../src/js/logger');
var jsdom = require('jsdom');
var fs     = require('fs');
var jQuery = require('jquery');





var calljsDom = function(description, fileName, callback)
{
	it(description, function(done) {

		logger.setLevel("ERROR");
		var html = fs.readFileSync("./src/html/"+ fileName).toString();

	    var document = require('jsdom').jsdom(html);
	    var window = document.parentWindow;
	    window.$ = window.jQuery = jQuery(window) ;

	    callback(done, window);

	});

};

module.exports = calljsDom;