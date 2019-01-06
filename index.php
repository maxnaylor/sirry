<?php
header('Access-Control-Allow-Origin: *');
require_once 'bin/library.php'; 
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
<meta property="og:description" content="Una er snjall aðstoðarmaður sem talar þitt mál.">
<meta property="og:image" content="https://maxnaylor.co.uk/una/images/icon-256.png">
<meta property="og:locale" content="is_IS" />
<title>Una</title>
</head>
<body>	
	<div id="cookieWarning">
		<h1>Villa</h1>
		<p class="blurb">Það virðist vera slökkt á vefkökum (e. <i>cookies</i>).</p><p class="blurb">Til þess að nota Unu þarft þú að kveikja á vefkökum í vafranum þínum. Ef þú ert búin(n) að kveikja á vefkökum þá þarft þú að endurhlaða þessa síðu.</p>
	</div>
	<div id="onboarding">
		<h1>Velkomin!</h1>
		<p class="blurb">Ég heiti Una og ég er snjall stafrænn aðstoðarmaður sem talar og skilur íslensku. Þú getur spurt mig spurninga og gefið mér skipanir eins og:</p>
		<table>
			<tr>
				<td>„Hvar er ég?“</td>
				<td>„Hvernig veður veðrið á morgun?“</td>
				<td>„Hvað er 5+20?“</td>
			</tr>
			<tr>
				<td>„Hver er Katrín Jakobsdóttir?“</td>
				<td>„Verða norðurljós í kvöld?“</td>
				<td>„Hvað er á Rás 2?“</td>
			</tr>
			<tr>
				<td>„Hvað er rafbíll?“</td>
				<td>„Hversu margir búa á Íslandi?“</td>
				<td>„Hvað er klukkan?“</td>
			</tr>
			<tr>
				<td>„Hvað er helst í fréttum?“</td>
				<td>„Hve gömul er Björk Guðmundsdóttir?“</td>
				<td>„Er hætta á snjóflóði?“</td>
			</tr>
		</table>
		<input type="button" class="begin" value="Kynnast Unu" onclick="hideOnboarding();" />
		<p class="cookiewarning">Vefkökur eru notaðar á þessari síðu. Með því að smella á hnappinn fyrir ofan samþykkir þú notkun vefkakna á þessari síðu.</p>
	</div>
	<nav>
		<div class="line left">
			<a class="help" title="Hjálp" id="helpbutton"></a>
		</div>	
		<div class="line right">
			<a class="speech" title="Kveikja á upplestri" id="speechbutton"></a>
			<!--<div id="speech"></div>-->
		</div>
		<div class="logo"></div>
		<div id="notification">Upplestur virkar eingöngu í Google Chrome enn sem komið er.</div>
	</nav>
	<div id="helpcommands">
		<a class="close">Loka</a>
		<h1>Þjónusta</h1>
		<ul>
			<li><a>„Hvar er lægsta bensínverðið?“</a></li>
			<li><a>„Hvað er í sjónvarpinu?“</a></li>
			<li><a>„Hvað er á Rás 2?“</a></li>
		</ul>
		<h1>Fréttir</h1>
		<ul>
			<li><a>„Hvað er helst í fréttum?“</a></li>
			<li><a>„Hvað er að frétta erlendis?“</a></li>
			<li><a>„Sýndu mér nýjustu íþróttafréttir.“</a></li>
		</ul>
		<h1>Veður og færð</h1>
		<ul>
			<li><a>„Hvernig verður veðrið á morgun?“</a></li>
			<li><a>„Hvernig er veðrið á Akureyri?“</a></li>
			<li><a>„Er fært á Hellisheiði?“</a></li>
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
			<li><a>„Hvað er klukkan í Köben?“</a></li>
			<li><a>„Hvaða dagur var fyrir 10 dögum?“</a></li>
			<li><a>„Settu tímamæli í gang.“</a></li>
		</ul>
		<h1>Stærðfræði</h1>
		<ul>
			<li><a>„Hvað er 37 sinnum 150?“</a></li>
			<li><a>„Hvað eru 14 merkur mörg grömm?“</a></li>
		</ul>
	</div>
	<div id="timer">00:00:00</div>
	<div id="wrapper">
		<div id="output"></div>
		<div id="textbox">
			<input type="text" class="input" name="input" id="input" placeholder="Hvernig get ég aðstoðað þig?" autocomplete="off" autocapitalize="off" />
		</div>
	</div>
	<div id="dialogWrapper">
		<div id="feedbackDialog" class="dialog feedback">
			<div class="title">Tilkynna villu</div>
				<div class="padder">
					<div id="convoSample">
					</div>
					<form id="feedbackForm">
						<div class="row">
							<label class="above" for="feedbackType">Tegund villu</label>
							<select id="feedbackType">
								<option value="1">Una skildi ekki fyrirspurn mína</option>
								<option value="2">Svarið var vitlaust/átti ekki við</option>
								<option value="3">Una hegðaði sér á skrýtinn hátt</option>
								<option value="0">Ábending</option>
							</select>		
						</div>	
						<div class="row">		
							<label class="above" for="feedbackDescription">Lýsing á villu</label>
							<textarea id="feedbackDescription"></textarea>
						</div>
						<div class="row">
							<input type="checkbox" id="feedbackContact" /><label class="checkbox" for="feedbackContact">Hafa má samband við mig ef þarf</label>
						</div>
						<div class="hiddenArea">
							<div class="row">
								<label class="above" for="feedbackName">Nafn</label>
								<input type="text" id="feedbackName" />
							</div>
							<div class="row">
								<label class="above" for="feedbackEmail">Netfang</label>
								<input type="text" id="feedbackEmail" />
							</div>
						</div>
						<input type="hidden" id="feedbackIP" value="<?php echo $_SERVER['REMOTE_ADDR']; ?>" />
					</form>
				</div>
			<div class="buttons">
				<input type="button" id="feedbackSubmit" value="Senda"/ >
				<input type="button" class="second" id="feedbackCancel" value="Hætta við"/ >
			</div>
		</div>
	</div>
</body>
</html>