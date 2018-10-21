// Skills - News

function respondNews(input) {
	var response = '';
	if(input.match(/(hvað er|sýndu)? ?(nýtt|helst)? ?(að frétta|frétt|á döfinni)/i)) {
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
			// Check if specific provider is requested
			if(input.match(/(RÚV|Ríkisútvarp)/i)) {
				// RÚV
				var providers = [{ feedURL: 'http://www.ruv.is/rss/frettir',
				                   name: 'RÚV',			        
				                   shortName: 'ruv'
				                 }];		
				var outputString = 'Hér eru nýjustu fréttirnar frá RÚV:'	
				console.log('Interpretation: Get news from RÚV');
			} else if(input.match(/(Morgunblað|mbl|Mogganum)/i)) {
				// Morgunblaðið
				var providers = [{ feedURL: 'https://www.mbl.is/feeds/nyjast/',
				                   name: 'Morgunblaðið',			        
				                   shortName: 'mbl'
				                 }];		
				var outputString = 'Hér eru nýjustu fréttirnar frá Morgunblaðinu:'	
				console.log('Interpretation: Get news from Morgunblaðið');
			} else if(input.match(/(Vísi|Fréttablað)/i)) {
				// Vísir
				var providers = [{ feedURL: 'http://www.visir.is/rss/allt',
				                   name: 'Vísir',			        
				                   shortName: 'visir'
				                 }];		
				var outputString = 'Hér eru nýjustu fréttirnar frá Vísi:'	
				console.log('Interpretation: Get news from Vísir');
			} else if(input.match(/(Stundin)/i)) {
				// Stundin
				var providers = [{ feedURL: 'https://stundin.is/rss/',
				                   name: 'Stundin',			        
				                   shortName: 'stundin'
				                 }];		
				var outputString = 'Hér eru nýjustu fréttirnar frá Stundinni:'	
				console.log('Interpretation: Get news from Stundin');
			} else if(input.match(/(DV)/i)) {
				// DV
				var providers = [{ feedURL: 'http://www.dv.is/feed/',
				                   name: 'DV',			        
				                   shortName: 'dv'
				                 }];		
				var outputString = 'Hér eru nýjustu fréttirnar frá DV:'	
				console.log('Interpretation: Get news from DV');
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
		}
		
		var limit = providers.length;
		var i;
		
		var promises = [];
		var $newsFeed = { providerCount: providers.length, stories: [] };
				
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
				        if(index>4) { 
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
						    $newsFeed.stories.push(thisStory);
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
			
		   $newsFeed.stories = sortByKey($newsFeed.stories, 'pubDate', true);	
		   
		   console.log($newsFeed);
		   				
		   var newsOutput = '<div class="card news">';
		   
		   if($newsFeed.providerCount>1) {
		   
			   for(i=0; i<5; i++) {
				    newsOutput += '<div class="row">';
			        newsOutput += '<div class="provider"><img src="images/provider_'+$newsFeed.stories[i].providerShortName+'.svg" alt="'+$newsFeed.stories[i].providerName+'" />';
			        newsOutput += '<p class="date">'+moment($newsFeed.stories[i].pubDate).fromNow()+'</p></div>';
			        newsOutput += '<p class="headline"><a href="'+$newsFeed.stories[i].link+'" target="_new">'+$newsFeed.stories[i].title+'</a></p>';
			        newsOutput += '<p class="description">'+$newsFeed.stories[i].description+'…</p>';
			        newsOutput += '</div>';
			   }
		   
		   } else {
			   
			   	newsOutput += '<img class="provider" src="images/provider_'+$newsFeed.stories[0].providerShortName+'.svg" />'
			   
			    for(i=0; i<5; i++) {
				    newsOutput += '<div class="row">';
			        newsOutput += '<div class="provider">';
			        newsOutput += '<p class="date">'+moment($newsFeed.stories[i].pubDate).fromNow()+'</p></div>';
			        newsOutput += '<p class="headline"><a href="'+$newsFeed.stories[i].link+'" target="_new">'+$newsFeed.stories[i].title+'</a></p>';
			        newsOutput += '<p class="description">'+$newsFeed.stories[i].description+'…</p>';
			        newsOutput += '</div>';
			   }

			   
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