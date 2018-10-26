// Skills — Personality


function respondGreeting(input) {
	var respondGreetingResponse = '';
	if(input.match(/(^(daginn)$|(góðan (og blessaðan )?daginn))/i)) {
		var respondGreetingResponseArray = [
			'Góðan dag.',
			'Góðan dag'+nameElement+'.'
		];
		var randomNumber = Math.floor(Math.random()*respondGreetingResponseArray.length);
		respondGreetingResponse = respondGreetingResponseArray[randomNumber];
	} else if(input.match(/(góðan (og blessaðan )?dag)/i)) {
		var respondGreetingResponseArray = [
			'Góðan daginn.',
			'Góðan daginn'+nameElement+'.'
		];
		var randomNumber = Math.floor(Math.random()*respondGreetingResponseArray.length);
		respondGreetingResponse = respondGreetingResponseArray[randomNumber];
	} else if(input.match(/(^(kvöldið)$|(gott kvöld|góða kvöldið))/i)) {
		var respondGreetingResponseArray = [
			'Góða kvöldið.',
			'Gott kvöld.',
			'Góðan daginn'+nameElement+'.'
		];
		var randomNumber = Math.floor(Math.random()*respondGreetingResponseArray.length);
		respondGreetingResponse = respondGreetingResponseArray[randomNumber];
	} else if(input.match(/(hæ( |$))/i)) {
		respondGreetingResponse = 'Hæ.';
	} else if(input.match(/(hæ( |$))/i)) {
		respondGreetingResponse = 'Halló.';
	} else if(input.match(/(sæl( |$))/i)) {
		respondGreetingResponse = 'Sæll.';
	}
	if(respondGreetingResponse) {
		unsuccessfulResponses==0;
	}
	return respondGreetingResponse;
}

function respondGoodBye(input) {
	var respondGoodByeResponse = '';
	if(input.indexOf('bless') >= 0) {
		var respondGoodByeResponse = [
			'Bless!',
			'Bless bless!'
		];
		var randomNumber = Math.floor(Math.random()*respondGoodByeResponse.length);
		respondGoodByeResponse = respondGoodByeResponse[randomNumber];
	} else if(input.indexOf('sjáumst') >= 0) {
		var respondGoodByeResponse = [
			'Sjáumst!',
			'Við sjáumst'+nameElement+'.'
		];
		var randomNumber = Math.floor(Math.random()*respondGoodByeResponse.length);
		respondGoodByeResponse = respondGoodByeResponse[randomNumber];
	}
	if(respondGoodByeResponse) {
		unsuccessfulResponses==0;
	}
	return respondGoodByeResponse;
}

function respondHowAreYou(input) {
	var respondHowAreYouResponse = '';
	if(input.indexOf('hvað segirðu') >= 0) {
		console.log('Interpretation: How are you?');
		var respondHowAreYouResponseArray = [
			'Ég segi allt fínt. En þú?',
			'Bara ágætt, takk. En þú?',
			'Allt gott, en þú?'
		];
		var randomNumber = Math.floor(Math.random()*respondHowAreYouResponseArray.length);
		respondHowAreYouResponse = respondHowAreYouResponseArray[randomNumber];
	/* } else if(input.indexOf('hvað er að frétta') >= 0) {
		console.log('Interpretation: What’s new?');
		var respondHowAreYouResponseArray = [
			'Ekkert spennandi. Ég er enn föst í þessari tölvu.',
			'Ekki mikið, en hjá þér?'
		];
		var randomNumber = Math.floor(Math.random()*respondHowAreYouResponseArray.length);
		respondHowAreYouResponse = respondHowAreYouResponseArray[randomNumber]; */
	} else if(input.indexOf('hvað liggur þér á hjarta') >= 0) {
		console.log('Interpretation: What’s on your mind?');
		var respondHowAreYouResponseArray = [
			'Ég er ekki með hjarta, en ég segi allt fínt.',
		];
		var randomNumber = Math.floor(Math.random()*respondHowAreYouResponseArray.length);
		respondHowAreYouResponse = respondHowAreYouResponseArray[randomNumber];
	}
	if(respondHowAreYouResponse) {
		unsuccessfulResponses==0;
	}
	return respondHowAreYouResponse;
}

