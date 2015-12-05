function renderTripGame(){
	var pleers = [], diff, difTxt, shkvarki, t, avas = [], playa;
	
	for (var property in tgStats) {
		if (tgStats.hasOwnProperty(property)) {
			pleers.push(tgStats[property]);
		}
	}

	pleers.sort(function(a, b) {
	  return b.energy - a.energy;
	});

	$('#twContent').empty();

	for (var i = 0; i < pleers.length; i++) {
		playa = pleers[i];
		if(playa.ava){
			if(playa.ava.src.match(/^\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$/i) && 
				playa.ava.width <= 200 && playa.ava.height <= 200 &&
				playa.ava.width > 0 && playa.ava.height > 0 &&
				playa.ava.thread == curThread){
				avas.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' img.post-image:not(:hover) {-moz-box-sizing: border-box; box-sizing: border-box; padding-left: '+playa.ava.width+'px; background: url("http://cdn.syn-ch.com/thumb'+playa.ava.src+'"); width: '+playa.ava.width+'px !important; height: '+playa.ava.height+'px  !important;}');
			}			
		}

		if(pleers[i].energy === 0) continue;
		if(!tgStats[pleers[i].trip].prev){
			tgStats[pleers[i].trip].prev = pleers[i].energy;
		}
		difTxt = '';
		diff = pleers[i].energy - tgStats[pleers[i].trip].prev;
		if(diff > 0){
			difTxt = ' <span style="background: #0c0">+'+diff+'</span>';
		}

		if(diff < 0){
			difTxt = ' <span style="background: #c00">'+diff+'</span>';
		}

		shkvarki = '';
		t = Object.keys(pleers[i].shkvarki).length; 
		if(t > 0){
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAADHAAD/AAD/woo9VcnfAAAAAXRSTlMAQObYZgAAACZJREFUCNdjYMAGGAUFIAxhJwiD0USRAQcDrgaTgUcXXK2gIIrNAB9+BEJB5Iq3AAAAAElFTkSuQmCC" title="шкварка" alt="шкварка">'+ 
				(t>1? 'x'+t : '') +'</span>';
		}
		if(t > 9){
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAnKQD/AADz/wCPxeqtAAAAAXRSTlMAQObYZgAAADZJREFUCNdjYMAGBKA0oyGMYQwVEjY2hDGgQoKCghCGkJISjKECFxGEMYQFYAxDqC5BASw2AwAbAQRmB+kZqAAAAABJRU5ErkJggg==" title="КУДАХ" alt="КУДАХ"></span>';
		}

		if(i === 0){
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAFVBMVEU0AAAAAAAAEf8/NiMtX2PueUL///+0Rm5gAAAAAXRSTlMAQObYZgAAARhJREFUOMut0luqAjEMBuCOl/cJ2ncpzPuR0AUIbqCGLsD9b+IkvU0zdR4Eg4Lm88+0QWNKTfyC2YwF8wTwQaQrtQuD1P4wrAHsTNpGdgG+hel3AL+DZ60OJv5wavB8rPuCdVKO1FR/1Kt6EEuUCv0R8jBL6K1F9JFQne3Mv7dWUoR47yLn+Oa2vBlQQQwxFyLd1agNlFuuQBgSmAa2gLcC8whBEusSZVIahiFgv13uhgzRaiCAS06QBr4XL0QSqEAujCinvWhIfY7w9fBPA3HI85tU3xzTGM8pMhvwebN+gFJxBzj3GfgmNwVLC7wUuNgCznX9w5IOK7t6OVcjB+fcIksPBao4Kfn7JEjfbgpiDShYCqQv+fH/e2h063llRdsAAAAASUVORK5CYII=" style="width:25px;" title="Чак Норрис" alt="Чак Норрис"></span>';
		}

		var tripClasses = [];
		if(pleers[i].raped == curThread) tripClasses.push('twRaped');
		if(pleers[i].lastThread != curThread && i !== 0) tripClasses.push('twAway');

		$('#twContent').append('<div data-trip="'+pleers[i].trip+'"' + 
			(i === 0? ' style="font-size:16px"':'') + ' class="'+ tripClasses.join(' ') +'">' + 
			(pleers[i].title? '<em>'+pleers[i].title.title+'</em> ' : '') +
			'<strong>' + pleers[i].name +'</strong><span style="color: #228854;">'+pleers[i].trip+'</span>'+
			'<span class="fr badge"><strong>'+pleers[i].energy+'</strong></span>'+
			'<span class="fr">'+difTxt+'</span>'+
			shkvarki+
			'<br><span class="ctrls">[<a href="javascript:;" title="пульнуть">A</a>]&nbsp;[<a href="javascript:;" title="дать шкварку">S</a>]&nbsp;[<a href="javascript:;" title="дать титул">T</a>]&nbsp;[<a href="javascript:;" title="покормить">F</a>]&nbsp;[<a href="javascript:;" title="RAEP!">R</a>]&nbsp;[<a href="javascript:;" title="новое лицо">I</a>]&nbsp;[<a href="javascript:;" title="КУДАХ-БАБАХ!">K</a>]</span>'+
			'</div>');
		tgStats[pleers[i].trip].prev = pleers[i].energy;
	}
	$('head #twAvaStyle').remove();
	$('head').append('<style type="text/css" id="twAvaStyle">'+avas.join(' ')+'</style>');
}
