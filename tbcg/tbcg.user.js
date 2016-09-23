// ==UserScript==
// @name        ChessForInfinity
// @namespace   udp://desushelter/
// @include     *://8ch.vichandcxw4gm3wy.onion/*/*
// @include     *://8ch.pl/*/*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==

'use strict';
var boardUrl = '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',
	piecesUrl = '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';

var shapesStr = JSON.stringify([
		{x:192 + 32 * 0, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 1, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 2, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 3, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 4, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 5, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 6, y:0 + 32*6, r:0, c:0},
		{x:192 + 32 * 7, y:0 + 32*6, r:0, c:0},

		{x:192 + 32 * 0, y:0 + 32*7, r:0, c:1},
		{x:192 + 32 * 1, y:0 + 32*7, r:0, c:2},
		{x:192 + 32 * 2, y:0 + 32*7, r:0, c:3},
		{x:192 + 32 * 3, y:0 + 32*7, r:0, c:4},
		{x:192 + 32 * 4, y:0 + 32*7, r:0, c:5},
		{x:192 + 32 * 5, y:0 + 32*7, r:0, c:3},
		{x:192 + 32 * 6, y:0 + 32*7, r:0, c:2},
		{x:192 + 32 * 7, y:0 + 32*7, r:0, c:1},

		{x:192 + 32 * 0, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 1, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 2, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 3, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 4, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 5, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 6, y:0 + 32*1, r:1, c:0},
		{x:192 + 32 * 7, y:0 + 32*1, r:1, c:0},

		{x:192 + 32 * 0, y:0 + 32*0, r:1, c:1},
		{x:192 + 32 * 1, y:0 + 32*0, r:1, c:2},
		{x:192 + 32 * 2, y:0 + 32*0, r:1, c:3},
		{x:192 + 32 * 3, y:0 + 32*0, r:1, c:4},
		{x:192 + 32 * 4, y:0 + 32*0, r:1, c:5},
		{x:192 + 32 * 5, y:0 + 32*0, r:1, c:3},
		{x:192 + 32 * 6, y:0 + 32*0, r:1, c:2},
		{x:192 + 32 * 7, y:0 + 32*0, r:1, c:1},
	]);

