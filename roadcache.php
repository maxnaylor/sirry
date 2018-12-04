<?php
$cacheName = 'roadcache.xml.cache';
// generate the cache version if it doesn't exist or it's too old!
$ageInSeconds = 3600; // one hour
if(!file_exists($cacheName) || filemtime($cacheName) > time() + $ageInSeconds) {
  $contents = file_get_contents('http://gagnaveita.vegagerdin.is/api/faerd2014_1');
  file_put_contents($cacheName, $contents);
}

$dom = simplexml_load_file($cacheName);
?>