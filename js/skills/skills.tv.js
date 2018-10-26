// Skills - TV

function respondTV(input) {
	var analysis = analyseIntent(input);
	var response = '';
	var outputString = '';
	if(analysis.intent=='tvGuide') {
		
		if(!analysis.provider || analysis.provider=='ruv') {				
			respondLoading();		
			var channel = {
				name      : "RÚV", 
				shortname : "ruv", 
				url       : "http://www.ruv.is/dagskra"
			};
		} else if(analysis.provider=='stod2') {
			respondLoading();
			var channel = {
				name      : "Stöð 2", 
				shortname : "stod2", 
				feedURL   : "https://api.stod2.is/dagskra/api/stod2",
				url       : "https://stod2.is/dagskra"
			};	
		}
		
		console.log('Interpretation: TV schedule request for '+channel.name);
		
		if(channel.shortname=='ruv') {
		
			$.ajax({
				url: 'proxy.php?u=http://apis.is/tv/'+channel.shortname,
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				type: 'GET',
				success: function(response) {					    
					loadingComplete();
				    var $schedule = '';
				    
				    if(response.results.length>0) {
					    
					    $.each(response, function(i1, v1) {	
						    $schedule += '<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg" /><table>';	
						    var row = 1;	    
							$.each(v1, function(i2, v2) {	
								var startTime = moment(v2.startTime);
								if(row<5) {
									if(startTime>Date.now()) {	
										$schedule += '<tr><td class="time">'+moment(startTime).format('LT')+'</td>'    
										$schedule += '<td>'+v2.title;
										if(v2.originalTitle) {
											$schedule += '<span>'+v2.originalTitle+'</span>';
										}
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
					    });
					    
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
			
		} else if(analysis.provider=='ruv2') {
			
			var outputString = 'Ég get ekki sótt dagskrá fyrir RÚV 2 enn sem komið er.';
			appendOutput({ output: outputString });
			
		} else if(analysis.provider=='stod2') {
			
			stod2Schedule(channel);			
			
		} else if(analysis.provider=='skjar1') {
			var outputString = 'Ég get ekki sótt dagskrá fyrir SkjáEinn enn sem komið er.';			
			appendOutput({ output: outputString });
		}
		
		return true;
	}
	
}

function stod2Schedule(channel) {
	
	var yql = URL = [
        'https://query.yahooapis.com/v1/public/yql',
        '?q=' + encodeURIComponent("select * from json where url='"+channel.feedURL+ "'"),
        '&format=json&callback=?'
    ].join('');	
    
	var request = $.ajax({
		dataType: 'jsonp',
		url: yql,
		type: 'GET',
		success: function(response) {
			loadingComplete();
			console.log(response);
			
			var $schedule = '';			    
		    var scheduleData = response.query.results.json.json;
		    
		    console.log(scheduleData);
		    
		    if(scheduleData.length>0) {
			    
			    $schedule += '<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg" /><table>';	
			    var row = 1;	    
				$.each(scheduleData, function(i, v) {						
					if(row<5) {
						var startTime = moment(v.upphaf);
						if(startTime>Date.now()) {	
							$schedule += '<tr><td class="time">'+moment(startTime).format('LT')+'</td>'    
							$schedule += '<td>'+v.isltitill;
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
	
}