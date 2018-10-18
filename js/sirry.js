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
	$('#helptext').off().click(function(event) {
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
	$.cookie('onboarded',1);
	$('#onboarding').hide();
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
	if(!$('#speech').hasClass('disabled')) {
		$.cookie('speechActivated',1);
		$('#speech span').removeClass();
		$('#input').focus();
		$('#speech').removeClass().addClass('on');
		$('#speech').html('<span>Kveikt á upplestri</span>');	
		$('#speech span').addClass('fadeout');
		$('#speech').off().click(function() {
			deactivateSpeech();
		});		
	}
}

function deactivateSpeech() {	
	if(!$('#speech').hasClass('disabled')) {
		$.cookie('speechActivated',0);
		$('#speech span').removeClass();
		$('#input').focus();
		$('#speech').removeClass().addClass('off');
		$('#speech').html('<span>Slökkt á upplestri</span>');	
		$('#speech span').addClass('fadeout');
		$('#speech').off().click(function() {
			activateSpeech();
		});
	}
}

function speechNotCompatible() {	
	$('#speech').addClass('disabled').off().mouseenter(function() {
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
	input = input.replace(/[.?]$/g,'');
	if(input) {
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
		// Unknown response 
		if(!response) {
			response = respondUnknown();
		}
		if(response!=true) { appendOutput({ output: response }) };
		
	}
}

function appendInput(input) {
	input = cleanInput(input);
	$('#output').append('<div class="bubble input">'+input+'</div>');
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
		if(value.match(properNouns)) {
			console.log('“'+value+'” converted to uppercase');
			value = value.charAt(0).toUpperCase() + value.slice(1);	
		} else {
			console.log('“'+value+'” not converted to uppercase');
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
	input   = input.replace(/\seg\s/, 'ég');
	testAnd = /^(og )/i.test(input);
	testBut = /^(en )/i.test(input);
	input   = input.replace(/^(og|en)/, '');	
	input   = scrubInput(input);
	if(input.match(/^(hvað er |hvað eru )/i)) {		
		if(!input.match(/(klukkan|ég|gömul|gamall|á ensku|í sjónvarpi|í sjónvarpinu|nýtt|helst|\+|\–|\-|×|÷)/gi)) {
			console.log('Parsed “what is” question');
			var searchQuery  = input.replace(/(hvað\ er\ |hvað\ eru\ )/gi, '');	
			var questionVerb = input.split(' ');
			if(input.match(/[0-9]\ ?(\+|\–|\-|×|÷)\ ?[0-9]/gi)) {
				input = input.replace(' ', '');
			}
			input = 'hvað '+questionVerb[1]+' „'+searchQuery+'“?';
		}
	}
	if(input.indexOf('hvað er') >= 0 && input.indexOf('á ensku') >= 0) {		
		console.log('Parsed “what is in English” question');
		var searchQuery = input.replace('hvað er ', '');		
		    searchQuery = searchQuery.replace(' á ensku', '');
		input = 'hvað er „'+searchQuery+'“ á ensku?';
	}
	if(input.indexOf('hvar er ') >= 0 && !input.match(/(ég|bensín)/gi)) {				
		console.log('Parsed “where is” question');	
		var searchQuery = input.replace('hvar er ', '');
			searchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);		
		input = 'hvar er '+searchQuery+'?';
	}
	if(input.match(/^(hvernig\ beygist\ )/i)) {					
		console.log('Parsed “how to decline” question');
		var searchQuery = input.replace('hvernig beygist', '');
		    searchQuery = searchQuery.replace(' ', '');		
		input = 'hvernig beygist „'+searchQuery+'“?';
	}
	if(input.indexOf('hvernig beygi ég') >= 0) {					
		console.log('Parsed “how to decline” question');		
		var searchQuery = input.replace('hvernig beygi ég', '');
		    searchQuery = searchQuery.replace(' ', '');		
		input = 'hvernig beygi ég „'+searchQuery+'“?';
	}
	if(input.indexOf('hvernig beygir maður') >= 0) {				
		console.log('Parsed “how to decline” question');		
		var searchQuery = input.replace('hvernig beygir maður', '');
		    searchQuery = searchQuery.replace(' ', '');		
		input = 'hvernig beygir maður „'+searchQuery+'“?';
	}
	if(input.indexOf('hvernig beygir þú') >= 0) {				
		console.log('Parsed “how to decline” question');			
		var searchQuery = input.replace('hvernig beygir þú', '');
		    searchQuery = searchQuery.replace(' ', '');		
		input = 'hvernig beygir þú „'+searchQuery+'“?';
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


// Output

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
		$('#output').append('<div class="bubble output">'+data.output+data.outputData+'</div>');
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