// Skills — Weather

function respondNorthernLights(input) {
	var analysis = analyseIntent(input);
	if(analysis.intent=='northernLights') {	
		console.log('Interpretation: Request for northern lights forecast');
		respondLoading();
		var xmlSource = 'https://xmlweather.vedur.is/aurora?op=xml&type=index';
		var yql = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=json&callback=?'
	    ].join('');
	    
	    var request = $.ajax({
			dataType: 'jsonp',
			url: yql,
			type: 'GET',
			success: function(response) {
			    loadingComplete();
		        var forecasts = response.query.results.aurora.night_data;	       
			    if(forecasts) {
				    var forecastTable = '<div class="card northernLights">'+
				                        '<div class="row header"><div class="column activity">Virkni</div>'+
				                        '<div class="column sunset">Sólsetur</div>'+
				                        '<div class="column darkness">Myrkur</div></div>';
				    for(i=0; i<2; i++) {
				        forecastTable += '<div class="row"><div class="day">'+moment().add(i,'days').format('ddd')+'</div>'+
						                 '<div class="strength s'+forecasts[i].activity_forecast+'">'+forecasts[i].activity_forecast+'</div>'+
						                 '<div class="sunset">'+forecasts[i].sun.sunset+'</div>'+
						                 '<div class="darkness">'+forecasts[i].sun.darkness+' – '+forecasts[i].sun.dawn+'</div></div>';
				    }
				    forecastTable += '</div><div class="providerText">Byggt á gögnum frá <a href="https://www.vedur.is/vedur/spar/nordurljos/" target="_new">Veðurstofu Íslands</a></div>'
				    var todayChances = '';
				    if(analysis.time=='thisEvening' || analysis.time == 'tonight') {
						console.log('Interpretation: Request for tonight’s northern lights forecast');
						if(forecasts[0].activity_forecast>7) {
							todayChances = 'Mjög líklega';
						} else if(forecasts[0].activity_forecast>3) {
							todayChances = 'Það eru góðar líkur á norðurljósum í kvöld';
						} else {
							todayChances = 'Sennilega ekki';
						} 
					} else if(analysis.time=='tomorrowEvening') {
						console.log('Interpretation: Request for tomorrow night’s northern lights forecast');
						if(forecasts[1].activity_forecast>7) {
							todayChances = 'Mjög líklega';
						} else if(forecasts[1].activity_forecast>3) {
							todayChances = 'Það eru góðar líkur á norðurljósum annað kvöld';
						} else {
							todayChances = 'Sennilega ekki';
						} 
					}
					if(todayChances) {
						appendOutput({ output: todayChances+':',
							           outputData: '<br />'+forecastTable });
					} else {
						appendOutput({ output: 'Hér er norðurljósaspá fyrir næstu fimm dagana:',
							           outputData: '<br />'+forecastTable });
					}
				} else {
					appendOutput({ output: 'Mér tókst ekki að sækja nýjustu norðurljósaspána. Prófum aftur seinna.' });
				}
			}
		});
		return true;
	}
}

function respondAvalancheWarning(input) {
	if(input.match(/(snjóflóð)/)) {	
		console.log('Interpretation: Request for avalanche warnings');
		respondLoading();
		var xmlSource = 'http://xmlweather.vedur.is/avalanche?op=xml&type=status';
		var yqlURL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=xml&callback=?'
	    ].join('');
	    $.getJSON(yqlURL, function(data) {
		    loadingComplete();
	        var xmlContent = $(data.results[0]);
			var todaysForecast = '';
		    var forecastTable = '<div class="card avalanche">';
		    var day = new Date().getDay();
		    // Try to retrieve local forecast first
	        var forecastData = $(xmlContent).find('area_forecast').each(function(index) {
		        var region          = $(this).find('region').text();
		        var dangerLevel     = $(this).find('danger_level').text();
		        var dangerLevelCode = $(this).find('danger_level_code').text();
		        var forecast        = $(this).find('short_forecast').text();
				forecastTable = forecastTable+'<div class="row"><div class="region">'+region+'</div><div class="dangerlevel l'+dangerLevelCode+'">'+dangerLevel+'</div><div class="forecast">'+forecast+'</div></div>';
		    });
		    if(forecastData[0]) {
			    forecastTable = forecastTable+'</div><a class="providerLogo vedurstofa" href="http://www.vedur.is/ofanflod/snjoflodaspa/" target="_new"></a>';
			    appendOutput({ output: 'Hér eru síðustu snjóflóðaviðvaranir:', outputData: '<br />'+forecastTable });
			} else {				
		    	// Try to retrieve latest conditions if local forecast unavailable
			    var forecastData = $(xmlContent).find('conditions').each(function(index) {
			        var forecast   =  $(this).find('short_description').text();
			        var updateTime =  $(this).find('update_time').text();
					forecastTable += '<div class="row"><div class="forecast">'+forecast+'<br />('+moment(updateTime).fromNow()+')</div></div>';
			    });
				if(forecastData[0]) {
				    forecastTable += '</div><div class="providerText">Byggt á gögnum frá <a href="https://www.vedur.is/#syn=snjoflod" target="_new">Veðurstofu Íslands</a></div>'
				    appendOutput({ output: 'Hér eru nýjustu upplýsingarnar:', outputData: '<br />'+forecastTable });
			    } else {
					appendOutput({ output: 'Ég get ekki náð í snjóflóðaviðvaranir núna. Prófum aftur seinna.' });
				}
			}
	    });
		return true;
	}
}

