// Skills — Meta


function respondSetVoice(input) {
	if(input.match(/(skipta um|skipt um|rödd)/i)) {	
		console.log('Interpretation: Switch voices');	
		var voiceID = $.cookie('voiceID');
		if(voiceID=='Dora') {
			voiceID = 'Karl';
			$.cookie('voiceID', voiceID);	
		} else {
			voiceID = 'Dora';
			$.cookie('voiceID', voiceID);	
		}
		appendOutput({output: 'Finnst þér þessi rödd skemmtilegri?' });
		return true;
	}
}