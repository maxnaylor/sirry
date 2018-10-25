// Skills — Location


function respondLocation(input) {
	var analysis = analyseIntent(input);
	var respondLocationResponse = '';
	if(analysis.intent=='whereIs') {
		respondLoading();
		loadingComplete();
		var searchQuery = analysis.searchItem;		
			searchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
		appendOutput({ output: scrubInput(searchQuery)+' er hér:',
			           outputData: '<br /><div class="map"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key='+$googleMapsKey+'&language=is-is&q='+searchQuery+'"></iframe></div>' });
		return true;
	} else if(analysis.intent=='whereAmI') {
		loadingComplete();
		var location = getLocation();
		return true;
	} else if(input.match(/(hvar bý ég|hvar á ég heima)/gi)) {
		userInfoAddressWithPrep = $.cookie('userInfoAddressWithPrep');
		if(userInfoAddressWithPrep) {
			appendOutput({ output: 'Þú býrð '+userInfoAddressWithPrep+'.' });			
		} else {
			appendOutput({ output: 'Ég veit ekki, en þú getur sagt mér.' });
		}
		return true;
	} else if(input.match(/(sýndu mér leiðina heim|hvernig kemst ég heim)/gi)) {
		userInfoAddress = $.cookie('userInfoAddress');
		if(userInfoAddress) {
			respondLoading();
			if (navigator.geolocation) {
				loadingComplete();
				var coords = navigator.geolocation.getCurrentPosition(returnDirections,locationError);	
				function returnDirections(position) {
					appendOutput({ output: 'Svona:',
								   outputData: '<br /><div class="map"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key='+$googleMapsKey+'&origin='+position.coords.latitude+','+position.coords.longitude+'&destination='+userInfoAddress+'"></iframe></div>' });
				}			
			} else {				
				appendOutput({ output: 'Þú verður að uppfæra vafrann þinn til þess að ég geti fundið hvar þú ert.' });
			}	
		} else {
			appendOutput({ output: 'Ég veit ekki hvar þú býrð.' });
		}
		return true;
	}
}

function getLocation() {
	if (navigator.geolocation) {
		var coords = navigator.geolocation.getCurrentPosition(returnPosition,locationError);		 
	} else {
		appendOutput({ output: 'Þú verður að uppfæra vafrann þinn til þess að ég geti fundið hvar þú ert.' });
	}
	function returnPosition(position) {
	    appendOutput({ output: 'Það lítur út fyrir að þú sért hér:',
		               outputData: '<br /><div class="map"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key='+$googleMapsKey+'&q='+position.coords.latitude+','+position.coords.longitude+'"></iframe></div>' });
	}
}

function locationError(error) {
	loadingComplete();
	switch(error.code) {
        case error.PERMISSION_DENIED:
        	console.warn('User denied permission to access location');
           	appendOutput({ output: 'Þú þarft að leyfa mér að finna staðsetningu þína til að nota kort.' });
            break;
        case error.POSITION_UNAVAILABLE:
        	console.warn('Unable to find location');
            appendOutput({ output: 'Ég get ekki fundið staðsetningu þína.' });
            break;
        case error.TIMEOUT:
        	console.warn('Request to find location timed out');
            appendOutput({ output: 'Ég get ekki fundið staðsetningu þína.' });
            break;
        case error.UNKNOWN_ERROR:
        	console.warn('Unknown error occurred finding location');
            appendOutput({ output: 'Ég get ekki fundið staðsetningu þína.' });
            break;
    }
}