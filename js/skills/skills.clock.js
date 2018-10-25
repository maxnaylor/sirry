// Skills — Clock


function respondTime(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='currentTime') {
		var time = moment().format('LT');
		response = 'Klukkan er '+time+'.';
	} else if(analysis.intent=='currentDay') {
		var day = moment().format('dddd Do MMMM');
 		response = 'Í dag er '+day+'.';
	} else if(analysis.intent=='previousDay') {		
		var day = moment().add(1, 'days').format('dddd Do MMMM');
 		response = 'Á morgun verður '+day+'.';
	} else if(analysis.intent=='nextDay') {
		var day = moment().subtract(1, 'days').format('dddd Do MMMM');
		response = 'Í gær var '+day+'.';
	} else if(analysis.intent=='currentYear') {
		var year = moment().format('YYYY');
		response = 'Það er '+year+'.';
	} else if(analysis.intent=='whichDayAgo') {
		var daysAgo = input.replace(/\D/gi, '');
		var day = moment().subtract(daysAgo, 'days').format('dddd Do MMMM');
		response = 'Fyrir '+decline(formatSmallNumber(daysAgo), 'dat')+' dögum var '+day+'.';
	} else if(analysis.intent=='whichYearAgo') {
		var yearsAgo = input.replace(/\D/gi, '');
		var year = moment().subtract(yearsAgo, 'years').format('YYYY');
		response = 'Fyrir '+yearsAgo+' árum var árið '+year+'.';
	}
	return response;
}

function formatSmallNumber(input) {
	var number = input;
	input = parseInt(input);
	if(input==0) {
		number = 'núll';
	} else if(input==1) {
		number = 'einn';
	} else if(input==2) {
		number = 'tveir';
	} else if(input==3) {
		number = 'þrír';
	} else if(input==4) {
		number = 'fjórir';
	} else if(input==5) {
		number = 'fimm';
	} else if(input==6) {
		number = 'sex';
	} else if(input==7) {
		number = 'sjö';
	} else if(input==8) {
		number = 'átta';
	} else if(input==9) {
		number = 'níu';
	} else if(input==10) {
		number = 'tíu';
	}
	return number
}

var seconds = 0, minutes = 0, hours = 0, t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }		    
    $('#timer').html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));		
    startStopwatch();
}

function startStopwatch() {
	console.log('Stopwatch started.');
	$('#timer').show();
	if($('#helpcommands').hasClass('visible')) {
		$('#timer').addClass('sidebaron');
	}
	t = setTimeout(add, 1000);
}	

function stopStopwatch() {
	console.log('Stopwatch closed.');
	clearTimeout(t);
	$('#timer').hide();
	$('#timer').html('00:00:00');
	seconds = 0; minutes = 0; hours = 0;
}

function pauseStopwatch() {
	console.log('Stopwatch paused.');
	clearTimeout(t);
}

function respondStopwatch(input) {
	var respondStopwatchResponse = '';
	if(input.match(/(settu)\ ?(tímamæli|tímamælinn|skeiðúr|skeiðklukku)\ ?(í gang)/gi)) {		
		console.log('Interpretation: Start stopwatch');
		if(!$('#timer').is(':visible')) {
			respondStopwatchResponse = 'Minnsta málið.';
			startStopwatch();
		} else {
			respondStopwatchResponse = 'Tímamælirinn er í gangi.';
		}
	} else if(input.match(/(stoppaðu|hættu)(tímamæli|tímamælinn|tímamælinum|skeiðúr|skeiðúrið|skeiðklukku|skeiðklukkuna|skeiðklukkunni)?/gi)) {	
		console.log('Interpretation: Pause stopwatch');		
		if($('#timer').is(':visible')) {
			respondStopwatchResponse = 'Allt í lagi.';
			pauseStopwatch();
		} else {
			respondStopwatchResponse = 'Það er enginn tímamælir í gangi.';
		}
	} else if(input.match(/(endurstilltu|nullstilltu|hreinsaðu|lokaðu)(tímamæli|tímamælinn|tímamælinum)?/gi)) {
			
		console.log('Interpretation: Close stopwatch');		
		if($('#timer').is(':visible')) {
			respondTimerResponse = 'Allt í lagi.';
			stopStopwatch();
		} else {
			respondStopwatchResponse = 'Það er enginn tímamælir í gangi.';
		}
	}
	return respondStopwatchResponse;
}

function respondCountdown(input) {
	var respondCountdownResponse = '';
	if(input.match(/(teldu niður)/gi)) {
		if(!$('#timer').is(':visible')) {
			respondCountdownResponse = 'Minnsta málið.';
			startCountdown();
		} else {
			respondCountdownResponse = 'Tímamælirinn er í gangi.';
		}
	}
	return respondCountdownResponse;
}

var seconds = 0, minutes = 1, hours = 0, countdown;

function subtract() {
    seconds = seconds-1;
    if (seconds <= 0) {
        seconds = 59;
        minutes = minutes-1;
        if (minutes <= 0) {
            minutes = 59;
            hours = hours-1;
        }
    }		    
    $('#timer').html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));		
    startCountdown();
}

function startCountdown() {
	console.log('Countdown updated to '+(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)+'.');
	$('#timer').show();
	if($('#helpcommands').hasClass('visible')) {
		$('#timer').addClass('sidebaron');
	}
	countdown = setTimeout(subtract, 1000);
}	

function stopCountdown() {
	console.log('Countdown closed.');
	clearTimeout(countdown);
	$('#timer').hide();
	$('#timer').html('00:00:00');
	seconds = 0; minutes = 0; hours = 0;
}

function pauseCountdown() {
	console.log('Countdown paused.');
	clearTimeout(countdown);
}