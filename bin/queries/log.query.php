<?php
require_once('../library.php');

// Import variables
$source       = mysqli_real_escape_string($link, $_POST['source']);
$text         = mysqli_real_escape_string($link, $_POST['text']);
$unknownInput = mysqli_real_escape_string($link, $_POST['unknownInput']);
$ip           = $_SERVER['REMOTE_ADDR'];

// Log query in database
$q = "INSERT INTO `queries` (q_source,q_text,q_unknownInput,q_ip,q_sent) 
      VALUES ('{$source}','{$text}','{$unknownInput}','{$ip}',NOW())";

// Execute query
if(mysqli_query($link, $q) === TRUE) {	
	$data->queryID = mysqli_insert_id($link);
	$data->unknownInput = $unknownInput;
	$JSON = json_encode($data);
	echo $JSON;
} else {
	echo mysqli_error($link);
}
?>