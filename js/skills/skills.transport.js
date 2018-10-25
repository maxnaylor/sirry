// Skills — Transport


function respondBus(input) {
	var respondBusResponse = '';
	if(input.indexOf('strætó') >= 0) {
		console.log('Interpretation: Find bus information');
		respondLoading();
		findNearestStop();
		return true;	
	}
}

var timetable = new Array();

function cacheTimetableData() {
	$.ajax( {
	    type: 'GET',			
	    url: 'bin/data/straeto/stop_times.txt',
	    timeout: 1000,
	    success: function(data) {
		    loadingComplete();
		    var data = data.split(/\r\n/);
		    var l    = data.length;
		    for (var i=0;i<l; i++) {
		    	var timetableData = new Array();
			    if(i!=0) {
			    	console.log('Timetable data parsed and appended to array');
				    timetableData = data[i].split(',');
				    timetable.push({'trip_id' : timetableData[0], 'arrival_time' : timetableData[1], 'departure_time' : timetableData[2], 'stop_id' : timetableData[3], 'stop_sequence' : timetableData[4]});
			    }								    
		    }
		    console.log('Timetable data cached');
		},
	    error: function(error) {
		    appendOutput({output: 'Ekki tókst að sækja tímatöflur.' });
	    }	    
	});	
	return timetable;
}

function findNearestStop() {
	var stops = new Array();
	$.ajax( {
	    type: 'GET',			
	    url: 'bin/data/straeto/stops.txt',
	    timeout: 1000,
	    success: function(data) {
		    loadingComplete();
		    var data = data.split(/\r\n/);
		    alert(data[0]);
		    $(data).each(function(index,value) {
		    	var stopData = new Array();
			    if(index!=0) {
			    	console.log('Stop data parsed and appended to array');
				    stopData = value.split(',');
				    stops.push({'stop_id' : stopData[0], 'stop_code' : stopData[1], 'stop_name' : stopData[2], 'stop_lat' : stopData[3], 'stop_lon' : stopData[4], 'location_type' : stopData[5]});
			    }
		    });	
		    if(stops!='') {		
			    if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {				
						var nearestStop = {'stop_id' :'', 'stop_code' : '', 'stop_name' : '', 'stop_lat' : '', 'stop_lon' : '', 'location_type' : ''};
						var userLat  = position.coords.latitude;
						var userLon  = position.coords.longitude;
						$(stops).each(function(index,value) {
					    	console.log('Current distance appended to stop array');
							var distance = getDistanceFromLatLonInKm(userLat,userLon,value.stop_lat,value.stop_lon);
							value.distance = distance;
						});
						function sortByDistance(a,b){
							var aDistance = a.distance;
							var bDistance = b.distance; 
							return ((aDistance < bDistance) ? -1 : ((aDistance > bDistance) ? 1 : 0));
						}
						stops.sort(sortByDistance);
						nearestStop.stop_id       = stops[0].stop_id;
						nearestStop.stop_code     = stops[0].stop_code;
						nearestStop.stop_name     = stops[0].stop_name;
						nearestStop.stop_lat      = stops[0].stop_lat;
						nearestStop.stop_lon      = stops[0].stop_lon;
						nearestStop.location_type = stops[0].location_type;
						nearestStop.distance      = stops[0].distance;			
						appendOutput({ output: 'Næsta stoppistöðin er '+nearestStop.stop_name, 
							           outputData: '('+formatDistance(nearestStop.distance)+').<br /><a class="providerLogo straeto" href="http://www.straeto.is/" target="_new"></a><div class="card bus"><div class="row"><div class="route">1</div><div class="arrival">3<span class="minutes"> mín.</span></div></div><div class="row"><div class="route">57</div><div class="arrival">3<span class="minutes"> mín.</span></div></div></div></div>' });						
					    /* function filterStop(value) {
						    return value.stop_id = nearestStop.stop_id;
					    }
					    var timetable = cacheTimetableData();
					    var stopTimetable = timetable.filter(filterStop);
					    appendOutput({ output: 'Loaded timetable data: '+stopTimetable[0].arrival_time }); */			
					}, locationError);
				} else {
					appendOutput({ output: 'Ég veit ekki hvar þú ert.' });
				}			
			} else {
				appendOutput({ output: 'Ég get ekki leitað að upplýsingum um strætó eins og er.' });
				nearestStop = false;
			}
	    },
	    error: function(error) {		    
		    loadingComplete();
		    appendOutput({ output: 'Ég get ekki leitað að upplýsingum um strætó eins og er.' });
	    }
	});
}

function formatDistance(distance) {
	distance = Math.round((distance + 0.00001) * 100) / 100;
	distance = distance+' km';
	distance = distance.replace('.',',');
	return distance;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}