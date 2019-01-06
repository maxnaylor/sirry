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
<title>Una – Ábendingar</title>
</head>
<body>	
	<?php include_once('nav.php'); ?>
	<div class="container">
		<section>
			<table>
				<tr>
					<th>Auðkenni</th>
					<th>Tegund</th>
					<th>Lýsing</th>
					<th>Má hafa samband?</th>
					<th>IP-tala</th>
					<th>Innsent</th>
				</tr>
				<?php
				$q = "SELECT * FROM feedback				
				     ORDER BY f_submitted DESC
				     LIMIT 0, 100";
				$r = mysqli_query($link, $q);
				if($r && mysqli_num_rows($r)>0) {
					while($row = mysqli_fetch_array($r)) {
						switch ($row['f_type']) {
							case '0':
								$type = 'Önnur ábending';
								break;
							case '1':
								$type = 'Misskilningur';
								break;
							case '2':
								$type = 'Vitlaust svar';
								break;							
							case '3':
								$type = 'Skrýtin hegðun';
								break;
						} 
						switch ($row['f_contact']) {
							case '0':
								$contact = 'Nei';
								break;
							case '1':
								$contact = 'Já';
								break;
						} 
						?>
						<tr>
							<td><?php echo $row['f_id']; ?></td>
							<td><?php echo $type; ?></td>
							<td><?php echo truncate($row['f_description']); ?></td>
							<td><?php echo $contact ?></td>
							<td><?php echo $row['f_ip']; ?></td>
							<td><?php echo utf8_encode(strftime('%a. %e. %b %Y kl. %H:%M:%S', strtotime($row['f_submitted']))); ?></td>
						</tr>
						<?php
					}
				} else {
					?>
					<tr>
						<td colspan="6" class="empty">Engin ábending</td>
					</tr>
					<?php
				}
				?>
			</table>
		</section>
	</div>
</body>
</html>