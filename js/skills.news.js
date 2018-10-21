// Skills - News

function respondNews(input) {
	var response = '';
	if(input.match(/(hvað er|sýndu)? ?(nýtt|helst)? ?(að frétta|frétt)/i)) {
		respondLoading();	
		if(input.match(/(hérlendis|innlendar|Ísland)/i)) {
			// Icelandic news
			var providers = [{ feedURL: 'http://www.ruv.is/rss/innlent',
			                   name: 'RÚV',			        
			                   shortName: 'ruv',
			                   category: 'Innlent'
			                 },
			                 { feedURL: 'https://www.mbl.is/feeds/innlent/',
			                   name: 'Morgunblaðið',			        
			                   shortName: 'mbl',
			                   category: 'Innlent'
			                 }];
			var outputString = 'Hér eru nýjustu innlendar fréttir:'
			console.log('Interpretation: Get Icelandic news');
		} else if(input.match(/(erlendis|erlendar)/i)) {
			// Foreign news
			var providers = [{ feedURL: 'http://www.ruv.is/rss/erlent',
			                   name: 'RÚV',			        
			                   shortName: 'ruv',
			                   category: 'Erlent',
			                 },
			                 { feedURL: 'https://www.mbl.is/feeds/erlent/',
			                   name: 'Morgunblaðið',			        
			                   shortName: 'mbl',
			                   category: 'Erlent'
			                 }];
			var outputString = 'Hér eru nýjustu erlendar fréttir:'
			console.log('Interpretation: Get foreign news');
		} else if(input.match(/(íþrótt)/i)) {
			// Sport news
			var providers = [{ feedURL: 'http://www.ruv.is/rss/ithrottir',
			                   name: 'RÚV',			        
			                   shortName: 'ruv',
			                   category: 'Íþróttir',
			                 },
			                 { feedURL: 'https://www.mbl.is/feeds/sport/',
			                   name: 'Morgunblaðið',			        
			                   shortName: 'mbl',
			                   category: 'Íþróttir'
			                 }];
			var outputString = 'Hér eru nýjustu íþróttafréttir:'
			console.log('Interpretation: Get sport news');
		} else {
			// General news
			var providers = [{ feedURL: 'http://www.ruv.is/rss/frettir',
			                   name: 'RÚV',			        
			                   shortName: 'ruv'
			                 },
			                 { feedURL: 'https://www.mbl.is/feeds/nyjast/',
			                   name: 'Morgunblaðið',			        
			                   shortName: 'mbl'
			                 },
			                 { feedURL: 'http://www.visir.is/rss/allt',
			                   name: 'Vísir',			        
			                   shortName: 'visir'
			                 },
			                 { feedURL: 'https://stundin.is/rss/',
			                   name: 'Stundin',			        
			                   shortName: 'stundin'
			                 },
			                 { feedURL: 'http://www.dv.is/feed/',
			                   name: 'DV',			        
			                   shortName: 'dv'
			                 }];		
			var outputString = 'Hér eru nýjustu fréttir:'
			console.log('Interpretation: Get news');
		}
		
		var limit = providers.length;
		var i;
		
		var promises = [];
		var $newsFeed = [];
				
		for(i=0; i<limit; i++) {
			
			console.log('Retrieving news from '+providers[i].name+'…');
		
			var yql = URL = [
		        'https://query.yahooapis.com/v1/public/yql',
		        '?q=' + encodeURIComponent("select title, description, category, link, pubDate from rss where  url='"+providers[i].feedURL+ "'"),
		        '&format=json&callback=?'
		    ].join('');	
		    
			var request = $.ajax({
				dataType: 'jsonp',
				url: yql,
				type: 'GET',
				ajaxI: i,
				success: function(response) {
					
					i = this.ajaxI;
									
			        $(response.query.results.item).each(function(index, value) {
				        if(index>3) { 
					        return false;
					    } else {
						    var thisStory = {
							    providerShortName: providers[i].shortName,
							    providerName: providers[i].name,
							    pubDate: value.pubDate,
							    link: value.link,
							    title: value.title,
							    description: cleanHTML(value.description).substring(0,100)
						    };
						    $newsFeed.push(thisStory);
				        }
				    });
			        console.log('Loaded news from '+providers[i].name+'.');	 					
					
				}, error: function() {
					console.log('Unable to load news from '+providers[i].name+'.');	 
				}
			});			
			
			promises.push(request);
		
		}	
		
		$.when.apply(null, promises).done(function() {
			
		   $newsFeed = sortByKey($newsFeed, 'pubDate', true);					
		   var newsOutput = '<div class="card news">';
		   
		   for(i=0; i<5; i++) {
			    newsOutput += '<div class="row">';
		        newsOutput += '<div class="provider"><img src="images/provider_'+$newsFeed[i].providerShortName+'.svg" alt="'+$newsFeed[i].providerName+'" />';
		        newsOutput += '<p class="date">'+moment($newsFeed[i].pubDate).fromNow()+'</p></div>';
		        newsOutput += '<p class="headline"><a href="'+$newsFeed[i].link+'" target="_new">'+$newsFeed[i].title+'</a></p>';
		        newsOutput += '<p class="description">'+$newsFeed[i].description+'…</p>';
		        newsOutput += '</div>';
		   }
		   			
		   newsOutput += '</div>';		   
		   loadingComplete();	   
		   appendOutput({
		       output: outputString,
			   outputData: newsOutput
		   });
		   
		});
		
		return true;
	}
}

function cleanHTML(string) {
	var string = $('<p>').html(string).text();
	return string;
}

function sortByKey(array, key, desc) {
    var array = array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if(desc==true) {
    	array = array.reverse();
    }
    return array;
}