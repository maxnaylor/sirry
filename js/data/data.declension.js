var countryDeclensions = [
	{ nom : 'Afganistan',
	  acc : 'Afganistan',
	  dat : 'Afganistan',
	  gen : 'Afganistans' },
	{ nom : 'Albanía',
	  acc : 'Albaníu',
	  dat : 'Albaníu',
	  gen : 'Albaníu' },
	{ nom : 'Alsír',
	  acc : 'Alsír',
	  dat : 'Alsír',
	  gen : 'Alsírs' },	 
	{ nom : 'Ameríka',
	  acc : 'Ameríku',
	  dat : 'Ameríku',
	  gen : 'Ameríku' },	  
	{ nom : 'Argentína',
	  acc : 'Argentínu',
	  dat : 'Argentínu',
	  gen : 'Argentínu' },	
	{ nom : 'Armenía',
	  acc : 'Armeníu',
	  dat : 'Armeníu',
	  gen : 'Armeníu' },
	{ nom : 'Aserbaídsjan',
	  acc : 'Aserbaídsjan',
	  dat : 'Aserbaídsjan',
	  gen : 'Aserbaídsjans' },
	{ nom : 'Austurríki',
	  acc : 'Austurríki',
	  dat : 'Austurríki',
	  gen : 'Austurríkis' },	
	{ nom : 'Ástralía',
	  acc : 'Ástralíu',
	  dat : 'Ástralíu',
	  gen : 'Ástralíu' },
	{ nom : 'Bahamaeyjar',
	  acc : 'Bahamaeyjar',
	  dat : 'Bahamaeyjum',
	  gen : 'Bahamaeyja' },	
	{ nom : 'Bandaríkin',
	  acc : 'Bandaríkin',
	  dat : 'Bandaríkjunum',
	  gen : 'Bandaríkjanna' },	
	{ nom : 'Belgía',
	  acc : 'Belgíu',
	  dat : 'Belgíu',
	  gen : 'Belgíu' },
	{ nom : 'Bólivía',
	  acc : 'Bólivíu',
	  dat : 'Bólivíu',
	  gen : 'Bólivíu' },
	{ nom : 'Bosnía',
	  acc : 'Bosníu',
	  dat : 'Bosníu',
	  gen : 'Bosníu' },
	{ nom : 'Brasilía',
	  acc : 'Brasilíu',
	  dat : 'Brasilíu',
	  gen : 'Brasilíu' },
	{ nom : 'Bretland',
	  acc : 'Bretland',
	  dat : 'Bretlandi',
	  gen : 'Bretlands' },
	{ nom : 'Búlgaría',
	  acc : 'Búlgaríu',
	  dat : 'Búlgaríu',
	  gen : 'Búlgaríu' },
	{ nom : 'Danmörk',
	  acc : 'Danmörku',
	  dat : 'Danmörku',
	  gen : 'Danmerkur' },
	{ nom : 'Dóminíka',
	  acc : 'Dóminíku',
	  dat : 'Dóminíku',
	  gen : 'Dóminíku' },
	{ nom : 'Egyptaland',
	  acc : 'Egyptaland',
	  dat : 'Egyptalandi',
	  gen : 'Egyptalands' },
	{ nom : 'Eistland',
	  acc : 'Eistland',
	  dat : 'Eistlandi',
	  gen : 'Eistlands' },
	{ nom : 'Erítrea',
	  acc : 'Erítreu',
	  dat : 'Erítreu',
	  gen : 'Erítreu' },
	{ nom : 'Eþíópía',
	  acc : 'Eþíópíu',
	  dat : 'Eþíópíu',
	  gen : 'Eþíópíu' },
	{ nom : 'Filippseyjar',
	  acc : 'Filippseyjar',
	  dat : 'Filippseyjum',
	  gen : 'Filippseyja' },
	{ nom : 'Finnland',
	  acc : 'Finnland',
	  dat : 'Finnlandi',
	  gen : 'Finnlands' },
	{ nom : 'Fídjieyjar',
	  acc : 'Fídjieyjar',
	  dat : 'Fídjieyjum',
	  gen : 'Fídjieyja' },
	{ nom : 'Fílabeinsströndin',
	  acc : 'Fílabeinsströndina',
	  dat : 'Fílabeinsströndinni',
	  gen : 'Fílabeinsstrandarinnar' },
	{ nom : 'Frakkland',
	  acc : 'Frakkland',
	  dat : 'Frakklandi',
	  gen : 'Frakklands' },
	{ nom : 'Færeyjar',
	  acc : 'Færeyjar',
	  dat : 'Færeyjum',
	  gen : 'Færeyja' },
	{ nom : 'Gambía',
	  acc : 'Gambíu',
	  dat : 'Gambíu',
	  gen : 'Gambíu' },
	{ nom : 'Georgía',
	  acc : 'Georgíu',
	  dat : 'Georgíu',
	  gen : 'Georgíu' },
	{ nom : 'Gínea',
	  acc : 'Gíneu',
	  dat : 'Gíneu',
	  gen : 'Gíneu' },
	{ nom : 'Grikkland',
	  acc : 'Grikkland',
	  dat : 'Grikklandi',
	  gen : 'Grikklands' },
	{ nom : 'Grænhöfðaeyjar',
	  acc : 'Grænhöfðaeyjar',
	  dat : 'Grænhöfðaeyjum',
	  gen : 'Grænhöfðaeyja' },
	{ nom : 'Grænland',
	  acc : 'Grænland',
	  dat : 'Grænlandi',
	  gen : 'Grænlands' },
	{ nom : 'Hersegóvína',
	  acc : 'Hersegóvínu',
	  dat : 'Hersegóvínu',
	  gen : 'Hersegóvínu' },
	{ nom : 'Holland',
	  acc : 'Holland',
	  dat : 'Hollandi',
	  gen : 'Hollands' },
	{ nom : 'Hvíta-Rússland',
	  acc : 'Hvíta-Rússland',
	  dat : 'Hvíta-Rússlandi',
	  gen : 'Hvíta-Rússlands' },
	{ nom : 'Indland',
	  acc : 'Indland',
	  dat : 'Indlandi',
	  gen : 'Indlands' },
	{ nom : 'Indonesía',
	  acc : 'Indonesíu',
	  dat : 'Indonesíu',
	  gen : 'Indonesíu' },
	{ nom : 'Írak',
	  acc : 'Írak',
	  dat : 'Írak',
	  gen : 'Íraks' },	
	{ nom : 'Íran',
	  acc : 'Íran',
	  dat : 'Íran',
	  gen : 'Írans' },	
	{ nom : 'Írland',
	  acc : 'Írland',
	  dat : 'Írlandi',
	  gen : 'Írlands' },	
	{ nom : 'Ísland',
	  acc : 'Ísland',
	  dat : 'Íslandi',
	  gen : 'Íslands' },	
	{ nom : 'Ísrael',
	  acc : 'Ísrael',
	  dat : 'Ísrael',
	  gen : 'Ísraels' },
	{ nom : 'Ítalía',
	  acc : 'Ítalíu',
	  dat : 'Ítalíu',
	  gen : 'Ítalíu' },
	{ nom : 'Jamaíka',
	  acc : 'Jamaíku',
	  dat : 'Jamaíku',
	  gen : 'Jamaíku' },
	{ nom : 'Japan',
	  acc : 'Japan',
	  dat : 'Japan',
	  gen : 'Japans' },
	{ nom : 'Jórdanía',
	  acc : 'Jórdaníu',
	  dat : 'Jórdaníu',
	  gen : 'Jórdaníu' },
	{ nom : 'Kambódía',
	  acc : 'Kambódíu',
	  dat : 'Kambódíu',
	  gen : 'Kambódíu' },
	{ nom : 'Kasakstan',
	  acc : 'Kasakstan',
	  dat : 'Kasakstan',
	  gen : 'Kasakstans' },
	{ nom : 'Kenía',
	  acc : 'Keníu',
	  dat : 'Keníu',
	  gen : 'Keníu' },
	{ nom : 'Kirgistan',
	  acc : 'Kirgistan',
	  dat : 'Kirgistan',
	  gen : 'Kirgistans' },
	{ nom : 'Kólumbía',
	  acc : 'Kólumbíu',
	  dat : 'Kólumbíu',
	  gen : 'Kólumbíu' },
	{ nom : 'Kómoreyjar',
	  acc : 'Kómoreyjar',
	  dat : 'Kómoreyjum',
	  gen : 'Kómoreyja' },
	{ nom : 'Króatía',
	  acc : 'Króatíu',
	  dat : 'Króatíu',
	  gen : 'Króatíu' },
	{ nom : 'Kúba',
	  acc : 'Kúbu',
	  dat : 'Kúbu',
	  gen : 'Kúbu' },
	{ nom : 'Kýpur',
	  acc : 'Kýpur',
	  dat : 'Kýpur',
	  gen : 'Kýpur' },
	{ nom : 'Lettland',
	  acc : 'Lettland',
	  dat : 'Lettlandi',
	  gen : 'Lettlands' },
	{ nom : 'Litháen',
	  acc : 'Litháen',
	  dat : 'Litháen',
	  gen : 'Litháens' },
	{ nom : 'Líbanon',
	  acc : 'Líbanon',
	  dat : 'Líbanon',
	  gen : 'Líbanons' },
	{ nom : 'Líbía',
	  acc : 'Líbíu',
	  dat : 'Líbíu',
	  gen : 'Líbíu' },
	{ nom : 'Líbýa',
	  acc : 'Líbýu',
	  dat : 'Líbýu',
	  gen : 'Líbýu' },
	{ nom : 'Lúxemborg',
	  acc : 'Lúxemborg',
	  dat : 'Lúxemborg',
	  gen : 'Lúxemborgar' },
	{ nom : 'Makedónía',
	  acc : 'Makedóníu',
	  dat : 'Makedóníu',
	  gen : 'Makedóníu' },
	{ nom : 'Malasía',
	  acc : 'Malasíu',
	  dat : 'Malasíu',
	  gen : 'Malasíu' },
	{ nom : 'Maldíveyjar',
	  acc : 'Maldíveyjar',
	  dat : 'Maldíveyjum',
	  gen : 'Maldíveyja' },
	{ nom : 'Malta',
	  acc : 'Möltu',
	  dat : 'Möltu',
	  gen : 'Möltu' },
	{ nom : 'Malta',
	  acc : 'Möltu',
	  dat : 'Möltu',
	  gen : 'Möltu' },
	{ nom : 'Marshalleyjar',
	  acc : 'Marshalleyjar',
	  dat : 'Marshalleyjum',
	  gen : 'Marshalleyja' },
	{ nom : 'Máritanía',
	  acc : 'Máritaníu',
	  dat : 'Máritaníu',
	  gen : 'Máritaníu' },
	{ nom : 'Máritanía',
	  acc : 'Máritaníu',
	  dat : 'Máritaníu',
	  gen : 'Máritaníu' },
	{ nom : 'Mið-Afríkulýðveldið',
	  acc : 'Mið-Afríkulýðveldið',
	  dat : 'Mið-Afríkulýðveldinu',
	  gen : 'Mið-Afríkulýðveldisins' },
	{ nom : 'Miðbaugs-Gínea',
	  acc : 'Miðbaugs-Gíneu',
	  dat : 'Miðbaugs-Gíneu',
	  gen : 'Miðbaugs-Gíneu' },
	{ nom : 'Míkrónesía',
	  acc : 'Míkrónesíu',
	  dat : 'Míkrónesíu',
	  gen : 'Míkrónesíu' },
	{ nom : 'Moldóva',
	  acc : 'Moldóvu',
	  dat : 'Moldóvu',
	  gen : 'Moldóvu' },
	{ nom : 'Mongólía',
	  acc : 'Mongólíu',
	  dat : 'Mongólíu',
	  gen : 'Mongólíu' },
	{ nom : 'Namibía',
	  acc : 'Namibíu',
	  dat : 'Namibíu',
	  gen : 'Namibíu' },
	{ nom : 'Nígería',
	  acc : 'Nígeríu',
	  dat : 'Nígeríu',
	  gen : 'Nígeríu' },
	{ nom : 'Norður-Kórea',
	  acc : 'Norður-Kóreu',
	  dat : 'Norður-Kóreu',
	  gen : 'Norður-Kóreu' },
	{ nom : 'Noregur',
	  acc : 'Noreg',
	  dat : 'Noregi',
	  gen : 'Noregs' },
	{ nom : 'Nýja-Gínea',
	  acc : 'Nýju-Gíneu',
	  dat : 'Nýju-Gíneu',
	  gen : 'Nýju-Gíneu' },
	{ nom : 'Nýja-Sjáland',
	  acc : 'Nýja-Sjáland',
	  dat : 'Nýja-Sjálandi',
	  gen : 'Nýja-Sjálands' },
	{ nom : 'Sjáland',
	  acc : 'Sjáland',
	  dat : 'Sjálandi',
	  gen : 'Sjálands' },
	{ nom : 'Pakistan',
	  acc : 'Pakistan',
	  dat : 'Pakistan',
	  gen : 'Pakistans' },
	{ nom : 'Papúa',
	  acc : 'Papúu',
	  dat : 'Papúu',
	  gen : 'Papúu' },
	{ nom : 'Pólland',
	  acc : 'Pólland',
	  dat : 'Póllandi',
	  gen : 'Póllands' },
	{ nom : 'Rúmenía',
	  acc : 'Rúmeníu',
	  dat : 'Rúmeníu',
	  gen : 'Rúmeníu' },
	{ nom : 'Rússland',
	  acc : 'Rússland',
	  dat : 'Rússlandi',
	  gen : 'Rússlands' },
	{ nom : 'Salómonseyjar',
	  acc : 'Salómonseyjar',
	  dat : 'Salómonseyjum',
	  gen : 'Salómonseyja' },
	{ nom : 'furstudæmin',
	  acc : 'furstudæmin',
	  dat : 'furstudæmunum',
	  gen : 'furstudæmanna' },
	{ nom : 'Sambía',
	  acc : 'Sambíu',
	  dat : 'Sambíu',
	  gen : 'Sambíu' },
	{ nom : 'Sankti',
	  acc : 'Sankta',
	  dat : 'Sankta',
	  gen : 'Sankta' },
	{ nom : 'Sádi-Arabía',
	  acc : 'Sádi-Arabíu',
	  dat : 'Sádi-Arabíu',
	  gen : 'Sádi-Arabíu' },
	{ nom : 'Serbía',
	  acc : 'Serbíu',
	  dat : 'Serbíu',
	  gen : 'Serbíu' },
	{ nom : 'Slóvakía',
	  acc : 'Slóvakíu',
	  dat : 'Slóvakíu',
	  gen : 'Slóvakíu' },
	{ nom : 'Slóvenía',
	  acc : 'Slóveníu',
	  dat : 'Slóveníu',
	  gen : 'Slóveníu' },
	{ nom : 'Sómalía',
	  acc : 'Sómalíu',
	  dat : 'Sómalíu',
	  gen : 'Sómalíu' },
	{ nom : 'Spánn',
	  acc : 'Spán',
	  dat : 'Spáni',
	  gen : 'Spánar' },
	{ nom : 'Suður-Afríka',
	  acc : 'Suður-Afríku',
	  dat : 'Suður-Afríku',
	  gen : 'Suður-Afríku' },
	{ nom : 'Suður-Kórea',
	  acc : 'Suður-Kóreu',
	  dat : 'Suður-Kóreu',
	  gen : 'Suður-Kóreu' },
	{ nom : 'Svartfjallaland',
	  acc : 'Svartfjallaland',
	  dat : 'Svartfjallalandi',
	  gen : 'Svartfjallalands' },
	{ nom : 'Svasíland',
	  acc : 'Svasíland',
	  dat : 'Svasílandi',
	  gen : 'Svasílands' },
	{ nom : 'Svíþjóð',
	  acc : 'Svíþjóð',
	  dat : 'Svíþjóð',
	  gen : 'Svíþjóðar' },
	{ nom : 'Sýrland',
	  acc : 'Sýrland',
	  dat : 'Sýrlandi',
	  gen : 'Sýrlands' },
	{ nom : 'Tadsjikistan',
	  acc : 'Tadsjikistan',
	  dat : 'Tadsjikistan',
	  gen : 'Tadsjikistans' },
	{ nom : 'Tadsikistan',
	  acc : 'Tadsikistan',
	  dat : 'Tadsikistan',
	  gen : 'Tadsikistans' },
	{ nom : 'Taíland',
	  acc : 'Taíland',
	  dat : 'Taílandi',
	  gen : 'Taílands' },
	{ nom : 'Tæland',
	  acc : 'Tæland',
	  dat : 'Tælandi',
	  gen : 'Tælands' },
	{ nom : 'Tansanía',
	  acc : 'Tansaníu',
	  dat : 'Tansaníu',
	  gen : 'Tansaníu' },
	{ nom : 'Tékkland',
	  acc : 'Tékkland',
	  dat : 'Tékklandi',
	  gen : 'Tékklands' },
	{ nom : 'Tékkland',
	  acc : 'Tékkland',
	  dat : 'Tékklandi',
	  gen : 'Tékklands' },
	{ nom : 'Túrkmenistan',
	  acc : 'Túrkmenistan',
	  dat : 'Túrkmenistan',
	  gen : 'Túrkmenistans' },
	{ nom : 'Tyrkland',
	  acc : 'Tyrkland',
	  dat : 'Tyrklandi',
	  gen : 'Tyrklands' },
	{ nom : 'Ungverjaland',
	  acc : 'Ungverjaland',
	  dat : 'Ungverjalandi',
	  gen : 'Ungverjalands' },
	{ nom : 'Úkraína',
	  acc : 'Úkraína',
	  dat : 'Úkraína',
	  gen : 'Úkraína' },
	{ nom : 'Úsbekistan',
	  acc : 'Úsbekistan',
	  dat : 'Úsbekistan',
	  gen : 'Úsbekistans' },
	{ nom : 'Vatíkanið',
	  acc : 'Vatíkanið',
	  dat : 'Vatíkaninu',
	  gen : 'Vatíkanisins' },
	{ nom : 'Víetnam',
	  acc : 'Víetnam',
	  dat : 'Víetnam',
	  gen : 'Víetnams' },
	{ nom : 'Þýskaland',
	  acc : 'Þýskaland',
	  dat : 'Þýskalandi',
	  gen : 'Þýskalands' },
	{ nom : 'Skotland',
	  acc : 'Skotland',
	  dat : 'Skotlandi',
	  gen : 'Skotlands' },
	{ nom : 'England',
	  acc : 'England',
	  dat : 'Englandi',
	  gen : 'Englands' },
	{ nom : 'Wales',
	  acc : 'Wales',
	  dat : 'Wales',
	  gen : 'Wales' },
    { nom : 'Akranes',
	  acc : 'Akranes',
	  dat : 'Akranesi' ,
	  gen : 'Akraness' },
	{ nom : 'Akureyri',
	  acc : 'Akureyri',
	  dat : 'Akureyri' ,
	  gen : 'Akureyrar' },
	{ nom : 'Álftanes',
	  acc : 'Álftanes',
	  dat : 'Álftanesi' ,
	  gen : 'Álftaness' },
	{ nom : 'Árborg',
	  acc : 'Árborg',
	  dat : 'Árborg' ,
	  gen : 'Árborgar' },
	{ nom : 'Bifröst',
	  acc : 'Bifröst',
	  dat : 'Bifröst' ,
	  gen : 'Bifrastar' },
	{ nom : 'Bolungarvík',
	  acc : 'Bolungarvík',
	  dat : 'Bolungarvík' ,
	  gen : 'Bolungarvíkur' },
	{ nom : 'Borgarfjörður',
	  acc : 'Borgarfjörð',
	  dat : 'Borgarfirði' ,
	  gen : 'Borgarfjarðar' },
	{ nom : 'Borgarnes',
	  acc : 'Borgarnes',
	  dat : 'Borgarnesi' ,
	  gen : 'Borgarness' },	  
	{ nom : 'Breiðavík',
	  acc : 'Breiðavík',
	  dat : 'Breiðavík' ,
	  gen : 'Breiðavíkur' },	  
	{ nom : 'Dalvík',
	  acc : 'Dalvík',
	  dat : 'Dalvík' ,
	  gen : 'Dalvíkur' },
	{ nom : 'Egilsstaðir',
	  acc : 'Egilsstaði',
	  dat : 'Egilsstöðum' ,
	  gen : 'Egilsstaða' },
	{ nom : 'Eskifjörður',
	  acc : 'Eskifjörð',
	  dat : 'Eskifirði' ,
	  gen : 'Eskifjarðar' },
	{ nom : 'Garðabær',
	  acc : 'Garðabæ',
	  dat : 'Garðabæ' ,
	  gen : 'Garðabæjar' },
	{ nom : 'Grafarvogur',
	  acc : 'Grafarvog',
	  dat : 'Grafarvogi' ,
	  gen : 'Grafarvogs' },
	{ nom : 'Grindavík',
	  acc : 'Grindavík',
	  dat : 'Grindavík' ,
	  gen : 'Grindavíkur' },
	{ nom : 'Hafnarfjörður',
	  acc : 'Hafnarfjörð',
	  dat : 'Hafnarfirði' ,
	  gen : 'Hafnarfjarðar' },
	{ nom : 'Hornafjörður',
	  acc : 'Hornafjörð',
	  dat : 'Hornafirði' ,
	  gen : 'Hornafjarðar' },
	{ nom : 'Húsavík',
	  acc : 'Húsavík',
	  dat : 'Húsavík' ,
	  gen : 'Húsavíkur' },
	{ nom : 'Hveragerði',
	  acc : 'Hveragerði',
	  dat : 'Hveragerði' ,
	  gen : 'Hveragerðis' },
	{ nom : 'Ísafjörður',
	  acc : 'Ísafjörð',
	  dat : 'Ísafirði' ,
	  gen : 'Ísafjarðar' },
	{ nom : 'Keflavík',
	  acc : 'Keflavík',
	  dat : 'Keflavík' ,
	  gen : 'Keflavíkur' },
	{ nom : 'Kópavogur',
	  acc : 'Kópavog',
	  dat : 'Kópavogi' ,
	  gen : 'Kópavogs' },
	{ nom : 'Mosfellsbær',
	  acc : 'Mosfellsbæ',
	  dat : 'Mosfellsbæ' ,
	  gen : 'Mosfellsbæjar' },
	{ nom : 'Neskaupstaður',
	  acc : 'Neskaupstað',
	  dat : 'Neskaupstað' ,
	  gen : 'Neskaupstaðar' },
	{ nom : 'Ólafsfjörður',
	  acc : 'Ólafsfjörð',
	  dat : 'Ólafsfirði' ,
	  gen : 'Ólafsfjarðar' },
	{ nom : 'Ólafsvík',
	  acc : 'Ólafsvík',
	  dat : 'Ólafsvík' ,
	  gen : 'Ólafsvíkur' },
	{ nom : 'Raufarhöfn',
	  acc : 'Raufarhöfn',
	  dat : 'Raufarhöfn' ,
	  gen : 'Raufarhafnar' },
	{ nom : 'Reyðarfjörður',
	  acc : 'Reyðarfjörð',
	  dat : 'Reyðarfirði' ,
	  gen : 'Reyðarfjarðar' },
	{ nom : 'Reykjanesbær',
	  acc : 'Reykjanesbæ',
	  dat : 'Reykjanesbæ' ,
	  gen : 'Reykjanesbæjar' },
	{ nom : 'Reykjavík',
	  acc : 'Reykjavík',
	  dat : 'Reykjavík' ,
	  gen : 'Reykjavíkur' },
	{ nom : 'Selfoss',
	  acc : 'Selfoss',
	  dat : 'Selfossi' ,
	  gen : 'Selfoss' },
	{ nom : 'Seltjarnarnes',
	  acc : 'Seltjarnarnes',
	  dat : 'Seltjarnarnesi' ,
	  gen : 'Seltjarnarness' },
	{ nom : 'Seyðisfjörður',
	  acc : 'Seyðisfjörð',
	  dat : 'Seyðisfirði' ,
	  gen : 'Seyðisfjarðar' },
	{ nom : 'Siglufjörður',
	  acc : 'Siglufjörð',
	  dat : 'Siglufirði' ,
	  gen : 'Siglufjarðar' },
	{ nom : 'Skagafjörður',
	  acc : 'Skagafjörð',
	  dat : 'Skagafirði' ,
	  gen : 'Skagafjarðar' },
	{ nom : 'Skagaströnd',
	  acc : 'Skagaströnd',
	  dat : 'Skagaströnd' ,
	  gen : 'Skagastrandar' },
	{ nom : 'Snæfellsbær',
	  acc : 'Snæfellsbæ',
	  dat : 'Snæfellsbæ' ,
	  gen : 'Snæfellsbæjar' },
	{ nom : 'Stykkishólmur',
	  acc : 'Stykkishólm',
	  dat : 'Stykkishólmi' ,
	  gen : 'Stykkishólms' },
	{ nom : 'Varmaland',
	  acc : 'Varmaland',
	  dat : 'Varmalandi' ,
	  gen : 'Varmalands' },
	{ nom : 'Vestmannaeyjar',
	  acc : 'Vestmannaeyjar',
	  dat : 'Vestmannaeyjum' ,
	  gen : 'Vestmannaeyja' },
	{ nom : 'klakinn',
	  acc : 'klakann',
	  dat : 'klakanum',
	  gen : 'klakans' },
	{ nom : 'borgin',
	  acc : 'borgina',
	  dat : 'borginni',
	  gen : 'borgarinnar' },
	{ nom : 'Ölfus',
	  acc : 'Ölfus',
	  dat : 'Ölfusi' ,
	  gen : 'Ölfuss' },
	{ nom : 'Öxarfjörður',
	  acc : 'Öxarfjörð',
	  dat : 'Öxarfirði' ,
	  gen : 'Öxarfjarðar' },
	{ nom : 'Alexandría',
	  acc : 'Alexandríu',
	  dat : 'Alexandríu' ,
	  gen : 'Alexandríu' },
	{ nom : 'Árósar',
	  acc : 'Árósar',
	  dat : 'Árósum' ,
	  gen : 'Árósa' },
	{ nom : 'Hróarskelda',
	  acc : 'Hróarskeldu',
	  dat : 'Hróarskeldu' ,
	  gen : 'Hróarskeldu' },
	{ nom : 'Kænugarður',
	  acc : 'Kænugarð',
	  dat : 'Kænugarði' ,
	  gen : 'Kænugarðs' },
	{ nom : 'Lundúnir',
	  acc : 'Lundúnir',
	  dat : 'Lundúnum' ,
	  gen : 'Lundúna' },
	{ nom : 'Mikligarður',
	  acc : 'Miklagarð',
	  dat : 'Miklagarði' ,
	  gen : 'Miklagarðs' },
	{ nom : 'Moskva',
	  acc : 'Moskvu',
	  dat : 'Moskvu' ,
	  gen : 'Moskvu' },
	{ nom : 'Stafangur',
	  acc : 'Stafangur',
	  dat : 'Stafangri' ,
	  gen : 'Stafangurs' },
	{ nom : 'Stokkhólmur',
	  acc : 'Stokkhólm',
	  dat : 'Stokkhólmi' ,
	  gen : 'Stokkhólms' },
	{ nom : 'Þrándheimur',
	  acc : 'Þrándheim',
	  dat : 'Þrándheimi' ,
	  gen : 'Þrándheims' },
	{ nom : 'einn',
	  acc : 'einn',
	  dat : 'einum',
	  gen : 'eins' },
	{ nom : 'tveir',
	  acc : 'tvo',
	  dat : 'tveimur',
	  gen : 'tveggja' },
	{ nom : 'þrír',
	  acc : 'þrjá',
	  dat : 'þremur',
	  gen : 'þriggja' },
	{ nom : 'fjórir',
	  acc : 'fjóra',
	  dat : 'fjórum',
	  gen : 'fjögurra' }
];