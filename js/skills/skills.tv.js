// Skills - TV

function respondTV(input) {
	var analysis = analyseIntent(input);
	var response = '';
	var outputString = '';
	if(analysis.intent=='tvGuide') {
		
		if(analysis.provider=='') {
			analysis.provider = 'ruv';
		}
		
		if(analysis.provider=='ruv') {				
			respondLoading();		
			var channel = {
				name      : "RÚV", 
				shortname : "ruv", 
				feedURL   : "http://muninn.ruv.is/files/xml/ruv/",
				url       : "http://www.ruv.is/dagskra",
				watchURL  : "http://www.ruv.is/sjonvarp/beint?channel=ruv"
			};
		} else if(analysis.provider=='ruv2') {				
			respondLoading();		
			var channel = {
				name      : "RÚV 2", 
				shortname : "ruv2", 
				feedURL   : "http://muninn.ruv.is/files/xml/ruv2/",
				url       : "http://www.ruv.is/dagskra/ruvithrottir",
				watchURL  : "http://www.ruv.is/sjonvarp/beint?channel=ruv2"
			};
		} else if(analysis.provider=='stod2') {
			respondLoading();
			var channel = {
				name      : "Stöð 2", 
				shortname : "stod2", 
				feedURL   : "https://api.stod2.is/dagskra/api/stod2",
				url       : "https://stod2.is/dagskra",
				watchURL  : "https://sjonvarp.stod2.is/live/96"
			};	
		} else if(analysis.provider=='stod2bio') {
			respondLoading();
			var channel = {
				name      : "Stöð 2 Bíó", 
				shortname : "stod2bio", 
				feedURL   : "https://api.stod2.is/dagskra/api/bio",
				url       : "https://stod2.is/dagskra",
				watchURL  : "https://sjonvarp.stod2.is/live/15"
			};	
		} else if(analysis.provider=='stod2sport') {
			respondLoading();
			var channel = {
				name      : "Stöð 2 Sport", 
				shortname : "stod2sport", 
				feedURL   : "https://api.stod2.is/dagskra/api/sport",
				url       : "https://stod2.is/dagskra",
				watchURL  : "https://sjonvarp.stod2.is/live/100"
			};	
		} else if(analysis.provider=='stod3') {
			respondLoading();
			var channel = {
				name      : "Stöð 3", 
				shortname : "stod3", 
				feedURL   : "https://api.stod2.is/dagskra/api/stod3",
				url       : "https://stod2.is/dagskra",
				watchURL  : "https://sjonvarp.stod2.is/live/107"
			};	
		} 
		
		console.log('Interpretation: TV schedule request for '+analysis.provider);
		
		if(analysis.provider=='ruv' || analysis.provider=='ruv2') {
			
			console.log(channel.feedURL);
		
			$.ajax({ 
				dataType: 'json',
				url: 'proxy.php?url='+channel.feedURL,
				success: function(response) {	
									    
					loadingComplete();
				    var $schedule = '';			    
				    var scheduleData = response.service;
				    
				    if(scheduleData) {
					    
					    $schedule += '<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg" /><table>';
					    if(channel.watchURL) { $schedule += '<a class="watch" href="'+channel.watchURL+'" target="_new" title="Horfa á '+channel.name+'">▶︎ Horfa</a>';	}
						$schedule += '<table>';
							   
						var row=1;
						for(i=0; i<scheduleData.event.length; i++) {
							if(row<=4) {
								var startTime = moment(scheduleData.event[i]['@attributes']['start-time']);
								if(startTime>Date.now()) {	
									$schedule += '<tr><td class="time">'+moment(startTime).format('LT')+'</td>'    
									$schedule += '<td>'+scheduleData.event[i].title;
									if(!jQuery.isEmptyObject(scheduleData.event[i]['original-title'])) {
										$schedule += '<span>'+scheduleData.event[i]['original-title']+'</span>';
									}
									$schedule += '</td></tr>';
									row++;
								}
							}
					    }
					    
						$schedule += '</table>';
						
						if(row>4) {
							$schedule += '<a class="moreinfo" href="'+channel.url+'" target="_new">Nánar…</a>';
						}
						
						if(row==1) {
							$schedule += '<table><tr><td class="noschedule">Enginn dagskrárliður</td></tr></table>';
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
					console.log(response);		    
				    loadingComplete();
				    appendOutput({ output: 'Ég get ekki sótt þessar upplýsingar í augnablikinu.' });
			    }
			});
			
		} else if(analysis.provider=='stod2' || analysis.provider=='stod2bio' || analysis.provider=='stod2sport' || analysis.provider=='stod3') {
			
			stod2Schedule(channel);			
			
		} else if(analysis.provider=='n4') {
			
			var outputString = 'Ég get ekki sótt dagskrána fyrir N4 enn sem komið er.';			
			appendOutput({ output: outputString });
			
		} else if(analysis.provider=='skjar1') {
			
			var outputString = 'Ég get ekki sótt dagskrána fyrir SkjáEinn enn sem komið er.';			
			appendOutput({ output: outputString });
			
		}
		
		return true;
	}
	
}

function stod2Schedule(channel) {
	
	$.ajax({ 
		dataType: 'json',
		url: 'proxy.php?url='+channel.feedURL,
		success: function(response) {
			
			loadingComplete();
			
			var $schedule = '';			    
		    var scheduleData = response;
		    
		    if(scheduleData.length>0) {
			    
			    $schedule += '<div class="card tvguide"><img class="provider" src="images/provider_'+channel.shortname+'.svg" />';
				if(channel.watchURL) { $schedule += '<a class="watch" href="'+channel.watchURL+'" target="_new" title="Horfa á '+channel.name+' (krefst áskriftar)">▶︎ Horfa <span class="premium">kr.<span></a>';	}
				$schedule += '<table>';
						    	
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
					$schedule += '<table><tr><td class="noschedule">Enginn dagskrárliður</td></tr></table>';
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