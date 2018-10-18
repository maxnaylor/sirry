// Skills - Local knowledge

function respondTV(input) {
	var respondWhatIsResponse = '';
	if(input.match(/(sjónvarp)/i)) {
		console.log('Interpretation: TV schedule request');
		respondLoading();
		var channel = {
			name      : "RÚV", 
			shortname : "ruv", 
			url       : "http://www.ruv.is/dagskra"
		};
		$.ajax({
			url: 'proxy.php?u=http://apis.is/tv/'+channel.shortname,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: 'GET',
			success: function(response) {					    
				loadingComplete();
			    var $schedule = '';
			    $.each(response, function(i1, v1) {	
				    $schedule = $schedule+'<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg"><table>';	
				    var row = 1;	    
					$.each(v1, function(i2, v2) {	
						var startTime = moment(v2.startTime);
						if(row<5) {
							if(startTime>Date.now()) {	
								$schedule = $schedule+'<tr><td class="time">'+moment(startTime).format('LT')+'</td>'    
								$schedule = $schedule+'<td>'+v2.title;
								if(v2.originalTitle) {
									$schedule = $schedule+'<span>'+v2.originalTitle+'</span>';
								}
								$schedule = $schedule+'</td></tr>';
								row++;
							}
						}
				    });
					$schedule = $schedule+'</table>';
					if(row>4) {
						$schedule = $schedule+'<a class="moreinfo" href="'+channel.url+'">Nánar…</a>';
					}
				    $schedule = $schedule+'</div>';
			    });
				appendOutput({ output: 'Þetta er dagskráin á '+channel.name+' í dag:<br />'+$schedule, 
					           outputPhrase: 'Þetta er dagskráin á '+channel.name+' í dag:' });
			},
			error: function(error) {		    
			    loadingComplete();
			    appendOutput({ output: 'Ég get sótt þessar upplýsingar í augnablikinu.' });
		    }
		});
		return true;
	}
}

function respondPetrol(input) {
	var respondWhatIsResponse = '';
	if(input.match(/(bensín|bensínverð)/i)) {
		console.log('Interpretation: Request for petrol prices');
		respondLoading();
		$.ajax({
			url: 'proxy.php?u=http://apis.is/petrol/',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: 'GET',
			success: function(response) {					    
				loadingComplete();
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {			
						var userLat  = position.coords.latitude;
						var userLon  = position.coords.longitude;	
						var nearestStation = getClosestWeatherStation(userLat+','+userLon);
						if((userLat>66.7 || userLat<63.1) || (userLon>-12.4 || userLon<-25)) {
							loadingComplete();
							console.log('User outside of Iceland');
							appendOutput({ output: 'Ég get einungis flett upp bensínverðum á Íslandi.' });	
						} else {
							retrieveForecastData(input,nearestStation);
						}	
					}, locationError);
				} else {					
					loadingComplete();
					appendOutput({ output: 'Ég veit ekki hvar þú ert.' });
				}
				var $prices = '';
				console.log(response.results);	
				response.results.sort(dynamicSort('bensin95'));
			    $prices = $prices+'<div class="card petrol"><table>';
			    $prices = $prices+'<tr><th>Bensín 95<th>Dísel</th><th>&nbsp;</th></tr>';	    
				$.each(response.results, function(i2, v2) {	
					var latDistance = diff(v2.geo.lat,userLat);
					var lonDistance = diff(v2.geo.lon,userLon);
					if(latDistance<0.01 && lonDistance <0.01) {
						$prices = $prices+'<tr><td class="petrol">'+reformatNumber(v2.bensin95)+'</td>';
						$prices = $prices+'<td class="diesel">'+reformatNumber(v2.diesel)+'</td>';
						$prices = $prices+'<td>'+v2.company+'<br />';
						$prices = $prices+'<span>'+v2.name+'</span></td></tr>';
						console.log(latDistance+','+lonDistance);
					}
			    });
				$prices = $prices+'</table>';
			    $prices = $prices+'</div>';
				appendOutput({ output: 'Þetta eru lægstu bensínverðin í nágrenninu:<br />'+$prices,
					           outputPhrase: 'Þetta eru lægstu bensínverðin í nágrenninu:' });
			},
			error: function(error) {		    
			    loadingComplete();
			    appendOutput({ output: 'Ég get sótt þessar upplýsingar í augnablikinu.' });
		    }
		});
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

function respondCompanyLookup(input) {
	var respondWhatIsResponse = '';
	if(input.match(/(hvað|hver) er kennitala ?(hjá) /i)) {
		console.log('Interpretation: TV schedule request');
	}
}