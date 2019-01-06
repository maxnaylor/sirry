// Capitalisation

function firstToUpper(string) {
	string = string.charAt(0).toUpperCase()+string.slice(1);
	return string;
}

function firstToLower(string) {
	string = string.charAt(0).toLowerCase()+string.slice(1);
	return string;
}


// Dates

function parseDate(str) {
	var strDate = str.replace(/-/g,":").replace(/ /g,":").split(":");
	var aDate = Date.UTC(strDate[0], strDate[1]-1, strDate[2], strDate[3], strDate[4], strDate[5]);
	return aDate;
}


// Numbers

function angliciseInt(str) {
	str = str.toString().replace('.','');
	str = str.toString().replace(',','.');
	return str;
}

function icelandiciseInt(str) {
	str = str.toString().replace(',','');
	str = str.toString().replace('.',',');
	str = addSeparators(str);
	return str;
}

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function addSeparators(nStr) {
    nStr += '';
    var x = nStr.split(',');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function wordsToDigits(input) {
	input = input.replace(/(einn|ein|eitt|eina|einum|einni|einu|eins|einnar)/gi, '1');
	input = input.replace(/(tveir|tvær|tvö|tvo|tveim(ur)?|tveggja)/gi, '2');
	input = input.replace(/(þrír|þrjár|þrjú|þrjá|þrem(ur)?|þriggja)/gi, '3');
	input = input.replace(/(fjórir|fjórar|fjögur|fjóra|fjórum|fjögurra|fjögra)/gi, '4');
	input = input.replace(/(fimm)/gi, '5');
	input = input.replace(/(sex)/gi, '6');
	input = input.replace(/(sjö)/gi, '7');
	input = input.replace(/(átta)/gi, '8');
	input = input.replace(/(níu)/gi, '9');
	input = input.replace(/(tíu)/gi, '10');
	input = input.replace(/(ellefu)/gi, '11');
	input = input.replace(/(tólf)/gi, '12');
	input = input.replace(/(þrettán)/gi, '13');
	input = input.replace(/(fjórtán)/gi, '14');
	input = input.replace(/(fimmtán)/gi, '15');
	input = input.replace(/(sextán)/gi, '16');
	input = input.replace(/(sautján)/gi, '17');
	input = input.replace(/(átján)/gi, '18');
	input = input.replace(/(nítján)/gi, '19');
	input = input.replace(/(tuttugu)/gi, '20');
	return input;
}

function digitsToWords(input,gender) {
	var input = input.toString();
	if(!gender) { gender=0; }
	if(gender=='m') { gender=0; }
	if(gender=='f') { gender=1; }
	if(gender=='n') { gender=2; }
	var one   = ['einn', 'ein', 'eitt'];
	var two   = ['tveir', 'tvær', 'tvö'];
	var three = ['þrír', 'þrjár', 'þrjú'];
	var four  = ['fjórir', 'fjórar', 'fjögur'];
	input = input.replace(/^1($|[^0-9.,+])/gi, one[gender]);
	input = input.replace(/^2($|[^0-9.,+])/gi, two[gender]);
	input = input.replace(/^3($|[^0-9.,+])/gi, three[gender]);
	input = input.replace(/^4($|[^0-9.,+])/gi, four[gender]);
	input = input.replace(/^5($|[^0-9.,+])/gi, 'fimm');
	input = input.replace(/^6($|[^0-9.,+])/gi, 'sex');
	input = input.replace(/^7($|[^0-9.,+])/gi, 'sjö');
	input = input.replace(/^8($|[^0-9.,+])/gi, 'átta');
	input = input.replace(/^9($|[^0-9.,+])/gi, 'níu');
	input = input.replace(/^10($|[^0-9.,+])/gi, 'tíu');
	return input;
}

function changeNumber(input,number) {
	if(number=='sing') {
		if(input.match(/merkur/i)) {
			input = 'mörk';
		}
		if(input.match(/únsur/i)) {
			input = 'únsa';
		}
		if(input.match(/(grömm|g)/i)) {
			input = 'gramm';
		}
		if(input.match(/tommur/i)) {
			input = 'tomma';
		}
		if(input.match(/sentrímetrar/i)) {
			input = 'sentrímetri';
		}
	} else if(number=='plu') {
		if(input.match(/mörk/i)) {
			input = 'merkur';
		}
		if(input.match(/únsa/i)) {
			input = 'únsur';
		}
		if(input.match(/(gramm|g)/i)) {
			input = 'grömm';
		}
		if(input.match(/tomma/i)) {
			input = 'tommur';
		}
		if(input.match(/(sentímetri|cm|sm)/i)) {
			input = 'sentímetrar';
		}
	}
	return input;
	
}

function roundTo(n,digits) {
	var n = angliciseInt(n);
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = +(Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}


// Grammar

function decline(word,gramCase) {
	if(word.match(/ /g)) { 
		var wordArray = word.split(' ');
		word = '';
		for(i=0; i<wordArray.length; i++) {
			word += decline(wordArray[i],gramCase)+' ';
		}
		word = word.trim();
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
	}
	return word;
}