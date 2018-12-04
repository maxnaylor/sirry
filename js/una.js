// Initialisation

$(document).ready(function() {
	// Compatibility checks
	checkAWSCompatible();
	if(navigator.cookieEnabled) {
		if(!$.cookie('onboarded')) { showOnboarding(); }
	} else {
		cookieWarning();
		throw new Error('Cookies disabled');
	}
	// Preload images
	preload(['images/speech_off.svg', 'images/speech_on.svg']);	
	// Input field
	$('#input').focus();
	$('#input').keyup(function(event) {	
		if(event.keyCode == 13) { // Enter
			parseInput();
		}
	});
	// Intialise help text
	$('#helpbutton').off().click(function(event) {
		showCommands();
	});
	$('#helpcommands .close').off().click(function(event) {
		hideCommands();
	});
	$('#helpcommands li a').off().click(function(event) {
		issueCommand(this);
	});
	//Dates
	moment.locale('is'); 
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').hide();
    });
}


// Cookie check

if(navigator.cookieEnabled) {
	var nameElement = '';
	if($.cookie('userInfoName')) { var nameElement = ', '+$.cookie('userInfoName'); }	
	var speechActivated = true;
	if(!$.cookie('speechActivated')) { $.cookie('speechActivated', 1, { expires: 365 }); }	
	var voiceID = 'Dora';
	if(!$.cookie('voiceID')) { $.cookie('voiceID', voiceID, { expires: 365 }); }
} else {	
	cookieWarning();	
}

function cookieWarning() {
	$('#cookieWarning').show();
}


// Check internet connection

Offline.on('down', function() {
	throw new Error('No internet connection');
	loadingComplete();
	appendOutput({ output: 'Þú virðist hafa misst nettengingu þína. Ég þarf að vera tengd netinu til að geta svarað spurningum.' });
});


// Onboarding

function showOnboarding() {
	$('#onboarding').show();
}

function hideOnboarding() {
	$.cookie('onboarded', 1, { expires: 365 });
	$('#onboarding').hide();
	$('#input').focus();
}


// Help

function showCommands() {
	$('#helpcommands').removeClass().addClass('visible');
	$('#helptext').hide();
}

function hideCommands() {
	$('#helpcommands').removeClass();
	$('#helptext').show();
	$('#timer').removeClass();
	$('#input').focus();
}

function issueCommand(link) {
	var command = $(link).html();
	var command = command.replace(/(„|“)/gi, '');
	$('#input').val(command);
	parseInput();
	$('#input').focus();
}


// Speech engine

function initiateAWS() {
    var awsCredentials = new AWS.Credentials($AWSKey, $AWSSecretKey);
    var settings = {
        awsCredentials: awsCredentials,
        awsRegion: "us-west-2",
        pollyVoiceId: $.cookie('voiceID'),
        cacheSpeech: false
    }
    var kathy = ChattyKathy(settings);
    return kathy;
}

function checkAWSCompatible() {
	if(/Chrome/i.test(navigator.userAgent) ) {
		console.log('AWS enabled');
		activateSpeech();
	} else {
		console.warn('Not AWS compatible');
		deactivateSpeech();
		speechNotCompatible();
	}
}

function activateSpeech() {
	if(!$('#speechbutton').hasClass('disabled')) {
		$.cookie('speechActivated',1);
		$('#speechbutton span').removeClass();
		$('#input').focus();
		$('#speechbutton').removeClass().addClass('speech on');
		$('#speechbutton').html('<span>Kveikt á upplestri</span>');	
		$('#speechbutton span').addClass('fadeout');
		$('#speechbutton').off().click(function() {
			deactivateSpeech();
		});		
	}
}

function deactivateSpeech() {	
	if(!$('#speechbutton').hasClass('disabled')) {
		$.cookie('speechActivated',0);
		$('#speechbutton span').removeClass();
		$('#input').focus();
		$('#speechbutton').removeClass().addClass('speech off');
		$('#speechbutton').html('<span>Slökkt á upplestri</span>');	
		$('#speechbutton span').addClass('fadeout');
		$('#speechbutton').off().click(function() {
			activateSpeech();
		});
	}
}

