var tbEvents = false,
	scanTimer;

function twScanner(){
	clearTimeout(scanTimer);

	scanTimer = setTimeout(function(){
		parseTripGame('scanner');
		updateOdometer();		
	}, 500);	
}

function postInserted(event){
	if(tbEvents) return true;
	if(event.animationName != 'twNInsrt') return true;
	
	twScanner();
	return true;
}

var curThread, baseThread, savedState, savedStateHash;

function genSaveState(){
	savedState = JSON.stringify({
		twBaseStats: JSON.parse(localStorage.twBaseStats || "{}"),
		twBaseThread: localStorage.twBaseThread || curThread 
	});
	savedStateHash = md5(savedState);

	$('#twHash').text(savedStateHash.match(/[0-9-a-f]{4}/ig).join('-'));
}

function twButtons(e){
	var p, file;

	if(e.target.classList.contains('twStatsLoader')){
		p = e.target.parentNode;
		file = p.querySelector('.file-info a');
		
		getURLasAB(file.href, function(ab){
			try{
				var zip = JSZip(ab);
				var files = zip.file(/^tripwars.+\.json$/i);

				if(files.length > 0){
					var obj = JSON.parse(utf8ArrToStr(files[0].asUint8Array()));
					
					applyStats(obj);
					tgPostHits = {};
					
					localStorage.twBaseStats = JSON.stringify(tgStats);
					localStorage.twBaseThread = obj.twBaseThread;
					baseThread = obj.twBaseThread;

					$('.twParsed').removeClass('twParsed');
					genSaveState();
					parseTripGame('stats loader from post');
					alert('Готово.');
				}
			}catch(excpt){
				alert('НЕ ПОЛУЧИЛОСЬ!');
			}				
		});
	}
}

