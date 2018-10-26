// Skills - Radio

function respondRadio(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='radioSchedule') {
		
		if(!analysis.provider || analysis.provider=='ras1') {				
			respondLoading();		
			var channel = {
				name      : "Rás 1", 
				shortname : "ras1", 
				url       : "http://muninn.ruv.is/files/xml/ras1/"
			};
		} else if(analysis.provider=='ras2') {
			respondLoading();
			var channel = {
				name      : "Rás 2", 
				shortname : "ras2", 
				url       : "http://muninn.ruv.is/files/xml/ras2/"
			};	
		}
		
		console.log('Interpretation: Radio schedule request for '+channel.name);
		
		var yql = URL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select service from xml where url='"+channel.url+ "'"),
	        '&format=json&callback=?'
	    ].join('');	
	    
		var request = $.ajax({
			dataType: 'jsonp',
			url: yql,
			type: 'GET',
			success: function(response) {
				
				loadingComplete()
				var $schedule = '';			    
			    var scheduleData = response.query.results.schedule.service.event;
			    
			    console.log(scheduleData);
			    
			    if(scheduleData.length>0) {
				    
				    $schedule += '<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg" /><table>';	
				    var row = 1;	    
					$.each(scheduleData, function(i, v) {						
						if(row<5) {
							var startTime = moment(v['start-time']);
							if(startTime>Date.now()) {	
								$schedule += '<tr><td class="time">'+moment(startTime).format('LT')+'</td>'    
								$schedule += '<td>'+v.title;
								$schedule += '</td></tr>';
								row++;
							}
						}
				    });
					$schedule += '</table>';
					if(row>4) {
						$schedule += '<a class="moreinfo" href="'+channel.url+'" target="_new">Nánar…</a>';
					}
					if(row==1) {
						$schedule += '<table><tr><td class="noschedule">Engin dagskrá</td></tr></table>';
					}
				    $schedule += '</div>';
				    
				    var d = new Date();
				    if(d.getHours()>17) {
					    var timePhrase = 'í kvöld';
				    } else {
					    var timePhrase = 'í dag';
				    }
				    
					appendOutput({ output: 'Þetta er dagskráin á '+channel.name+' '+timePhrase+':<br />',
								   outputData: $schedule, 
						           outputPhrase: 'Þetta er dagskráin á '+channel.name+' í dag:' });
						           
			    } else {
				    
				    appendOutput({ output: 'Ég get ekki sótt þessar upplýsingar í augnablikinu.' });
				    
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