function speechNotCompatible() {	
	$('#speechbutton').addClass('disabled').off().mouseenter(function() {
		$('#notification').addClass('visible');
	}).mouseleave(function() {
		$('#notification').removeClass();
	});
}


// Parsing

var unsuccessfulResponses = 0;
var $unknownInput = false;

function parseInput() {	
	var input = $('#input').val();
	input = correctSpelling(input);
	input = input.replace(/[.?]$/g,'');	
	if(input) {
		// Find intent
		var analysis = analyseIntent(input);
		console.log(analysis);
		if(analysis) {
			appendInput(input);		
			input = input.replace(/^(en |og )/i,'');
			var response = '';
			// Passive responses
			response = respondGreeting(input);
			if(!response) { response = respondGoodBye(input); }
			if(!response) { response = respondHowAreYou(input); }
			if(!response) { response = respondSmallTalk(input); }
			if(!response) { response = respondThanks(input); }
			if(!response) { response = respondAmI(input); }
			if(!response) { response = respondIntroductions(input); }
			if(!response) { response = respondSwearWords(input); }
			if(!response) { response = respondTime(input); }
			if(!response) { response = respondStopwatch(input); }
			if(!response) { response = respondCountdown(input); }
			if(!response) { response = respondRandomNumber(input); }
			// Active responses
			if(!response) { response = respondArithmetic(input); }
			if(!response) { response = respondTV(input); }
			if(!response) { response = respondRadio(input); }
			if(!response) { response = respondRoadConditions(input); }
			if(!response) { response = respondCompanyLookup(input); }
			if(!response) { response = respondNews(input); }
			if(!response) { response = respondWhatIs(input); }
			if(!response) { response = respondWhatHappened(input); }
			if(!response) { response = respondBio(input); }
			if(!response) { response = respondIAm(input); }
			if(!response) { response = respondLocation(input); }
			if(!response) { response = respondNorthernLights(input); }
			if(!response) { response = respondAvalancheWarning(input); }
			if(!response) { response = respondWeather(input); }		
			if(!response) { response = respondCurrencyConversion(input); }	
			if(!response) { response = respondBus(input); }	
			if(!response) { response = respondTranslation(input); }
			if(!response) { response = respondDeclension(input); }
			if(!response) { response = respondPetrol(input); }
			// Preferences
			if(!response) { response = respondSetVoice(input); }
		}
		// Unknown response 
		if(!response) {
			response = respondUnknown();
		}
		if(response!=true) { appendOutput({ output: response }) };
		
	}
}

var s = 1;

function appendInput(input) {
	input = cleanInput(input);
	$('#output').append('<div class="bubble input" id="input'+s+'">'+input+'</div>');
	s++;
	stickyOutput();
	$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
	$('#input').val('');
	// Log query in database
	var query = {
		text: input
	}
	logQuery(query);
	return input;
}

function cleanProperNouns(input) {
	inputArray = input.split(' ');
	input = '';
	$.each(inputArray, function(index,value) {
		var checkValue = value.charAt(0).toUpperCase()+value.slice(1);
		    checkValue = decline(checkValue,'nom');	
		if(checkValue.match(properNouns)) {
			console.log('“'+value+'” converted to uppercase');
			value = value.charAt(0).toUpperCase() + value.slice(1);	
		} else if(checkRoad(checkValue)) {
			console.log('“'+value+'” appears to be road name, converted to uppercase');
			value = value.charAt(0).toUpperCase() + value.slice(1);
		} else {
			//console.log('“'+value+'” not converted to uppercase');
		}
		input = input+value+' ';
	});
	input = input.trim();
	return input;
}

function scrubInput(input) {	
	input = input.replace(/(\[|\]|:|;)/gi, '');	
	input = cleanProperNouns(input);
	input = input.replace(/\ ?(\+|plús)\ ?/gi, '+');
	input = input.replace(/\ ?(\-|mínus|minus)\ ?/gi, '-');
	input = input.replace(/\ ?(\*|sinnum)\ ?/gi, '×');
	input = input.replace(/\ ?(\/|deilt með)\ ?/gi, '÷');
	return input;
}

