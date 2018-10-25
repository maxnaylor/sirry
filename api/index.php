<?php
header("Content-Type: application/javascript");
header("Cache-Control: max-age=604800, public");
include_once('../bin/library.php');

$q = $_GET['q'];
echo json_encode(array('outputString' => $q));
?>