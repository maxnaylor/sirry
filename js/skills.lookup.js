// Skills — Lookup

function respondWhatIs(input) {
	var respondWhatIsResponse = '';
	if(input.match(/^(hvað er |hvað eru |hver er )/i) && !input.match(/(ég|gömul|gamall|á ensku|kennitala)/gi)) {
		var searchQuery = input.replace(/^(hvað er |hvað eru |hver er )/gi, '');
			searchQuery = cleanProperNouns(searchQuery);
		    searchQuery = encodeURI(searchQuery);
		console.log('Interpretation: What is “'+searchQuery+'”');
		respondLoading();
		(function fetchWikiPage(searchQuery) {
			$.ajax( {
			    type: 'GET',			
			    url: 'https://is.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+searchQuery+'&callback=?',
			    contentType: 'application/json; charset=utf-8',
			    dataType: 'json',
			    timeout: 1000,
			    async: false,
			    success: function(data) {
				    loadingComplete();
				    if(data.parse) {
					    // Retrieve wiki HTML
			       		var markup = data.parse.text['*'];
			       		// Parse and clean HTML
						var blurb = $('<div></div>').html(markup);
						    blurb.find('sup').remove();
						    blurb.find('table.metadata').remove();						
						    blurb.find('.mw-ext-cite-error').remove();
						// Retrieve thumbnail image
						var firstImage = blurb.find('img').eq(0).attr('src');
						if(firstImage) {
							if(firstImage=='//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Disambig.svg/23px-Disambig.svg.png') {
								console.log('Wiki disambiguation page');
								var disambig = true;
							} else {								
								console.log('First image URL: '+firstImage);
								firstImage = '<img src="https://'+firstImage+'" class="wikiThumb" />';								
								blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });	
							}
						} else {
							firstImage = '';
						}
						// Strip remaining images, tables and infoboxes
						blurb.find('img').remove();
						blurb.find('table').remove();
						// Check if page is redirect
						var redirect = $(blurb).find('.redirectText').html();
						if(redirect) {				
							console.log('Wiki redirected to: '+redirectPage);					
							blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
							var redirectPage = $(blurb).find('.redirectText li').html();	
							stillLoading();
							fetchWikiPage(redirectPage);
							return;
						}
						// Retrieve wiki text
						var firstPara = $(blurb).find('p').eq(0).html();
						console.log(firstPara);
						if(firstPara) {
							var firstSentence = firstPara.match(/(^.*?[a-z]{1,}[.!?:])(\s+(?=\W*[A-Z])|$)/i);
							    firstSentence = stripTags(firstSentence[0]);							    
								firstPara = firstPara.replace(/^(.{350}[^\s]*).*/, '$1'+'…');
						}
						// Render output
						if(!disambig) {
							// Render article preview
							if(firstSentence!=null) {
								appendOutput({ output: 'Ég fann þetta á Wikipedia:',
											   outputData: '<p class="wikiPreview">'+firstImage+firstPara+'</p><a href="http://is.wikipedia.org/wiki/'+searchQuery+'" target="_new">Lesa meira…</a>',
											   outputPhrase: firstSentence });     
							} else {
								appendOutput({ output: 'Eitthvað fór úrskeiðis við að sækja gögn frá Wikipedia.' });	
							}
						} else {
							// Disambig page
							var disambigList = $(blurb).find('ul').eq(0).html()
							    disambigList = $('<ul></ul>').html(disambigList);
							// Checks through disambig links, cleans up and removes links to empty pages
							var disambigLinks = '<ul class="wikiDisambig">'
							$(disambigList).find('li').each(function() {
								var articleLink = $(this).find('a:first').attr('href');
								var articleName = decodeURI(articleLink);
								    articleName = articleName.replace(/^\/wiki\//, '');
								    articleName = articleName.replace(/_/, ' ');
								if(!articleLink.match(/redlink=1$/)) {
									disambigLinks = disambigLinks+'<li><a href="https://is.wikipedia.org'+articleLink+'" target="_new">'+articleName+'</a></li>';
								}
							});
							appendOutput({ output: 'Það virðast vera til nokkrar greinar um „'+decodeURI(searchQuery)+'“ á Wikipedia:',
								           outputData: disambigLinks });		
						}
					} else {
				    	loadingComplete();
						appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
					}  		 
			    },
			    error: function(error) {
				    loadingComplete();
				    appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á netinu.' });
			    }
			});
		}(searchQuery));
		return true;
	} else if(input.match(/^(hvað|hversu|hve)/gi) && input.indexOf('margir') >= 0 && input.indexOf('búa') >= 0) {
		var searchQuery = input.replace(/\s?(hvað|hversu|hve|margir|búa|í|á)\s/gi, '');
			searchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
			searchQuery = cleanProperNouns(decline(searchQuery,'nom'));
		    searchQuery = encodeURI(searchQuery);
		console.log('Interpretation: Request for population of “'+searchQuery+'”');
		respondLoading();
		$.ajax( {
		    type: 'GET',			
		    url: 'https://is.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+searchQuery+'&callback=?',
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    timeout: 1000,
		    async: false,
		    success: function(data) {
			    loadingComplete();
			    if(data.parse) {
			        var markup = data.parse.text['*'];
					var blurb = $('<div></div>').html(markup);
					    blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('tr').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('td').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('i').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('b').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('sup').remove();
					    blurb.find('.mw-ext-cite-error').remove();
	    			    blurb.find('img').remove();
				        blurb.find('p').remove();
				        blurb.find('ul').remove();
					    blurb.find('span').remove();
					    blurb.find('small').remove();
					    blurb.find('br').each(function() { $(this).replaceWith(' '); });
					var population = $(blurb).find('table.infobox.geography.vcard').eq(0).html();
					    population = population.replace(/(\r\n|\n|\r)/gm, ' ');
					    population = population.match(/mannfjöldi(.*)VLF/gi);
					    population = population[0].replace(/(\(|\)|mannfjöldi|-|samtals|áætl.|þéttleiki|byggðar|VLF|sæti|&nbsp;)/gi, ' ');
					    population = population.replace(/( janúar )/gi, '01.');					     
						population = population.replace(/( febrúar )/gi, '02.');				     
						population = population.replace(/( mars )/gi, '03.');				     
						population = population.replace(/( apríl )/gi, '04.');				     
						population = population.replace(/( maí )/gi, '05.');				     
						population = population.replace(/( júní )/gi, '06.');				     
						population = population.replace(/( júlí )/gi, '07.');					     
						population = population.replace(/( ágúst )/gi, '08.');				     				     
						population = population.replace(/( september )/gi, '09.');				     
						population = population.replace(/( október )/gi, '10.');
						population = population.replace(/( nóvember )/gi, '11.');	
						population = population.replace(/( desember )/gi, '12.');
					    population = population.replace(/\s+/g, ';');
					    population = population.trim();
					    population = population.split(';');
					if(population) {
						appendOutput({ output: 'Íbúar '+decline(decodeURI(searchQuery),'gen')+' eru '+population[4]+'.' });
					} else { 
						appendOutput({ output: 'Ég finn ekki þær upplýsingar.' });
					}
				} else {
					appendOutput({ output: 'Ég finn ekki þær upplýsingar.' });
				}           		 
		    },
		    error: function(error) {
			    loadingComplete();
			    appendOutput({ output: 'Ég finn ekki þær upplýsingar.' });
		    }
		});
		return true;
	}
}

