<nav>
	<?php
	$currentPage = basename($_SERVER['PHP_SELF']);
	?>
	<div class="logo"></div>
	<h1>Mæliborð</h1>
	<div class="links">
		<a href="index.php"<?php if($currentPage=='index.php') { echo ' class="selected"'; } ?>>Yfirlit</a>
		<a href="eventlog.php"<?php if($currentPage=='eventlog.php') { echo ' class="selected"'; } ?>>Atburðaskrá</a>
		<a href="feedback.php"<?php if($currentPage=='feedback.php') { echo ' class="selected"'; } ?>>Ábendingar</a>
	</div>
	<div class="signout">
		<a href="bin/queries/logout.php">Skrá út</a>
	</div>
</nav>