function respondWeather(input) {
	var analysis = analyseIntent(input);
	if(analysis.intent=='weather') {			
		console.log('Interpretation: Request for weather forecast');
		respondLoading();
		retrieveForecast(analysis);
		return true;
	} 
}

 $.ajaxSetup({
   async: false
 });

function retrieveForecast(analysis) {
	if(analysis.place) {
		var nearestStation = getClosestWeatherStation(analysis.place.placeName);
		retrieveForecastData(analysis.rawInput,nearestStation,analysis.place.placeName);
	} else {		
	    if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {			
				var userLat  = position.coords.latitude;
				var userLon  = position.coords.longitude;	
				var nearestStation = getClosestWeatherStation(userLat+','+userLon);
				if((userLat>66.7 || userLat<63.1) || (userLon>-12.4 || userLon<-25)) {
					loadingComplete();
					console.log('User outside of Iceland');
					appendOutput({ output: 'Ég get einungis flett upp veðurspám á Íslandi.' });	
				} else {
					retrieveForecastData(input,nearestStation);
				}	
			}, locationError);
		} else {					
			loadingComplete();
			appendOutput({ output: 'Ég veit ekki hvar þú ert.' });
		}
	}
	function retrieveSunTimes() {
		console.log('Retrieving sun time data');		
		var xmlSource = 'http://xmlweather.vedur.is/aurora?op=xml&type=index';		
		var yql = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=json&callback=?'
	    ].join('');
	    var request = $.ajax({
			dataType: 'jsonp',
			url: yql,
			type: 'GET'
	    });
	    return request;
	}
	function retrieveForecastData(input,nearestStation,place) {	
		
		if(!analysis.time) { analysis.time = 'today'; }
		if(place==undefined) {
			place = nearestStation.station_name;
		}
		console.log('Seeking forecast from weather station '+nearestStation.station_id+' in '+nearestStation.station_name);	
		
		var xmlSource = 'http://xmlweather.vedur.is/?op_w=xml&type=forec&lang=is&view=xml&ids='+nearestStation.station_id;		
		var yql = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=json&callback=?'
	    ].join('');	
	    
	    retrieveSunTimes().done(function(data) {

		    if(data.query.results.aurora) {
			    
			   	var isNight = false;
				var sunTimes = data.query.results.aurora.night_data;
		    
			    // Generate weather forecast
			    var request = $.ajax({
					dataType: 'jsonp',
					url: yql,
					type: 'GET',
					success: function(response) {
								    
						loadingComplete();
						
						if(response.query.results) {
							
							var textResponse = 'Hér er nýjasta veðurspáin.';
							var forecasts = response.query.results.forecasts.station.forecast;
							var forecastLink = response.query.results.forecasts.station.link;
						    var forecastStartTime = moment().format('YYYY-MM-DD HH:00:00');
						    // Time offsets
						    if(analysis.time=='tomorrow') {
								var textResponse = 'Hér er nýjasta veðurspáin fyrir morgundaginn.';
							    var forecastStartTime = moment().add(1,'days').format('YYYY-MM-DD 12:00:00');
						    } if(analysis.time=='tomorrowMorning') {
							    var forecastStartTime = moment().add(1,'days').format('YYYY-MM-DD 06:00:00');
						    } if(analysis.time=='tomorrowEvening') {
							    var forecastStartTime = moment().add(1,'days').format('YYYY-MM-DD 17:00:00');
						    }	    
						    // Sun times
						    var forecastSunTimes = extractSunTimes(sunTimes,forecastStartTime);
						    // Build forecast table
						    var forecastTable =  '<div class="card weather"><div class="row now"><div class="place">'+place+'</div>';
						    for(i=0; i<forecasts.length; i++) { 
							    if(forecasts[i].ftime==forecastStartTime) {		
							    	j=1;
								    forecastTable += '<div class="temp">'+forecasts[i].T+'°</div>';		
						        	forecastTable += '</div>';		    
									forecastTable += '<div class="row today">';
									var conditions = { windSpeed: forecasts[i].F,
										               temp: forecasts[i].T,
										               conditions: forecasts[i].W
										             };
									var textResponse = generateWeatherText(conditions,analysis.time);
								} 
								if(forecasts[i].ftime>=forecastStartTime) {
									if(j<7) {	
										if(forecasts[i].ftime==moment().format('YYYY-MM-DD HH:00:00')) {
											currentHour = 'Núna';
										} else {
											currentHour = moment(forecasts[i].ftime).format('HH');
										}									
								    	if(moment(forecasts[i].ftime).format('HH:MM')>forecastSunTimes.sunset) {
									    	var isNight = true;
								    	}
										forecastTable += '<div class="hour"><div class="time">'+currentHour+'</div>';			
										forecastTable += '<div class="symbol'+retrieveSymbol(forecasts[i].W,isNight)+'" title="'+forecasts[i].W+'"></div>';
										forecastTable += '<div class="temp">'+forecasts[i].T+'°</div>';
										forecastTable += '<div class="windspeed"><div class="winddirection '+forecasts[i].D+'" title="'+forecasts[i].D+'"></div>'+forecasts[i].F+'</div></div>';
									j++;
									}
								}
						    }
							forecastTable += '</div></div><div class="providerText">Byggt á gögnum frá <a href="'+forecastLink+'" target="_new">Veðurstofu Íslands</a></div>'
							// Output forecast
							appendOutput({ output: textResponse, 
										   outputData: '<br />'+forecastTable 
										});	
										
						} else {
							
							appendOutput({ output: 'Ég get ekki sótt veðurspána í augnablikinu.' });
							
						}
						
					}, 
					error: function() {
						appendOutput({ output: 'Ég get ekki sótt veðurspána í augnablikinu.' });	
					}
				});
			
			} else {
				
				console.warn('Unable to retrieve sun time data');				
				loadingComplete();
				appendOutput({ output: 'Ég get ekki sótt veðurspána í augnablikinu.' });
				
			}
			
	    });
	   
	}
}

