<?php
session_start();
if(empty($_SESSION['u_id'])) { header('Location: login.php'); die; }
header('Access-Control-Allow-Origin: *');
require_once '../bin/library.php'; 
require_once 'bin/includes.php'; 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="content-language" content="is" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Una">
<meta property="og:url" content="https://maxnaylor.co.uk/una/">
<meta property="og:description" content="Snjall aðstoðarmaður sem talar þitt mál.">
<meta property="og:image" content="https://maxnaylor.co.uk/una/images/icon-256.png">
<meta property="og:locale" content="is_IS" />
<title>Una – Mæliborð</title>
</head>
<body>	
	<?php include_once('nav.php'); ?>	
	<?php
	// Queries asked
	$q = "SELECT * FROM queries				
	     WHERE q_sent >= DATE(NOW()) - INTERVAL 7 DAY";
	$r = mysqli_query($link, $q);
	$queries7Days = mysqli_num_rows($r);
	// Queries answered
	$q = "SELECT * FROM queries				
	     WHERE q_sent >= DATE(NOW()) - INTERVAL 7 DAY
	     AND q_unknowninput = 1";
	$r = mysqli_query($link, $q);
	$queriesAnswered = $queries7Days-mysqli_num_rows($r);
	// Queries answered per cent
	$queriesAnsweredPerCent = round($queriesAnswered/$queries7Days*100, 1);
	?>
	<div class="container padded">
		<h1>Tölfræði</h1>
		<section>
			<div class="stat">
				<p class="number"><?php echo $queries7Days; ?></p>
				<p>Fjöldi fyrirspurna í viku</p>
			</div>
			<div class="stat">
				<p class="number"><?php echo $queriesAnswered; ?></p>
				<p>Fjöldi svaraðra fyrirspurna<br /> í viku</p>
			</div>
			<div class="stat">
				<p class="number"><?php echo $queriesAnsweredPerCent; ?><small>%</small></p>
				<p>Hlutfall svaraðra fyrirspurna<br /> í viku</p>
			</div>
		</section>
	</div>
</body>
</html>