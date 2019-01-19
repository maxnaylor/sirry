// Skills - Local knowledge

function respondPetrol(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='petrolPrice') {
		if(analysis.place) {
			console.log('Interpretation: Request for petrol prices in '+analysis.place.placeName);
		} else {			
			console.log('Interpretation: Request for petrol prices in local area');
		}
		respondLoading();
		$.ajax({
			url: 'proxy.php?url=http://apis.is/petrol/',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				console.log(response);					    
				loadingComplete();
				if(analysis.place) {
					var outputPhrase = 'Þetta eru lægstu bensínverðin '+analysis.place.prep+' '+decline(analysis.place.placeName,'dat')+':';
					var userLat = analysis.place.lat;
					var userLon = analysis.place.lon;
					renderOutput();
				} else {					
					var outputPhrase = 'Þetta eru lægstu bensínverðin í nágrenninu:';
					if(navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {			
							var userLat  = position.coords.latitude;
							var userLon  = position.coords.longitude;	
							if((userLat>66.7 || userLat<63.1) || (userLon>-12.4 || userLon<-25)) {
								loadingComplete();
								console.log('User outside of Iceland');
								appendOutput({ output: 'Ég get einungis flett upp bensínverðum á Íslandi.' });	
							} else {
								renderOutput();
							}
						}, locationError);
					} else {					
						loadingComplete();
						appendOutput({ output: 'Ég veit ekki hvar þú ert.' });
					}
				}
				function renderOutput() {
					var prices = '';
					// Sort results and get top 3
					response.results.sort(dynamicSort('bensin95'));
				    prices += '<div class="card petrol"><table>';
				    prices += '<tr><th>Bensín 95<th>Dísel</th><th>&nbsp;</th></tr>';
				    var j = 0;	    
					for(i=0; i<response.results.length; i++) {
						var latDistance = diff(response.results[i].geo.lat,userLat);
						var lonDistance = diff(response.results[i].geo.lon,userLon);
						if(latDistance<0.03 && lonDistance <0.03) {
							if(j<3) {
								prices += '<tr><td class="petrol">'+icelandiciseInt(response.results[i].bensin95)+'</td>';
								prices += '<td class="diesel">'+icelandiciseInt(response.results[i].diesel)+'</td>';
								prices += '<td>'+response.results[i].company+'<br />';
								prices += '<span>'+response.results[i].name+'</span></td></tr>';
								j++;
							}
						}
				    }
					prices += '</table>';
				    prices += '</div>';
					appendOutput({ output: outputPhrase,
								   outputData: prices,
						           outputPhrase: outputPhrase });
				}			   
			},
			error: function(error) {		    
			    loadingComplete();
			    appendOutput({ output: 'Ég get ekki sótt þessar upplýsingar í augnablikinu.' });
		    }
		});
		return true;
	}
}