function extractSunTimes(sunTimes,date) {
	var theseSunTimes = '';
	var date = moment(date).format('YYYY-MM-DD');
	for(i=0; i<sunTimes.length; i++) {
		if(sunTimes[i].evening_date==date) {
			theseSunTimes = { 'date': sunTimes[i].evening_date,
				              'sunrise': sunTimes[i].sun.sunrise,
				              'sunset': sunTimes[i].sun.sunset
			                };
		}
	}
	return theseSunTimes;
}

function generateWeatherText(conditions,time) {
	console.log('Generating weather text based on these data: F: '+conditions.windSpeed+', T: '+conditions.temp+', W: '+conditions.conditions);
	var weatherText = 'Hér er nýjasta veðurspáin. ';
	if(time=='today') {
		verb = 'er';
	} else {
		verb = 'verður';
	}
	if(conditions.windSpeed>10) {
		weatherText = 'Það '+verb+' mikið rok. ';
	}
	if(conditions.temp<0) {
		weatherText = 'Það '+verb+' mjög kalt';
	} else if(conditions.temp>=0 && conditions.temp<5) {
		weatherText = 'Það '+verb+' kalt';
	} else if(conditions.temp>=5 && conditions.temp<8) {
		weatherText = 'Það '+verb+' frekar kalt';
	} else if(conditions.temp>=8 && conditions.temp<15) {		
		weatherText = 'Það '+verb+' hlýtt';
	} else if(conditions.temp>=15 && conditions.temp<20) {
		weatherText = 'Það '+verb+' mjög hlýtt';
	} else if(conditions.temp>=20) {
		weatherText = 'Það '+verb+' heitt';
	}
	if(conditions.conditions=='Heiðskírt') {
		weatherText = weatherText + ' og heiðskírt';
	} else if(conditions.conditions=='Alskýjað') {
		weatherText = weatherText + ' og alskýjað';
	} else if(conditions.conditions=='Rigning') {
		weatherText = weatherText + ' og rigning';
	} else if(conditions.conditions=='Snjókoma') {
		weatherText = weatherText + ' og snjór';
	} 
	weatherText = weatherText+'.';
	return weatherText;
}

