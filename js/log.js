// Log operations

var $lastQueryID = '';

function logQuery(query) {
	var dataString = 'source=1&text='+query.text+'&unknownInput='+query.unknownInput;
	$.ajax({ 	
		type: 'POST', 
		url: 'bin/queries/log.query.php',  
		data: dataString,
		success: function(data) {
			var queryData = JSON.parse(data);
			console.log('Query successfully logged in database.');
			$lastQueryID = queryData.queryID;
			//alert(data);
		},  
		error: function(request, status, error) { 
			console.error('Error logging query in database.');
		}					
	});	
}

function logResponse(response) {
	var dataString = 'source=1&text='+response.text+'&lastQuery='+$lastQueryID;
	$.ajax({ 	
		type: 'POST', 
		url: 'bin/queries/log.response.php',  
		data: dataString,
		success: function(data) {
			console.log('Response successfully logged in database.');
		},  
		error: function(request, status, error) { 
			console.error('Error logging response in database.');
		}					
	});	
}