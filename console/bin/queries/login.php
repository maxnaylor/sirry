<?php
require_once '../library.php';
require_once '../../../bin/library.php';

// Gets variables
$username = $_POST['username']; 
$password = $_POST['password'];

// Cleans variables
$username = stripslashes($username);
$password = stripslashes($password);
$username = mysqli_real_escape_string($link, $username);
$password = mysqli_real_escape_string($link, $password);

// Gets user data
$q = "SELECT* FROM `users` WHERE `u_username` = '$username'";
$r = mysqli_query($link, $q);

while ($row = mysqli_fetch_assoc($r)) {
	$dbpassword = $row['u_password'];	
	$salt       = $row['u_salt'];	
	$uid        = $row['u_id'];		
}

// Validates password
$password = hash('sha256', $password.$salt); 

for($round = 0; $round < 65536; $round++) { $password = hash('sha256', $password.$salt); }

if(!$username) {
	header('Location: ../../login.php?e=1');
	exit;
}

if(!mysqli_num_rows($r)) {
	header('Location: ../../login.php?e=2');
	exit;
}

if($dbpassword!=$password) {	
	header('Location: ../../login.php?e=3&u='.$username);
	exit;
}

// Updates last login
$q = "UPDATE `users` SET `u_lastlogin` = NOW() WHERE `u_id` = '$uid'";
$r = mysqli_query($link, $q);

// Loads user info
$q = "SELECT* FROM `users` WHERE `u_username` = '$username'";
$r = mysqli_query($link, $q);

while ($row = mysqli_fetch_assoc($r)) {
	$_SESSION['u_id'] = mysqli_real_escape_string($link, $row['u_id']);
}

// Redirects user
header('Location: ../../index.php');
?>