// Intention analysis

function analyseIntent(input) {
	var intent = 'unknown';
	var subIntent = '';
	var provider = '';
	var searchItem = '';
	var place = '';
	var time = '';
	var conversionRegex = new RegExp('^(hve|hversu|hvað)? ?([\\S ]+)?('+unitsData+') ([\\S ]+)?('+unitsData+')','gi');
	// What/who questions
	if(input.match(/^(hvað |hver )?/i)) {	
		if(input.match(/(klukkan)/gi)) {
			intent = 'currentTime';
			var place = checkPlace(input);
		} else if(input.match(/(gamall|gömul)/gi)) {
			intent = 'ageRequest';
		} else if(input.match(/(dagskrá|sjónvarp|í sjónvarpi|á\s(RÚV|RÚV 2|Stöð 2 Sport|Stöð 2 Bíó|Stöð 2|Stöð 3|N4|SkjáEinum))/gi)) {
			intent = 'tvGuide';		
			// TV provider
			if(input.match(/(RÚV 2)/i)) {
				provider = 'ruv2';
			} else if(input.match(/(RÚV)/i)) {
				provider = 'ruv';
			} else if(input.match(/(Stöð 2 Bíó)/i)) {
				provider = 'stod2bio';
			} else if(input.match(/(Stöð 2 Sport)/i)) {
				provider = 'stod2sport';
			} else if(input.match(/(Stöð 2)/i)) {
				provider = 'stod2';
			} else if(input.match(/(Stöð 3)/i)) {
				provider = 'stod3';
			} else if(input.match(/(N4)/i)) {
				provider = 'n4';
			} else if(input.match(/(SkjáEinum)/i)) {
				provider = 'skjar1';
			}
		} else if(input.match(/(útvarp|í útvarpi|á\s(Rás 1|Rás 2))/gi)) {
			intent = 'radioSchedule';		
			// Radio provider
			if(input.match(/(Rás 1)/i)) {
				provider = 'ras1';
			} else if(input.match(/(Rás 2)/i)) {
				provider = 'ras2';
			}
		} else if(input.match(/(nýtt|helst)? ?(að frétta|frétt|á döfinni)/)) {
			intent = 'getNews';
			subIntent = newsSubIntent(input);			
			provider = newsProvider(input);
		} else if(input.match(/(bensín|bensínverð)/gi)) {
			intent = 'petrolPrice';
		} else if(input.match(/(kennitala)/gi)) {
			intent = 'companyLookup';
			var searchItem = input.replace(/(hvað\ er\ |hver\ er\ )kennitala\ /gi, '');				
		} else if(input.match(/([0-9]+)? ?(\+|\–|\-|×|÷|plús|mínus|sinnum|deilt með|ferningsrót af|kvaðratrót af) ?[0-9]+/gi)) {
			intent = 'arithmetic';
			if(input.match(/(\+|plús)/gi)) {
				subIntent = 'addition';
			} else if(input.match(/(\-|–|mínus)/gi)) {
				subIntent = 'subtraction';
			} else if(input.match(/(\*|×|sinnum)/gi)) {
				subIntent = 'multiplication';
			} else if(input.match(/(÷|deilt með)/gi)) {
				subIntent = 'division';
			} else if(input.match(/(ferningsrót|kvaðratrót)/gi)) {
				subIntent = 'squareroot';
			}
		} else if(input.match(conversionRegex)) {
			intent = 'conversion';
		} else if(input.match(/(á ensku)/gi)) {			
			intent = 'inEnglish';
		} else if(input.match(/(segir(ð)?u|segir þú|segist)/gi)) {			
			intent = 'howAreYou';
		} else if(input.match(/(liggur þér á hjarta)/gi)) {			
			intent = 'whatsOnMind';
		} else if(input.match(/(hvað|hver) (ertu|ert þú)/gi)) {			
			intent = 'whoAreYou';
		} else if(input.match(/(getur(ð)?u|getur þú)/gi)) {			
			intent = 'canYou';
		} else if(input.match(/(getur(ð)?u|getur þú)/gi)) {			
			intent = 'canYou';
		} else {			
			if(input.match(/^(hver|hvað) (er) (?!(ég))/i)) {
				intent = 'whatIs';
				var searchItem = input.replace(/(hvað\ er\ |hver\ er\ )/gi, '');	
			}	
		}
	}
	// Which questions
	if(input.match(/^(hvaða )/i)) {
		if(input.match(/(dagur er í dag)/gi)) {
			intent = 'currentDay';
		} else if(input.match(/(dagur (verður|er) á morgun)/gi)) {
			intent = 'previousDay';
		} else if(input.match(/(dagur var í gær)/gi)) {
			intent = 'nextDay';
		} else if(input.match(/(ár er það)/gi)) {
			intent = 'currentYear';
		} else if(input.match(/(dagur var)? (fyrir [0-9]+ dögum)?/gi)) {
			intent = 'whichDayAgo';
		} else if(input.match(/(ár var)? (fyrir [0-9]+ árum)?/gi)) {
			intent = 'whichYearAgo';
		}
	}
	// How questions
	if(input.match(/^(hvernig )?/i)) {
		if(input.match(/(hvernig beygist|hvernig beygi ég|hvernig beygirðu|hvernig beygiru|hvernig beygir maður)/i)) {
			intent = 'declension';
		} else if(input.match(/(rignir|snjóar|birtir\stil|veður|veðrið)/i)) {
			intent = 'weather';
			var place = checkPlace(input);
			var time = checkTime(input);
		} else if(input.match(/(líður þér)/gi)) {			
			intent = 'howDoFeel';
		} 
	}
	// Where questions
	if(input.match(/^(hvar )?/i)) {
		if(input.match(/(bensín|bensínverð)/i)) {
			intent = 'petrolPrice';
			var place = checkPlace(input);
		} else if(input.match(/(hvar er ég)/gi)) {
			intent = 'whereAmI';
		} else {
			if(input.match(/^(hvar )/i)) {
			intent = 'whereIs';
				var searchItem = input.replace(/(hvar\ er\ )/gi, '');
			}
		}
	}
	// Is questions
	if(input.match(/^(er |eru |verður |verða )?/i)) {
		if(input.match(/(fært|opi(ð|n|nn))/gi)) {			
			var place = checkRoad(input);
			    place = decline(place,'nom');
			if(place) {
				intent = 'roadConditions';
			}
		} else if(input.match(/(norðurljós)/gi)) {			
			intent = 'northernLights';
			var time = checkTime(input);
		}
	}
	// Imperatives
	if(input.match(/^(sýndu )/i)) {
		if(input.match(/(nýtt|helst)? ?(að frétta|frétt|á döfinni)/i)) {
			intent = 'getNews';
			subIntent = newsSubIntent(input);			
			provider = newsProvider(input);
		}
	} else if(input.match(/^(spilaðu )/i)) {
		intent = 'playMedia';
	} else if(input.match(/^(segðu|kanntu) ([\S ]+)?(brandara|djók|grín)/i)) {
		intent = 'tellJoke';
	}
	// Return object
	var intentObject = { intent: intent,
					     subIntent: subIntent,
					     provider: provider,
					     searchItem: searchItem,
					     place: place,
					     time: time,
		                 rawInput: input };
	return intentObject;
}

