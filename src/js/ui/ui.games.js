var uiGames = function(){	

	function doNothing(event){
		event.preventDefault();
		event.stopPropagation();
	}
	
	// Navigation
	$('a[data-target]').on('click',function(e){
		doNothing(e);
		var id = '#' + $(this).attr('data-target'),
				tX = -100 * $(id).index();
		$('#main > section').css('transform','translateX( ' + tX + '%)');
	});
	
	// Modal
	$('a[data-modal]').on('click',function(e){
		doNothing(e);
		if($(this).attr('data-modal') === 'open')
			$('.overlay').show();
		else	
			$('.overlay').hide();
	});
};
module.exports = uiGames;