function cleanInput(input) {
	var analysis = analyseIntent(input);
	// Scrub string
	testAnd = /^(og )/i.test(input);
	testBut = /^(en )/i.test(input);
	input   = input.replace(/^(og|en)/, '');	
	input   = scrubInput(input);
	if(analysis.intent=='whatIs') {		
		console.log('Parsed “what is” question');
		var searchQuery  = analysis.searchItem;
		var questionVerb = input.split(' ');
		if(input.match(/^(hvað eru|hvað er)/i)) {			
			input = 'hvað '+questionVerb[1]+' „'+analysis.searchItem+'“?';
		} else if(input.match(/^(hver er)/i)) {			
			input = 'hver '+questionVerb[1]+' '+analysis.searchItem+'?';
		}
	}
	if(analysis.intent=='inEnglish') {		
		console.log('Parsed “what is in English” question');
		var searchQuery = input.replace('hvað er ', '');		
		    searchQuery = searchQuery.replace(' á ensku', '');
		input = 'hvað er „'+searchQuery+'“ á ensku?';
	}
	if(analysis.intent=='whereIs') {				
		console.log('Parsed “where is” question');	
		var searchQuery = analysis.searchItem;
			searchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);		
		input = 'hvar er '+searchQuery+'?';
	}
	if(analysis.intent=='declension') {					
		console.log('Parsed “how to decline” question');
		var searchQuery = input.replace(/(hvernig beygist|hvernig beygi ég|hvernig beygirðu|hvernig beygiru|hvernig beygir maður)/gi, '');
		    searchQuery = searchQuery.replace(' ', '');		
		input = 'hvernig beygist „'+searchQuery+'“?';
	}
	if(testAnd) {
		input = 'og '+input;
	}
	if(testBut) {
		input = 'en '+input;
	}
	if(!input.slice(-1).match(/[.!?]/g)) {
		if(input.match(questionWords)) {
			input = input+'?';
		} else if (input.match(swearWords) || input.match(exclamations)) {
			input = input+'!';
		} else if(input.match(/[0-9]\ ?(\+|\–|\-|×|÷)\ ?[0-9]/gi)) {
			input = input;
		} else {
			input = input+'.';
		}
	}
	input = input.charAt(0).toUpperCase() + input.slice(1);
	return input;
}

function correctSpelling(input) {	
	input = input.replace(/\beg\b/g, 'ég');
	//input = input.replace(/\b(i)\b/g, 'í');
	//input = input.replace(/\b(a)\b/g, 'á');
	input = input.replace(/\b(ruv|rúv)\b/g, 'RÚV');
	input = input.replace(/\b(rás 1)\b/g, 'Rás 1');
	input = input.replace(/\b(rás 2)\b/g, 'Rás 2');
	input = input.replace(/\b(stöð 2 bíó)\b/g, 'Stöð 2 Bíó');
	input = input.replace(/\b(stöð 2 sport)\b/g, 'Stöð 2 Sport');
	input = input.replace(/\b(stöð 2)\b/g, 'Stöð 2');
	input = input.replace(/\b(stöð 3)\b/g, 'Stöð 3');
	input = input.replace(/\b(n4)\b/g, 'N4');
	input = input.replace(/\b(skjáeinum)\b/g, 'SkjáEinum');
	input = input.replace(/\b(morgunblaðinu)\b/g, 'Morgunblaðinu');
	input = input.replace(/\b(mogganum)\b/g, 'Mogganum');
	input = input.replace(/\b(dv)\b/g, 'DV');
	return input;
}


// Output

var r = 1;

