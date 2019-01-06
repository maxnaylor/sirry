// Skills — Media

var spotifyApi = new SpotifyWebApi();
spotifyApi.getAccessToken($spotifyKey);

function respondMedia(input) {
	var analysis = analyseIntent(input);
	var response = '';
	if(analysis.intent=='playMedia') {
		console.log('Interpretation: Play song/TV show');
		response = 'Ég get ekki spilað tónlist eða þætti enn sem komið er, en vonandi læri ég hvernig á að gera það í framtíðinni.';
		spotifyApi.searchArtists('Eminem')
		  .then(function(data) {
		    console.log('Search artists by "Love"', data);
		  }, function(err) {
		    console.error(err);
		  });
	}
	return response;
}