// Skills — Maths


function respondArithmetic(input) {
	var respondArithmeticResponse = '';
	var strippedInput = input.replace(/(plús)/, '+');
	    strippedInput = strippedInput.replace(/(–|mínus|minus)/gi, '-');
	    strippedInput = strippedInput.replace(/(×|sinnum)/gi, '*');
	    strippedInput = strippedInput.replace(/(÷|deilt með)/gi, '/');
	    strippedInput = strippedInput.replace(/[^0-9\.,\+\-\*\/]/gi, '');
	    strippedInput = strippedInput.replace('.', '');
	    strippedInput = strippedInput.replace(',', '.');
	if(strippedInput.match(/[\+\-\*\/]/gi)) {
		console.log('Interpretation: Perform arithmetic');
		answer = String(eval(strippedInput));		
		answer = answer.replace('.',',');
		answer = addSeparators(answer);
		appendOutput({ output: answer });
		return true;
	}
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

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}