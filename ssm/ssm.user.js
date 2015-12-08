// ==UserScript==
// @name         SynchSpeedMeter
// @namespace    udp://SynchTripWars/*
// @version      0.0.1
// @description  post something useful
// @include      *://*syn-ch.com/*
// @include      *://*syn-ch.org/*
// @include      *://*syn-ch.ru/*
// @include      *://*syn-ch.com.ua/*
// @updateURL    https://github.com/desudesutalk/randomtrash/raw/master/ssm/ssm.user.js
// @copyright    2015+, me
// @run-at       document-end
// ==/UserScript==

function odometer() {
	var posts = document.querySelectorAll('form div.post.reply:not(.de-pview)'),
		i, lastPost, lastTime, qhPost, qhTime, qhNum = 0;

	if (posts.length > 1) {
		lastPost = parseInt(posts[posts.length - 1].id.replace('reply_', ''));
		lastTime = (new Date()).getTime();

		for (i = posts.length - 1; i >= 0; i--) {
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

var tbEvents = false,
	scanTimer;

function twScanner(){
	clearTimeout(scanTimer);

	scanTimer = setTimeout(function(){
		updateOdometer();		
	}, 500);	
}

function postInserted(event){
	if(tbEvents) return true;
	if(event.originalEvent.animationName != 'twNInsrt') return true;
	
	twScanner();
	return true;
}

$(function(){
	if (window.location.pathname.match(/\/\w+\/(res|arch)\/[0-9\+]+\.html/)) {
		$(document).on('new_post', function(e, b){
			tbEvents = true;
			twScanner();
			return true;
		});

		var m = window.location.pathname.match(/\/\w+\/(res|arch)\/([0-9\+]+)\.html/);
		$('body').append('<div id="tripwars"><span id="odometer"></span></div>');
		$('head').append('<style type="text/css"> #tripwars {position: fixed; top: 15px; right: 30px; background: #fff; padding: 5px; font-size: 12px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25);}</style>');

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
