// Skills — Clock


function respondTime(input) {
	var respondTimeResponse = '';
	var time = new Date();
	if(input.match(/(hvað er klukkan)/gi)) {
		var time = ("0" + time.getHours()).slice(-2)+":"+("0" + time.getMinutes()).slice(-2);
		respondTimeResponse = 'Klukkan er '+time+'.';
	} else if(input.match(/(hvaða dagur er í dag)/gi)) {
		var day   = time.getDay();
		    day   = formatDay(day,true);
		var date  = time.getDate();
		var month = time.getMonth();
		    month = formatMonth(month,true);
 		respondTimeResponse = 'Í dag er '+day+' '+date+'. '+month+'.';
	} else if(input.match(/(hvaða dagur verður á morgun)/gi)) {
		var time  = new Date();
		    time.setDate(time.getDate() + 1);
		var day   = time.getDay();
		    day   = formatDay(day,true);
		var date  = time.getDate();
		var month = time.getMonth();
		    month = formatMonth(month,true);
 		respondTimeResponse = 'Á morgun verður '+day+' '+date+'. '+month+'.';
	} else if(input.match(/(hvaða dagur var í gær)/gi)) {
		var time  = new Date();
		    time.setDate(time.getDate() - 1);
		var day   = time.getDay();
		    day   = formatDay(day,true);
		var date  = time.getDate();
		var month = time.getMonth();
		    month = formatMonth(month,true);
 		respondTimeResponse = 'Í gær var '+day+' '+date+'. '+month+'.';
	}
	return respondTimeResponse;
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