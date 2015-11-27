// ==UserScript==
// @name         SynchTripWars
// @namespace    udp://SynchTripWars/*
// @version      0.0.1
// @description  post something useful
// @include      *://*syn-ch.com/*
// @include      *://*syn-ch.org/*
// @include      *://*syn-ch.ru/*
// @include      *://*syn-ch.com.ua/*
// @updateURL    https://github.com/desudesutalk/randomtrash/raw/master/tripwars/tripwars.user.js
// @copyright    2015+, me
// @run-at       document-end
// ==/UserScript==

function odometer() {
	var posts = document.querySelectorAll('form div.post.reply'),
		i, lastPost, lastTime, qhPost, qhTime, qhNum = 0;

	if (posts.length > 1) {
		lastPost = parseInt(posts[posts.length - 1].id.replace('reply_', ''));
		lastTime = (new Date()).getTime();

		for (var i = posts.length - 1; i >= 0; i--) {
			qhPost = parseInt(posts[i].id.replace('reply_', ''));
			qhTime = (new Date(posts[i].querySelector('time').getAttributeNode("datetime").value)).getTime();
			qhNum++;
			if (lastTime - qhTime >= 15 * 60 * 1000) break;
		}
		var secToBL = Math.floor((500 - posts.length) * ((lastTime - qhTime) / qhNum) / 1000),
			timeToBL = '',
			s = secToBL,
			d, h, m = 1;

		if (secToBL > 24 * 60 * 60) {
			d = Math.floor(s / 86400);
			s -= d * 86400;
			timeToBL = d + 'd ';
		}
		if (secToBL > 60 * 60) {
			h = Math.floor(s / 3600);
			s -= h * 3600;
			timeToBL += h + 'h ';
		}
		if (secToBL > 60) {
			m = Math.floor(s / 60);
			s -= m * 60;
		}
		timeToBL += m + 'm';

		if (secToBL < 0) {
			timeToBL = 'NOW!';
		}		

		return {
			speed: Math.floor(qhNum / (lastTime - qhTime) * 1000 * 60 * 60),
			percent: Math.floor(qhNum / (1 + lastPost - qhPost) * 100),
			secondsToBL: secToBL,
			timeToBL: timeToBL
		};
	}

	return {
		speed: 0,
		percent: 0,
		secondsToBL: "?",
		timeToBL: "?"
	};
}

var tgStats = {},
	tgPostHits = {};

function killTrip(trip){
	tgStats[trip].energy = 0;
	tgStats[trip].shkvarki = {};
	tgStats[trip].title = null;

	for (var property in tgStats) {
	    if (tgStats.hasOwnProperty(property)) {
	        tgStats[property].shkvarki[trip] = undefined;
	        delete tgStats[property].shkvarki[trip]
	        
	        if(tgStats[property].title && tgStats[property].title.from == trip){
	        	tgStats[property].title = null;
	        }
	    }
	}
}

function parsePostResults(p){
	var file = p.querySelector('.file-info a'),
		trip = p.querySelector('.intro span.trip'),
		refs = p.querySelectorAll('div.body a[onclick^=highlightReply]'),
		name = p.querySelector('.intro span.name'),
		spoils = p.querySelectorAll('div.body span.spoiler'),
		pid = p.id.replace('reply_', ''),
		hits = [], rnd, i, j, r, m, t, atck, tCost;

	if(!trip) return null;	

	if(file) {
		m = file.textContent.match(/\d+\-([0-9a-f]+)\./);
		rnd = parseInt(m[1], 16);
	}
		
	trip = trip.textContent.substring(0,12);
	name = name.textContent;

	if(!tgStats[trip]){
		tgStats[trip] = {name: name, trip: trip, energy: 1, shkvarki: {}, title: null}
	}else{
        tgStats[trip].energy++;
    }

	if(!tgPostHits[pid]){
		tgPostHits[pid] = {from: trip, hits:{}}
	}
	
	for (i = 0; i < spoils.length; i++) {
		m = spoils[i].textContent.match(/^([astf])(:([a-z0-9а-я\-\s]+))?:(!{1,2}.+)$/i);
		if(!m) continue;
		if(m[4] == trip) break;

		if(file && m[1].toUpperCase() == 'A' && tgStats[trip].energy > 5 && tgStats[m[4]]){
			atck = Math.round(((rnd & 255) / 255) * 60 - 10);
			tgStats[trip].energy -= 5;
			if(atck < 0){
				tgStats[trip].energy += atck;
				killTrip(trip);
			}else{
				tgStats[m[4]].energy -= atck;
				killTrip(m[4]);
			}
		}
		
		if(m[1].toUpperCase() == 'S' && tgStats[trip].energy > 5 && tgStats[m[4]] && !tgStats[m[4]].shkvarki[trip]){
			tgStats[trip].energy -= 5;
			tgStats[m[4]].shkvarki[trip] = true;
		}

		if(m[1].toUpperCase() == 'T' && m[3] && tgStats[m[4]]){
			tCost = 10;
			if(tgStats[m[4]].title){
				tCost = tgStats[m[4]].title.cost * 2;
			}
			if(tgStats[trip].energy <= tCost) break;

			tgStats[m[4]].title ={
				from: trip,
				cost: tCost,
				title: m[3]
			}

			tgStats[trip].energy -= tCost;
		}

		break;
	}

	for (i = 0; i < refs.length; i++) {
		m = refs[i].textContent.match(/>>(\d+)/);
		if(!m) continue;
		t = m[1];
		if(t == trip) continue;

		if(!tgPostHits[t] || tgPostHits[t].trip == trip || tgPostHits[t].hits[trip]) continue;
		tgPostHits[t].hits[trip] = true;
		tgStats[tgPostHits[t].from].energy += 5;
	}
}

