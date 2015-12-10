function safe_tags(str) {
    "use strict";

    if(str && typeof str === 'string'){
        return str.replace(/&/g,'&amp;')
          .replace(/</g,'&lt;')
          .replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;')
          .replace(/'/g,'&#x27;')
          .replace(/`/g,'&grave;')
          .replace(/\//g,'&#x2F;');
    }

    return "";
}

var avaRegEx = /^\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$/i;

function renderTripGame(){
	console.time('renderTripGame');
	var pleers = [], diff, difTxt, shkvarki, t, avas = [], playa, addons = [], cntnt = [], safeTrip;
	
	for (var property in tgStats) {
		if (tgStats.hasOwnProperty(property)) {
			pleers.push(tgStats[property]);
		}
	}

	pleers.sort(function(a, b) {
	  return b.energy - a.energy;
	});

	for (var i = 0; i < pleers.length; i++) {
		playa = pleers[i];
		safeTrip = bytesToHex(strToUTF8Arr(playa.trip));
		if(playa.ava){
			if(playa.ava.thread == curThread && playa.ava.src.match(avaRegEx) && 
				playa.ava.width <= 200 && playa.ava.height <= 200 &&
				playa.ava.width > 0 && playa.ava.height > 0){
				avas.push('.tw-' + safeTrip + ' img.post-image:not(:hover) {-moz-box-sizing: border-box; box-sizing: border-box; padding-left: '+parseInt(playa.ava.width)+'px; background: url("http://cdn.syn-ch.com/thumb'+playa.ava.src+'"); width: '+parseInt(playa.ava.width)+'px !important; height: '+parseInt(playa.ava.height)+'px  !important;}');
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

		cntnt.push('<div data-trip="'+safe_tags(pleers[i].trip)+'"' + 
			(i === 0? ' style="font-size:16px"':'') + ' class="'+ tripClasses.join(' ') +'">' + 
			(pleers[i].title? '<em>'+safe_tags(pleers[i].title.title)+'</em> ' : '') +
			'<strong>' + safe_tags(pleers[i].name) +'</strong><span style="color: #228854;">'+safe_tags(pleers[i].trip)+'</span>'+
			'<span class="fr badge"><strong>'+parseInt(pleers[i].energy)+'</strong></span>'+
			'<span class="fr">'+difTxt+'</span>'+
			shkvarki+
			'<br><span class="ctrls">'+
			'[<a href="javascript:;" title="пульнуть">A</a>]'+
			'&nbsp;[<a href="javascript:;" title="дать шкварку">S</a>]'+
			'&nbsp;[<a href="javascript:;" title="дать титул за ' + (pleers[i].title ? 2 * pleers[i].title.cost : 10) + ' энергии">T</a>]'+
			'&nbsp;[<a href="javascript:;" title="покормить">F</a>]'+
			'&nbsp;[<a href="javascript:;" title="RAEP!">R</a>]'+
			'&nbsp;[<a href="javascript:;" title="новое лицо">I</a>]'+
			'&nbsp;[<a href="javascript:;" title="КУДАХ-БАБАХ!">K</a>]'+
			'</span></div>');
		tgStats[pleers[i].trip].prev = pleers[i].energy;

		if(pleers[i].lastThread == curThread){
			if(pleers[i].title){
				addons.push('.tw-' + safeTrip + ' label span.name:before {font-style: italic; content: "'+ safe_tags(pleers[i].title.title) +' "}');
			}

			if(pleers[i].energy > 0){
				addons.push('.tw-' + safeTrip + ' label span.trip:after {color: white; background: #3db; padding: 3px; border-radius: 10px; font-size: 10px; margin-left: 5px; content: "'+ parseInt(pleers[i].energy) +'"}');
			}

			if(pleers[i].nipaBomber){
				addons.push('.tw-' + safeTrip + ' label span.name:after {content: " "; display: inline-block; width: 16px; height: 16px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVDjLfZKxa5NBGMZ/35dEamtFMkgGpaAVQcTRLp1LoYubi6MOgqiTZOrQxYKjOIh/gIuim5YqdChKl4KbQ0XESoPYaGq+fHff3fu+DklM2lRfeLg7uOd3z929iZnRL7l9y7hwkbi6isWIiaAhoL2xMj+PvVlj4u1K0veUGaphkw0ZNcbuOkasCMOWA4AQsRhR79EYu6AY/87LhwDSfYAiYN7D1BTiPeo94j3iHMn0NNrJsaL4T4IiLNH+sFhZ2KFy9Qcc8aga0knR3S/oWrO751+A8p332+bSNmfuHmP8PEZKqjlJaKF7HynGHrZ1wW0Pe5L+L8R3p2YwXjL9qGal42hsQvyNSYaJgyQBCbQ36w0puFK7Zhv73sAk1Dl9r2blE1j8BZJj4nrKUP8d04yxczdrYY/6yBU0FrOliUtY3MPU9eR7cph20PCTdPwkIWN25BdUpWppGdMc1PfkBhIH0gYLxILqKEAULIIWg+j902WQCPPE4pA+0ChNCy3MwoHobgBBkaJDyGmOAoJbl90NkqS0P770Rguk6VHyna90WqyPAMSx3N6831C3C6UxzCImvSQoSXmS6BI+PX/VyDOWR/oAYOdxckMCS5OXr9cq1bOQGBYzpGiRfdti6+nrRp6xOPfMnhwKAPj8IJkpWtSjY1Yi1eDBdWi6jHURludedBuoX38Av56vLTwJJBoAAAAASUVORK5CYII="); vertical-align: middle; margin-left: 3px; margin-right: 3px;}');
			}
			
			if(pleers[i].trip == rikaNipah){
				addons.push('.tw-' + safeTrip + ' label span.name:after {content: " "; display: inline-block; width: 16px; height: 16px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVDjLlZPdT9JRGMe5qFu2Lrt1a63LWv9ATRdN5xvLsnLRipzZpIVpigjyIs3XAOUHgopoWkggP5QXSRJwJQmtm/IlAWtt3XXTfubS+nZ+P1eby6ldPGdn5+zzfb7Pc57DA8DbL9rjrYxuVsXf7W5fuC2mYawpE7QRJZpDDfz/EngYVTN9qR4EPvlgXjCiKVCPWvou/0ACxDJjSbIwDefqMPxrEzC87IDUW4Pq8Vv8PQVaX7Qw5qQRgY9ePP0wDMeSFfWTUkxmPeiI61DlFOP6SAV/VwFtRMFQCwb4CdwW10IbVcK+aMHgohmPlwdBZ11oCctx1X5p/R8B9Uzzuum1ntj1Iv1tGRtb3zH2dgSa2eZtOOOCMizD5cGyzR0lGBNdx1TP5T96E4+4WttiWg6mYr3Ifk1DF1PBmxmHYlrGZkbFUDku2oSHOAFjolOuIpZ65rs5+MmKg9hWcJlZWB1UbsOhRjYz5r/MoSn4AKWWQg0nwFoyzndhijRobGWIq3XgPQU1sa2LqjCRHoc81IBK9w0OnvscRWQtBGFfEc4b8o7wNDMKOwnY3lDwZZ+h1idB/zsThpf6CezkstVN3yNwHFMrNGqCVRvlA2UQ6POkud1nTvE0EcVR1gU7JNSCnrPrWLRtw+RM7BKBXnJDP9eOYqogVNAj0Av0uTk7mtjov2+1p2yQ0hIYXnXCs+qEzF+HC9YSyIiIsK84XWTKP5tvPHdi11GupSXHW8JNW+FMAHdclSCCKDEX/iKdDgotRY17jTu31LhvHybT5RGPin5K3NWs1c0yW+lp0umc/T7b383NUdHJa44rSfJU+Qf54n/iNzi8zBtL0z1zAAAAAElFTkSuQmCC"); vertical-align: middle; margin-left: 3px; margin-right: 3px;}');
			}
		}
	}

	$('#twContent').empty().append(cntnt.join(''));

	$('head #twAvaStyle').remove();
	$('head').append('<style type="text/css" id="twAvaStyle">'+avas.join(' ')+addons.join(' ')+'</style>');
}
