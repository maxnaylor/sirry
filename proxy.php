<?php
// Set your return content type
header('Content-type: application/json;charset=utf-8');

// Website URL to open
$url = $_GET['url'];

if($url) {
	
	// Check file type	
	//$valid_url_regex = '/.*(rss|feed|atom|xml|json|js).*/';
	/*
	if (!preg_match( $valid_url_regex, $url)) {
		$json = '{"jsonError": "Invalid file type."}';
		echo $json;
		exit;
	}
	*/
	
	// Get content
	$xml_url_regex = '/.*(xml|rss|atom|feed).*/';
	if (preg_match($xml_url_regex, $url)) {
		
		$curl = curl_init();

		curl_setopt_array($curl, Array(
		    CURLOPT_URL            => $url,
		    CURLOPT_RETURNTRANSFER => TRUE,
		    CURLOPT_ENCODING       => 'UTF-8'
		));
		
		$data = curl_exec($curl);
		curl_close($curl);
		
		$xml = simplexml_load_string($data, null, LIBXML_NOCDATA);				
		$json = json_encode($xml);
		
		if($json) {
			echo $json;
		} else if($json === false) {
			$json = json_encode(array("jsonError", json_last_error_msg()));
			echo $json;
		}
		
	} else {
		$handle = fopen($url, 'r');
		if($handle) {
		    while (!feof($handle)) {
		        $buffer = fgets($handle, 4096);
		        echo $buffer;
		    }
		    fclose($handle);
		}
	}
	
} else {
	
	$json = '{"jsonError": "No URL given."}';
	echo $json;
	exit;
	
}
?>