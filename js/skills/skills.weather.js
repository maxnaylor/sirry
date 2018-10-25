// Skills — Weather

function respondNorthernLights(input) {
	if(input.indexOf('norðurljós') >= 0) {	
		console.log('Interpretation: Request for northern lights forecast');
		respondLoading();
		var xmlSource = 'https://xmlweather.vedur.is/aurora?op=xml&type=index';
		var yqlURL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=xml&callback=?'
	    ].join('');
	    $.getJSON(yqlURL, function(data) {
		    loadingComplete();
	        var xmlContent = $(data.results[0]);
			var todaysForecast = '';
		    var forecastTable = '<div class="card northernLights"><div class="row header"><div class="column activity">Virkni</div><div class="column sunset">Sólsetur</div><div class="column darkness">Myrkur</div></div>';
		    var day = new Date().getDay();
	        var forecastData = $(xmlContent).find('night_data').each(function(index) {
		        if(index==5) { 
					return false; 
				} else {
					if(index==0) { var todaysForecast = $(this).find('activity_forecast').text() }
						forecastTable = forecastTable+'<div class="row"><div class="day">'+formatDay(day)+'</div><div class="strength s'+$(this).find('activity_forecast').text()+'">'+$(this).find('activity_forecast').text()+'</div><div class="sunset">'+$(this).find('sunset').text()+'</div><div class="darkness">'+$(this).find('darkness').text()+' – '+$(this).find('dawn').text()+'</div></div>';
					if(day<6) {
						day++; 
					} else {
						day = 0;
					}
				}
		    });
		    if(forecastData[0]) {
			    forecastTable = forecastTable+'</div><a class="providerLogo vedurstofa" href="http://www.vedur.is/vedur/spar/nordurljos/" target="_new"></a>';
			    if(input.indexOf('í kvöld') >= 0) {
					console.log('Interpretation: Request for tonight’s northern lights forecast');
					var todayChances = '';
					if(todaysForecast>7) {
						todayChances = 'Mjög líklega, en';
					} else if(todaysForecast>3) {
						todayChances = 'Það eru góðar líkur á norðurljósum í kvöld, en';
					} else {
						todayChances = 'Sennilega ekki, en';
					}
					appendOutput({ output: todayChances+' hér er norðurljósaspá fyrir næstu fimm dagana:',
						           outputData: '<br />'+forecastTable });
				} else {
					appendOutput({ output: 'Hér er norðurljósaspá fyrir næstu fimm dagana:',
						           outputData: '<br />'+forecastTable });
				}
			} else {
				appendOutput({ output: 'Mér tókst ekki að sækja nýjustu norðurljósaspána. Prófum aftur seinna.' });
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
					forecastTable = forecastTable+'<div class="row"><div class="forecast">'+forecast+'<br />('+moment(updateTime).fromNow()+')</div></div>';
			    });
				if(forecastData[0]) {
				    forecastTable = forecastTable+'</div><a class="providerLogo vedurstofa" href="http://www.vedur.is/ofanflod/snjoflodaspa/" target="_new"></a>';
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
	var respondWeatherResponse = '';
	if(input.match(/(veður|veðrið)/)) {		
		console.log('Interpretation: Request for weather forecast');
		respondLoading();
		var explodedInput = input.split(' ');
		var $place = '';
		$(explodedInput).each(function(index,value) {				
			var thisPlace = value.charAt(0).toUpperCase() + value.slice(1);	
			    thisPlace = decline(thisPlace,'nom');
			if(thisPlace) {				
			    $place = thisPlace;
				console.log('Interpretation: Request for weather forecast in '+$place);
			}
		});
		retrieveForecast(input,$place);
		return true;
	} 
}

 $.ajaxSetup({
   async: false
 });

function retrieveForecast(input,place) {
	var $textResponse = 'Hér er nýjasta veðurspáin.';
	if(place) {
		var nearestStation = getClosestWeatherStation(place);
		retrieveForecastData(input,nearestStation,place);
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
		var $sunsetTime = {'sunset': '', 'sunrise': ''};
		var xmlSource = 'http://xmlweather.vedur.is/aurora?op=xml&type=index';
		var yqlURL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=xml&callback=?'
	    ].join('');
	    $.getJSON(yqlURL, function(data) {
	        var xmlContent = $(data.results[0]);
	        var $sunsetTime = $(xmlContent).find('night_data').each(function(index) {
		       if(index==0) {
			       $sunsetTime.sunset = $(this).find('sunset').text();
			   }
			   if(index==1) {
			       $sunsetTime.sunrise = $(this).find('sunrise').text();
			   }
			});			
		    return $sunsetTime;
	    });
	}
	function retrieveForecastData(input,nearestStation,place) {	
		if(place==undefined) {
			place = nearestStation.station_name;
		}
		console.log('Seeking forecast from weather station '+nearestStation.station_id+' in '+nearestStation.station_name);	
		var xmlSource = 'http://xmlweather.vedur.is/?op_w=xml&type=forec&lang=is&view=xml&ids='+nearestStation.station_id;
		var yqlURL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=xml&callback=?'
	    ].join('');	
	    $.getJSON(yqlURL, function(data) {						    
			loadingComplete();
			var xmlContent = $(data.results[0]);
		    var latestForecast = '';
		    var forecastTable = '<div class="card weather"><div class="row now"><div class="place">'+place+'</div>';
		    var day = new Date().getDay();
		    var printIndex = 0;
		    var dayIndex   = 1;
		    var dateOffset = 1;
		    var link = $(xmlContent).find('link').text();
	        var forecastData = $(xmlContent).find('forecast').each(function(index) {
				var currentTime  = new Date();
				var currentMonth = currentTime.getMonth()+1;
				var currentHour  = ('0' + currentTime.getHours()).slice(-2);
				var currentTime  = currentTime.getFullYear()+'-'+
								   ('0' + currentMonth).slice(-2)+'-'+
								   ('0' + currentTime.getDate()).slice(-2)+' '+
								   currentHour+':00:00';										
				var forecastTime          = $(this).find('ftime').text();
				var forecastWindSpeed     = $(this).find('F').text();
				var forecastWindDirection = $(this).find('D').text();
				var forecastTemp          = $(this).find('T').text();
				var forecastConditions    = $(this).find('W').text();
				if(index==0) {				
			        //console.log(sunTimes.sunrise);
					forecastTable = forecastTable+'<div class="temp">'+forecastTemp+'° </div></div><div class="row today">'; 
					forecastTable = forecastTable+'<div class="hour"><div class="time">Núna</div><div class="symbol'+retrieveSymbol(forecastConditions)+'" title="'+forecastConditions+'"></div><div class="temp">'+forecastTemp+'°</div></div>';
				}		
				if(forecastTime>currentTime) {
					if(printIndex>=0 && printIndex<5) {
						currentHour = parseFloat(currentHour)+(printIndex+1);
						if(currentHour>23) { currentHour=0+printIndex; }
						currentHour = ('0' + currentHour).slice(-2)
						forecastTable = forecastTable+'<div class="hour"><div class="time">'+currentHour+'</div><div class="symbol'+retrieveSymbol(forecastConditions)+'" title="'+forecastConditions+'"></div><div class="temp">'+forecastTemp+'°</div></div>';
					}
					if(printIndex==7) {
						forecastTable = forecastTable+'</div>';
					}
					if(input.match(/(á morgun|í viku)/)) {
						if(printIndex>7) {		
							if(forecastTime.match(/(12:00:00)/)) {	
								var dayLimit     = 6;							 		
								var currentTime  = new Date();
								var currentDay   = currentTime.getDay()+dayIndex;
								var currentTime  = currentTime.getFullYear()+'-'+
								                   ('0' + currentMonth).slice(-2)+'-'+
							                       ('0' + currentTime.getDate()).slice(-2)+' 12:00:00';	
								if(forecastTime==currentTime && incrementedDate!=currentTime) {
									dateOffset = 0;
									dayLimit = 5;
								}			
								if(dateOffset==1) {
									$textResponse = generateWeatherText(forecastWindSpeed,forecastTemp,forecastConditions);
								}
								console.log(dayLimit);
								if(dateOffset<dayLimit) {		
									var incrementedDate = new Date();				
									    incrementedDate.setDate(incrementedDate.getDate() + dateOffset);																	
									var incrementedMonth = incrementedDate.getMonth()+1;
									    incrementedDate = (incrementedDate.getFullYear()+'-'+
									                      ('0' + incrementedMonth).slice(-2)+'-'+
									                      ('0' + incrementedDate.getDate()).slice(-2)+' 12:00:00');
									
									console.log(incrementedDate+', '+forecastTime+', '+currentTime);
									if(incrementedDate==forecastTime) {
										forecastTable  = forecastTable+'<div class="row"><div class="day">'+formatDay(currentDay)+'</div><div class="symbol'+retrieveSymbol(forecastConditions)+'" title="'+forecastConditions+'"></div><div class="temp">'+forecastTemp+'°</div><div class="windspeed"><span>'+forecastWindDirection+'</span>'+forecastWindSpeed+' m/s</div></div>';											
										if(dayIndex>6) { dayIndex = 0; }
										dayIndex++;
									}
									dateOffset++;
								}
							}
						}
					}
					printIndex++;
				}
			});
			if(forecastData[0]) {
				var forecastTable = forecastTable+'</div><a class="providerLogo vedurstofa" href="'+link+'" target="_new"></a>';
				appendOutput({ output: $textResponse, outputData: '<br />'+forecastTable });	
			}
		});	
	}
}

