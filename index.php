<?php
header('Access-Control-Allow-Origin: *');
include_once 'bin/library.php'; 
include_once 'bin/includes.php'; 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="content-language" content="is" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Sirrý">
<meta property="og:url" content="https://maxnaylor.co.uk/sirry/">
<meta property="og:description" content="Snjall aðstoðarmaður sem talar þitt mál.">
<meta property="og:image" content="https://maxnaylor.co.uk/sirry/images/icon-256.png">
<meta property="og:locale" content="is_IS" />
<title>Sirrý</title>
</head>
<body>	
	<div id="cookieWarning">
		<h1>Villa</h1>
		<p class="blurb">Það virðist vera slökkt á vefkökum (e. <i>cookies</i>).</p><p class="blurb">Til þess að nota Sirrý þarft þú að kveikja á vefkökum í vafranum þínum. Ef þú ert búin(n) að kveikja á vefkökum þá þarft þú að endurhlaða þessa síðu.</p>
	</div>
	<div id="onboarding">
		<h1>Velkomin!</h1>
		<p class="blurb">Ég heiti Sirrý og ég er snjall stafrænn aðstoðarmaður sem talar og skilur íslensku. Þú getur spurt mig spurninga og gefið mig skipanir eins og:</p>
		<table>
			<tr>
				<td>„Hvar er ég?“</td>
				<td>„Hvernig veður veðrið á morgun?“</td>
				<td>„Hvað er 5+20?“</td>
			</tr>
			<tr>
				<td>„Hver er Katrín Jakobsdóttir?“</td>
				<td>„Verða norðurljós í kvöld?“</td>
				<td>„Settu tímamæli í gang.“</td>
			</tr>
			<tr>
				<td>„Hvað er rafbíll?“</td>
				<td>„Hversu margir búa á Íslandi?“</td>
				<td>„Hvað er klukkan?“</td>
			</tr>
			<tr>
				<td>„Hvaða dagur er í dag?“</td>
				<td>„Hve gömul er Björk Guðmundsdóttir?“</td>
				<td>„Er hætta á snjóflóði?“</td>
			</tr>
		</table>
		<input type="button" class="begin" value="Kynnast Sirrý" onclick="hideOnboarding();" />
	</div>
	<a id="helptext">Hvers má spyrja?</a>
	<div id="helpcommands">
		<a class="close">Loka</a>
		<h1>Þjónusta</h1>
		<ul>
			<li><a>„Hvar er lægsta bensínverðið?“</a></li>
			<li><a>„Hvað er í sjónvarpinu?“</a></li>
		</ul>
		<h1>Veður</h1>
		<ul>
			<li><a>„Hvernig verður veðrið á morgun?“</a></li>
			<li><a>„Hvernig er veðrið á Akureyri?“</a></li>
			<li><a>„Verða norðurljós í kvöld?“</a></li>
			<li><a>„Er hætta á snjóflóði?</a></li>
		</ul>
		<h1>Uppflettingar</h1>
		<ul>
			<li><a>„Hver er Ólafur Ragnar Grímsson?“</a></li>
			<li><a>„Hve gömul er Björk Guðmundsdóttir?“</a></li>
			<li><a>„Hvað er rafbíll?“</a></li>
			<li><a>„Hversu margir búa á Íslandi?“</a></li>
		</ul>
		<h1>Kort og leiðsögn</h1>
		<ul>
			<li><a>„Hvar er ég?“</a></li>
			<li><a>„Hvar er Siglufjörður?“</a></li>
			<li><a>„Hvernig kemst ég heim?“</a></li>
		</ul>
		<h1>Klukkan</h1>
		<ul>
			<li><a>„Hvað er klukkan?“</a></li>
			<li><a>„Hvaða dagur er í dag?“</a></li>
			<li><a>„Settu tímamæli í gang.“</a></li>
		</ul>
		<h1>Stærðfræði</h1>
		<ul>
			<li><a>„Hvað er 37 sinnum 150?“</a></li>
		</ul>
	</div>
	<div id="speech"></div>
	<div id="notification">Upplestur virkar eingöngu í Google Chrome enn sem komið er.</div>
	<div id="timer">00:00:00</div>
	<div id="wrapper">
		<div id="output"></div>
		<div id="textbox">
			<input type="text" class="input" name="input" id="input" placeholder="Hvernig get ég aðstoðað þig?" autocomplete="off" autocapitalize="off" />
		</div>
	</div>
</body>
</html>