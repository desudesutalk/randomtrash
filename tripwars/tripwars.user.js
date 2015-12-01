// ==UserScript==
// @name         SynchTripWars
// @namespace    udp://SynchTripWars/*
// @version      0.0.16
// @description  post something useful
// @include      *://*syn-ch.com/*
// @include      *://*syn-ch.org/*
// @include      *://*syn-ch.ru/*
// @include      *://*syn-ch.com.ua/*
// @updateURL    https://github.com/desudesutalk/randomtrash/raw/master/tripwars/tripwars.user.js
// @copyright    2015+, me
// @run-at       document-end
// ==/UserScript==

function bytesToHex(bytes){
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}

var strToUTF8Arr = function(sDOMStr) {
	"use strict";
	var aBytes, nChr, nStrLen = sDOMStr.length, nArrLen = 0;

	/* mapping... */

	for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
		nChr = sDOMStr.charCodeAt(nMapIdx);
		nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
	}

	aBytes = new Uint8Array(nArrLen);

	/* transcription... */

	for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
		nChr = sDOMStr.charCodeAt(nChrIdx);
		if (nChr < 128) {
			/* one byte */
			aBytes[nIdx++] = nChr;
		} else if (nChr < 0x800) {
			/* two bytes */
			aBytes[nIdx++] = 192 + (nChr >>> 6);
			aBytes[nIdx++] = 128 + (nChr & 63);
		} else if (nChr < 0x10000) {
			/* three bytes */
			aBytes[nIdx++] = 224 + (nChr >>> 12);
			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
			aBytes[nIdx++] = 128 + (nChr & 63);
		} else if (nChr < 0x200000) {
			/* four bytes */
			aBytes[nIdx++] = 240 + (nChr >>> 18);
			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
			aBytes[nIdx++] = 128 + (nChr & 63);
		} else if (nChr < 0x4000000) {
			/* five bytes */
			aBytes[nIdx++] = 248 + (nChr >>> 24);
			aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
			aBytes[nIdx++] = 128 + (nChr & 63);
		} else /* if (nChr <= 0x7fffffff) */ {
			/* six bytes */
			aBytes[nIdx++] = 252 + /* (nChr >>> 32) is not possible in ECMAScript! So...: */ (nChr / 1073741824);
			aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
			aBytes[nIdx++] = 128 + (nChr & 63);
		}
	}
	return aBytes;
};

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

		if (secToBL <= 0) {
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

function updateOdometer(){
	var spd = odometer();
	$('#odometer').empty();
	if(spd.timeToBL == 'NOW!'){
		$('#odometer').append('<strong style="color: red;">Speed: ' + spd.speed + 'pph (' + spd.percent + '%) AUTOSAGE!!!</strong>');
	}else{
		$('#odometer').append('<span>Speed: ' + spd.speed + 'pph (' + spd.percent + '%) Autosage in: ' + spd.timeToBL+'</span>');
	}
	
}

var tgStats = {},
	tgPostHits = {};

function killTrip(trip){
	if(tgStats[trip].energy > 0) return true;
	tgStats[trip].energy = 0;
	tgStats[trip].shkvarki = {};
	tgStats[trip].title = null;
	tgStats[trip].ava = null;
}

function parsePostResults(p){
	var file = p.querySelector('.file-info a'),
		trip = p.querySelector('.intro span.trip'),
		refs = p.querySelectorAll('div.body a[onclick^=highlightReply]'),
		name = p.querySelector('.intro span.name'),
		spoils = p.querySelectorAll('div.body span.spoiler'),
		img = p.querySelector('img.post-image'), imgSrc, imgW, imgH,
		pid = p.id.replace('reply_', ''),
		hits = [], rnd, i, j, r, m, t, atck, tCost;

	if(!trip) return null;
	trip = trip.textContent.substring(0,12);
	name = name.textContent;

	if(!tgPostHits[pid]){
		tgPostHits[pid] = {from: trip, hits:{}}
	}else{
		return false;
	}

	p.classList.add('tw-' + bytesToHex(strToUTF8Arr(trip)));

	if(img){
		m = img.src.match(/thumb(\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$)/i);
		if(m){
			imgSrc = m[1];
			imgW = img.width;
			imgH = img.height;
		}
		
	}

	if(file) {
		m = file.textContent.match(/\d+\-([0-9a-f]+)\./);
		rnd = parseInt(m[1], 16);
	}

	if(!tgStats[trip]){
		tgStats[trip] = {name: name, trip: trip, energy: 1, shkvarki: {}, title: null}
	}else{
		if(tgStats[trip].raped != curThread){
			tgStats[trip].energy++;
		}
		tgStats[trip].name = name;
	}

	tgStats[trip].lastThread = curThread;
	
	for (i = 0; i < spoils.length; i++) {
		m = spoils[i].textContent.match(/^([a-z0-9])(:([a-z0-9а-я\-\s]{0,30}))?:(!{1,2}.+)$/i);
		if(!m) continue;
		if(m[4] == trip) break;

		if(file && m[1].toUpperCase() == 'A' && tgStats[trip].energy > 5 && tgStats[m[4]]){
			atck = Math.round(((rnd & 255) / 255) * 55 - 5);
			tgStats[trip].energy -= 5;
			if(atck < 0){
				tgStats[trip].energy += atck;
				killTrip(trip);
			}else{
				tgStats[m[4]].energy -= atck;
				killTrip(m[4]);
			}
		}

		if(file && m[1].toUpperCase() == 'R' && tgStats[trip].energy > 100 && tgStats[m[4]]){
			if(tgStats[trip].energy <= tgStats[m[4]].energy) continue;
			
			atck = (rnd & 255) / 255;
			if(atck < 0.5){
				t = tgStats[trip].energy;
				tgStats[trip].energy = tgStats[m[4]].energy;
				tgStats[m[4]].energy = t;
				tgStats[trip].energy -= 100;
				killTrip(trip);
				break;
			}

			tgStats[m[4]].raped = curThread;
			tgStats[trip].energy -= 100;
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

		if(m[1].toUpperCase() == 'F' && tgStats[trip].energy >= 50 && tgStats[m[4]]){
			tgStats[trip].energy -= 30;
			tgStats[m[4]].energy += 25;
		}

		if(imgSrc && m[1].toUpperCase() == 'I' && tgStats[trip].energy > 250 && tgStats[m[4]]){
			tgStats[trip].energy -= 250;
			tgStats[m[4]].ava = {
				from: trip,
				src: imgSrc,
				width: imgW,
				height: imgH,
				thread: curThread
			};
		}

		break;
	}

	for (i = 0; i < refs.length; i++) {
		m = refs[i].textContent.match(/>>(\d+)/);
		if(!m) continue;
		t = m[1];

		if(!tgPostHits[t] || tgPostHits[t].from == trip || tgPostHits[t].hits[trip] || tgStats[tgPostHits[t].from].raped == curThread) continue;
		tgPostHits[t].hits[trip] = true;
		tgStats[tgPostHits[t].from].energy += tgStats[trip].energy > 50 ? 5 : 1;
	}
	return true;
}

function parseTripGame(){
	var posts = document.querySelectorAll('form div.post.reply'),
		i;

	for (i = 0; i < posts.length && i < 500; i++) {
		parsePostResults(posts[i]);
	}

	renderTripGame();

	if(posts.length >= 500){
		if(!localStorage.twBaseThread || curThread > localStorage.twBaseThread){
			localStorage.twBaseThread = curThread;
			localStorage.twBaseStats = JSON.stringify(tgStats);
		}
	}
}

function renderTripGame(){
	console.time('tw render');
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
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAnKQD/AADz/wCPxeqtAAAAAXRSTlMAQObYZgAAADZJREFUCNdjYMAGBKA0oyGMYQwVEjY2hDGgQoKCghCGkJISjKECFxGEMYQFYAxDqC5BASw2AwAbAQRmB+kZqAAAAABJRU5ErkJggg== title="КУДАХ" alt="КУДАХ"></span>';
		}

		if(i == 0){
			shkvarki = '<span class="fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAFVBMVEU0AAAAAAAAEf8/NiMtX2PueUL///+0Rm5gAAAAAXRSTlMAQObYZgAAARhJREFUOMut0luqAjEMBuCOl/cJ2ncpzPuR0AUIbqCGLsD9b+IkvU0zdR4Eg4Lm88+0QWNKTfyC2YwF8wTwQaQrtQuD1P4wrAHsTNpGdgG+hel3AL+DZ60OJv5wavB8rPuCdVKO1FR/1Kt6EEuUCv0R8jBL6K1F9JFQne3Mv7dWUoR47yLn+Oa2vBlQQQwxFyLd1agNlFuuQBgSmAa2gLcC8whBEusSZVIahiFgv13uhgzRaiCAS06QBr4XL0QSqEAujCinvWhIfY7w9fBPA3HI85tU3xzTGM8pMhvwebN+gFJxBzj3GfgmNwVLC7wUuNgCznX9w5IOK7t6OVcjB+fcIksPBao4Kfn7JEjfbgpiDShYCqQv+fH/e2h063llRdsAAAAASUVORK5CYII=" style="width:25px;" title="Чак Норрис" alt="Чак Норрис"></span>';
		}

		var tripClasses = [];
		if(pleers[i].raped == curThread) tripClasses.push('twRaped');
		if(pleers[i].lastThread != curThread && i != 0) tripClasses.push('twAway');

		$('#twContent').append('<div data-trip="'+pleers[i].trip+'"' + 
			(i == 0? ' style="font-size:16px"':'') + ' class="'+ tripClasses.join(' ') +'">' + 
			(pleers[i].title? '<em>'+pleers[i].title.title+'</em> ' : '') +
			'<strong>' + pleers[i].name +'</strong><span style="color: #228854;">'+pleers[i].trip+'</span>'+
			'<span class="fr badge"><strong>'+pleers[i].energy+'</strong></span>'+
			'<span class="fr">'+difTxt+'</span>'+
			shkvarki+
			'<br><span class="ctrls">[<a href="javascript:;" title="пульнуть">A</a>]&nbsp;[<a href="javascript:;" title="дать шкварку">S</a>]&nbsp;[<a href="javascript:;" title="дать титул">T</a>]&nbsp;[<a href="javascript:;" title="покормить">F</a>]&nbsp;[<a href="javascript:;" title="RAEP!">R</a>]&nbsp;[<a href="javascript:;" title="новое лицо">I</a>]</span>'+
			'</div>');
		tgStats[pleers[i].trip].prev = pleers[i].energy;
	}
	$('head #twAvaStyle').replaceWith('<style type="text/css" id="twAvaStyle">'+avas.join(' ')+'</style>');
	console.timeEnd('tw render');
}
var tbEvents = false,
	scanTimer;

