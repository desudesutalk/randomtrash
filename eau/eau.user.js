// ==UserScript==
// @name        EchAutoUpdate
// @namespace   udp://ddt/
// @include     *://ech.su/*/*
// @version     1
// @grant       none
// @updateURL   https://github.com/desudesutalk/randomtrash/raw/master/eau/eau.user.js
// ==/UserScript==

var upTimer, counter = 30,
	p, t;

function UpdateThread() {
	p.textContent = '...';
	clearTimeout(upTimer);
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function() {
		var n, t, i, l, frag = document.createElement('div');
		frag.innerHTML = this.responseText;
		t = frag.querySelectorAll('div.postnode');

		for (i = t.length - 1; i >= 0; i--) {
			n = document.getElementById(t[i].id);
			if (n) {
				l = n;
			} else {
				if (!p) {
					document.querySelector('div.thread').appendChild(t[i]);
				} else {
					document.querySelector('div.thread').insertBefore(t[i], l);
				}
				l = t[i];
			}
		}

		counter = 30;
		p.textContent = counter;
		upTimer = setTimeout(updTicker, 1000);
	});
	oReq.responseType = 'text';
	oReq.open("GET", document.location);
	oReq.send();

}

function updTicker() {
	counter--;
	if (counter <= 0) {
		UpdateThread();
	} else {
		p.textContent = counter;
		upTimer = setTimeout(updTicker, 1000);
	}
}

t = document.createElement('span');
t.innerHTML = '&nbsp;[<a href="javascript:;" id="updt-link">Обновить</a>: <span id="updt-cntr">30</span>]';
t.querySelector('#updt-link').onclick = UpdateThread;
document.querySelector('div.thread-bottom').appendChild(t);
p = t.querySelector('#updt-cntr');
upTimer = setTimeout(updTicker, 1000);