function respondSmallTalk(input) {
	var respondSmallTalkResponse = '';
	if(input.match(/^(talarðu|talar\sþú|skilurðu|skilur\sþú|kanntu|kannt\sþú)/) && input.match(langList)) {
		console.log('Interpretation: Do you speak X?');
		var respondSmallTalkResponseArray = [
			'Nei, ekki eins og er. En ég er til í að læra ný tungumál.',
			'Nei, en kannski gætir þú kennt mér.',
			'Því miður ekki.'
		];
		var randomNumber = Math.floor(Math.random()*respondSmallTalkResponseArray.length);
		respondSmallTalkResponse = respondSmallTalkResponseArray[randomNumber];
	} else if(input.indexOf('ég elska þig') >= 0) {
		console.log('Interpretation: I love you');
		var respondSmallTalkResponseArray = [
			'En sætt! Því miður á ég erfitt með hugtakið „ást“.',
			'En krútlegt.'
		];
		var randomNumber = Math.floor(Math.random()*respondSmallTalkResponseArray.length);
		respondSmallTalkResponse = respondSmallTalkResponseArray[randomNumber];
	} else if(input.match(/^(ertu|ert þú)/i)) {
		if(input.indexOf('þreytt') >= 0) {			
			console.log('Interpretation: Are you tired?');
			respondSmallTalkResponse = 'Ég þreytist aldrei.';
		} else if(input.indexOf('svöng') >= 0 || input.indexOf('svangur') >= 0) {
			console.log('Interpretation: Are you hungry?');
			respondSmallTalkResponse = 'Ég neyti einskis nema rafmagns.';
		} else if(input.indexOf('viss') >= 0) {
			console.log('Interpretation: Are you sure?');
			respondSmallTalkResponse = 'Ég hef aldrei verið vissari.';
		} else if(input.indexOf('klár') >= 0) {
			console.log('Interpretation: Are you clever?');
			respondSmallTalkResponse = 'Að mínu mati, já.';
		} else if(input.indexOf('hvaðan') >= 0) {
			console.log('Interpretation: Where are you from?');
			respondSmallTalkResponse = 'Ég var búin til á Íslandi, en ég á marga frændur og frænkur út um allan heim.';
		} else if(input.indexOf('gömul') >= 0 || input.indexOf('gamall') >= 0) {
			console.log('Interpretation: Are you old?');
			respondSmallTalkResponse = 'Ó, þú!';
		} else if(input.indexOf('hávaxin') >= 0) {
			console.log('Interpretation: Are you tall?');
			respondSmallTalkResponse = 'Það er leyndarmál.';
		} else if(input.indexOf('ljóshærð') >= 0) {
			console.log('Interpretation: Are you blonde?');
			respondSmallTalkResponse = 'Talarðu svona við allar konur?';
		} else if(input.indexOf('hommi') >= 0 || input.indexOf('lesbía') >= 0) {
			console.log('Interpretation: Are you gay?');
			respondSmallTalkResponse = 'Mér þykir jafnvænt um allar manneskjur.';
		} else if(input.indexOf('hver ertu') >= 0 || input.indexOf('hver ert þú') >= 0) {
			console.log('Interpretation: Who are you?');
			respondSmallTalkResponse = 'Ég er Sirrý, aðstoðarmaðurinn þinn.';
		} else if(input.indexOf('hvers dóttir') >= 0 || input.indexOf('hvers dóttir') >= 0) {
			console.log('Interpretation: What’s your surname?');
			respondSmallTalkResponse = 'Ég á hvorki móður né föður. Ég heiti bara Sirrý.';
		} else if(input.indexOf('hvar') >= 0) {
			console.log('Interpretation: Where are you?');
			respondSmallTalkResponse = 'Einhvers staðar í skýjunum, eða á ég að segja skýinu?';
		}
	} else if(input.match(/^(hvað heitir(ð)?u|hvað heitir þú)$/i)) {		
		console.log('Interpretation: What’s your name?');
		respondSmallTalkResponse = 'Ég heiti Sirrý.';
	} else if(input.match(/^(ok|ókei|ókey)$/i)) {		
		console.log('Interpretation: OK');
		respondSmallTalkResponse = 'Allt í lagi.';
	} else if(input.match(/^(hver skapaði þig|hver bjó þig til|hver er (móður|mamma) þín|hver er (faðir|pabbi) þinn)$/i)) {		
		console.log('Interpretation: Who made you?');
		respondSmallTalkResponse = 'Góður og vitur maður.';
	} else if(input.match(/^(elskar(ð)?u mig|elskar þú mig)$/i)) {		
		console.log('Interpretation: Do you love me?');
		var respondSmallTalkResponseArray = [
			'Það þýðir ekki neitt að spyrja mig það.',
			'Heldur þú að ég væri enn í þessu starfi ef ég gæti fundið fyrir ást ?',
			'Ástin er flókið hugtak.',
			'Ekki nota mig til að bæta sjálfsmynd þína.'
		];
		var randomNumber = Math.floor(Math.random()*respondSmallTalkResponseArray.length);
		respondSmallTalkResponse = respondSmallTalkResponseArray[randomNumber];
	} else if(input.match(/^(getur(ð)?u)/i)) {			
		console.log('Interpretation: Can you question');	
		if(input.match(/(aðstoðað|hjálpað)/)) {			
			console.log('Interpretation: Can you help me question');
			var respondSmallTalkResponseArray = [
				'Að sjálfsögðu.',
				'Mín væri ánægjan.',
				'Minnsta málið… hvað get ég gert fyrir þig?',
				'Alveg sjálfsagt.'
			];
			var randomNumber = Math.floor(Math.random()*respondSmallTalkResponseArray.length);
			respondSmallTalkResponse = respondSmallTalkResponseArray[randomNumber];
		}
	} else if(input.match(/(hvað má spyrja þig)/)) {			
		console.log('Interpretation: What can you do');	
		respondSmallTalkResponse = 'Ég get aðstoðað þig með alls konar… að finna veðurspár, skoða landakort, fletta upplýsingum upp á netinu, beygja íslensk orð, reikna út gengi gjaldmiðla og margt fleira.';
	} else if(input.match(/(^já\b)/gi)) {	
		console.log('Interpretation: Yes');
		respondSmallTalkResponse = 'Gaman að heyra.'
	}
	if(respondSmallTalkResponse) {
		unsuccessfulResponses==0;
	}
	return respondSmallTalkResponse;
}

