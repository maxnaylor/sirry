// Intention analysis

function analyseIntent(input) {
	var intent = 'unknown';
	var subIntent = '';
	var provider = '';
	var searchItem = '';
	var place = '';
	// What questions
	if(input.match(/^(hvað |hver )/i)) {	
		if(input.match(/(klukkan)/gi)) {
			intent = 'currentTime';
		} else if(input.match(/(gamall|gömul)/gi)) {
			intent = 'ageRequest';
		} else if(input.match(/(í sjónvarpi|\sá RÚV|\sá RÚV 2|á Stöð 2|á SkjáEinum)/gi)) {
			intent = 'tvGuide';		
			// TV provider
			if(input.match(/(RÚV 2)/i)) {
				provider = 'ruv2';
			} else if(input.match(/(RÚV)/i)) {
				provider = 'ruv';
			} else if(input.match(/(Stöð 2)/i)) {
				provider = 'stod2';
			} else if(input.match(/(SkjáEinum)/i)) {
				provider = 'skjar1';
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
		} else if(input.match(/[0-9]\ ?(\+|\–|\-|×|÷|plús|mínus|sinnum|deilt með|)\ ?[0-9]/gi)) {
			intent = 'arithmetic';
			if(input.match(/(\+|plús)/gi)) {
				subIntent = 'addition';
			} else if(input.match(/(\-|–|mínus)/gi)) {
				subIntent = 'subtraction';
			} else if(input.match(/(\*|×|sinnum)/gi)) {
				subIntent = 'multiplication';
			} else if(input.match(/(÷|deilt með)/gi)) {
				subIntent = 'division';
			}
		} else if(input.match(/(á ensku)/gi)) {			
			intent = 'inEnglish';
		} else {			
			intent = 'whatIs';
			var searchItem = input.replace(/(hvað\ er\ |hver\ er\ )/gi, '');		
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
	if(input.match(/^(hvernig )/i)) {
		if(input.match(/(hvernig beygist|hvernig beygi ég|hvernig beygirðu|hvernig beygiru|hvernig beygir maður)/i)) {
			intent = 'declension';
		}
	}
	// Where questions
	if(input.match(/^(hvar )/i)) {
		if(input.match(/(bensín|bensínverð)/gi)) {
			intent = 'petrolPrice';
			//var place = checkPlace(input);
		} else if(input.match(/(hvar er ég)/gi)) {
			intent = 'whereAmI';
		} else {
			intent = 'whereIs';
			var searchItem = input.replace(/(hvar\ er\ )/gi, '');
		}
	}
	// Show imperative
	if(input.match(/^(sýndu )/i)) {
		if(input.match(/(nýtt|helst)? ?(að frétta|frétt|á döfinni)/)) {
			intent = 'getNews';
			subIntent = newsSubIntent(input);			
			provider = newsProvider(input);
		}
	}
	// Return object
	var intentObject = { intent: intent,
					     subIntent: subIntent,
					     provider: provider,
					     searchItem: searchItem,
					     place: place,
		                 rawInput: input };
	return intentObject;
}

function checkPlace(input) {	
	var explodedInput = input.split(' ');
	var $place = '';
	console.log('test');
	$(explodedInput).each(function(index,value) {				
		var thisPlace = value.charAt(0).toUpperCase() + value.slice(1);	
		    thisPlace = decline(thisPlace,'nom');
		if(thisPlace) {				
		    $place = thisPlace;		    
			return $place;
			console.log($place);
		}
	});
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