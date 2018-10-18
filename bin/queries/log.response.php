<?php
require_once('../library.php');

// Import variables
$source       = mysqli_real_escape_string($link, $_POST['source']);
$text         = mysqli_real_escape_string($link, $_POST['text']);
$lastQuery    = mysqli_real_escape_string($link, $_POST['lastQuery']);
$unknownInput = mysqli_real_escape_string($link, $_POST['unknownInput']);

// Log response in database
$q = "INSERT INTO `responses` (source,text,sent) 
      VALUES ('{$source}','{$text}',NOW())";

// Execute query
if(mysqli_query($link, $q) === TRUE) {
	$id = mysqli_insert_id($link);
} else {
	die();
}

if($lastQuery) {	
	// Link response with query
	$q = "UPDATE `queries`
	      SET response = '{$id}', unknownInput = '{$unknownInput}'
          WHERE id = '{$lastQuery}'";
    // Execute query
	if(mysqli_query($link, $q) === TRUE) {
		echo 'success';
	} else {
		die();
	}
}	
?>