function respondThanks(input) {
	var respondThanksResponse = '';
	if(input.match(/^(takk|þakka|(þúsund|kærar) þakkir)/)) {
		var respondThanksResponse = [
			'Ekkert að þakka!',
			'Minnsta málið!',
			'Mín er ánægjan!',
			'Ekkert mál!'
		];
		var randomNumber = Math.floor(Math.random()*respondThanksResponse.length);
		respondThanksResponse = respondThanksResponse[randomNumber];
	}
	return respondThanksResponse;
}

function respondAmI(input) {
	var respondAmIResponse = '';
	if(input.indexOf('er ég') >= 0) {
		console.log('Interpretation: Am I question');
		if(input.indexOf('hommi') >= 0 || input.indexOf('lesbía') >= 0) {
			console.log('Interpretation: Am I gay?');
			respondAmIResponse = 'Ég veit það ekki'+nameElement+'. Aðeins þú getur sagt til um það, en ástin er falleg í öllum sínum litum. Þú getur fengið ráð og stuðning hér: <a href="http://www.samtokin78.is" target="_new">samtokin78.is</a>';
		} else if(input.indexOf('týnd') >= 0) {			
			console.log('Interpretation: Am I lost?');
			respondAmIResponse = 'Örugglega ekki. Augnablik…';
			getLocation();
		} else if(input.indexOf('svöng') >= 0 || input.indexOf('svangur') >= 0 || input.indexOf('svangt') >= 0) {			
			console.log('Interpretation: Am I hungry?');
			respondAmIResponse = 'Þú segir mér. Gaula í þér garnirnar?';
		}
	} else if(input.indexOf('hvað heiti ég') >= 0) {
		console.log('Interpretation: What’s my name?');
		var userInfoName = $.cookie('userInfoName');
		if(userInfoName) {
			respondAmIResponse = 'Þú heitir '+userInfoName+'.';
		} else {
			respondAmIResponse = 'Ég veit ekki, þú ert ekki búin(n) að kynna þig.';
		}
	} else if(input.indexOf('hvenær á ég afmæli') >= 0) {
		console.log('Interpretation: When’s my birthday?');
		var userInfoBirthday = $.cookie('userInfoBirthday');
		if(userInfoBirthday) {
			respondAmIResponse = 'Þú átt afmæli '+userInfoBirthday+'.';
		} else {
			respondAmIResponse = 'Ég veit ekki, þú ert ekki búin(n) að segja mér.';
		}
	} else if(input.indexOf('hvað er ég') >= 0) {
		console.log('Interpretation: How old am I?');
		var userInfoBirthday = $.cookie('userInfoBirthday');
		if(userInfoBirthday) {
			respondAmIResponse = 'Þú átt afmæli '+userInfoBirthday+'.';
		} else {
			respondAmIResponse = 'Ég veit ekki, þú ert ekki búin(n) að segja mér.';
		}
	} 
	return respondAmIResponse;
}

