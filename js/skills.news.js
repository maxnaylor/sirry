// Skills - News

function respondNews(input) {
	var response = '';
	if(input.match(/(hvað er|sýndu)? ?(nýtt|helst)? ?(að frétta|frétt)/i)) {
		respondLoading();	
		if(input.match(/(hérlendis|innlendar|Ísland)/i)) {
			// Icelandic news
			var provider = { feedURL: 'http://www.ruv.is/rss/innlent',
			                 name: 'RÚV',			        
			                 shortName: 'ruv',
			                 category: 'Innlent'
			               };
			var outputString = 'Hér eru nýjustu innlendar fréttir:'
			console.log('Interpretation: Get Icelandic news');
		} else if(input.match(/(erlendis|erlendar)/i)) {
			// Icelandic news
			var provider = { feedURL: 'http://www.ruv.is/rss/erlent',
			                 name: 'RÚV',			        
			                 shortName: 'ruv',
			                 category: 'Erlent'
			               };
			var outputString = 'Hér eru nýjustu erlendar fréttir:'
			console.log('Interpretation: Get foreign news');
		} else if(input.match(/(íþrótt)/i)) {
			// Icelandic news
			var provider = { feedURL: 'http://www.ruv.is/rss/ithrottir',
			                 name: 'RÚV',			        
			                 shortName: 'ruv',
			                 category: 'Íþróttir'
			               };
			var outputString = 'Hér eru nýjustu íþróttafréttir:'
			console.log('Interpretation: Get sport news');
		} else {
			// General news
			var provider = { feedURL: 'http://www.ruv.is/rss/frettir',
			                 name: 'RÚV',			        
			                 shortName: 'ruv'
			               };			
			var outputString = 'Hér eru nýjustu fréttir:'
			console.log('Interpretation: Get news');
		}
		
		var yql = URL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select title, description, category, link, pubDate from rss where  url='"+provider.feedURL+ "'"),
	        '&format=json&callback=?'
	    ].join('');	
		$.getJSON(yql, function(data) {	
			loadingComplete();
	        var newsFeed = '<div class="card news">';
	        $(data.query.results.item).each(function(index, value) {
		        if(index>3) { 
			        return false;
			    } else {
			        newsFeed = newsFeed+'<div class="row">';
			        newsFeed = newsFeed+'<div class="provider"><img src="images/provider_'+provider.shortName+'.svg" alt="'+provider.name+'" />';
			        newsFeed = newsFeed+'<p class="date">'+moment(value.pubDate).fromNow()+'</p></div>';
			        newsFeed = newsFeed+'<p class="headline"><a href="'+value.link+'" target="_new">'+value.title+'</a></p>';
			        newsFeed = newsFeed+'<p class="description">'+value.description.substring(0,100)+'…</p>';
			        newsFeed = newsFeed+'</div>';
		        }
		    });
	        newsFeed = newsFeed+'</div>';
			appendOutput({
				output: outputString,
				outputData: newsFeed
			});
		}, 'jsonp');
		return true;
	}
}