/* Page load */

$(document).ready(function() {
	featureCarousels();
});


/* Feature carousels */

function featureCarousels() {
	$('.feature ul').each(function(index, value) {
		$(this).children('li').hide();		
		$(this).children('li').each(function(i, v) {
			$(v).fadeIn();
			setTimeout(function() { $(v).fadeOut(); }, 1000);
		});
	});
}