function checkRoad(input) {
	var explodedInput = input.split(' ');
	var road = '';
	for (i=0; i<explodedInput.length; i++) {
		if(explodedInput[i].match(/(vegur|eg|vegi|göng|göngum|braut|leið|heiði)$/gi)) {
			road = explodedInput[i];
			road = road.charAt(0).toUpperCase()+road.slice(1);
		}
	}
	return road;
}

function checkPlace(input) {	
	var place = '';
	var timePhrases = 'dag|gær|kvöld|nótt|morgun|fyrradag|fyrramálið|fyrra|vikunni|(mánu|þriðju|miðviku|fimmtu|föstu|laugar|sunnu)dag(inn)?|næstu\\sdögum';
	var regex = new RegExp('(á|í)\\s(?!'+timePhrases+')[a-záðéíóúýþæö -]+','gi');
	var getPlace = input.match(regex);
	if(getPlace) {
		placeArray = [];
		var thisPlace = getPlace[0].replace(/(á|í)\s/gi, '');
			if(!thisPlace.match(/(klakanum|borginni)/i)) {
				thisPlace = thisPlace.charAt(0).toUpperCase()+thisPlace.slice(1);
			}		    
		    thisPlace = decline(thisPlace,'nom');
		var placeMatch = new RegExp('^('+thisPlace+')$','gi');
		for(j=0; j<allPlaceData.length; j++) {
			var thisPlaceName = allPlaceData[j].placeName;
			// Check countries and major cities
			if(thisPlaceName instanceof Array) {
				for(l=0; l<thisPlaceName.length; l++) {
					if(thisPlaceName[l].match(placeMatch)) {
						placeArray.push(allPlaceData[j]);
					}
				}
			} else {
				if(thisPlaceName.match(placeMatch)) {
					placeArray.push(allPlaceData[j]);
				}
			}
			// Check capital cities
			if(placeArray.length==0) {
				if(allPlaceData[j].capital) {
					var thisCapitalName = allPlaceData[j].capital.placeName;
					if(thisCapitalName instanceof Array) {
						for(l=0; l<thisCapitalName.length; l++) {
							if(thisCapitalName[l].match(placeMatch)) {
								placeArray.push(allPlaceData[j]);
							}
						}
					} else {
						if(allPlaceData[j].capital.placeName.match(placeMatch)) {
							placeArray.push(allPlaceData[j]);
						}
					}
				}
			}
		}
		place = placeArray[0];
		if(!place) {
			place = { 'error': 1, 'placeInput': getPlace[0].replace(/(á|í)\s/gi, '') };
		}
	}
	return place;
}