function decline(word,gramCase) {
	if(word.match(/ /g)) { 
		console.log('String contains multiple words');
 	}
	console.log('Searching declension database for “'+word+'” in '+gramCase);
	if(gramCase=='nom') {
		var declinedWord = $.grep(countryDeclensions, function(e) { 
			if(e.acc === word) { return this; }
			if(e.dat === word) { return this; }
			if(e.gen === word) { return this; }
		});		
		if(declinedWord[0]) { 
			word = declinedWord[0].nom; 			
		} else {
			console.log('Word “'+word+'” not found in database');
			return false;
		}
	}
	if(gramCase=='gen') {
		var declinedWord = $.grep(countryDeclensions, function(e) { 
			return e.nom === word;	
		});		
		if(declinedWord[0]) { 
			word = declinedWord[0].gen; 			
		} else {
			console.log('Word “'+word+'” not found in database');
			return false;
		}
	}
	return word;
}

function respondBio(input) {
	var respondBioResponse = '';
	if((input.indexOf('hvenær á') >= 0 || input.indexOf('afmæli') >= 0 || input.indexOf('fæddist') >= 0) && input.indexOf('ég') < 0) {
		var searchQuery = input.replace(/(hvenær|á|afmæli|fæddist)/gi, '').trim();
			searchQuery = cleanProperNouns(searchQuery);
		    searchQuery = encodeURI(searchQuery);
		respondLoading();
		$.ajax( {
		    type: 'GET',			
		    url: 'https://is.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+searchQuery+'&callback=?',
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    timeout: 1000,
		    success: function(data) {
			    loadingComplete();
		        if(data.parse.text!=undefined) {
		        	var markup = data.parse.text['*'];
					var blurb = $('<div></div>').html(markup);
					    blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('sup').remove();
					    blurb.find('.mw-ext-cite-error').remove();
					    blurb.find('img').remove();
					var firstPara = $(blurb).find('p').eq(0).html();
					var birthInfo = firstPara.match(/\((.*?)\)/);   
					if(birthInfo) { 
					    birthDate = wikiDateScrubber(birthInfo[1]);
						appendOutput({ output: decodeURI(searchQuery)+' fæddist '+formatDate(birthDate.birth)+'.' });
					} else {
						appendOutput({ output: 'Ég get ekki fundið þær upplýsingar.' });
					}
				} else {					
			    	loadingComplete();			 
					appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
				}
		    },
		    error: function(error) {			    
			    loadingComplete();
			    appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
		    }
		});
		return true;
	} else if(input.match(/^(hvað|hve|hversu)/i) && input.match(/(gamall|gömul)/gi) && !input.match(/(ég)/gi)) {
		var searchQuery = input.replace(/(hvað|hversu|hve|er|gömul|gamall)/gi, '');
			searchQuery = cleanProperNouns(searchQuery);
			searchQuery = searchQuery.trim();			
		    searchQuery = encodeURI(searchQuery);
		respondLoading();
		$.ajax( {
		    type: 'GET',			
		    url: 'https://is.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+searchQuery+'&callback=?',
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    timeout: 1000,
		    success: function(data) {
			    loadingComplete();			    
		        if(data.parse.text!=undefined) {
			        var markup = data.parse.text['*'];
					var blurb = $('<div></div>').html(markup);
					    blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('sup').remove();
					    blurb.find('.mw-ext-cite-error').remove();
					    blurb.find('img').remove();
					var firstPara = $(blurb).find('p').eq(0).html();					
					var birthInfo = firstPara.match(/\((.*?)\)/);	   
					if(birthInfo) {
						birthDate = wikiDateScrubber(birthInfo[1]);
						if(!birthDate.death) {
							appendOutput({ output: decodeURI(searchQuery)+' er '+calculateAge(birthDate.birth)+' ára.' });
						} else {
							appendOutput({ output: decodeURI(searchQuery)+' lést '+calculateAge(birthDate.birth,birthDate.death)+' ára þann '+formatDate(birthDate.death)+'.' });
						}
					} else { 
						appendOutput({ output:'Ég get ekki fundið þær upplýsingar.' });
					}
				} else {					
			    	loadingComplete();
					appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
				}
		    },
		    error: function(error) {
			    loadingComplete();
			    appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
		    }
		});
		return true;
	}
}