$(function(){
	if (window.location.pathname.match(/\/\w+\/(res|arch)\/[0-9\+]+\.html/)) {
		$(document).on('new_post', function(e, b){
			tbEvents = true;
			twScanner();
			return true;
		});

		var m = window.location.pathname.match(/\/\w+\/(res|arch)\/([0-9\+]+)\.html/);
		curThread = parseInt(m[2]);

		if(localStorage.twBaseThread && curThread > localStorage.twBaseThread){
			applyStats({
				twBaseStats: JSON.parse(localStorage.twBaseStats || "{}"),
				twBaseThread: localStorage.twBaseThread || curThread 
			});
			baseThread = localStorage.twBaseThread;
		}

		$('body').append('<div id="tripwars"><span id="twCollapser"><i class="fa fa-minus-square"></i></span> <span id="twConf"><i class="fa fa-cog"></i></span> <span id="twHideAway"><i class="fa fa-eye"></i></span><span id="twSyncStatus"></span><span id="odometer" style="float: right;"></span><div id="twContent" class="twHideAway"></div><div id="twConfig"><h1>TripWars v'+(typeof GM_info !== 'undefined' ? GM_info.script.version : GM_getMetadata("version"))+'</h1><br><p style="text-align: center;">Хеш статов: <strong id="twHash"></strong><br><br><button id="twSaveStats" style="float: left;"><i class="fa fa-download"></i> Скачать файл статсов</button><button id="twUploadStats" style="float: right;"><i class="fa fa-upload"></i> Загрузить файл статсов</button><input type="file" id="twUploadStatsInput" style="display: none;"><br></p><hr><h3 style="text-align: center;">Генератор ОП-пика со статами</h3><p style="text-align: center;"><button id="twOpPicGen"><i class="fa fa-picture-o"></i> склеить ОП-пик</button></p></div><input id="twOpenOpPic" type="file" style="display: none;"/></div>');
		$('head').append('<style type="text/css">   #tripwars { max-height: 90%; overflow-y: auto; min-width: 400px; position: fixed; top: 15px; right: 30px; background: #fff; padding: 5px; font-size: 12px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25); counter-reset: pstn; } #twContent div:before { counter-increment: pstn; content: counter(pstn) ": "; } #twContent div { padding: 5px; border-bottom: 1px solid #eee; position: relative; } #tripwars span.fr{ float: right; margin-left: 5px; } #twContent div:hover span.ctrls{ display: block; } #twContent div span.ctrls{ display: none; } #tripwars span.badge{ color: white; background: #3db; padding: 3px; border-radius: 10px; } #tripwars br{ clear: both; } .twShowLess div { display:none; } .twShowLess div:first-child { display:block; } #twCollapser, #twConf, #twHideAway {cursor: pointer;} .twShowConfig #twContent {display: none;} #twConfig {display:none;} .twShowConfig #twConfig {display: block;} #twConfig textarea {margin: 0 !important; width: 400px; resize: vertical;} .twRaped > span:not(.badge), .twRaped > strong, .twRaped > em {color: pink !important;} .twAway:not(:hover) * {opacity: 0.75} .twHideAway .twAway {display:none !important;}</style>');
		$('head').append('<style type="text/css" id="twAvaStyle"></style>');
		$('#twCollapser').on('click', function(){$('#twContent').toggleClass('twShowLess');$('#tripwars').removeClass('twShowConfig');});
		$('#twHideAway').on('click', function(){$('#twContent').toggleClass('twHideAway');$('#tripwars').removeClass('twShowConfig');});
		$('#twConf').on('click', function(){$('#tripwars').toggleClass('twShowConfig');});
		$('#tripwars').on('click', function(e){
			var cmd = e.target.textContent, title;
			if(e.target.nodeName != 'A') return true;

			var trip = e.target.parentNode.parentNode.dataset.trip;

			if(cmd == 'T'){
				title = prompt('Звание (30 символов, русские и английские буквы, цифры, пробел и минус): ').replace(/[^a-z0-9а-я\-\s]/ig, '').substring(0,30);
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]T:'+title.substring(0,30)+':'+trip+'[/h]');
			}

			if(['A', 'S', 'F', 'R', 'I', 'K'].indexOf(cmd) != -1){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]'+cmd+':'+trip+'[/h]');
			}
		});

		genSaveState();

		$('#twSaveStats').on('click', function(){
			genSaveState();
			var zip = new JSZip();

			zip.file("TripWars-" +localStorage.twBaseThread + "-" + savedStateHash +".json", strToUTF8Arr(savedState));
			saveAs(zip.generate({type:"blob", compression: "DEFLATE"}), "TripWars-" +localStorage.twBaseThread + "-" + savedStateHash +".zip");
		});

		$('#twUploadStats').on('click', function(){$('#twUploadStatsInput').click();});

		$('#twUploadStatsInput').on('change', function(evt){
			if(evt.target.files.length === 0) return false;
			
			try{
				var fReader = new FileReader();
				fReader.onload = function(fE) {
					var d = getUint8Array(fE.target.result);
					var t = new Uint8Array(d.length);

					for (var i = 0; i < d.length; i++) {
						t[i] = d[i];
					}

					var zip = JSZip(t.buffer);
					var files = zip.file(/^tripwars.+\.json$/i);

					if(files.length > 0){
						var obj = JSON.parse(utf8ArrToStr(files[0].asUint8Array()));
						
						applyStats(obj);
						tgPostHits = {};
						
						localStorage.twBaseStats = JSON.stringify(tgStats);
						localStorage.twBaseThread = obj.twBaseThread;
						baseThread = obj.twBaseThread;

						$('.twParsed').removeClass('twParsed');
						genSaveState();
						parseTripGame('stats loader from post');
						alert('Готово.');
					}
				};
				fReader.readAsArrayBuffer(evt.target.files[0]);
			}catch(excpt){
				alert('НЕ ПОЛУЧИЛОСЬ!');
			}
		});

		$('#twOpPicGen').on('click', function(){$('#twOpenOpPic').click();});
		$('#twOpenOpPic').on('change', function(evt){
			if(evt.target.files.length === 0) return false;
			var ext = evt.target.files[0].name.match(/(\.[^\.]+)$/)[1];
			var fReader = new FileReader();
			fReader.onload = function(fE) {
				try{
					genSaveState();
					var zip = new JSZip();

					zip.file("TripWars-" +localStorage.twBaseThread + "-" + savedStateHash +".json", strToUTF8Arr(savedState));
					
					var d = getUint8Array(fE.target.result);
					var t = new Uint8Array(d.length);

					for (var i = 0; i < d.length; i++) {
						t[i] = d[i];
					}
					
					var ci = cleanImage(t);
					if(!ci){alert('Кривая картинка! Нужен jpeg или png.'); return false;}

					var fle = new Blob([ci[0], zip.generate({type:"uint8array", compression: "DEFLATE"})], 
						{type: "application/octet-stream"});
					saveAs(fle, "TripWars-" + localStorage.twBaseThread + "-" + savedStateHash + ext);
				}catch(excpt){
					alert('НЕ ПОЛУЧИЛОСЬ!');
				}
			};
			fReader.readAsArrayBuffer(evt.target.files[0]);
		});
		parseTripGame('main init');
		
		// Odometer
		setInterval(updateOdometer, 15000);
		updateOdometer();

		//InsertAnimation watcher
		var insertAnimation = ' twNInsrt {from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}',
			animationTrigger = '{animation-duration:0.001s;-o-animation-duration:0.001s;-ms-animation-duration:0.001s;-moz-animation-duration:0.001s;-webkit-animation-duration:0.001s;animation-name:twNInsrt;-o-animation-name:twNInsrt;-ms-animation-name:twNInsrt;-moz-animation-name:twNInsrt;-webkit-animation-name:twNInsrt;}';
		$('<style type="text/css">@keyframes ' + insertAnimation + '@-moz-keyframes ' + insertAnimation + '@-webkit-keyframes ' +
			insertAnimation + '@-ms-keyframes ' + insertAnimation + '@-o-keyframes ' + insertAnimation +
			'form div:not(.de-pview) .reply .body ' + animationTrigger + '</style>').appendTo('head');
		setTimeout(function(){$(document).bind('animationstart', postInserted).bind('MSAnimationStart', postInserted).bind('webkitAnimationStart', postInserted);}, 250);

		$('body').parent().on('click', twButtons);

		var opFile = $('form .file-info a').first()[0];
		
		getURLasAB(opFile.href, function(ab){
			try{
				var ci = cleanImage(new Uint8Array(ab));
				if(!ci){$('#twSyncStatus').append('<strong style="color: red;"> Нет синхры в ОП-пике!</strong>');console.log('OP-pic parse fail.'); return false;}

				var zip = JSZip(ci[1]);
				var files = zip.file(/^tripwars.+\.json$/i);

				if(files.length > 0){
					var obj = JSON.parse(utf8ArrToStr(files[0].asUint8Array()));
					
					applyStats(obj);
					tgPostHits = {};
					
					localStorage.twBaseStats = JSON.stringify(tgStats);
					localStorage.twBaseThread = obj.twBaseThread;
					baseThread = obj.twBaseThread;

					$('.twParsed').removeClass('twParsed');
					genSaveState();
					parseTripGame('stats loader from OP-pic');
					console.log('OP parsed');
				}
			}catch(excpt){
				console.log('OP parse fail.');
				$('#twSyncStatus').append('<strong style="color: red;"> Нет синхры в ОП-пике!</strong>');
			}				
		});
	}
});


