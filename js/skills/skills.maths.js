// Skills — Maths


function respondArithmetic(input) {
	var analysis = analyseIntent(input);
	var strippedInput = input.replace(/(plús)/, '+');
	    strippedInput = strippedInput.replace(/(–|mínus|minus)/gi, '-');
	    strippedInput = strippedInput.replace(/(×|∙|sinnum)/gi, '*');
	    strippedInput = strippedInput.replace(/(÷|:|deilt með)/gi, '/');
	    strippedInput = strippedInput.replace(/(ferningsrót af|kvaðratrót af)/gi, '');
	    strippedInput = strippedInput.replace(/[^0-9\.,\+\-\*\/]/gi, '');
	    strippedInput = strippedInput.replace('.', '');
	    strippedInput = strippedInput.replace(',', '.');
	if(analysis.intent=='arithmetic') {
		console.log('Interpretation: Perform arithmetic');
		if(analysis.subIntent=='squareroot') {	
			answer = String(Math.sqrt(strippedInput));
		} else {						
			answer = String(eval(strippedInput));	
		}	
		answer = answer.replace('.',',');
		answer = addSeparators(answer);
		appendOutput({ output: answer });
		return true;
	}
}

function respondRandomNumber(input) {
	var respondRandomNumberResponse = '';
	if(input.match(/^(kastaðu\speningi)/i)) {
		console.log('Interpretation: Flip a coin');		
		var result = (Math.floor(Math.random() * 2) == 0) ? 'bergrisann' : 'þorskinn';
		respondRandomNumberResponse = 'Þú færð '+result+'.';
	} else if(input.match(/^(kastaðu\steningi)/i)) {
		console.log('Interpretation: Roll a die');		
		var result = (Math.floor(Math.random() * 6)+1);
		respondRandomNumberResponse = 'Þú færð '+result+'.';
	} else if(input.match(/^(kastaðu\steningum)/i)) {
		console.log('Interpretation: Roll two dice');		
		var result1 = (Math.floor(Math.random() * 6)+1);	
		var result2 = (Math.floor(Math.random() * 6)+1);
		respondRandomNumberResponse = 'Þú færð '+result1+' og '+result2+'.';
	}
	return respondRandomNumberResponse;
}

