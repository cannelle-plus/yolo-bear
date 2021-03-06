var navigation = function($){
	var _self = this;

	function doNothing(event){
		event.preventDefault();
		event.stopPropagation();
	}

	this.showSection = function(destination){
		var id = '#' + destination,
				tX = -100 * $(id).index();
		$('#main > section').css('transform','translateX( ' + tX + '%)');
	};
	
	// var urlParts = window.location.href.split('/'),
	// 		currentPage = urlParts[urlParts.length - 1];
	// history.pushState(null, null, 'games');
	// Navigation
	$('body').on('click','[data-target]',function(e){
		doNothing(e);
		_self.showSection($(this).attr('data-target'));
		
		
		// if($(this).attr('data-target') !== currentPage) {
		// 	currentPage = $(this).attr('data-target');
		// 	history.pushState(null, null, $(this).attr('data-target'));
		// }
	}).on('click','a[data-modal]',function(e){
		// Modal
		doNothing(e);
		if($(this).attr('data-modal') === 'open')
			$('.overlay').show();
		else	
			$('.overlay').hide();
	});
	
	// OnPopState : used on history navigation
	// $(window).on('popstate', function () {
	// 		urlParts = window.location.href.split('/');
	// 		$('a[data-target=' + urlParts[urlParts.length - 1] + ']:eq(0)').click();
	// });

};

module.exports = navigation;
