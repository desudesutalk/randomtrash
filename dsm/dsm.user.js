// ==UserScript==
// @name        dodometer
// @namespace   udp://desushelter/
// @include     *://dva-ch.net/*/*
// @version     3
// @grant       none
// @updateURL   https://github.com/desudesutalk/randomtrash/raw/master/dsm/dsm.user.js
// @copyright   2015+, me
// @run-at      document-end
// ==/UserScript==


function str2date(dateStr) {
	var s, months = ['NULLYABR', 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
	m = dateStr.toLowerCase().match(/\S+\s+(\S+)\s(\d+)\s(\d+):(\d+):(\d+)\s(\d+)/);
	s = m[6] + '-' + months.indexOf(m[1]) + '-' + m[2] + ' ' + m[3] + ':' + m[4] + ':' + m[5];
	return new Date(s);
}

function nextGet(n) {
	var cur = '' + n,
		first = cur.substring(0, 1),
		first2 = cur.substring(0, 2),
		all = '1234567890',
		nn = ['000000000', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888', '999999999'],
		gets = [],
		i;
	n = parseInt(n);
	gets.push(n);

	gets.push(parseInt(all.substring(0, cur.length)));
	gets.push(parseInt(all.substring(0, cur.length + 1)));
	gets.push(parseInt((first2 + nn[0]).substring(0, cur.length)));

	for (i = 0; i < nn.length; i++) {
		gets.push(parseInt((first + nn[i]).substring(0, cur.length)));
	}
	gets.sort(function(a, b) {
		return a - b; });
	return gets[gets.indexOf(n) + 1];
}

function sec2time(secToBL) {
	var timeToBL = '',
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

	return timeToBL;
}

function odometer() {



	var posts = document.querySelectorAll('form table.post .reply:not(.de-pview)'),
		i, lastPost, lastTime, qhPost, qhTime, qhNum = 0;

	if (posts.length > 1) {
		lastPost = parseInt(posts[posts.length - 1].id.replace('reply_', ''));
		lastTime = (new Date()).getTime();

		for (i = posts.length - 1; i >= 0; i--) {
			qhPost = parseInt(posts[i].id.replace(/[^0-9]/g, ''));
			qhTime = str2date(posts[i].querySelector('span.posttime').textContent).getTime();
			qhNum++;
			if (lastTime - qhTime >= 30 * 60 * 1000) break;
		}

		var secToBL = Math.floor((500 - posts.length) * ((lastTime - qhTime) / qhNum) / 1000),
			timeToBL = sec2time(secToBL);

		return {
			speed: Math.floor(qhNum / (lastTime - qhTime) * 1000 * 60 * 60),
			timePerPost: (lastTime - qhTime) / (lastPost - qhPost),
			percent: Math.floor(qhNum / (1 + lastPost - qhPost) * 100),
			secondsToBL: secToBL,
			timeToBL: timeToBL,
			lastPost: lastPost
		};
	}

	return {
		speed: 0,
		percent: 0,
		secondsToBL: "?",
		timeToBL: "?",
		lastPost: null
	};
}

function updateOdometer() {
	var spd = odometer(),
		ng = nextGet(spd.lastPost),
		ttg = ((ng - spd.lastPost) * spd.timePerPost / 1000) | 0,
		getStr = '<br><span><strong>' + ng + '</strong>-get in ' + sec2time(ttg) + '</span>';


	$('#odometer').empty();
	if (spd.timeToBL == 'NOW!') {
		$('#odometer').append('<strong style="color: red;">Speed: ' + spd.speed + 'pph (' + spd.percent + '%) AUTOSAGE!!!</strong>' + getStr);
	} else {
		$('#odometer').append('<span>Speed: ' + spd.speed + 'pph (' + spd.percent + '%) Autosage in: ' + spd.timeToBL + '</span>' + getStr);
	}

}

var tbEvents = false,
	scanTimer;

function twScanner() {
	clearTimeout(scanTimer);

	scanTimer = setTimeout(function() {
		updateOdometer();
	}, 500);
}

function postInserted(event) {
	if (tbEvents) return true;
	if (event.originalEvent.animationName != 'twNInsrt') return true;

	twScanner();
	return true;
}

$(function() {
	if (window.location.pathname.match(/\/\w+\/(res|arch)\/[0-9\+]+\.html/)) {

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
			'form .reply .postMessage ' + animationTrigger + '</style>').appendTo('head');
		$(document).bind('animationstart', postInserted).bind('webkitAnimationStart', postInserted);
	}
});