function generateWeatherText(windspeed,temperature,conditions) {
	console.log('Generating weather text based on these data: F: '+windspeed+', T: '+temperature+', W: '+conditions);
	var weatherText = 'Hér er nýjasta veðurspáin. ';
	if(windspeed>10) {
		weatherText = 'Það verður mikið rok. ';
	}
	if(temperature<0) {
		weatherText = 'Það verður mjög kalt';
	} else if(temperature>=0 && temperature<5) {
		weatherText = 'Það verður kalt';
	} else if(temperature>=5 && temperature<8) {
		weatherText = 'Það verður frekar kalt';
	} else if(temperature>=8 && temperature<15) {
		weatherText = 'Það verður hlýtt';
	} else if(temperature>=15 && temperature<20) {
		weatherText = 'Það verður mjög hlýtt';
	} else if(temperature>=20) {
		weatherText = 'Það verður heitt';
	}
	if(conditions=='Heiðskírt') {
		weatherText = weatherText + ' og heiðskírt. Njóttu sólarinnar';
	} else if(conditions=='Alskýjað') {
		weatherText = weatherText + ' og alskýjað';
	} else if(conditions=='Rigning') {
		weatherText = weatherText + ' og rigning';
	} else if(conditions=='Snjókoma') {
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

function retrieveSymbol(conditions) {
	var symbol = '';
	console.log(conditions);
	switch(conditions) {
		case 'Heiðskírt':
			symbol = ' clear';
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
		case 'Lítils háttar snjókoma':
			symbol = ' lightsnow';
			break;
		case 'Snjókoma':
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