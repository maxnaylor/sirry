<?php require_once('library.php'); ?>
<!--Styles!-->
<link href="styles/styles.css" rel="stylesheet" type="text/css" />
<!--JQuery + Plugins -->
<script src="../js/jquery/jquery-2.2.3.min.js"></script>
<!--Mobile setup!-->
<link rel="shortcut icon" href="../images/favicon.png" />
<link rel="apple-touch-icon" href="../images/icon-256.png" />
<link rel="apple-touch-icon" sizes="120x120" href="../images/icon-120.png" />
<link rel="apple-touch-icon" sizes="180x180" href="../images/icon-180.png" />
<meta name="viewport" content="initial-scale=1.0,width=device-width,height=device-height">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
<?php
function truncate($string) {
	return (iconv_strlen($string) > 43) ? iconv_substr($string,0,40).'…' : $string;	
}
?>