function checkTime(input) {
	var time = ''
	if(input.match(/(í dag)/i)) {
		var time = 'today';
	}
	if(input.match(/(í gær)/i)) {
		var time = 'yesterday';
	}
	if(input.match(/(á morgun)/i)) {
		var time = 'tomorrow';
	}
	if(input.match(/(í morgun)/i)) {
		var time = 'thisMorning';
	}
	if(input.match(/(í kvöld)/i)) {
		var time = 'thisEvening';
	}
	if(input.match(/(í nótt)/i)) {
		var time = 'tonight';
	}
	if(input.match(/(í fyrradag)/i)) {
		var time = 'dayBeforeYesterday';
	}
	if(input.match(/(í fyrramálið)/i)) {
		var time = 'tomorrowMorning';
	}
	if(input.match(/(annað kvöld)/i)) {
		var time = 'tomorrowEvening';
	}
	if(input.match(/(í vikunni)/i)) {
		var time = 'thisWeek';
	}
	return time;
}


// News

function newsSubIntent(input) {
	var subIntent = '';
	if(input.match(/(hérlendis|innlendar|Ísland)/i)) {
		subIntent = 'icelandic';
	} else if(input.match(/(erlendis|erlendar)/i)) {
		subIntent = 'foreign';
	} else if(input.match(/(íþrótt)/i)) {
		subIntent = 'sport';
	}
	return subIntent;
}

function newsProvider(input) {	
	var provider = '';
	if(input.match(/(RÚV|Ríkisútvarp)/i)) {
		provider = 'ruv';
	} else if(input.match(/(Morgunblað|mbl|Mogganum)/i)) {
		provider = 'mbl';
	} else if(input.match(/(Vísi|Fréttablað)/i)) {
		provider = 'visir';
	} else if(input.match(/(Stundin)/i)) {
		provider = 'stundin';
	} else if(input.match(/(DV)/i)) {
		provider = 'dv';
	} else if(input.match(/(Kjarnanum)/i)) {
		provider = 'kjarninn';
	} else if(input.match(/(Eyjunni)/i)) {
		provider = 'eyjan';
	}
	return provider;
}