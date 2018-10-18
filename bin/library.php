<?php
// Time zone
date_default_timezone_set('Atlantic/Reykjavik');

// Unicode
mb_language('uni');
mb_internal_encoding('UTF-8');
ini_set('default_charset', 'utf-8');
setlocale(LC_ALL, 'is_IS');
error_reporting(0);	

// Database connection
$user = 'root';
$password = 'root';
$db = 'sirrylog';
$host = '127.0.0.1';
$port = 8889;
$socket = 'localhost:/Applications/MAMP/tmp/mysql/mysql.sock';

$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host,
   $user, 
   $password, 
   $db,
   $port,
   $socket
);

mysqli_set_charset($link, 'utf8');
	
// HTTPS redirect
if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}
?>