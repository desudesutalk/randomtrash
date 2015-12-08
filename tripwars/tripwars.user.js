// ==UserScript==
// @name         SynchTripWars
// @namespace    udp://SynchTripWars/*
// @version      0.0.28
// @description  post something useful
// @include      *://*syn-ch.com/*
// @include      *://*syn-ch.org/*
// @include      *://*syn-ch.ru/*
// @include      *://*syn-ch.com.ua/*
// @updateURL    https://github.com/desudesutalk/randomtrash/raw/master/tripwars/tripwars.meta.js
// @copyright    2015+, me
// @run-at       document-end
// ==/UserScript==

/*
 * js-md5 v0.3.0
 * https://github.com/emn178/js-md5
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function(q,F){var u="undefined"!=typeof module;u&&(q=global,q.JS_MD5_TEST&&(q.navigator={userAgent:"Firefox"}));var C=(q.JS_MD5_TEST||!u)&&-1!=navigator.userAgent.indexOf("Firefox"),y=!q.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),D=[128,32768,8388608,-2147483648],t=[0,8,16,24],e=[],r;if(y){var A=new ArrayBuffer(68);r=new Uint8Array(A);e=new Uint32Array(A)}var x=function(g){var q="string"!=typeof g;q&&g.constructor==ArrayBuffer&&(g=new Uint8Array(g));var k,l,m,n,b,
a,d,c,h,u=!0,x=!1,p=0,v=0,z=0,w=g.length;e[16]=0;do{e[0]=e[16];e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0;if(q)if(y)for(a=v;p<w&&64>a;++p)r[a++]=g[p];else for(a=v;p<w&&64>a;++p)e[a>>2]|=g[p]<<t[a++&3];else if(y)for(a=v;p<w&&64>a;++p)b=g.charCodeAt(p),128>b?r[a++]=b:(2048>b?r[a++]=192|b>>6:(55296>b||57344<=b?r[a++]=224|b>>12:(b=65536+((b&1023)<<10|g.charCodeAt(++p)&1023),r[a++]=240|b>>18,r[a++]=128|b>>12&63),r[a++]=128|b>>6&63),r[a++]=128|b&63);else for(a=
v;p<w&&64>a;++p)b=g.charCodeAt(p),128>b?e[a>>2]|=b<<t[a++&3]:(2048>b?e[a>>2]|=(192|b>>6)<<t[a++&3]:(55296>b||57344<=b?e[a>>2]|=(224|b>>12)<<t[a++&3]:(b=65536+((b&1023)<<10|g.charCodeAt(++p)&1023),e[a>>2]|=(240|b>>18)<<t[a++&3],e[a>>2]|=(128|b>>12&63)<<t[a++&3]),e[a>>2]|=(128|b>>6&63)<<t[a++&3]),e[a>>2]|=(128|b&63)<<t[a++&3]);z+=a-v;v=a-64;p==w&&(e[a>>2]|=D[a&3],++p);p>w&&56>a&&(e[14]=z<<3,x=!0);u?(b=e[0]-680876937,b=(b<<7|b>>>25)-271733879<<0,c=(-1732584194^b&2004318071)+e[1]-117830708,c=(c<<12|c>>>
20)+b<<0,d=(-271733879^c&(b^-271733879))+e[2]-1126478375,d=(d<<17|d>>>15)+c<<0,a=(b^d&(c^b))+e[3]-1316259209):(b=k,a=l,d=m,c=n,b+=(c^a&(d^c))+e[0]-680876936,b=(b<<7|b>>>25)+a<<0,c+=(d^b&(a^d))+e[1]-389564586,c=(c<<12|c>>>20)+b<<0,d+=(a^c&(b^a))+e[2]+606105819,d=(d<<17|d>>>15)+c<<0,a+=(b^d&(c^b))+e[3]-1044525330);a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[4]-176418897;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[5]+1200080426;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[6]-1473231341;d=(d<<17|d>>>15)+c<<0;a+=(b^d&
(c^b))+e[7]-45705983;a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[8]+1770035416;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[9]-1958414417;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[10]-42063;d=(d<<17|d>>>15)+c<<0;a+=(b^d&(c^b))+e[11]-1990404162;a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[12]+1804603682;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[13]-40341101;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[14]-1502002290;d=(d<<17|d>>>15)+c<<0;a+=(b^d&(c^b))+e[15]+1236535329;a=(a<<22|a>>>10)+d<<0;b+=(d^c&(a^d))+e[1]-165796510;b=(b<<5|
b>>>27)+a<<0;c+=(a^d&(b^a))+e[6]-1069501632;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[11]+643717713;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[0]-373897302;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[5]-701558691;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[10]+38016083;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[15]-660478335;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[4]-405537848;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[9]+568446438;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[14]-1019803690;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[3]-
187363961;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[8]+1163531501;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[13]-1444681467;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[2]-51403784;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[7]+1735328473;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[12]-1926607734;a=(a<<20|a>>>12)+d<<0;h=a^d;b+=(h^c)+e[5]-378558;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[8]-2022574463;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[11]+1839030562;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[14]-35309556;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^
c)+e[1]-1530992060;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[4]+1272893353;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[7]-155497632;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[10]-1094730640;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^c)+e[13]+681279174;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[0]-358537222;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[3]-722521979;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[6]+76029189;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^c)+e[9]-640364487;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[12]-421815835;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[15]+530742520;
d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[2]-995338651;a=(a<<23|a>>>9)+d<<0;b+=(d^(a|~c))+e[0]-198630844;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[7]+1126891415;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[14]-1416354905;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[5]-57434055;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[12]+1700485571;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[3]-1894986606;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[10]-1051523;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[1]-2054922799;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[8]+1873313359;
b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[15]-30611744;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[6]-1560198380;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[13]+1309151649;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[4]-145523070;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[11]-1120210379;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[2]+718787259;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[9]-343485551;a=(a<<21|a>>>11)+d<<0;u?(k=b+1732584193<<0,l=a-271733879<<0,m=d-1732584194<<0,n=c+271733878<<0,u=!1):(k=k+b<<0,l=l+a<<0,m=m+d<<0,n=n+c<<0)}while(!x);
return C?(g=f[k>>4&15]+f[k&15],g+=f[k>>12&15]+f[k>>8&15],g+=f[k>>20&15]+f[k>>16&15],g+=f[k>>28&15]+f[k>>24&15],g+=f[l>>4&15]+f[l&15],g+=f[l>>12&15]+f[l>>8&15],g+=f[l>>20&15]+f[l>>16&15],g+=f[l>>28&15]+f[l>>24&15],g+=f[m>>4&15]+f[m&15],g+=f[m>>12&15]+f[m>>8&15],g+=f[m>>20&15]+f[m>>16&15],g+=f[m>>28&15]+f[m>>24&15],g+=f[n>>4&15]+f[n&15],g+=f[n>>12&15]+f[n>>8&15],g+=f[n>>20&15]+f[n>>16&15],g+=f[n>>28&15]+f[n>>24&15]):f[k>>4&15]+f[k&15]+f[k>>12&15]+f[k>>8&15]+f[k>>20&15]+f[k>>16&15]+f[k>>28&15]+f[k>>
24&15]+f[l>>4&15]+f[l&15]+f[l>>12&15]+f[l>>8&15]+f[l>>20&15]+f[l>>16&15]+f[l>>28&15]+f[l>>24&15]+f[m>>4&15]+f[m&15]+f[m>>12&15]+f[m>>8&15]+f[m>>20&15]+f[m>>16&15]+f[m>>28&15]+f[m>>24&15]+f[n>>4&15]+f[n&15]+f[n>>12&15]+f[n>>8&15]+f[n>>20&15]+f[n>>16&15]+f[n>>28&15]+f[n>>24&15]};if(!q.JS_MD5_TEST&&u){var B=require("crypto"),E=require("buffer").Buffer;module.exports=function(e){if("string"==typeof e)return 80>=e.length||183>=e.length&&!/[^\x00-\x7F]/.test(e)?x(e):B.createHash("md5").update(e,"utf8").digest("hex");
e.constructor==ArrayBuffer&&(e=new Uint8Array(e));return 370>=e.length?x(e):B.createHash("md5").update(new E(e)).digest("hex")}}else q&&(q.md5=x)})(this);

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(n){var o=t.createEvent("MouseEvents");o.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(o)},a=e.webkitRequestFileSystem,c=e.requestFileSystem||a||e.mozRequestFileSystem,s=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},u="application/octet-stream",f=0,d=500,l=function(t){var o=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?o():setTimeout(o,d)},v=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){s(i)}}},p=function(t,s){var d,p,w,y=this,m=t.type,S=!1,h=function(){v(y,"writestart progress write writeend".split(" "))},O=function(){if((S||!d)&&(d=n().createObjectURL(t)),p)p.location.href=d;else{var o=e.open(d,"_blank");void 0==o&&"undefined"!=typeof safari&&(e.location.href=d)}y.readyState=y.DONE,h(),l(d)},b=function(e){return function(){return y.readyState!==y.DONE?e.apply(this,arguments):void 0}},g={create:!0,exclusive:!1};return y.readyState=y.INIT,s||(s="download"),r?(d=n().createObjectURL(t),o.href=d,o.download=s,i(o),y.readyState=y.DONE,h(),void l(d)):(/^\s*(?:text\/(?:plain|xml)|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)&&(t=new Blob(["﻿",t],{type:t.type})),e.chrome&&m&&m!==u&&(w=t.slice||t.webkitSlice,t=w.call(t,0,t.size,u),S=!0),a&&"download"!==s&&(s+=".download"),(m===u||a)&&(p=e),c?(f+=t.size,void c(e.TEMPORARY,f,b(function(e){e.root.getDirectory("saved",g,b(function(e){var n=function(){e.getFile(s,g,b(function(e){e.createWriter(b(function(n){n.onwriteend=function(t){p.location.href=e.toURL(),y.readyState=y.DONE,v(y,"writeend",t),l(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&O()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=y["on"+e]}),n.write(t),y.abort=function(){n.abort(),y.readyState=y.DONE},y.readyState=y.WRITING}),O)}),O)};e.getFile(s,{create:!1},b(function(e){e.remove(),n()}),b(function(e){e.code===e.NOT_FOUND_ERR?n():O()}))}),O)}),O)):void O())},w=p.prototype,y=function(e,t){return new p(e,t)};return w.abort=function(){var e=this;e.readyState=e.DONE,v(e,"abort")},w.readyState=w.INIT=0,w.WRITING=1,w.DONE=2,w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null,y}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});
function bytesToHex(bytes){
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}

var utf8ArrToStr = function(aBytes) {
	"use strict";
	var sView = "";

	for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
		nPart = aBytes[nIdx];
		sView += String.fromCharCode(
			nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
			/* (nPart - 252 << 32) is not possible in ECMAScript! So...: */
			(nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
			: nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
			(nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
			: nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
			(nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
			: nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
			(nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
			: nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
			(nPart - 192 << 6) + aBytes[++nIdx] - 128
			: /* nPart < 127 ? */ /* one byte */
			nPart
			);
	}
	return sView;
};

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

var tgStats = {},
	tgPostHits = {},
	rikaNipah = '!NipaJ2fn2k';

function killTrip(trip){
	if(tgStats[trip].energy > 0) return true;
	tgStats[trip].energy = 0;
	tgStats[trip].shkvarki = {};
	tgStats[trip].title = null;
	tgStats[trip].ava = null;
	
	if(trip == rikaNipah){
		tgStats[trip].rikaWiped = true;
	}
}

function parsePostResults(p, isOp){
	var file = p.querySelector('.file-info a'),
		trip = p.querySelector('.intro span.trip'),
		refs = p.querySelectorAll('div.body a[onclick^=highlightReply]'),
		name = p.querySelector('.intro span.name'),
		spoils = p.querySelectorAll('div.body span.spoiler'),
		img = p.querySelector('img.post-image'), imgSrc, imgW, imgH,
		pid = p.id.replace('reply_', ''),
		hits = [], rnd, i, j, r, m, t, atck, tCost, e;

	if(!trip) return null;
	trip = trip.textContent.substring(0,12);
	name = name.textContent;

	if(!tgPostHits[pid]){
		tgPostHits[pid] = {from: trip, hits:{}};
	}else{
		return false;
	}

	p.classList.add('tw-' + bytesToHex(strToUTF8Arr(trip)));

	if(img){
		m = img.src.match(/thumb(\/\d+\/\d+\/\d+\/\d+-[0-9a-f]+\.png$)/i);
		if(m){
			imgSrc = m[1];
			imgW = parseInt(img.style.width.replace('px',''));
			imgH = parseInt(img.style.height.replace('px',''));
		}		
	}

	if(file) {
		m = file.textContent.match(/\d+\-([0-9a-f]+)\./);
		rnd = parseInt(m[1], 16);
	}

	if(!tgStats[trip]){
		tgStats[trip] = {name: name, trip: trip, energy: 1, shkvarki: {}, title: null};
	}else{
		if(tgStats[trip].raped != curThread){
			e = isOp? 250 : 0;
			m = pid.match(/(\d)\1+$/);

			if(m){
				e += Math.pow(10, m[0].length - 1);
			}else{
				e++;
			}
			tgStats[trip].energy += e;
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
			};

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

		if(m[1].toUpperCase() == 'K' && tgStats[trip].energy >= 500 && tgStats[m[4]] && Object.keys(tgStats[trip].shkvarki).length > 9){
			tgStats[trip].energy = 0;
			killTrip(trip);

			tgStats[m[4]].energy -= Math.floor(tgStats[m[4]].energy / 2);

			if(m[4] == rikaNipah && !tgStats[m[4]].rikaWiped){
				tgStats[trip].nipaBomber = true;
			}
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

	parsePostResults(document.querySelector('form div.post.op'), true);

	for (i = 0; i < posts.length && i < 500; i++) {
		parsePostResults(posts[i]);
	}

	renderTripGame();

	if(posts.length >= 500){
		if(!localStorage.twBaseThread || curThread > localStorage.twBaseThread){
			localStorage.twBaseThread = curThread;
			localStorage.twBaseStats = JSON.stringify(tgStats);

			savedState = JSON.stringify({
				twBaseStats: JSON.parse(localStorage.twBaseStats || "{}"),
				twBaseThread: localStorage.twBaseThread || curThread 
			});

			$('#twConfArea').val(savedState);
			$('#twHash').text(md5(savedState).match(/[0-9-a-f]{4}/ig).join('-'));
		}
	}
}

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

function renderTripGame(){
	console.time('renderTripGame');
	var pleers = [], diff, difTxt, shkvarki, t, avas = [], playa, addons = [];
	
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
				avas.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' img.post-image:not(:hover) {-moz-box-sizing: border-box; box-sizing: border-box; padding-left: '+parseInt(playa.ava.width)+'px; background: url("http://cdn.syn-ch.com/thumb'+playa.ava.src+'"); width: '+parseInt(playa.ava.width)+'px !important; height: '+parseInt(playa.ava.height)+'px  !important;}');
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

		$('#twContent').append('<div data-trip="'+safe_tags(pleers[i].trip)+'"' + 
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
				addons.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' label span.name:before {font-style: italic; content: "'+ safe_tags(pleers[i].title.title) +' "}');
			}

			if(pleers[i].energy > 0){
				addons.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' label span.trip:after {color: white; background: #3db; padding: 3px; border-radius: 10px; font-size: 10px; margin-left: 5px; content: "'+ parseInt(pleers[i].energy) +'"}');
			}

			if(pleers[i].nipaBomber){
				addons.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' label span.name:after {content: " "; display: inline-block; width: 16px; height: 16px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIHSURBVDjLfZKxa5NBGMZ/35dEamtFMkgGpaAVQcTRLp1LoYubi6MOgqiTZOrQxYKjOIh/gIuim5YqdChKl4KbQ0XESoPYaGq+fHff3fu+DklM2lRfeLg7uOd3z929iZnRL7l9y7hwkbi6isWIiaAhoL2xMj+PvVlj4u1K0veUGaphkw0ZNcbuOkasCMOWA4AQsRhR79EYu6AY/87LhwDSfYAiYN7D1BTiPeo94j3iHMn0NNrJsaL4T4IiLNH+sFhZ2KFy9Qcc8aga0knR3S/oWrO751+A8p332+bSNmfuHmP8PEZKqjlJaKF7HynGHrZ1wW0Pe5L+L8R3p2YwXjL9qGal42hsQvyNSYaJgyQBCbQ36w0puFK7Zhv73sAk1Dl9r2blE1j8BZJj4nrKUP8d04yxczdrYY/6yBU0FrOliUtY3MPU9eR7cph20PCTdPwkIWN25BdUpWppGdMc1PfkBhIH0gYLxILqKEAULIIWg+j902WQCPPE4pA+0ChNCy3MwoHobgBBkaJDyGmOAoJbl90NkqS0P770Rguk6VHyna90WqyPAMSx3N6831C3C6UxzCImvSQoSXmS6BI+PX/VyDOWR/oAYOdxckMCS5OXr9cq1bOQGBYzpGiRfdti6+nrRp6xOPfMnhwKAPj8IJkpWtSjY1Yi1eDBdWi6jHURludedBuoX38Av56vLTwJJBoAAAAASUVORK5CYII="); vertical-align: middle; margin-left: 3px; margin-right: 3px;}');
			}
			
			if(pleers[i].trip == rikaNipah){
				addons.push('.tw-' + bytesToHex(strToUTF8Arr(playa.trip)) + ' label span.name:after {content: " "; display: inline-block; width: 16px; height: 16px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ0SURBVDjLlZPdT9JRGMe5qFu2Lrt1a63LWv9ATRdN5xvLsnLRipzZpIVpigjyIs3XAOUHgopoWkggP5QXSRJwJQmtm/IlAWtt3XXTfubS+nZ+P1eby6ldPGdn5+zzfb7Pc57DA8DbL9rjrYxuVsXf7W5fuC2mYawpE7QRJZpDDfz/EngYVTN9qR4EPvlgXjCiKVCPWvou/0ACxDJjSbIwDefqMPxrEzC87IDUW4Pq8Vv8PQVaX7Qw5qQRgY9ePP0wDMeSFfWTUkxmPeiI61DlFOP6SAV/VwFtRMFQCwb4CdwW10IbVcK+aMHgohmPlwdBZ11oCctx1X5p/R8B9Uzzuum1ntj1Iv1tGRtb3zH2dgSa2eZtOOOCMizD5cGyzR0lGBNdx1TP5T96E4+4WttiWg6mYr3Ifk1DF1PBmxmHYlrGZkbFUDku2oSHOAFjolOuIpZ65rs5+MmKg9hWcJlZWB1UbsOhRjYz5r/MoSn4AKWWQg0nwFoyzndhijRobGWIq3XgPQU1sa2LqjCRHoc81IBK9w0OnvscRWQtBGFfEc4b8o7wNDMKOwnY3lDwZZ+h1idB/zsThpf6CezkstVN3yNwHFMrNGqCVRvlA2UQ6POkud1nTvE0EcVR1gU7JNSCnrPrWLRtw+RM7BKBXnJDP9eOYqogVNAj0Av0uTk7mtjov2+1p2yQ0hIYXnXCs+qEzF+HC9YSyIiIsK84XWTKP5tvPHdi11GupSXHW8JNW+FMAHdclSCCKDEX/iKdDgotRY17jTu31LhvHybT5RGPin5K3NWs1c0yW+lp0umc/T7b383NUdHJa44rSfJU+Qf54n/iNzi8zBtL0z1zAAAAAElFTkSuQmCC"); vertical-align: middle; margin-left: 3px; margin-right: 3px;}');
			}
		}
	}
	$('head #twAvaStyle').remove();
	$('head').append('<style type="text/css" id="twAvaStyle">'+avas.join(' ')+'</style>');

	$('head #twIntroAddons').remove();
	$('head').append('<style type="text/css" id="twIntroAddons">'+addons.join(' ')+'</style>');
	console.timeEnd('renderTripGame');
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
	if(event.originalEvent.animationName != 'twNInsrt') return true;
	
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

		$('body').append('<div id="tripwars"><span id="twCollapser"><i class="fa fa-minus-square"></i></span> <span id="twConf"><i class="fa fa-cog"></i></span> <span id="twHideAway"><i class="fa fa-eye"></i></span><span id="odometer" style="float: right;"></span><div id="twContent"></div><div id="twConfig"><h1>TripWars v'+(typeof GM_info !== 'undefined' ? GM_info.script.version : GM_getMetadata("version"))+'</h1><br><p style="text-align: center;">Хеш статов: <strong id="twHash"></strong><br><br><button id="twSaveStats" style="float: left;"><i class="fa fa-download"></i> Скачать файл статсов</button><button id="twUploadStats" style="float: right;"><i class="fa fa-upload"></i> Загрузить файл статсов</button><input type="file" id="twUploadStatsInput" style="display: none;"><br></p></div></div>');
		$('head').append('<style type="text/css">   #tripwars { max-height: 90%; overflow-y: auto; min-width: 400px; position: fixed; top: 15px; right: 30px; background: #fff; padding: 5px; font-size: 12px; border-radius: 3px; box-shadow: 0px 0px 10px rgba(0,0,0,0.25); counter-reset: pstn; } #twContent div:before { counter-increment: pstn; content: counter(pstn) ": "; } #twContent div { padding: 5px; border-bottom: 1px solid #eee; position: relative; } #tripwars span.fr{ float: right; margin-left: 5px; } #tw0Content div:hover span.fr{ visibility: hidden; } #twContent div:hover span.ctrls{ display: block; } #twContent div span.ctrls{ display: none; } #tripwars span.badge{ color: white; background: #3db; padding: 3px; border-radius: 10px; } #tripwars br{ clear: both; } .twShowLess div { display:none; } .twShowLess div:first-child { display:block; } #twCollapser, #twConf, #twHideAway {cursor: pointer;} .twShowConfig #twContent {display: none;} #twConfig {display:none;} .twShowConfig #twConfig {display: block;} #twConfig textarea {margin: 0 !important; width: 400px; resize: vertical;} .twRaped > span:not(.badge), .twRaped > strong, .twRaped > em {color: pink !important;} .twAway:not(:hover) * {opacity: 0.75} .twHideAway .twAway {display:none !important;}</style>');
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
			saveAs(new Blob([strToUTF8Arr(savedState)], {type: "application/json;charset=utf-8"}), "TripWars-" +localStorage.twBaseThread + "-" + savedStateHash +".txt");
		});

		$('#twUploadStats').on('click', function(){$('#twUploadStatsInput').click();});

		$('#twUploadStatsInput').on('change', function(evt){
			if(evt.target.files.length === 0) return false;
			
			var fReader = new FileReader();
			fReader.onload = function(fE) {
				var conf = JSON.parse(utf8ArrToStr(new Uint8Array(fE.target.result)));

				tgStats = conf.twBaseStats;
				tgPostHits = {};
				
				localStorage.twBaseStats = JSON.stringify(tgStats);
				localStorage.twBaseThread = conf.twBaseThread;
				baseThread = conf.twBaseThread;

				genSaveState();
				parseTripGame();
			};
			fReader.readAsArrayBuffer(evt.target.files[0]);
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