function respondWhatHappened(input) {
	var respondWhatHssappened = '';
	if(input.indexOf('hvað gerðist') >= 0) {
		var searchQuery = input.replace(/(hvað|gerðist|árið)/gi, '').trim();
			searchQuery = cleanProperNouns(searchQuery);
		    searchQuery = encodeURI(searchQuery);
		respondLoading();
		$.ajax( {
		    type: 'GET',			
		    url: 'https://is.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+searchQuery+'&callback=?',
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    timeout: 1000,
		    success: function(data) {
			    loadingComplete();
		        if(data.parse.text!=undefined) {
		        	var markup = data.parse.text['*'];
					var blurb = $('<div></div>').html(markup);
					    blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
					    blurb.find('sup').remove();
					    blurb.find('.mw-ext-cite-error').remove();
					    blurb.find('img').remove();
					    blurb.find('table').remove();
					var firstPara = $(blurb).find('p').eq(0).html(); 
					appendOutput({ output: 'Árið '+decodeURI(searchQuery)+' gerðist heilmikið:',
						           outputData: '<br />'+firstPara });
				} else {					
			    	loadingComplete();			 
					appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
				}
		    },
		    error: function(error) {			    
			    loadingComplete();
			    appendOutput({ output: 'Ég fann ekkert um „'+decodeURI(searchQuery)+'“ á Wikipedia.' });
		    }
		});
		return true;
	}
}

