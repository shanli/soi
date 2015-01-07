/** Oslo JavaScript Framework. */
define(["../util/util","../ds/map"],function(a,b){"use strict";function c(b,c,d){var e,f,g,h,i,j=b.elements;for(f=0;e=j[f];f++)if(e.form===b&&!e.disabled&&"fieldset"!==e.tagName.toLowerCase())switch(h=e.name,e.type.toLowerCase()){case"file":case"submit":case"reset":case"button":break;case"select-multiple":var k=s(e);if(!a.isNull(k))for(var l=0;i=k[l];l++)d(c,h,i);break;default:i=s(e),a.isNull(i)||d(c,h,i)}var m=b.getElementsByTagName("input");for(f=0;g=m[f];f++)g.form===b&&"image"===g.type.toLowerCase()&&(h=g.name,d(c,h,g.value),d(c,h+".x","0"),d(c,h+".y","0"))}function d(a,b,c){var d=a.get(b);d||(d=[],a.set(b,d)),d.push(c)}function e(a,b,c){a.push(encodeURIComponent(b)+"="+encodeURIComponent(c))}function f(a){return a.checked?a.value:null}function g(a){var b=a.selectedIndex;return b>=0?a.options[b].value:null}function h(a){for(var b,c=[],d=0;b=a.options[d];d++)b.selected&&c.push(b.value);return c.length?c:null}function i(a,b){a.checked=b?"checked":null}function j(b,c){if(b.selectedIndex=-1,a.isString(c))for(var d,e=0;d=b.options[e];e++)if(d.value===c){d.selected=!0;break}}function k(b,c){a.isString(c)&&(c=[c]);for(var d,e=0;d=b.options[e];e++)if(d.selected=!1,c)for(var f,g=0;f=c[g];g++)d.value===f&&(d.selected=!0)}function l(a){var e=new b;return c(a,e,d),e}function m(a){var b=[];return c(a,b,e),b.join("&")}function n(a){for(var b,c=a.elements,d=0;b=c[d];d++)if(!b.disabled&&b.type&&"file"===b.type.toLowerCase())return!0;return!1}function o(a,b){if("FORM"===a.tagName)for(var c=a.elements,d=0;a=c[d];d++)o(a,b);else b===!0&&a.blur(),a.disabled=b}function p(a){a.focus(),a.select&&a.select()}function q(a){var b=s(a);return!!b}function r(a,b){var c=t(a,b);return!!c}function s(b){var c=b.type;if(!a.isDef(c))return null;switch(c.toLowerCase()){case"checkbox":case"radio":return f(b);case"select-one":return g(b);case"select-multiple":return h(b);default:return a.isDef(b.value)?b.value:null}}function t(a,b){var c=a.elements[b];if(c){if(c.type)return s(c);for(var d=0;d<c.length;d++){var e=s(c[d]);if(e)return e}}return null}function u(b,c){var d=b.type;if(a.isDef(d))switch(d.toLowerCase()){case"checkbox":case"radio":i(b,c);break;case"select-one":j(b,c);break;case"select-multiple":k(b,c);break;default:b.value=a.isDef(c)&&null!==c?c:""}}return{getFormDataMap:l,getFormDataString:m,hasFileInput:n,setDisabled:o,focusAndSelect:p,hasValue:q,hasValueByName:r,setValue:u}});