function appendOutput(data) {
	if(!data.dontSpeak) {
		if($.cookie('speechActivated')==true) {
			if(data.outputPhrase) {				
				joinedOutput = data.output+' '+data.outputPhrase;
			} else {
				joinedOutput = data.output;
			}
			initiateAWS().Speak(joinedOutput);
		}
	}
	if(!data.outputData) {
		data.outputData = '';
	}
	setTimeout(function() { 
		$('#output').append('<div class="bubble output" id="output'+r+'">'+data.output+data.outputData+'<div class="feedback"></div></div>');
		$('#output .bubble.output .feedback').off().click(function() {
			showFeedbackDialog($(this).parent().attr('id'));
		});
		r++;
		stickyOutput();
		$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
		if(data.executeFunction) {
			executeFunction();
		}
	}, 500);	
	// Log response in database
	if(!data.unknownInput) {
		data.unknownInput = 0;
	}
	var response = {
		text: data.output,
		unknownInput: data.unknownInput
	}
	logResponse(response);
}

function stickyOutput() {
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		if($('#output').height() > $('html, body').height()) { 
			$('#output').removeClass(); 
		} else { 
			$('#output').addClass('sticky');
		}
	}
}


// Unknown input

function respondUnknown() {	
	console.warn('Unable to parse input');
	unsuccessfulResponses++;
	if(unsuccessfulResponses<3) {
		var respondUnknownResponses = [
			'Ég skil þig ekki.',
			'Ég skil ekki. Getur þú sagt þetta á annan hátt?',
			'Hvað áttu við?'
		];
		var randomNumber = Math.floor(Math.random()*respondUnknownResponses.length);
		appendOutput({ output: respondUnknownResponses[randomNumber], unknownInput: 1 });
		return true;
	} else {
		appendOutput({ output: 'Ég skil ekki hvað þú átt við. Þú getur spurt mig um veðrið.', unknownInput: true });
		return true;
	}
}


// Loading

function respondLoading() {
	console.log('Loading message despatched');
	var respondLoadingResponses = [
		'Má ég sjá…',
		'Augnablik…',
		'Bíddu aðeins…',
		'Hinkraðu aðeins…',
		'Hmm…',
		'Hmm… má ég sjá…'
	];
	var randomNumber = Math.floor(Math.random()*respondLoadingResponses.length);
	appendOutput({ output: respondLoadingResponses[randomNumber], dontSpeak: true });
	setTimeout(function() { $('.bubble').last().addClass('loading')}, 500);
}

function stillLoading() {
	$('.bubble').last().addClass('loading');
}

function loadingComplete() {
	console.log('Loading complete');
	setTimeout(function() { $('*').removeClass('loading')}, 500);
}

function stripTags(input) {
	input = input.replace(/(&nbsp;|<([^>]+)>)/ig,'');
	return input;
}


// Dates

function parseDate(str) {
	var strDate = str.replace(/-/g,":").replace(/ /g,":").split(":");
	var aDate = Date.UTC(strDate[0], strDate[1]-1, strDate[2], strDate[3], strDate[4], strDate[5]);
	return aDate;
}


// Numbers

function reformatNumber(str) {
	return str.toString().replace(/\./gi, ',');
}


// Grammar

function decline(word,gramCase) {
	if(word.match(/ /g)) { 
		console.log('String contains multiple words');
 	} else {
		//console.log('Searching declension database for “'+word+'” in '+gramCase);
		if(gramCase=='nom') {
			var regex = /(veg|vegi)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'vegur');
			} 
			var regex = /(göngum)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'göng');
			} 	
			var regex = /(götu)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'gata');
			} 		
			var declinedWord = $.grep(countryDeclensions, function(e) { 
				if(e.acc === word) { return this; }
				if(e.dat === word) { return this; }
				if(e.gen === word) { return this; }
			});	
			if(declinedWord[0]) { 
				word = declinedWord[0].nom; 
			} else {
				//console.log('Word “'+word+'” not found in database');
			}
			return word;
		}
		if(gramCase=='acc') {
			var declinedWord = $.grep(countryDeclensions, function(e) { 
				return e.nom === word;	
			});		
			if(declinedWord[0]) { 
				word = declinedWord[0].acc; 			
			} else {
				//console.log('Word “'+word+'” not found in database');
				return word;
			}
		}
		if(gramCase=='dat') {
			var regex = /(vegur)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'vegi');
			} 
			var regex = /(göng)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'göngum');
			} 	
			var regex = /(gata)$/gi;
			if(word.match(regex)) {
				word = word.replace(regex, 'götu');
			} 
			var declinedWord = $.grep(countryDeclensions, function(e) { 
				return e.nom === word;	
			});		
			if(declinedWord[0]) { 
				word = declinedWord[0].dat; 			
			} else {
				//console.log('Word “'+word+'” not found in database');
				return word;
			}
		}
		if(gramCase=='gen') {
			var declinedWord = $.grep(countryDeclensions, function(e) { 
				return e.nom === word;	
			});		
			if(declinedWord[0]) { 
				word = declinedWord[0].gen; 			
			} else {
				//console.log('Word “'+word+'” not found in database');
				return word;
			}
		}
		return word;
	}
}