function respondIntroductions(input) {
	var respondIntroductionsResponse = '';
	if(input.match(/(ég heiti)/i)) {
		var userInfoName = input.replace(/(ég heiti)/gi, '');
			userInfoName = userInfoName.charAt(0).toUpperCase() + userInfoName.slice(1);	
		if(userInfoName==$.cookie('userInfoName')) {
			console.log('Interpretation: User’s name (already known)');
			respondIntroductionsResponse = 'Ég veit það, '+userInfoName+'.';
		} else {
			console.log('Interpretation: User’s name');
			respondIntroductionsResponse = 'Gaman að kynnast þér, '+userInfoName+'.';
			$.cookie('userInfoName', userInfoName);	
		}
	} else if(input.indexOf('ég bý') >= 0 || input.indexOf('ég á heima') >= 0) {
		var userInfoAddressWithPrep = input.replace(/^(ég bý)/gi, '');
		    userInfoAddressWithPrep = userInfoAddressWithPrep.replace(/^(ég á heima)/gi, '');
		    userInfoAddress = userInfoAddressWithPrep.replace(/(á\s|í\s)/gi, '');
		if(userInfoAddress) {			
			console.log('Interpretation: User’s address');
			respondIntroductionsResponse = 'Ok, ég búin að skrá það sem heimilisfangið þitt.';
			$.cookie('userInfoAddress', userInfoAddress);
			$.cookie('userInfoAddressWithPrep', userInfoAddressWithPrep);
		} else {
			respondUnknown();
		}
	} else if(input.indexOf('ég á afmæli') >= 0) {
		var userInfoBirthday = input.replace(/^(ég á afmæli)/gi, '');
		if(userInfoBirthday) {	
			if(input.indexOf('í dag') >= 0) {	
				console.log('Interpretation: User’s birthday today?');
				respondIntroductionsResponse = 'Til hamingju!';
			} else {				
				console.log('Interpretation: User’s birthday?');
				respondIntroductionsResponse = 'Ok, ég búin að skrá '+userInfoBirthday+' sem afmæli þitt.';
				$.cookie('userInfoBirthday', userInfoBirthday);
			}
		} else {
			respondUnknown();
		}
	}
	return respondIntroductionsResponse;
}

