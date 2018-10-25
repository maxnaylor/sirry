// Skills — Language


function respondTranslation(input) {	
	var respondTranslationResponse = '';	
	if(input.indexOf('hvað er') >= 0 && input.indexOf('á ensku') >= 0) {	
		console.log('Interpretation: Look up word in English–Icelandic dictionary');
		respondLoading();	
		var searchQuery = input.replace('hvað er ', '');		
		    searchQuery = searchQuery.replace(' á ensku', '');
		    searchQuery = encodeURI(searchQuery);
		loadingComplete();
		appendOutput({ output: 'Þú finnur svarið kannski hér:', outputData: '<br /><a href="http://www.ordabok.is/index.asp?ordabok=EIE&leitarord='+searchQuery+'" target="_new">ordabok.is</a>' });
		return true;
	}
}

function respondDeclension(input) {
	var respondDeclensionResponse = '';
	if(input.indexOf('hvernig beygist') >= 0 || input.indexOf('hvernig beygi ég') >= 0 || input.indexOf('hvernig beygir maður') >= 0 || input.indexOf('hvernig beygir þú') >= 0) {			
		console.log('Interpretation: Retrieve declension');		
		respondLoading();	
		var searchQuery = input.replace('hvernig beygist', '');		
		    searchQuery = searchQuery.replace('hvernig beygi ég', '');
		    searchQuery = searchQuery.replace('hvernig beygir maður', '');
		    searchQuery = searchQuery.replace('hvernig beygir þú', '');
		    searchQuery = searchQuery.replace(' ', '');
		loadingComplete();
		appendOutput({ output: 'BÍN er örugglega með svarið:', outputData: '<br /><a href="http://bin.arnastofnun.is/leit/?q='+searchQuery+'" target="_new">Leitarniðurstöður fyrir „'+searchQuery+'“</a>' });
		return true;
	}
}
