<?php
header('Access-Control-Allow-Origin: *');
require_once '../bin/library.php'; 
require_once 'bin/includes.php'; 
$u = mysqli_real_escape_string($link, $_GET['u']);
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
<body class="login">	
	<div class="container">
		<div class="line left"></div>
		<div class="line right"></div>
		<div class="logo" title="Una"></div>
		<form name="loginForm" id="loginForm" method="post" action="bin/queries/login.php">
			<div class="row">
				<label class="above" for="username">Notandanafn</label>
				<input type="text" id="username" name="username" value="<?php if($u) { echo $u; } ?>" />
			</div>
			<div class="row">
				<label class="above" for="password">Lykilorð</label>
				<input type="password" id="password" name="password" />
			</div>
			<div class="row">
				<input type="submit" value="Innskrá" />
			</div>
		</form>
	</div>
</body>
</html>