function initTripGame(){
	var posts = document.querySelectorAll('form div.post.reply'),
		i;
	
	tgStats = {};
	tgPostHits = {};

	for (i = 0; i < posts.length && i < 500; i++) {
		parsePostResults(posts[i]);
	}

	renderTripGame();
    $('#tripwars').on('click', function(e){
        if(e.target.nodeName != 'A') return false;
        if(e.target.textContent == 'A'){
            $('form textarea#body').val($('form textarea#body').val() + '\n[h]A:'+e.target.parentNode.parentNode.dataset.trip+'[/h]');
        }
        if(e.target.textContent == 'S'){
            $('form textarea#body').val($('form textarea#body').val() + '\n[h]S:'+e.target.parentNode.parentNode.dataset.trip+'[/h]');
        }
        if(e.target.textContent == 'T'){
            $('form textarea#body').val($('form textarea#body').val() + '\n[h]T:'+prompt('Звание: ')+':'+e.target.parentNode.parentNode.dataset.trip+'[/h]');
        }
    });
}

function renderTripGame(){
	var pleers = [], diff, difTxt, shkvarki, t;
	
	for (var property in tgStats) {
	    if (tgStats.hasOwnProperty(property)) {
	        pleers.push(tgStats[property]);
	    }
	}

	pleers.sort(function(a, b) {
	  return b.energy - a.energy;
	});

	$('#tripwars').empty();

	for (var i = 0; i < pleers.length; i++) {
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
			shkvarki = '<span class="fr">КУДАХ</span>';
		}

		if(i == 0){
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAFVBMVEU0AAAAAAAAEf8/NiMtX2PueUL///+0Rm5gAAAAAXRSTlMAQObYZgAAARhJREFUOMut0luqAjEMBuCOl/cJ2ncpzPuR0AUIbqCGLsD9b+IkvU0zdR4Eg4Lm88+0QWNKTfyC2YwF8wTwQaQrtQuD1P4wrAHsTNpGdgG+hel3AL+DZ60OJv5wavB8rPuCdVKO1FR/1Kt6EEuUCv0R8jBL6K1F9JFQne3Mv7dWUoR47yLn+Oa2vBlQQQwxFyLd1agNlFuuQBgSmAa2gLcC8whBEusSZVIahiFgv13uhgzRaiCAS06QBr4XL0QSqEAujCinvWhIfY7w9fBPA3HI85tU3xzTGM8pMhvwebN+gFJxBzj3GfgmNwVLC7wUuNgCznX9w5IOK7t6OVcjB+fcIksPBao4Kfn7JEjfbgpiDShYCqQv+fH/e2h063llRdsAAAAASUVORK5CYII=" style="width:25px;" title="Чак Норрис" alt="Чак Норрис"></span>';
		}

		$('#tripwars').append('<div data-trip="'+pleers[i].trip+'"' + (i == 0? ' style="font-size:16px"':'') + '>'+ 
			(pleers[i].title? '<em>'+pleers[i].title.title+'</em> ' : '') +
			'<strong>' + pleers[i].name +'</strong><span style="color: #228854;">'+pleers[i].trip+'</span>'+
			'<span class="fr badge"><strong>'+pleers[i].energy+'</strong></span>'+
			'<span class="fr">'+difTxt+'</span>'+
			shkvarki+
			'<span class="ctrls">[<a href="javascript:;" title="пульнуть">A</a>]&nbsp;[<a href="javascript:;" title="дать шкварку">S</a>]&nbsp;[<a href="javascript:;" title="дать титул">T</a>]</span><br>'+
 			'</div>');
		tgStats[pleers[i].trip].prev = pleers[i].energy;
	}
}

$(function(){
	if (window.location.pathname.match(/\/\w+\/res\/[0-9\+]+\.html/)) {
		$(document).on('new_post', function(e, b){
			var i,
				posts = document.querySelectorAll('form div.post.reply');
				if(posts.length > 500){
					renderTripGame();
					return true;
				}

			for (i = 0; i < b.length; i++) {
				parsePostResults(b[i]);
			}
			renderTripGame();
			return true;
		});
		$('body').append('<div id="tripwars"></div>');
		$('head').append('<style type="text/css">  #tripwars { max-height: 90%; overflow-y: auto; min-width: 300px; position: fixed; top: 40px; right: 30px; background: #fff; padding: 5px; font-size: 12px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25); font-family: \'Roboto\', Arial, sans-serif; counter-reset: pstn; } #tripwars div:before { counter-increment: pstn; content: counter(pstn) ": "; } #tripwars div { padding: 5px; border-bottom: 1px solid #eee; position: relative; } #tripwars span.fr{ float: right; margin-left: 5px; } #tripwars div:hover span.fr{ visibility: hidden; } #tripwars div:hover span.ctrls{ display: block; position: absolute; right: 0; top: 0; margin-top: auto; margin-bottom: auto; bottom: 0; height: 12px; } #tripwars div span.ctrls{ display: none; } #tripwars span.badge{ color: white; background: #3db; padding: 3px; border-radius: 10px; } #tripwars br{ clear: both; } </style>');
		initTripGame();
		
		// Odometer
		function updateOdometer(){
			var spd = odometer();
			$('#odometer').text('Speed: ' + spd.speed + 'pph (' + spd.percent + '%) Autosage in: ' + spd.timeToBL);
		}
		$('body').append('<div id="odometer" style="position: fixed; top: 10px; right: 30px; background: #fff; padding: 5px; font-size: 10px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25);"></div>');
		setInterval(updateOdometer, 15000);
		updateOdometer();
        $(document).on('new_post', updateOdometer);
	}
});