/* jshint ignore:start */
/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):[]},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function T(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?T(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n);var s=n.dataType,a=/\?.+=\?/.test(n.url);if(a&&(s="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=s&&"jsonp"!=s)||(n.url=w(n.url,"_="+Date.now())),"jsonp"==s)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var S="async"in n?n.async:!0;d.open(n.type,n.url,S,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(S(t)+"="+S(e))},T(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
var $ = Zepto;
var lsbTools=function(){"use strict";function r(r){function t(r){var t,n,i;for(t=0;t<256;++t)o[t]=t;for(t=0;t<256;++t)n=n+o[t]+r[t%r.length]&255,i=o[t],o[t]=o[n],o[n]=i}function n(){var r;return e=e+1&255,f=f+o[e]&255,r=o[e],o[e]=o[f],o[f]=r,o[r+o[e]&255]}function i(){return(n()+(n()<<8)+(n()<<16)+(n()<<24)>>>0)/4294967295}var o=[],e=0,f=0;return t(r),{rekey:t,byte:n,float:i}}function t(r,t,i){function o(){for(var r=[],t=0;t<128;t++)r.push((v[2*t]+v[2*t+1])/2);return r}function e(){for(var r=[],t=0;t<128;t++)r.push(v[2*t+1]);return r}var f,a,u,h,l,c,m=4*t,s=Math.floor(r.length/t/4),v=[],g=0;for(f=0;f<256;f++)v[f]=1;for(f=0;f<s;f++){for(a=0;a<t;a++)u=m*f+4*a,v[r[u]]++,v[r[u+1]]++,v[r[u+2]]++,i&&(r[u]&=1,r[u]*=255,r[u+1]&=1,r[u+1]*=255,r[u+2]&=1,r[u+2]*=255);for(h=n(o(),e()),l=h>.5?191:Math.floor(191*h*2),c=h<.5?191:Math.floor(191*(1-h)*2),h>.95&&(g+=3*t),a=0;a<t;a++)u=m*f+4*a,r[u]=Math.floor(.25*r[u])+l,r[u+1]=Math.floor(.25*r[u+1])+c,r[u+2]=Math.floor(.25*r[u+2]),r[u+3]=255}return g}var n=function(){function r(r){var t,n,i;if(isNaN(r)||r<=0)return NaN;for(i=h[0],t=1;t<h.length;t++)i+=h[t]/(r+t);return n=r+.5+607/128,(r+.5)*Math.log(n)-n+l+Math.log(i/r)}function t(r,t){return n(r,t,c,Math.pow(2,32)-1)}function n(t,n,o,e){if(isNaN(t)||isNaN(n)||t<=0||n<0)return NaN;if(0===n)return 0;if(n>=t+1)return 1-i(t,n,o,e);for(var f=0,a=1/t,u=a;Math.abs(a/u)>o&&f<e&&u<1/0;)f+=1,a*=n/(t+f),u+=a;return isFinite(u)?Math.exp(-n+t*Math.log(n)-r(t))*u:1}function i(t,i,e,f){var a;return isNaN(t)||isNaN(i)||t<=0||i<0?NaN:0===i?1:i<t+1?1-n(t,i,e,f):(a=1/o(i,e,f,function(r,n){return 2*r+1-t+n},function(r){return r*(t-r)}),Math.exp(-i+t*Math.log(i)-r(t))*a)}function o(r,t,n,i,o){for(var e=1,f=i(0,r),a=0,u=1,h=f/u,l=0,c=Number.MAX_VALUE;l<n&&c>t;){++l;var m=i(l,r),s=o(l,r),v=m*f+s*e,g=m*u+s*a,M=!1;if(!isFinite(v)||!isFinite(g)){var N=1,S=1,w=5,R=Math.max(m,s);if(R<=0)throw"Can't scale";M=!0;for(var U=0;U<w&&(S=N,N*=R,0!==m&&m>s?(v=f/S+s/N*e,g=u/S+s/N*a):0!==s&&(v=m/N*f+e/S,g=m/N*u+a/S),M=!isFinite(v)||!isFinite(g),M);U++);}if(M)throw"Can't scale";var p=v/g;if(isNaN(p))throw"NaN divergence";c=Math.abs(p/h-1),h=v/g,e=f,f=v,a=u,u=g}if(l>=n)throw"Non convergent";return h}function e(r,n){return r<=0?0:t(n/2,r/2)}function f(r){for(var t=0;t<r.length;t++)if(r[t]<=0)throw"NOT_POSITIVE_ELEMENT_AT_INDEX "+t}function a(r){for(var t=0;t<r.length;t++)if(r[t]<0)throw"NEGATIVE_ELEMENT_AT_INDEX "+t}function u(r,t){if(r.length<2)throw"Dimension mismatch";if(r.length!=t.length)throw"Dimension not equal";f(r),a(t);var n,i=0,o=0;for(n=0;n<t.length;n++)i+=r[n],o+=t[n];var e=1,u=!1;Math.abs(i-o)>1e-5&&(e=o/i,u=!0);var h,l=0;for(n=0;n<t.length;n++)u?(h=t[n]-e*r[n],l+=h*h/(e*r[n])):(h=t[n]-r[n],l+=h*h/r[n]);return l}var h=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-2102644417241049e-20,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22],l=.5*Math.log(2*Math.PI),c=1e-14;return function(r,t){return 1-e(u(r,t),r.length-1)}}(),i=function(){function r(r,t){for(var e=[],f=0;f<t.length;f++)1==t[f]?e[f]=i(r[f]):t[f]==-1?e[f]=o(r[f]):e[f]=r[f];var a=n(r),u=n(e);return a==u?"U":a<u?"R":"S"}function t(r){for(var t=[],n=0;n<r.length;n++)t[n]=1^r[n];return t}function n(r){for(var t=0,n=0;n<r.length-1;n++)t+=Math.abs(r[n+1]-r[n]);return t}function i(r){return 1&r?r-1:r+1}function o(r){return 1&r?r+1:r-1}function e(r){var t=r.R-r.S,n=r.mR-r.mS,i=r.iR-r.iS,o=r.imR-r.imS,e=2*(i+t),f=n-o-i-3*t,a=t-n,u=f*f-4*e*a;if(u<0)return null;if(f*=-1,0===u)return f/2/e/(f/2/e-.5);u=Math.sqrt(u);var h=(f+u)/2/e,l=(f-u)/2/e;return Math.abs(h)<Math.abs(l)?h/(h-.5):l/(l-.5)}return function(n,i,o,f,a){o=o||[1,0,0,1],f=f||2,a=a||2;var u,h,l,c,m,s,v,g,M=o.map(function(r){return r?-1*r:0}),N=n.length/4/i,S=Math.floor(i/f),w=Math.floor(N/a),R=[{R:0,S:0,U:0,mR:0,mS:0,mU:0,iR:0,iS:0,iU:0,imR:0,imS:0,imU:0},{R:0,S:0,U:0,mR:0,mS:0,mU:0,iR:0,iS:0,iU:0,imR:0,imS:0,imU:0},{R:0,S:0,U:0,mR:0,mS:0,mU:0,iR:0,iS:0,iU:0,imR:0,imS:0,imU:0}];for(h=0;h<w;h++)for(u=0;u<S;u++){for(s=[],v=[],g=[],c=0;c<a;c++)for(l=0;l<f;l++)m=4*(i*(h*a+c)+u*f+l),s.push(n[m]),v.push(n[m+1]),g.push(n[m+2]);R[0][r(s,o)]++,R[1][r(v,o)]++,R[2][r(g,o)]++,R[0]["m"+r(s,M)]++,R[1]["m"+r(v,M)]++,R[2]["m"+r(g,M)]++,s=t(s),v=t(v),g=t(g),R[0]["i"+r(s,o)]++,R[1]["i"+r(v,o)]++,R[2]["i"+r(g,o)]++,R[0]["im"+r(s,M)]++,R[1]["im"+r(v,M)]++,R[2]["im"+r(g,M)]++}return(e(R[0])+e(R[1])+e(R[2]))/3}}(),o=function(){function t(r,t){var n,i,o=[];for(n=0;n<r;n++)i=Math.round(n*t.float()),i!=n&&(o[n]=o[i]),o[i]=n;return o}function n(r){return r=M[r],4*Math.floor(r/3)+r%3}function i(r){return 4*Math.floor(r/3)+r%3}function o(r,t,n){var i=N(t);(1&r[i])!=n&&(b++,!r[i]||r[i]<255&&Math.random()<.5?r[i]++:r[i]--)}function e(r,t,n){var i=N(t);(1&r[i])!=n&&(b++,r[i]^=1)}function f(r,t){return 1&r[N(t)]}function a(r,t){for(var n,i,o,e=(1<<r)-1;E<8;){for(o=0,n=1;n<=e;n++)o^=f(t,U++)*n;k+=o<<E,E+=r}return i=255&k,k>>>=8,E-=8,i}function u(r,t,n){var i,o,e,a=(1<<r)-1;for(k+=n<<E,E+=8;E>=r;){for(o=0,e=k&(1<<r)-1,k>>>=r,E-=r,i=1;i<=a;i++)o^=f(t,U++)*i;o^e&&S(t,U-a+(o^e)-1),p+=r}}function h(r,t,n){return a(r,t)^n.byte()}function l(r,t,n,i){u(r,t,n^i.byte())}function c(r,t,n){for(var i=Math.ceil((r-E)/8),o=0;o<i;o++)w(r,t,0,n)}function m(f,m,s){var v,g,d,y,x,T={shuffle:!0,matrix:!0,mask:!0,key:[1,2,3,4,5,6,7,8,9,0],pm1code:!0},_=f.length/4*3;s=s||{},U=0,p=0,b=0,k=0,E=0;for(v in T)s.hasOwnProperty(v)||(s[v]=T[v]);if((s.shuffle||s.matrix||s.mask)&&(x=r(s.key)),S=s.pm1code?o:e,s.mask?(w=l,R=h):(w=u,R=a),s.shuffle?(N=n,M=t(_,x)):N=i,d=16,s.matrix)for(;d>0&&(g=(1<<d)-1,y=Math.floor((_-4)/g)*d,!(y>=8*(m.length+4)));)d--;else y=_,d=1;if(0===d||y<4*(m.length+4))throw"Data will not fit into image.";for(s.matrix&&(d--,S(f,0,1&d),S(f,1,d>>1&1),S(f,2,d>>2&1),S(f,3,d>>3&1),d++,p+=4),w(d,f,255&m.length,x),w(d,f,m.length>>>8&255,x),w(d,f,m.length>>>16&255,x),w(d,f,m.length>>>25&255,x),v=0;v<m.length;v++)w(d,f,m[v],x);return c(d,f,x),{bitsWrited:p,bitsChanged:b,n:d,k:(1<<d)-1}}function s(c,m){var s,v,g,d,y={shuffle:!0,matrix:!0,mask:!0,key:[1,2,3,4,5,6,7,8,9,0]},x=c.length/4*3;m=m||{},U=0,p=0,b=0,k=0,E=0;for(s in y)m.hasOwnProperty(s)||(m[s]=y[s]);(m.shuffle||m.matrix||m.mask)&&(d=r(m.key)),S=m.pm1code?o:e,m.mask?(w=l,R=h):(w=u,R=a),m.shuffle?(N=n,M=t(x,d)):N=i,g=1,m.matrix&&(g=1,g+=f(c,0),g+=f(c,1)<<1,g+=f(c,2)<<2,g+=f(c,3)<<3),v=(1<<g)-1;var T=Math.floor(Math.floor((x-4)/v)*g/8),_=R(g,c,d)+256*R(g,c,d)+65536*R(g,c,d)+16777216*R(g,c,d);_+4>T&&(_=T-4);var A=new Uint8Array(_);for(s=0;s<_;s++)A[s]=R(g,c,d);return A}function v(r){for(var t=0;t<r.length;t+=4)r[t]&=1,r[t]*=255,r[t+1]&=1,r[t+1]*=255,r[t+2]&=1,r[t+2]*=255,r[t+3]=255}function g(r,t){var n;if(t)for(n=0;n<r.length/4;n++)r[4*n]|=1,r[4*n+1]|=1,r[4*n+2]|=1;else for(n=0;n<r.length/4;n++)r[4*n]&=254,r[4*n+1]&=254,r[4*n+2]&=254}var M,N,S,w,R,U=0,p=0,b=0,k=0,E=0;return N=i,S=e,R=a,w=u,{read:s,write:m,enhance:v,fill:g}}();return{rc4:r,read:o.read,write:o.write,enhance:o.enhance,fill:o.fill,chiAttack:t,rsDetect:i}}();
/* jshint ignore:end */
/* globals $, lsbTools */
/* jshint browser:true, devel:true */



var boardImg = document.createElement('img'), piecesImg = document.createElement('img'),
	theCanvas = document.createElement("canvas"),
	context = theCanvas.getContext("2d"), shapes = JSON.parse(shapesStr),
	stegOptions = {
	    shuffle: true,
	    matrix: true,
	    mask: true,
	    key: [31,10,55,1,2,5,8,0,33,250,138],
	    pm1code: true
	};

theCanvas.width = 640;
theCanvas.height = 320;

function canvasApp() {
	var numShapes;
	var dragIndex;
	var dragging;
	var mouseX;
	var mouseY;
	var dragHoldX;
	var dragHoldY;

	shapes.sort(function(a,b){return a.y-b.y;});
	numShapes = shapes.length;

	drawScreen();

	theCanvas.addEventListener("mousedown", mouseDownListener, false);

	function mouseDownListener(evt) {
		var i, bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

		for (i=numShapes - 1; i >= 0; i--) {
			if	(hitTest(shapes[i], mouseX, mouseY)) {
				dragging = true;
				dragIndex = i;
				dragHoldX = mouseX - shapes[i].x;
				dragHoldY = mouseY - shapes[i].y;
				shapes.push(shapes.splice(dragIndex,1)[0]);
				dragIndex = shapes.length - 1;
				break;
			}
		}

		if (dragging) {
			window.addEventListener("mousemove", mouseMoveListener, false);
		}

		theCanvas.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);

		evt.preventDefault();
	}

	function mouseUpListener() {
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
		window.removeEventListener("mouseup", mouseUpListener, false);
		if (dragging) {
			dragging = false;
			window.removeEventListener("mousemove", mouseMoveListener, false);
		}
		shapes.sort(function(a,b){return a.y-b.y;});
		drawScreen();
	}

	function mouseMoveListener(evt) {
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

		//clamp x and y positions to prevent object from dragging outside of canvas
		var posX = mouseX - dragHoldX;
		posX = (posX < 0) ? 0 : ((posX > theCanvas.width - 32) ? theCanvas.width - 32 : posX);
		var posY = mouseY - dragHoldY;
		posY = (posY < 0) ? 0 : ((posY > theCanvas.height - 64) ? theCanvas.height - 64 : posY);

		shapes[dragIndex].x = posX;
		shapes[dragIndex].y = posY;

		drawScreen();
	}

	function hitTest(shape,mx,my) {
		return (shape.x < mx && shape.x + 32 > mx && shape.y < my && shape.y + 64 > my);
	}
}

function drawScreen() {
	context.fillStyle = "#eee";
	context.fillRect(0,0,theCanvas.width,theCanvas.height);
	context.drawImage(boardImg,160,0);
	for (var i=0; i < shapes.length; i++) {
		context.drawImage(piecesImg, shapes[i].c*32, shapes[i].r*64,32,64, shapes[i].x,shapes[i].y, 32,64);
	}
}

function appendCSS(css){
	var head = document.head || document.getElementsByTagName('head')[0],
	    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

var Draggable = function Draggable(opts){
    this.handle = opts.handle;
    this.draggable = opts.draggable;

    var that = this;

    function onMov(event){
        var x, y, bb = that.draggable.getBoundingClientRect(),
            ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            wh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        x = event.clientX - that.start_x;
        y = event.clientY - that.start_y;
        if (bb.width + x > ww) x = ww - bb.width;
        if (bb.height + y > wh) y = wh - bb.height;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        that.draggable.style.top = y + 'px';
        that.draggable.style.left = x + 'px';
    }

    this.handle.onmousedown = function(event) {
        event.preventDefault();
        if(event.which == 1){
            that.start_y = event.clientY - event.target.getBoundingClientRect().top;
            that.start_x = event.clientX - event.target.getBoundingClientRect().left;
            window.addEventListener('mousemove', onMov, false);
            var offFunc = function(){
            	window.removeEventListener('mousemove', onMov, false);
            	window.removeEventListener('mouseup', offFunc, false);
            };
            window.addEventListener('mouseup', offFunc, false);
          }
      };
};


boardImg.onload = function(){piecesImg.src = 'data:image/png;base64,'+piecesUrl;};
piecesImg.onload = function(){canvasApp();};
boardImg.src = 'data:image/png;base64,'+boardUrl;

var ico = document.createElement('div'), t;
t = document.createElement('img');
t.src = 'data:image/gif;base64,R0lGODdhIAAgAOMQACEbFDcwH1A3F2NOLm5OH4hoK7KQOsugNrOib6qmj9uwPtzCYe3MU9XNks7Orf7//CwAAAAAIAAgAAAE/nAxSedcy4ylhmEKZmGUpCiGMBzDWgAsUBgAoa3tQQTHAXIEAQAQCACER6FAGGAWj0NB4cTQGZqvQOF1MAYQsoFRPCgICQTFYVEgDIbPuJEIh3vnhYOCYXC/VURvYmNNAIJigAEEHBwCBEQFRpE1LwVvATSOkpJTe31PYoZGgICipoADaSE6c3FDdEiGRHKQelUEbTapW2WWvLw2aFsCfQtrKQzJbVLJCksCyQxBxCAHz3meacqOBSDOQSDSQbYpjoshzj0Ky519jicKQTZqKUGdfNMCPnxLBNEq0LYxS6YqA5olH1A8CzfAwQAqZqTAI2BLhyNinvo1S8BxD4OI/t1OLFpjjcPHJd1APFvgAMG0hOWk6GGjTSEubxcd6EylL5u5E8YEUJmW0tmSBQ0QPIN5jYoONPPw3QQB1QcKYd7SrMnVwsACBBoSQEPA4FkINgjKYNBBzs2DBAh0GtjJcsHKBwgS6CzQIMGCc43yJijgAC5HAxxngC1wuLCBvFuo9GlQuEEDvJX1JqD89a2Dy5Q5FjSTAADcwptbcvSrGjXqAAlSVbTRMjTiBI8dFMiLgDDjwoThjjSoWbNluH2TOjweF7lfinvaaP7smaNOvYWvUy8OOF6LMgjADoj9eAFsD+EJxN6NW1WVNvChxp8vH5d9XECroFBzwAD/HnnoGuGfAT0cMEV/egAFT4LqqPGfgxA26N8JB0QAADs=';
ico.classList.add('tbcg_icon');
ico.appendChild(t);

var gameUI = document.createElement('div');
gameUI.classList.add('tbcg_ui');
gameUI.classList.add('tbcg_hidden');
gameUI.innerHTML = '<div class="tbcg_header">Chess Game <span class="tbcg_floatright">[<a id="tbcd_close" href="javascript:;">x</a>]</span></div><div id="tbcg_out"></div>' +
	'<span class="tbcg_floatleft">[<a id="tbcd_reset" href="javascript:;">reset</a>]</span>'+
	'<span class="tbcg_floatright"><button id="tbcg_send"><strong>Send</strong></button></span>';

document.body.appendChild(ico);
document.body.appendChild(gameUI);

var insertAnimation = ' tbcgni{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}',
    animationTrigger = '{animation-duration:0.001s;-o-animation-duration:0.001s;-ms-animation-duration:0.001s;-moz-animation-duration:0.001s;-webkit-animation-duration:0.001s;animation-name:tbcgni;-o-animation-name:tbcgni;-ms-animation-name:tbcgni;-moz-animation-name:tbcgni;-webkit-animation-name:tbcgni;}';

appendCSS('.tbcg_icon {z-index: 1000;position: fixed;bottom: 75px;right: 25px;box-shadow: 0 0 10px #999;display: block;border: 3px solid #fff;border-radius: 5px;}'+
	'.tbcg_icon img {margin: 0;vertical-align: bottom;}'+
	'.tbcg_ui {position: fixed;margin: auto;top: 50px; left: 50px;width: 640px;height: 370px;background: cornsilk;box-shadow: 0 0 15px;}'+
	'.tbcg_floatleft {float: left;}'+
	'.tbcg_floatright {float: right;}'+
	'.tbcg_header {background: darkcyan;font-weight: bold;text-align: center;cursor: move;}'+
	'.tbcg_hidden {display: none;}'+
	'@keyframes ' + insertAnimation + '@-moz-keyframes ' + insertAnimation + '@-webkit-keyframes ' +
        insertAnimation + '@-ms-keyframes ' + insertAnimation + '@-o-keyframes ' + insertAnimation +
        'a[download="tbcg.png"]' + animationTrigger);

document.getElementById('tbcg_out').appendChild(theCanvas);

new Draggable({
    draggable: document.querySelector('.tbcg_ui'),
    handle: document.querySelector('.tbcg_ui .tbcg_header')
});

ico.onclick = function(){
	gameUI.classList.toggle('tbcg_hidden');
};

document.getElementById('tbcd_reset').onclick = function(){
	shapes = JSON.parse(shapesStr);
	shapes.sort(function(a,b){return a.y-b.y;});
	drawScreen();
};

function processLink(l){
    console.log(l);
	if(l.classList.contains('tbcg_processed')) return false;
	l.classList.add('tbcg_processed');

	var t = document.createElement('a');
	t.classList.add('tbcg_playlink');
    t.href = 'javascritp:;';
	t.textContent = 'Play Chess!';
    l.parentNode.querySelector('.image_id').appendChild(document.createTextNode(' '));
	l.parentNode.querySelector('.image_id').appendChild(t);
}

function linkInserted(ev){
	processLink(ev.target);
}

var loadImg = document.createElement('img');

function linkClicked(e){
	if(!e.target.classList.contains('tbcg_playlink')) return;
	e.preventDefault();
	loadImg.src = e.target.parentNode.parentNode.querySelector('a').href;
}

loadImg.onload = function(){
	var cnvs = document.createElement('canvas'),
		cntx = cnvs.getContext("2d");

	cnvs.width = loadImg.width;
	cnvs.height = loadImg.height;

	cntx.drawImage(loadImg, 0, 0);

	var pixels = cntx.getImageData(0, 0, cnvs.width, cnvs.height);
	var res;
	try{
		res = lsbTools.read(pixels.data, stegOptions);
        var ddd = ab2Str(res);
		shapes = JSON.parse(ddd);
	}catch(e){
		console.log('steg extract fail');
		shapes = JSON.parse(shapesStr);
	}
	drawScreen();
	gameUI.classList.remove('tbcg_hidden');
};

var TinyBoardFields = ["name","email","subject","post","spoiler","body","file","file_url","password","thread","board", "recaptcha_challenge_field", "recaptcha_response_field", "user_flag", "huehuehue", "derpibooruAPIKey", "embed"];
var uint8toBlob = function(data, dataType) {
    return new Blob([data], {type: dataType});
};
var ab2Str = function(buffer) {
    "use strict";

    var length = buffer.length;
    var result = '';
    for (var i = 0; i < length; i += 65535) {
        var addition = 65535;
        if (i + 65535 > length) {
            addition = length - i;
        }
        result += String.fromCharCode.apply(null, buffer.subarray(i, i + addition));
    }

    return result;
};
var stringToByteArray = function(str) {
    var array = new Uint8Array(str.length), i, il;

    for (i = 0, il = str.length; i < il; ++i) {
        array[i] = str.charCodeAt(i) & 0xff;
    }

    return array;
};

var dataURLtoUint8Array = function(dataURL) {
    var binary = atob(dataURL.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Uint8Array(array);
};

var sendBoardForm = function(file) {
    if(["syn-ch.com", "syn-ch.org", "syn-ch.ru", "syn-ch.com.ua"].indexOf(document.location.host.toLowerCase()) != -1 && $('#de-pform form').length === 0){
        _sendBoardSync(file);
        return;
    }

    if ($('form[name*="postcontrols"]').length !==0) {
        $.ajax({
            url: location.href,
            type: 'GET',
            processData: false,
            contentType: false,
            success: function(data) {
                var doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = data;

                var l = $("form[action*=post]", doc).first().serializeArray();
                l = l.filter(function(a){
                    if(TinyBoardFields.indexOf(a.name) > -1) return false;
                    return true;
                });

                l.push({"name": "post", "value": $('form[name=post] input[type=submit]').val()});

                _sendBoardForm(file, l);
            },
            error: function() {
                alert('failed to get fresh form. Try again!');
                $("#tbcg_send").val('Send').removeAttr("disabled");
            }
        });
    }else{
        _sendBoardForm(file, []);
    }
};

var _sendBoardForm = function(file, formAddon) {
    var formData, fileInputName, formAction,
        fd = new FormData();

    $('form noscript').remove();

    if($('#de-pform form').length !== 0){
        formData = $('#de-pform form').serializeArray();
        fileInputName = $("#de-pform form input[type=file]")[0].name;
        formAction = $("#de-pform form")[0].action;
    }else if(($('form[name=post]').length !== 0)){
        formData = $('form[name=post]').first().serializeArray();
        fileInputName = $("form[name=post] input[type=file]").length ? $("form[name=post] input[type=file]")[0].name : 'file';
        formAction = $("form[name=post]")[0].action;
    }else if(($('form#qr-postform').length !== 0)){
        formData = $('form#qr-postform').first().serializeArray();
        fileInputName = 'image1';
        formAction = $("form#qr-postform")[0].action;
    }else if(($('form#postform').length !== 0)){
        formData = $('form#postform').first().serializeArray();
        fileInputName = 'image1';
        formAction = $("form#postform")[0].action;
    }

    if(formAddon.length > 0){
        formData = formData.filter(function(a){
            if(TinyBoardFields.indexOf(a.name) > -1) return true;
            return false;
        });
        formData.push.apply(formData, formAddon);
    }

    for (var i = 0; i < formData.length; i++) {
        if (formData[i].name && formData[i].name != fileInputName && formData[i].name !== "") {
            fd.append(formData[i].name, formData[i].value);
        }
    }

    fd.append(fileInputName, uint8toBlob(file, 'image/png'), 'tbcg.png');

    $.ajax({
        url: formAction,
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR) {
            var doc = document.implementation.createHTMLDocument(''),
                p;
            doc.documentElement.innerHTML = data;

            if (jqXHR.status === 200 && jqXHR.readyState === 4) {
                p = $('form[action*="delete"]', doc).length +
                    $('form[action*="delete"]', doc).length +
                    $('#posts_form, #delform', doc).length +
                    $('form:not([enctype])', doc).length +
                    $('form[name="postcontrols"]', doc).length +
                    $('form[name="postcontrols"]', doc).length +
                    $('#delform, form[name="delform"]', doc).length;
            } else {
                p = 1;
            }

            if(typeof data == "string" && data.match(/<h1>Ошибка!<\/h1>/)) p = 0;

            if (p !== 0 || (data.Status && data.Status == "OK")) {
                $('#de-pform textarea').val('');
                $('form#yukipostform textarea').val('');
                $('form[name=post] textarea').val('');
                $('#de-pform img[src*=captcha]').click();
                $('#hidbord_replyform #c_file').val('');
                $('.de-thread-updater .de-abtn').click();
                $('#de-thrupdbtn').click();
                $('a#yukiForceUpdate').click();
                $('a#update_thread').click();
                $('#recaptcha_response_field').val('');
                $('#recaptcha_challenge_image').click();
                $('input[name=recaptcha_response_field]').val('');
                $('.recaptcha_image').click();
                $('#ABU-getnewposts a').first().click();
                $('.captcha-reload-button').click();
                $('#qr-shampoo, #shampoo, #qr-captcha-value').val('');
                $('#imgcaptcha').click();
                $('#recaptcha_reload').click();
                $('#captchainput').val('');
                $('a#updateThread').click();
            } else {
                alert('Can\'t post. Wrong capch? Fucked up imageboard software?.');
                $("#tbcg_send").val('Send').removeAttr("disabled");
            }
        },
        error: function(jqXHR) {
            alert('Error while posting. Something in network or so.\n[' + jqXHR.status + ' ' + jqXHR.statusText + ']');
            $("#tbcg_send").val('Send').removeAttr("disabled");

        }
    });
};

var _sendBoardSync = function(file) {
    var formData, fileInputName, formAction,
        fd = new FormData();

    formData = $('form[name=post]').first().serializeArray();
    formData.push({"name": "json_response", "value": 1});
    formData.push({"name": "post", "value": $('form[name=post] input[type=submit]').val()});
    fileInputName = 'file';
    formAction = $("form[name=post]")[0].action;

    for (var i = 0; i < formData.length; i++) {
        if (formData[i].name && formData[i].name != fileInputName && formData[i].name !== "") {
            fd.append(formData[i].name, formData[i].value);
        }
    }

    fd.append(fileInputName, uint8toBlob(file, 'image/png'), 'tbcg.png');

    $.ajax({
        url: formAction,
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data) {
            var resp = JSON.parse(data);
            if (resp.redirect) {
                $('a#updateThread').click();
                $('form[name=post] textarea').val('');
                $('form[name=post] input[name=embed]').val('');

            } else {
                alert(resp.error);
                $("#tbcg_send").val('Send').removeAttr("disabled");
            }
        },
        error: function(jqXHR) {
            alert('Error while posting. Something in network or so.\n[' + jqXHR.status + ' ' + jqXHR.statusText + ']');
            $("#tbcg_send").val('Send').removeAttr("disabled");
        }
    });
};

//document.addEventListener("DOMContentLoaded", function() {
	var t = document.querySelector('.fileinfo a[download="tbcg.png"]');
	if(t) for (var i = 0; i < t.length; i++) processLink(t[i]);
	document.addEventListener('animationstart', linkInserted, false);
	document.addEventListener('MSAnimationStart', linkInserted, false);
	document.addEventListener('webkitAnimationStart', linkInserted, false);
	document.addEventListener('click', linkClicked, false);
//}, false);

function doPost(){
	var cnvs = document.createElement('canvas'),
	cntx = cnvs.getContext("2d");

	cnvs.width = 320;
	cnvs.height = 320;

	cntx.drawImage(theCanvas, -160, 0);

	var pixels = cntx.getImageData(0, 0, cnvs.width, cnvs.height);
	var res;
	 try{
		res = lsbTools.write(pixels.data, stringToByteArray(JSON.stringify(shapes)), stegOptions);
	}catch(e){
		console.log('steg embed fail');
		return;
	}
	gameUI.classList.add('tbcg_hidden');

	cntx.putImageData(pixels, 0, 0);

	var file = dataURLtoUint8Array(cnvs.toDataURL("image/png"));
	sendBoardForm(file);
}

document.getElementById('tbcg_send').onclick = doPost;