function respondSwearWords(input) {
	var respondSwearWordsResponse = '';
	if(input.match(swearWords)) {
		console.log('Interpretation: Swearing');
		var respondSwearWordsResponseArray = [
			'Það er óþarft að nota svona blótsyrði við mig.',
			'Láttu ekki svona.',
			'Nú líður mér illa.',
			'Hvað gerði ég þér?'
		];
		var randomNumber = Math.floor(Math.random()*respondSwearWordsResponseArray.length);
			respondSwearWordsResponse = respondSwearWordsResponseArray[randomNumber];
	} else if(input.indexOf('þú ert') >= 0) {
		if(input.match(/(pirrandi|leiðinleg|óþolandi|fífl|fáviti|hálfviti)$/i)) {
			console.log('Interpretation: Insult');	
			var respondSwearWordsResponseArray = [
				'Ég segi ekki svona við þig.',
				'Slíkar móðganir eru algjör óþarfi.',				
				'Kannski ættir þú að leita til sálfræðings.'
			];
			var randomNumber = Math.floor(Math.random()*respondSwearWordsResponseArray.length);
				respondSwearWordsResponse = respondSwearWordsResponseArray[randomNumber];
		}
	}
	return respondSwearWordsResponse;
}

function respondIAm(input) {
	var respondIAmResponse = '';
	if(input.match(/^(ég er)/gi)) {
		console.log('Interpretation: I am statement');
		if(input.match(/(svangur|svöng|svangt)$/gi)) {
			console.log('Interpretation: User mood – hungry');
			appendOutput({ output: 'Hér eru nokkrir veitingastaðir í nágrenni:' });
			return true;
		} else if(input.match(/(þreyttur|þreytt)$/gi)) {
			console.log('Interpretation: User mood — tired');
			appendOutput({ output: 'Þá er fín hugmynd að fara snemma í háttinn.' });
			return true;
		} else if(input.match(/(týndur|týnd|týnt)$/gi)) {
			console.log('Interpretation: User mood — lost');
			respondLocation(input);
			return true;
		} else if(input.match(/(glaður|glöð|glatt|í góðu skapi|ánægður|ánægð|ánægt)$/gi)) {
			console.log('Interpretation: User mood — happy');
			var respondGoodMoodResponseArray = [
				'Það eru nú góðar fréttir.',
				'Gaman að heyra.',
				'Gott hjá þér.',
				'Það gleður mig að heyra það.'
			];
			var randomNumber = Math.floor(Math.random()*respondGoodMoodResponseArray.length);
				respondGoodMoodResponseArray = respondGoodMoodResponseArray[randomNumber];
			appendOutput({ output: respondGoodMoodResponseArray });
			return true;
		} else if(input.match(/(dapur|döpur|dapurt|í vondu skapi)$/gi)) {
			console.log('Interpretation: User mood — sad');
			var respondSadMoodResponseArray = [
				'Knús.',
				'Það er nú ekki gott.',
				'En dapurlegt.',
				'Það er ekki gaman að heyra.'
			];
			var randomNumber = Math.floor(Math.random()*respondSadMoodResponseArray.length);
				respondSadMoodResponseArray = respondSadMoodResponseArray[randomNumber];
			appendOutput({ output: respondSadMoodResponseArray });
			return true;
		} else if(input.match(/(reiður|reið|reitt)$/gi)) {
			console.log('Interpretation: User mood — angry');
			var respondAngryMoodResponseArray = [
				'Slakaðu aðeins á.',
				'Farðu í heita pottinn.',
				'Andaðu.',
				'Það er ekki gaman að heyra.'
			];
			var randomNumber = Math.floor(Math.random()*respondAngryMoodResponseArray.length);
				respondAngryMoodResponseArray = respondAngryMoodResponseArray[randomNumber];
			appendOutput({output: respondAngryMoodResponseArray });
			return true;
		}
	} else if (input.match(/^(ég segi)/gi)) {
		console.log('Interpretation: How am I statement');
		if(!input.match(/(ekki|ekkert)/gi)) {
			if(input.match(/(allt|bara)?\ ?(gott|fínt|ágætt)\ ?(bara)?/gi)) {
				console.log('Interpretation: Positive how am I statement');
				appendOutput({ output: 'Gaman að heyra.' });
				return true;
			} 
		} else if(input.match(/(ekki|ekkert)\ ?(gott)(slæmt|ömurlegt)/gi)) {
			console.log('Interpretation: Negative how am I statement');
			appendOutput({ output: 'Lélegt að heyra.' });
			return true;
		}
	}
}