// Dialogs 

function hideDialog() {
	$('#dialogWrapper').hide();
	$('#feedbackDialog').hide();
	$('#input').focus();
}

function showFeedbackDialog(reply) {
	$('#dialogWrapper').show();
	$('#feedbackDialog').show();
	$('#feedbackType').focus();
	$('#feedbackDialog').removeClass('fullwidth');
	// Reset form
	$('#feedbackForm')[0].reset();	
	$('#feedbackForm .hiddenArea').removeClass('visible');
	resetErrors();
	if(!reply) {
		$('#convoSample').remove();
		$('#feedbackDialog').addClass('fullwidth');
	} else {
		$('#convoSample').empty();
		var query = $('#'+reply).prevAll('.bubble.input:last').html();
		$('#convoSample').append('<div class="bubble input">'+query+'</div>');
		var reply = $('#'+reply).html();
		$('#convoSample').append('<div class="bubble output">'+reply+'</div>');
	}
	// Bindings
	$('#feedbackForm input, #feedbackForm textarea').off().keyup(function() {
		$(this).removeClass('error');
		$(this).prev('.errorDescription').remove();
		$(this).prev('label').removeClass('error');
	});
	$('#feedbackContact').off().click(function() {
		if(this.checked) {
			$('#feedbackForm .hiddenArea').addClass('visible');
			$('#feedbackName').focus();
		} else {			
			$('#feedbackForm .hiddenArea').removeClass('visible');
		}
	});
	$('#feedbackCancel').off().click(function() {
		hideDialog();
	});
	$('#feedbackSubmit').off().click(function() {
		var errors = [];
		// Reset validation
		resetErrors();
		// Validation form
		if(!$('#feedbackDescription').val()) {
			$('#feedbackDescription').addClass('error');
			$('label[for="feedbackDescription"]').addClass('error');
				errors.push({ field: 'feedbackDescription', error: 'Lýsingu vantar.' });
		}
		if($('#feedbackContact').prop('checked')) {
			if(!$('#feedbackName').val()) {
				$('#feedbackName').addClass('error');
				$('label[for="feedbackName"]').addClass('error');
				errors.push('#feedbackName');
				errors.push({ field: 'feedbackName', error: 'Nafn vantar.' });
			}
			if(!$('#feedbackEmail').val()) {
				$('#feedbackEmail').addClass('error');
				$('label[for="feedbackEmail"]').addClass('error');
				errors.push({ field: 'feedbackEmail', error: 'Netfang vantar.' });
			} else if(!$('#feedbackEmail').val().match(/[0-9a-z-_.]+@[0-9a-z-_]+\.[0-9a-z\.]+/gi)) {
				$('#feedbackEmail').addClass('error');
				$('label[for="feedbackEmail"]').addClass('error');
				errors.push({ field: 'feedbackEmail', error: 'Ógilt netfang.' });
			}
		}
		console.log(errors);
		if(errors.length>0) {
			for(i=0; i<errors.length; i++) {
				$('<div class="errorDescription">'+errors[i].error+'</div>').insertBefore('#'+errors[i].field);
			}
			$('#'+errors[0].field).focus();
		} else {
			hideDialog();
		}
	});
	function resetErrors() {
		$('.errorDescription').remove();
		$('label').removeClass('error');
		$('input, textarea, select').removeClass('error');
	}
}