function respondCurrencyConversion(input) {
	/* var respondCurrencyConversion = '';
	if(input.match(/(£|$|€|kr.|krónum|ISK)/gi)) {		
		console.log('Interpretation: Request for currency conversion');
		respondLoading();
		var xmlSource = 'http://vefskil.tollur.is/tollalinan/gengi/Innflutningur.aspx';
		var yqlURL = [
	        'https://query.yahooapis.com/v1/public/yql',
	        '?q=' + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
	        '&format=xml&callback=?'
	    ].join('');
	    $.getJSON(yqlURL, function(data) {
		    loadingComplete();
	        var xmlContent = $(data.results[0]);
	        var todaysRates = new Array();
	        var conversionData = $(xmlContent).find('MyntOgGengi').each(function(index) {
		        var code     = $(this).find('Mynt').text();
		        var currency = $(this).find('Heiti').text();
		        var rate     = $(this).find('Gengi').text();
		        todaysRates.push({'code' : code, 'currency' : currency, 'rate' : rate});
		    });
		    if(conversionData[0]) {
			    var amount = input.replace(/[^0-9\,]/gi,'');			    
			        amount = amount.replace(/\,/gi,'.');
			    if(input.match(/(£|GBP|pund)/)) {		
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'GBP') { return this; }
					});			    
				} else if(input.match(/(\$|USD|dollari|dollarar|dalur|dalir)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'USD') { return this; }
					});			    
				} else if(input.match(/(€|EUR|evra|evrur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'EUR') { return this; }
					});			    
				} else if(input.match(/(¥|JPY|jen)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'JPY') { return this; }
					});			    
				} else if(input.match(/(NOK|norskar krónur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'NOK') { return this; }
					});			    
				} else if(input.match(/(DKK|danskar krónur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'DKK') { return this; }
					});			    
				} else if(input.match(/(SEK|sænskar krónur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'SEK') { return this; }
					});			    
				} else if(input.match(/(zł|PLN|slot|zloty|złoty)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'SEK') { return this; }
					});			    
				} else if(input.match(/(₽|RUB|rúbla|rúblur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'RUB') { return this; }
					});			    
				} else if(input.match(/(AUD)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'AUD') { return this; }
					});			    
				} else if(input.match(/(CAD)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'CAD') { return this; }
					});			    
				} else if(input.match(/(CHF|franki|frankar)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'CHF') { return this; }
					});			    
				} else if(input.match(/(CNY|júan)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'CNY') { return this; }
					});			    
				} else if(input.match(/(CZK)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'CZK') { return this; }
					});			    
				} else if(input.match(/(TRY|líra|lírur)/)) {	
				    var thisCurrency = $.grep(todaysRates, function(e) { 
						if(e.code === 'TRY') { return this; }
					});			    
				} else {
					respondUnknown();
				}
				if(amount>0) { var localAmount = amount.replace(/\./gi,','); } else { var localAmount = 1; }
				if(amount==0) { var amount = 1; }
			    appendOutput({ output: '<div class="conversion"><div class="unit">'+thisCurrency[0].currency+
			                '</div><div class="data">'+numberWithDots(localAmount)+' '+thisCurrency[0].code+' = '+
			                numberWithDots(Math.round(amount*(thisCurrency[0].rate)))+' ISK</div></div>' });
			} else {
				appendOutput({ output: 'Ég get náð í upplýsingar um gengi núna. Prófum aftur seinna.' });
			}
	    });
		return true;
	}
	*/
}

function respondConversion(input) {
	var analysis = analyseIntent(input);
	if(analysis.intent=='conversion') {
		var response = '';
		input = wordsToDigits(input);
		var sourceUnitRegex = new RegExp('\\b([0-9,.]+ ?)('+unitsData+')\\b','gi');
		var targetUnitRegex = new RegExp('\\b([^0-9,.]+ ?)('+unitsData+')\\b','gi');
		var sourceUnit = input.match(sourceUnitRegex)[0];
		    sourceUnit = wordsToDigits(sourceUnit);
		var targetUnit = input.match(targetUnitRegex)[0];
		// Conversion data
		var conversionData = getConversionUnitData(sourceUnit,targetUnit);
		if(!conversionData) {
			console.log('Unable to convert between stated units');
			response  = 'Ég get ekki breytt á milli þessara mælieininga.';
		} else {
			// Extract numbers
			var sourceFigureRegex = new RegExp('([0-9.,]+ ?)('+unitsData+')','gi');
			var sourceFigureWithUnit = sourceUnit.match(sourceFigureRegex);
			var sourceFigure = sourceFigureWithUnit[0].match(/[0-9,.]+/gi);
			    sourceFigure = angliciseInt(sourceFigure);		
			var targetFigure = sourceFigure*conversionData.multiplier;
			    targetFigure = icelandiciseInt(targetFigure);		
			if(sourceFigure.match(/([^1]|^)1$/gi)) {
				var verb = 'er';
				sourceUnit = changeNumber(conversionData.sourceUnit,'sing');
			} else {
				var verb = 'eru'
				sourceUnit = changeNumber(conversionData.sourceUnit,'plu');
			}
			if(targetFigure.match(/([^1]|^)1$/gi)) {
				targetUnit = changeNumber(conversionData.targetUnit,'sing');
			} else {
				targetUnit = changeNumber(conversionData.targetUnit,'plu');
			}
			targetFigure = icelandiciseInt(roundTo(targetFigure,2));
		}
		if(!response) {
			response = addSeparators(digitsToWords(sourceFigure,conversionData.sourceGender))+
		               ' '+sourceUnit+' '+verb+' '+addSeparators(digitsToWords(targetFigure,conversionData.targetGender))+
		               ' '+targetUnit+'.';
		    response = firstToUpper(response);
		}
		appendOutput({ output: response });
		return true;
	}
}

