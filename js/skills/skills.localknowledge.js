// Skills - Local knowledge

function respondPetrol(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='petrolPrice') {
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
			    appendOutput({ output: 'Ég get ekki sótt þessar upplýsingar í augnablikinu.' });
		    }
		});
		return true;
	}
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