function getClosestWeatherStation(place) {
	console.log('Find weather station closest to '+place);
	var stations = new Array();
	var $nearestStation = '';
	var explodedPlace = place.split(',');
	if(explodedPlace[1]) {
		var lat = explodedPlace[0];
		var lon = explodedPlace[1];
	} else {
		var coords = $.grep(icelandPlaceData, function(e) { 
			if(e.placeName==place) { return this; }
		});	
		if(coords==undefined) {			
			loadingComplete();
			appendOutput({ output: 'Ég get ekki flett upp veðurspá fyrir '+place });
			$nearestStation = false;
		} else {
			var lat = coords[0].lat;
			var lon = coords[0].lon;
		}
	}
	if(lat) {
		$.ajax( {
		    type: 'GET',			
		    url: 'bin/data/vedurstodvar.txt',
		    timeout: 1000,
		    async: false,
		    success: function(data) {
			    $nearestStation = {'station_id' :'', 'station_lat' : '', 'station_lon' : '', 'station_name' : ''};
			    var data = data.split(/\n/);
			    $(data).each(function(index,value) {
			    	var stationData = new Array();
				    	console.log('Weather station data parsed and appended to array');
					    stationData = value.split(',');
					    stations.push({'station_id' : stationData[0], 'station_lat' : stationData[1], 'station_lon' : stationData[2], 'station_name' : stationData[3]});
			    });	
				var coords = place.split(',');
				$(stations).each(function(index,value) {
			    	console.log('Current distance appended to station array');
					var distance = getDistanceFromLatLonInKm(lat,lon,value.station_lat,value.station_lon);
					value.distance = distance;
				});
				function sortByDistance(a,b){
					var aDistance = a.distance;
					var bDistance = b.distance; 
					return ((aDistance < bDistance) ? -1 : ((aDistance > bDistance) ? 1 : 0));
				}
				stations.sort(sortByDistance);
				$nearestStation.station_id   = stations[0].station_id;
				$nearestStation.station_lat  = stations[0].station_lat;
				$nearestStation.station_lon  = stations[0].station_lon;
				$nearestStation.station_name = stations[0].station_name;
				$nearestStation.distance     = stations[0].distance;		
				console.log('Nearest weather station: '+$nearestStation.station_name+' ('+formatDistance($nearestStation.distance)+')');	
			},
		    error: function(error) {		    
			    loadingComplete();
			    appendOutput({ output: 'Ég get ekki leitað að upplýsingum um veðrið eins og er.' });
		    }
		});
	}
	return $nearestStation;
}

function retrieveSymbol(conditions, isNight) {
	var symbol = '';
	switch(conditions) {
		case 'Heiðskírt':
			if(isNight==true) {
				symbol = ' clear night';
			} else {
				symbol = ' clear';
			}
			break;
		case 'Léttskýjað':
			symbol = ' partly';
			break;
		case 'Skýjað':
			symbol = ' cloudy';
			break;
		case 'Alskýjað':
			symbol = ' overcast';
			break;
		case 'Lítils háttar rigning':
			symbol = ' lightrain';
			break;
		case 'Rigning':
			symbol = ' rain';
			break;
		case 'Lítils háttar slydda':
			symbol = ' lightsleet';
			break;
		case 'Slydda':
			symbol = ' sleet';
			break;
		case 'Lítils háttar snjókoma':
			symbol = ' lightsnow';
			break;
		case 'Snjókoma':
			symbol = ' snow';
			break;
		case 'Skúrir':
			symbol = ' showers';
			break;
		case 'Slydduél':
			symbol = ' sleetshowers';
			break;
		case 'Snjóél':
			symbol = ' snowshowers';
			break;
		case 'Skýstrókar':
			symbol = ' dustdevil';
			break;
		case 'Moldrok':
			symbol = ' duststorm';
			break;
		case 'Skafrenningur':
			symbol = ' blowingsnow';
			break;
		case 'Þoka':
			symbol = ' fog';
			break;
		case 'Lítils háttar súld':
			symbol = ' lightdrizzle';
			break;
		case 'Súld':
			symbol = ' drizzle';
			break;
		case 'Frostrigning':
			symbol = ' freezingrain';
			break;
		case 'Hagl':
			symbol = ' hail';
			break;
		case 'Lítils háttar þrumuveður':
			symbol = ' lightthunder';
			break;
		case 'Þrumuveður':
			symbol = ' thunder';
			break;
	}
	return symbol;
}