function twScanner(){
	clearTimeout(scanTimer);

	scanTimer = setTimeout(function(){
		parseTripGame();
		updateOdometer();		
	}, 500);	
}

function postInserted(event){
	if(tbEvents) return true;
	if(event.animationName != 'twNInsrt') return true;
	
	twScanner();
	return true;
}

var curThread, baseThread;

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
			tgStats = JSON.parse(localStorage.twBaseStats);
			baseThread = localStorage.twBaseThread;
		}

		$('body').append('<div id="tripwars"><span id="twCollapser"><i class="fa fa-minus-square"></i></span> <span id="twConf"><i class="fa fa-cog"></i></span> <span id="twHideAway"><i class="fa fa-eye"></i></span><span id="odometer" style="float: right;"></span><div id="twContent"></div><div id="twConfig"><strong>TripWars</strong> v'+(typeof GM_info !== 'undefined' ? GM_info.script.version : GM_getMetadata("version"))+'<br><textarea id="twConfArea"></textarea><br/><button id="twApplyConf">применить</button></div></div>');
		$('head').append('<style type="text/css">   #tripwars { max-height: 90%; overflow-y: auto; min-width: 400px; position: fixed; top: 15px; right: 30px; background: #fff; padding: 5px; font-size: 12px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25); counter-reset: pstn; } #twContent div:before { counter-increment: pstn; content: counter(pstn) ": "; } #twContent div { padding: 5px; border-bottom: 1px solid #eee; position: relative; } #tripwars span.fr{ float: right; margin-left: 5px; } #tw0Content div:hover span.fr{ visibility: hidden; } #twContent div:hover span.ctrls{ display: block; } #twContent div span.ctrls{ display: none; } #tripwars span.badge{ color: white; background: #3db; padding: 3px; border-radius: 10px; } #tripwars br{ clear: both; } .twShowLess div { display:none; } .twShowLess div:first-child { display:block; } #twCollapser, #twConf, #twHideAway {cursor: pointer;} .twShowConfig #twContent {display: none;} #twConfig {display:none;} .twShowConfig #twConfig {display: block;} #twConfig textarea {margin: 0 !important; width: 400px; resize: vertical; min-height:400px;} .twRaped > span:not(.badge), .twRaped > strong, .twRaped > em {color: pink !important;} .twAway:not(:hover) * {opacity: 0.75} .twHideAway .twAway {display:none !important;}</style>');
		$('head').append('<style type="text/css" id="twAvaStyle"></style>');
		$('#twCollapser').on('click', function(){$('#twContent').toggleClass('twShowLess');$('#tripwars').removeClass('twShowConfig')});
		$('#twHideAway').on('click', function(){$('#twContent').toggleClass('twHideAway');$('#tripwars').removeClass('twShowConfig')});
		$('#twConf').on('click', function(){$('#tripwars').toggleClass('twShowConfig')});
		$('#tripwars').on('click', function(e){
			var cmd = e.target.textContent, title;
			if(e.target.nodeName != 'A') return false;

			var trip = e.target.parentNode.parentNode.dataset.trip;

			if(cmd == 'A'){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]A:'+trip+'[/h]');
			}
			if(cmd == 'S'){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]S:'+trip+'[/h]');
			}
			if(cmd == 'T'){
				title = prompt('Звание (30 символов, русские и английские буквы, цифры, пробел и минус): ').replace(/[^a-z0-9а-я\-\s]/ig, '').substring(0,30);
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]T:'+title.substring(0,30)+':'+trip+'[/h]');
			}
			if(cmd == 'F'){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]F:'+trip+'[/h]');
			}
			if(cmd == 'R'){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]R:'+trip+'[/h]');
			}
			if(cmd == 'I'){
				$('form textarea#body').val($('form textarea#body').val() + '\n[h]I:'+trip+'[/h]');
			}
		});

		$('#twConfArea').val(JSON.stringify({
			twBaseStats: JSON.parse(localStorage.twBaseStats || "{}"),
			twBaseThread: localStorage.twBaseThread || curThread 
		}));

		$('#twApplyConf').on('click', function(){
			var conf = JSON.parse($('#twConfArea').val());
			
			tgStats = conf.twBaseStats;
			tgPostHits = {}
			
			localStorage.twBaseStats = JSON.stringify(tgStats);
			localStorage.twBaseThread = conf.twBaseThread;
			baseThread = conf.twBaseThread;

			parseTripGame();
		});

		parseTripGame();
		
		// Odometer
		setInterval(updateOdometer, 15000);
		updateOdometer();

		//InsertAnimation watcher
		var insertAnimation = ' twNInsrt {from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}',
			animationTrigger = '{animation-duration:0.001s;-o-animation-duration:0.001s;-ms-animation-duration:0.001s;-moz-animation-duration:0.001s;-webkit-animation-duration:0.001s;animation-name:twNInsrt;-o-animation-name:twNInsrt;-ms-animation-name:twNInsrt;-moz-animation-name:twNInsrt;-webkit-animation-name:twNInsrt;}';
		$('<style type="text/css">@keyframes ' + insertAnimation + '@-moz-keyframes ' + insertAnimation + '@-webkit-keyframes ' +
			insertAnimation + '@-ms-keyframes ' + insertAnimation + '@-o-keyframes ' + insertAnimation +
			'form .reply .body ' + animationTrigger + '</style>').appendTo('head');
		$(document).bind('animationstart', postInserted).bind('MSAnimationStart', postInserted).bind('webkitAnimationStart', postInserted);
	}
});