function respondRoadConditions(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='roadConditions') {
		
		console.log('Interpretation: Request for road conditions on '+analysis.place);
		respondLoading();
	    
		var request = $.ajax({
			dataType: 'json',
			url: 'roadcache.xml.cache',
			type: 'GET',
			success: function(response) {
				loadingComplete();
				//console.log(response);				
				if(response) {					
					for (i = 0; i < response.length; i++) { 
						if(response[i].StuttNafn==analysis.place) {
							var road = i;
						} else {
							var explodedInput = response[i].LangtNafn.split(' ');
							for (j=0; j<explodedInput.length; j++) {
								var currentPlace = explodedInput[j].replace(/:/gi, '');
								if(currentPlace==analysis.place) {									
									var road = i;
								}
							}
						} 
					} 					
					if(road) {
						// Choose correct yes/no word
						if(analysis.rawInput.match(/(ófært)/i)) {
							var posReply = 'Nei';
							var NegReply = 'Já';
						} else {
							var posReply = 'Já';
							var NegReply = 'Nei';
						}
						// Choose correct preposition
						if(analysis.place.match(/(göng)$/i)) {
							var prep = 'í';
						} else {
							var prep = 'á';
						}
						// Generate response string
						var conditionString = 'Hér eru nýjustu upplýsingar um færð '+prep+' '+decline(analysis.place,'dat')+':';
						if(response[road].AstandYfirbords=='A') {
							conditionString = posReply+', það er greiðfært '+prep+' '+decline(analysis.place,'dat')+':';
						} else if(response[road].AstandYfirbords=='B') {
							conditionString = posReply+', en það eru hálkublettir:';
						} else if(response[road].AstandYfirbords=='C') {
							conditionString = posReply+', en það er hált. Ég mæli með vetrardekkjum.';
						} else if(response[road].AstandYfirbords=='D') {
							conditionString = posReply+', en það er flughált. Ég mæli með vetrardekkjum.';
						} else if(response[road].AstandYfirbords=='E') {
							conditionString = posReply+', en það er krap. Ég mæli með vetrardekkjum.';
						} else if(response[road].AstandYfirbords=='F') {
							conditionString = posReply+', en það er snjóþekja. Ég mæli með vetrardekkjum.';
						} else if(response[road].AstandYfirbords=='G') {
							conditionString = posReply+', en það er þæfingur. Farðu varlega.';
						} else if(response[road].AstandYfirbords=='H') {
							conditionString = posReply+', en það er þungfært. Farðu mjög varlega.';
						} else if(response[road].AstandYfirbords=='J') {
							conditionString = negReply+', það er ófært vegna veðurs.';
						} else if(response[road].AstandYfirbords=='K') {
							conditionString = negReply+', það er ófært.';
						} else if(response[road].AstandYfirbords=='L') {
							conditionString = negReply+', vegurinn er lokaður.';
						}
						// Print out conditions
						var conditionsData = '<div class="card roadconditions">';
						    conditionsData += '<div class="road">'+expandLongRoadName(response[road].LangtNafn);
						    if(response[road].ErHalendi) { conditionsData += '<span class="highland">Hálendisvegur</span>';	}				    
						    conditionsData += '</div><div class="condition" style="background-color: ';
						    conditionsData += response[road].Linulitur+';">'+response[road].StuttAstand;
						    //conditionsData += 'Uppfært: '+moment(response[road].DagsSkrad).format('dddd');
						    conditionsData += '</div>';
						    conditionsData += '</div>';
						    conditionsData += '<div class="providerText">Byggt á gögnum frá <a href="http://www.vegagerdin.is/ferdaupplysingar/faerd-og-vedur/allt-landid-faerd-kort/" target="_new">Vegagerðinni</a></div>'
						appendOutput({ output: conditionString,
									   outputData: conditionsData,
									   outputString: conditionString });
					} else {
						appendOutput({ output: 'Ég get ekki fundið upplýsingar um færð á '+decline(analysis.place, 'dat')+'.' });
					}
				} else {
					appendOutput({ output: 'Ég get ekki sótt upplýsingar um færð í augnablikinu.' });
				}
			},
			error: function(error) {		    
			    loadingComplete();
			    appendOutput({ output: 'Ég get ekki sótt upplýsingar um færð í augnablikinu.' });
		    }
		});
		
		return true;
		
	}
}

function expandLongRoadName(input) {
	var explodedInput = input.split(' ');
	var string = '';
	for (i=0; i<explodedInput.length; i++) {
		word = explodedInput[i];
		var regex = /h(\.(:?))$/gi;
		if(explodedInput[i].match(regex)) {
			word = explodedInput[i].replace(regex, 'heiði$&');
		} 
		var regex = /(v\.)$/gi;
		if(explodedInput[i].match(regex)) {
			word = explodedInput[i].replace(regex, 'vegur');
		} 
		var regex = /(v\.-)$/gi;
		if(explodedInput[i].match(regex)) {
			word = explodedInput[i].replace(regex, 'vegur–');
		} 
		var regex = /fj\.v\.$/gi;
		if(explodedInput[i].match(regex)) {
			word = explodedInput[i].replace(regex, 'fjarðarvegur');
		} 
		string += word+' ';
	}
	return string;
}

function respondCompanyLookup(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='companyLookup') {
		console.log('Interpretation: Company lookup request for '+analysis.searchItem);
		loadingComplete();
		appendOutput({ output: 'Ég get ekki flett upp kennitölum í augnablikinu.' });
		return true;
	}
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function diff(a,b) {
	return Math.abs(a-b);
}