function getConversionUnitData(sourceUnit,targetUnit) {
	var conversionData = '';
	// Length
	if(sourceUnit.match(/(tomm(a|ur))/i) && targetUnit.match(/(cm|sm|sentímet(e)?r(i|ar|um))/i)) {
		console.log('Convert inches to centimetres');
		var conversionData = { 'multiplier'   : 2.54, 
			                   'sourceGender' : 'f',
			                   'sourceUnit'   : 'tomma',
			                   'targetGender' : 'm',			                   
			                   'targetUnit'   : 'sentímetri' };
	} 
	if(sourceUnit.match(/(cm|sm|sentímet(e)?r(i|ar|um))/i) && targetUnit.match(/(tomm(a|ur))/i)) {
		console.log('Convert centimetres to inches');
		var conversionData = { 'multiplier'   : 0.3937008, 
			                   'sourceGender' : 'm',
			                   'sourceUnit'   : 'sentímetri',
			                   'targetGender' : 'f',			                   
			                   'targetUnit'   : 'tommur' };
	} 
	// Weight
	if(sourceUnit.match(/(mörk|merkur)/i) && targetUnit.match(/(gr(a|ö)mm|g)/i)) {		
		console.log('Convert marks to grams');
		var conversionData = { 'multiplier'   : 250, 
			                   'sourceGender' : 'f',
			                   'sourceUnit'   : 'mörk',
			                   'targetGender' : 'n',			                   
			                   'targetUnit'   : 'gramm' };
	} 
	if(sourceUnit.match(/(gr(a|ö)mm|g)/i) && targetUnit.match(/(mörk|merkur)/i)) {
		console.log('Convert grams to marks');
		var conversionData = { 'multiplier'   : 0.004, 
			                   'sourceGender' : 'n',			                   
			                   'sourceUnit'   : 'gramm',
			                   'targetGender' : 'f',			                   
			                   'targetUnit'   : 'mörk' };
	}
	if(sourceUnit.match(/(pund|lb)/i) && targetUnit.match(/(gr(a|ö)mm|g)/i)) {		
		console.log('Convert pounds to grams');
		var conversionData = { 'multiplier'   : 453.59237, 
			                   'sourceGender' : 'n',
			                   'sourceUnit'   : 'pund',
			                   'targetGender' : 'n',			                   
			                   'targetUnit'   : 'gramm' };
	} 
	if(sourceUnit.match(/(gr(a|ö)mm|g)/i) && targetUnit.match(/(pund|lb)/i)) {
		console.log('Convert grams to pounds');
		var conversionData = { 'multiplier'   : 0.0022, 
			                   'sourceGender' : 'n',			                   
			                   'sourceUnit'   : 'gramm',
			                   'targetGender' : 'n',			                   
			                   'targetUnit'   : 'pund' };
	}
	if(sourceUnit.match(/(úns(a|u|um))/i) && targetUnit.match(/(gr(a|ö)mm|g)/i)) {		
		console.log('Convert ounces to grams');
		var conversionData = { 'multiplier'   : 28.35, 
			                   'sourceGender' : 'n',
			                   'sourceUnit'   : 'únsa',
			                   'targetGender' : 'n',			                   
			                   'targetUnit'   : 'gramm' };
	} 
	if(sourceUnit.match(/(gr(a|ö)mm|g)/i) && targetUnit.match(/(úns(a|u|um))/i)) {
		console.log('Convert grams to ounces');
		var conversionData = { 'multiplier'   : 0.0035, 
			                   'sourceGender' : 'n',			                   
			                   'sourceUnit'   : 'gramm',
			                   'targetGender' : 'n',			                   
			                   'targetUnit'   : 'únsa' };
	}
	return conversionData;
}