function wikiDateScrubber(input) {
	input = input.replace(/(janúar)/gi, '01.');					     
    input = input.replace(/(febrúar)/gi, '02.');				     
    input = input.replace(/(mars)/gi, '03.');				     
    input = input.replace(/(apríl)/gi, '04.');				     
    input = input.replace(/(maí)/gi, '05.');				     
    input = input.replace(/(júní)/gi, '06.');				     
    input = input.replace(/(júlí)/gi, '07.');					     
    input = input.replace(/(ágúst)/gi, '08.');				     				     
    input = input.replace(/(september)/gi, '09.');				     
    input = input.replace(/(október)/gi, '10.');
    input = input.replace(/(nóvember)/gi, '11.');	
    input = input.replace(/(desember)/gi, '12.');
    input = input.replace(/[^0-9.]/gi, '');
    input = input.replace(/^\./, '');
    input = input.split('.');
    var day    = input[0];
    var month  = input[1];    
    if(day<=9) { day = '0'+day; }    
    var year   = input[2].substring(0,4);    
    var day2   = input[2].substring(4,6);  
    if(day2) {
	    var month2 = input[3]; 
	    var year2  = input[4];
    }
    var birth  = year+'-'+month+'-'+day;
    if(day2) {
	    var death = year2+'-'+month2+'-'+day2;
	}
	return {
        'birth': birth,
        'death': death
    };
}

function formatDate(date) {
	     date = date.split('-');
	var year  = date[0];
    var month = parseInt(date[1]);
    var day   = parseInt(date[2]);
    switch(month) {
		case 1:
			month = 'janúar';
			break;
		case 2:
			month = 'febrúar';
			break;
		case 3:
			month = 'mars';
			break;
		case 4:
			month = 'apríl';
			break;
		case 5:
			month = 'maí';
			break;
		case 6:
			month = 'júní';
			break;
		case 7:
			month = 'júlí';
			break;
		case 8:
			month = 'ágúst';
			break;
		case 9:
			month = 'september';
			break;
		case 10:
			month = 'október';
			break;
		case 11:
			month = 'nóvember';
			break;
		case 12:
			month = 'desember';
			break;
	}
    date = day+'. '+month+' '+year;
    return date;
}

function formatDay(day,longFormat) { 
	if(longFormat==true) {
		switch(day) {
			case 0:
				day = 'sunnudagur';
				break;
			case 1:
				day = 'mánudagur';
				break;
			case 2:
				day = 'þriðjudagur';
				break;
			case 3:
				day = 'miðvikudagur';
				break;
			case 4:
				day = 'fimmtudagur';
				break;
			case 5:
				day = 'föstudagur';
				break;
			case 6:
				day = 'laugardaugur';
				break;
			case 7:
				day = 'sunnudagur';
				break;
		}
	} else {
		switch(day) {
			case 0:
				day = 'sun';
				break;
			case 1:
				day = 'mán';
				break;
			case 2:
				day = 'þri';
				break;
			case 3:
				day = 'mið';
				break;
			case 4:
				day = 'fim';
				break;
			case 5:
				day = 'fös';
				break;
			case 6:
				day = 'lau';
				break;
			case 7:
				day = 'sun';
				break;
		}
	}
	return day;
}

function formatMonth(month,longFormat) {
	if(longFormat==true) {
		switch(month) {
			case 0:
				month = 'janúar';
				break;
			case 1:
				month = 'febrúar';
				break;
			case 2:
				month = 'mars';
				break;
			case 3:
				month = 'apríl';
				break;
			case 4:
				month = 'maí';
				break;
			case 5:
				month = 'júní';
				break;
			case 6:
				month = 'júlí';
				break;
			case 7:
				month = 'ágúst';
				break;
			case 8:
				month = 'september';
				break;
			case 9:
				month = 'október';
				break;
			case 10:
				month = 'nóvember';
				break;
			case 11:
				month = 'desember';
				break;
		}
	} else {
		switch(month) {
			case 0:
				month = 'jan';
				break;
			case 1:
				month = 'feb';
				break;
			case 2:
				month = 'mar';
				break;
			case 3:
				month = 'apr';
				break;
			case 4:
				month = 'maí';
				break;
			case 5:
				month = 'jún';
				break;
			case 6:
				month = 'júl';
				break;
			case 7:
				month = 'ágú';
				break;
			case 8:
				month = 'sep';
				break;
			case 9:
				month = 'okt';
				break;
			case 10:
				month = 'nóv';
				break;
			case 11:
				month = 'des';
				break;
		}
	}
	return month;
}

function calculateAge(dob,dod) {
	dob = new Date(dob);
	if(dod) {
		var today = new Date(dod);
	} else {		
		var today = new Date();
	}
	var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
	return age;
}