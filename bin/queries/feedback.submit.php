<?php
require_once('../library.php');

// Import variables
$fquery       = mysqli_real_escape_string($link, $_POST['fquery']);
$freply       = mysqli_real_escape_string($link, $_POST['freply']);
$ftype        = mysqli_real_escape_string($link, $_POST['ftype']);
$fdescription = mysqli_real_escape_string($link, $_POST['fdescription']);
$fcontact     = mysqli_real_escape_string($link, $_POST['fcontact']);
if($fcontact=='on') { $fcontact = 1; }
$fname        = mysqli_real_escape_string($link, $_POST['fname']);
$femail       = mysqli_real_escape_string($link, $_POST['femail']);
$fip          = mysqli_real_escape_string($link, $_POST['fip']);

// Log response in database
$q = "INSERT INTO `feedback` (f_query,f_reply,f_type,f_description,f_contact,f_name,f_email,f_ip,f_submitted) 
      VALUES ('{$fquery}','{$freply}','{$ftype}','{$fdescription}','{$fcontact}','{$fname}','{$femail}','{$fip}',NOW())";

// Execute query
if(mysqli_query($link, $q) === TRUE) {
	$id = mysqli_insert_id($link);
} else {
	die();
}
?>