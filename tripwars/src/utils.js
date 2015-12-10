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

var getHost = function(url){
    "use strict";
    var a = document.createElement('a');
    a.href = url;
    return {href: a.href, host: a.host, crossdomain: location.host.toLowerCase() != a.host.toLowerCase()};
};

var getURLasAB = function(rawURL, cb) {
    "use strict";

    var url = getHost(rawURL);

    /*jshint newcap: false  */
    if (typeof GM_xmlhttpRequest === "function") {        
        if(navigator.userAgent.match(/Chrome\/([\d.]+)/)){
            GM_xmlhttpRequest({
                method: "GET",
                url: url.href,                
                responseType: "arraybuffer",
                onload: function(oEvent) {
                    cb(oEvent.response, new Date(0));
                },
                onerror: function(oEvent) {                    
                    cb(null, new Date());
                }
            });
        }else{
            GM_xmlhttpRequest({
                method: "GET",
                url: url.href,
                overrideMimeType: "text/plain; charset=x-user-defined",
                onload: function(oEvent) {
                    var ff_buffer = stringToByteArray(oEvent.responseText || oEvent.response);
                    cb(ff_buffer.buffer, new Date());
                },
                onerror: function(oEvent) {                    
                    cb(null, new Date());
                }
            });
        }
    }else{
        var oReq = new XMLHttpRequest();

        oReq.open("GET", url.href, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function(oEvent) {
            cb(oReq.response, new Date(oEvent.target.getResponseHeader('Last-Modified')));
        };
        oReq.onerror = function(oEvent) {
            cb(null, new Date());
        };
        oReq.send(null);        
    }
};

var stringToByteArray = function(str) {
    "use strict";

    var array = new Uint8Array(str.length), i, il;

    for (i = 0, il = str.length; i < il; ++i) {
        array[i] = str.charCodeAt(i) & 0xff;
    }

    return array;
};

// Thanks, Y0ba!
// Read more: https://github.com/greasemonkey/greasemonkey/issues/2034#issuecomment-70285613
function getUint8Array(data, i, len) {
    "use strict";
    var rv;
    if(typeof i === 'undefined') {
        rv = new Uint8Array(data);
        return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data);
    }
    rv = new Uint8Array(data, i, len);
    return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data, i, len);
}
